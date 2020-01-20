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
import { msToTime } from './utils'
import * as modes from './modes'
import queryString from 'query-string'

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

      setInterval(this.showPlayingLogs, 1000)
      setTimeout(this.takeBreak, maxPlayTime)
    } else {
      console.log('Debug: this.props.userMode', this.props.userMode)
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
      } else {
        console.log('UI_PLAYBACK_MODE: Skipping key', key)
      }
    } else if (this.props.uiMode === modes.UI_LIST_PREVIEW_MODE) {
      let { playlistIndex, videoIndex } = this.props.selectedVideo
      const elementInput = document.getElementById('user-identifier-input')
      if (document.activeElement  === elementInput) {
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
          const {left, top, width, height} = selectedCell.getBoundingClientRect()

          const maxWidth = window.innerWidth
          const maxHeight = window.innerHeight

          if (isVerticalNavigation) {
            if(top > maxHeight - height) {
              window.scrollBy({top: top - maxHeight + height + 10, left: 0, behavior: 'smooth'})
            } else if (top < 0) {
              window.scrollBy({top: top - height/2, left: 0, behavior: 'smooth'})
            }
          }

          if(left > maxWidth - width) {
            selectedRow.scrollBy({top: 0, left: width, behavior: 'smooth'})
          } else if (left < 0) {
            selectedRow.scrollBy({top: 0, left: left - width/2, behavior: 'smooth'})
          }
        }
      }, 100, shouldInputHaveFocus, isVerticalNavigation)

      this.props.onUpdateSelectedVideo({playlistIndex, videoIndex})
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
        const timeRemaining = msToTime(remainingTime)
        this.props.onUpdateFullScreenText(timeRemaining)
      } else {
        this.resumePlaying()
      }
    }

    if (this.props.uiMode === modes.UI_LIST_PREVIEW_MODE && this.props.forceReposition ) {
      const element = document.getElementById('selected-cell')
      if (element) {
        // console.log('Force the element to be displayed.')
        element.scrollIntoView({behavior: "auto", block: "center", inline: "center"});
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

  componentDidMount = async() => {
    window.addEventListener('keydown',  this.keyPressed);
    window.addEventListener('click',  this.handleClick);

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

    const response = await axios.get(`https://api.solna.xyz/v1/playlists?user=${userIdentifier}`)
    if (response.data === '') {
      console.log('This user does not exist:', userIdentifier)
      return
    }

    const playlists = response.data.playlists
    const currrentTimestamp = Date.now()
    const videoList = await Promise.all(playlists.map(async({id, isEnabled, shouldAutoPlay}) => {
      if (!isEnabled) {
        return null
      }

      const videolistInCache = this.props.videoList.find(video => video.id === id)
      if (videolistInCache && videolistInCache.timestamp && currrentTimestamp - videolistInCache.timestamp < 60 * 60000) { /* one hour */
        console.log('found videos in cache for playlist', id)
        return videolistInCache
      }

      let response
      try {
        response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&key=AIzaSyBVrfMofoyGgP8KcCyHF9PSKQsayy7qNpI&maxResults=50`)
      } catch(e) {
        console.log('error', e)
        return {id, error: e.response.status}
      }
      const items = response.data.items
      return {
        id,
        items,
        shouldAutoPlay,
        timestamp: Date.now()
      }
    }))

    let validVideoList = videoList.filter(e => e !== null && e.items)
    validVideoList = validVideoList.map(playlist => ({...playlist, items: playlist.items.filter(video => !!video.snippet.thumbnails)}))
    this.props.onUpdateVideoList(validVideoList)

    const maxPlayTime = response.data.maxPlayTime
    this.props.onUpdateMaxPlayTime( maxPlayTime * 60000) // convert minutes to milliseconds

    const minRestTime = response.data.minRestTime
    this.props.onUpdateMinRestTime(minRestTime * 60000) // convert minutes to milliseconds
  }

  render() {
    return (
      <div className={styles.Main}>
        <BackBar />
        <AdMask />
        <FullScreen />
        {this.props.uiMode === modes.UI_LIST_PREVIEW_MODE ? <ListPreview /> : <Playback />}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
