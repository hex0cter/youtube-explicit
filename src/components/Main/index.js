import React from 'react'
import Playback from '../Playback'
import ListPreview from '../ListPreview'
import BackBar from '../BackBar'
import AdMask from '../AdMask'
import FullScreen from '../FullScreen'
import styles from './index.module.css'
import axios from 'axios'
import { connect } from 'react-redux'
import mapStateToProps from './map-state-to-props'
import mapDispatchToProps from './map-dispatch-to-props'
import { msToSeconds, msToMinutes } from './utils'
import * as modes from './modes'
import queryString from 'query-string'
import DisplayMessage from '../DisplayMessage'

class Main extends React.Component {
  userActionOccured = () => {
    if (this.props.userMode === modes.USER_RESTING_MODE) {
      console.log('Set initial start play time')
      const currentTime = Date.now()
      const maxPlayTime = this.props.maxPlayTime

      this.props.onUpdateIsUserInteractionAllowed(true)
      this.props.onUpdateStartPlayTime(currentTime)
      this.props.onUpdateStartRestTime(null)
      this.props.onUpdateUserMode(modes.USER_PLAYING_MODE)

      setInterval(this.showPlayingLogs, 60000)
      setTimeout(this.takeBreak, maxPlayTime)
    } else {
      // console.log('Debug: this.props.userMode', this.props.userMode)
    }
  }

  keyPressed = (e) => {
    const key = e.key
    console.log('keyPressed', key)

    if (!this.props.isUserInteractionAllowed) {
      console.log('resting mode, skipping key press', key)
      return
    }

    this.userActionOccured()

    let shouldInputHaveFocus = false
    let isVerticalNavigation = false
    if (this.props.uiMode === modes.UI_PLAYBACK_MODE) {
      if (key === 'Escape') {
        this.props.onUpdateUIMode(modes.UI_LIST_PREVIEW_MODE)
      } else if (key === 'Enter') {
        if (this.props.isPlaybackInProgress) {
          this.props.player.pauseVideo()
        } else {
          this.props.player.playVideo()
        }
      } else if (key === 'f') {
        this.props.player.seekTo(this.props.playbackProgress + 120, 'seconds')
      } else if (key === 'b') {
        this.props.player.seekTo(this.props.playbackProgress - 60, 'seconds')
      } else if (key === 's') {
        this.props.player.seekTo(0, 'seconds')
      } else {
        console.log('UI_PLAYBACK_MODE: Skipping key', key)
      }
    } else if (this.props.uiMode === modes.UI_LIST_PREVIEW_MODE) {
      let { playlistIndex, videoIndex } = this.props.selectedVideo
      const elementInput = document.getElementById('user-identifier-input')
      if (document.activeElement === elementInput) {
        shouldInputHaveFocus = true
        if (key === 'Enter') {
          console.log('fetch the list')
        } else if (key === 'ArrowDown') {
          shouldInputHaveFocus = false
          videoIndex = 0
          elementInput.blur()
        }
      } else if (key === 'ArrowRight' && videoIndex < this.props.videoList[playlistIndex].items.length - 1) {
        videoIndex += 1
      } else if (key === 'ArrowLeft' && videoIndex > 0) {
        videoIndex -= 1
      } else if (key === 'ArrowUp') {
        if (playlistIndex > 0) {
          isVerticalNavigation = true
          videoIndex = 0
          playlistIndex -= 1
        } else {
          videoIndex = null
          shouldInputHaveFocus = true
        }
      } else if (key === 'ArrowDown' && playlistIndex < this.props.videoList.length - 1) {
        isVerticalNavigation = true
        videoIndex = 0
        playlistIndex += 1
      } else if (key === 'Enter') {
        this.props.onUpdateUIMode(modes.UI_PLAYBACK_MODE)
      } else {
        console.log('UI_LIST_PREVIEW_MODE: Skipping key', key)
      }

      setTimeout((shouldInputHaveFocus, isVerticalNavigation) => {
        const elementInput = document.getElementById('user-identifier-input')
        if (shouldInputHaveFocus) {
          elementInput.focus()
          elementInput.scrollIntoView()
        } else {
          const selectedRow = document.getElementById('selected-row')
          if (!selectedRow) {
            return
          }

          const selectedCell = document.getElementById('selected-cell')
          const { top, width, height } = selectedCell.getBoundingClientRect()

          var styles = window.getComputedStyle(selectedCell)
          var widthMargin = parseFloat(styles['marginLeft']) + parseFloat(styles['marginRight'])

          const maxHeight = window.innerHeight

          if (isVerticalNavigation) {
            if (top > maxHeight - height) {
              window.scrollBy({ top: top - maxHeight + height + 10, left: 0, behavior: 'smooth' })
            } else if (top < 0) {
              window.scrollBy({ top: top - height / 2, left: 0, behavior: 'smooth' })
            }
          }

          selectedRow.scrollTo({ top, left: videoIndex * (width + widthMargin) - window.innerWidth / 2 + width/2, behavior: 'smooth' })
        }
      }, 0, shouldInputHaveFocus, isVerticalNavigation)

      this.props.onUpdateSelectedVideo({ playlistIndex, videoIndex })
    }
  }

  resumePlaying = () => {
    console.log('user can play again now')
    this.props.onUpdateStartRestTime(null)
    this.props.onUpdateStartPlayTime(null)
    this.props.onUpdateIsUserInteractionAllowed(true)
  }

