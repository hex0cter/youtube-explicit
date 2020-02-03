import {
  updateSelectedVideo,
  updateIsPlaybackInProgress,
  updatePlaybackProgress,
  updatePlayer,
  updateStartPlayTime,
  updateUIMode,
  updateDisplayMessage
} from '../Main/actions'

const mapDispatchToProps = (dispatch) => ({
  onUpdateSelectedVideo: (videoIndex) => dispatch(updateSelectedVideo(videoIndex)),
  onUpdatePlaybackProgress: (progress) => dispatch(updatePlaybackProgress(progress)),
  onUpdatePlayer: (player) => dispatch(updatePlayer(player)),
  onUpdateIsPlaybackInProgress: (isPlaybackInProgress) => dispatch(updateIsPlaybackInProgress(isPlaybackInProgress)),
  onUpdateStartPlayTime: (time) => dispatch(updateStartPlayTime(time)),
  onUpdateUIMode: (mode) => dispatch(updateUIMode(mode)),
  onUpdateDisplayMessage: (message) => dispatch(updateDisplayMessage(message))
})

export default mapDispatchToProps
