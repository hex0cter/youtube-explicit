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
import * as modes from './modes'

class Main extends React.Component {
  keyPressed = (e) => {
    const key = e.key
    console.log('keyPressed', key)
    let shouldInputHaveFocus = false
    if (this.props.uiMode === modes.PLAYBACK_MODE) {
      if (key === 'Escape') {
        this.props.onUpdateUIMode(modes.LIST_PREVIEW_MODE)
      } else if (key === 'Enter') {
        if (this.props.isPlaybackInProgress) {
          this.props.player.pauseVideo()
        } else {
          this.props.player.playVideo()
        }
      } else {
        console.log('PLAYBACK_MODE: Skipping key', key)
      }
    } else if (this.props.uiMode === modes.LIST_PREVIEW_MODE) {
      let { playlistIndex, videoIndex } = this.props.selectedVideo
      const elementInput = document.getElementById('user-identifier-input')
      if (document.activeElement  === elementInput) {
        shouldInputHaveFocus = true
        if (key === 'Enter') {
          console.log('fetch the list')
        } else if (key === 'ArrowDown') {
          shouldInputHaveFocus = false
          elementInput.blur()
        }
      } else if (key === 'ArrowRight' && videoIndex < this.props.videoList[playlistIndex].items.length - 1) {
        videoIndex += 1
      } else if (key === 'ArrowLeft' && videoIndex > 0) {
        videoIndex -= 1
      } else if (key === 'ArrowUp') {
        if (playlistIndex > 0) {
          videoIndex = 0
          playlistIndex -= 1
        } else {
          shouldInputHaveFocus = true
        }
      } else if (key === 'ArrowDown' && playlistIndex < this.props.videoList.length - 1) {
        videoIndex = 0
        playlistIndex += 1
      } else if (key === 'Enter') {
        this.props.onUpdateUIMode(modes.PLAYBACK_MODE)
      } else {
        console.log('LIST_PREVIEW_MODE: Skipping key', key)
      }

      setTimeout((shouldInputHaveFocus) => {
        const elementInput = document.getElementById('user-identifier-input')
        if (shouldInputHaveFocus) {
          console.log('setting focus to input box')
          elementInput.focus()
          elementInput.scrollIntoView()
        } else {
          const element = document.getElementById('selected-cell')
          element.scrollIntoView()
        }
      }, 100, shouldInputHaveFocus)

      this.props.onUpdateSelectedVideo({playlistIndex, videoIndex})
    }
  }

  componentDidMount = async() => {
    window.addEventListener('keydown',  this.keyPressed);

    const userIdentifier = this.props.userIdentifier
    if (!userIdentifier) {
      return
    }

    const response = await axios.get(`https://api.solna.xyz/v1/playlists?user=${userIdentifier}`)
    if (response.data === '') {
      console.log('This user does not exist:', userIdentifier)
      return
    }

    const playlists = response.data.playlists
    const videoList = await Promise.all(playlists.map(async({id, isEnabled, shouldAutoPlay}) => {
      if (!isEnabled) {
        return null
      }
      let response
      try {
        response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&key=AIzaSyBVrfMofoyGgP8KcCyHF9PSKQsayy7qNpI&maxResults=50`)
      } catch {
        return null
      }
      const items = response.data.items
      return {
        id,
        items,
        shouldAutoPlay
      }
    }))

    this.props.onUpdateVideoList(videoList.filter(e => e !== null))

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
        <Playback />
        <ListPreview />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