  takeBreak = () => {
    console.log('user must take a break now')
    const currentTime = Date.now()
    this.props.onUpdateStartRestTime(currentTime)
    this.props.onUpdateStartPlayTime(null)

    if (this.props.player) {
      this.props.player.pauseVideo()
      console.log('video paused')
    }
    this.props.onUpdateUserMode(modes.USER_RESTING_MODE)
    this.props.onUpdateIsUserInteractionAllowed(false)

    const restTime = this.props.minRestTime
    setTimeout(this.resumePlaying, restTime);
  }

  showPlayingLogs = () => {
    if (this.props.userMode === modes.USER_PLAYING_MODE) {
      this.props.onUpdateDisplayMessage(`${msToMinutes(Date.now() - this.props.startPlayTime)}`)
      // console.log('user has been playing for', (Date.now() - this.props.startPlayTime)/1000, 'seconds')
    } else if (this.props.userMode === modes.USER_RESTING_MODE) {
      // console.log('user has been resting for', (Date.now() - this.props.startRestTime)/1000, 'seconds')
    } else {
      console.log('not sure if the user is playing or resting')
    }
    // console.log('this.props.isPlaybackInProgress', this.props.isPlaybackInProgress)

    if (this.props.startRestTime) {
      const restedTime = (Date.now() - this.props.startRestTime)
      const remainingTime = this.props.minRestTime - restedTime

      if (remainingTime >= 0) {
        const timeRemaining = msToSeconds(remainingTime)
        this.props.onUpdateFullScreenText(timeRemaining)
      } else {
        this.resumePlaying()
      }
    }

    if (this.props.uiMode === modes.UI_LIST_PREVIEW_MODE && this.props.forceReposition) {
      const element = document.getElementById('selected-cell')
      if (element) {
        // console.log('Force the element to be displayed.')
        element.scrollIntoView({ behavior: "auto", block: "center", inline: "center" });
      }
    }
  }

  handleClick = () => {
    if (!this.props.isUserInteractionAllowed) {
      console.log('resting mode, skipping click')
      return
    }
    this.userActionOccured()

    if (!this.props.player) {
      return
    }

    if (this.props.isPlaybackInProgress) {
      this.props.player.pauseVideo()
    } else {
      this.props.player.playVideo()
    }
  }

  handleMouseMove = (e) => {
    e.target.style.cursor = 'default'
  }

  handleResize = () => {
    // if (window.innerWidth < 700 && this.props.videoSortingMode === modes.SORT_BY_PLAYLIST_MODE) {
    //   this.props.onUpdateVideoSortingMode(modes.SORT_BY_TIMESTAMP_MODE)
    //   return
    // }
    // if (window.innerWidth >= 700 && this.props.videoSortingMode === modes.SORT_BY_TIMESTAMP_MODE) {
    //   this.props.onUpdateVideoSortingMode(modes.SORT_BY_PLAYLIST_MODE)
    // }
  }

  componentDidMount = async() => {
    window.addEventListener('keydown', this.keyPressed)
    window.addEventListener('click', this.handleClick)
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('resize', this.handleResize)

    const urlParams = this.props.location.search
    const params = queryString.parse(urlParams)
    if (params.uid) {
      this.props.onUpdateUserIdentifier(params.uid)
    }

    if (params.reposition) {
      this.props.onUpdateForceReposition(true)
    }

    const userIdentifier = params.uid || this.props.userIdentifier
    if (!userIdentifier) {
      return
    }

    const response = await axios.get(`/users/${userIdentifier}`)
    if (response.data === '') {
      console.log('This user does not exist:', userIdentifier)
      return
    }

    const playlists = response.data.playlists
    const videoList = await Promise.all(playlists.map(async({ id, isEnabled, shouldAutoPlay }) => {
      if (!isEnabled) {
        return null
      }

      let response
      try {
        response = await axios.get(`/playlists/${id}`)
      } catch (e) {
        console.log('error', e)
        return { id, error: e.response ? e.response.status : 'unknown' }
      }
      const items = response.data.items
      return {
        id,
        items,
        shouldAutoPlay
      }
    }))

    const validVideoList = videoList.filter(e => e !== null && e.items)
    const videosByPlaylist = validVideoList.map(playlist => ({...playlist, items: playlist.items.filter(video => !!video.snippet.thumbnails) }))
    this.props.onUpdateVideosByPlaylist(videosByPlaylist)

    const videos = videosByPlaylist.map(list => list.items).flat()
    const sortedVideos = videos.sort((v1, v2) => {
      if (v1.snippet.publishedAt > v2.snippet.publishedAt) {
        return -1
      }
      if (v1.snippet.publishedAt < v2.snippet.publishedAt) {
        return 1
      }
      return 0
    })
    const topVideos = sortedVideos.splice(0, 100)
    const videosByTimestamp = [{id : 'everything', items: topVideos, shouldAutoPlay: false}]
    this.props.onUpdateVideosByTimestamp(videosByTimestamp)

    if (window.innerWidth < 700) {
      this.props.onUpdateVideoSortingMode(modes.SORT_BY_TIMESTAMP_MODE)
    } else {
      this.props.onUpdateVideoSortingMode(modes.SORT_BY_PLAYLIST_MODE)
    }

    const maxPlayTime = response.data.maxPlayTime
    this.props.onUpdateMaxPlayTime(maxPlayTime * 60000) // convert minutes to milliseconds

    const minRestTime = response.data.minRestTime
    this.props.onUpdateMinRestTime(minRestTime * 60000) // convert minutes to milliseconds
  }

  render() {
    return (
      <div className={styles.Main}>
        <BackBar />
        <AdMask />
        <FullScreen />
        <DisplayMessage />
        {this.props.uiMode === modes.UI_LIST_PREVIEW_MODE ? <ListPreview /> : <Playback />}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
