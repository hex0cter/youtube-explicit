import { updateSelectedVideo, updateIsPlaybackInProgress, updatePlaybackProgress, updatePlayer } from '../Main/actions'

const mapDispatchToProps = (dispatch) => ({
  onUpdateSelectedVideo: (videoIndex) => dispatch(updateSelectedVideo(videoIndex)),
  onUpdatePlaybackProgress: (progress) => dispatch(updatePlaybackProgress(progress)),
  onUpdatePlayer: (player) => dispatch(updatePlayer(player)),
  onUpdateIsPlaybackInProgress: (isPlaybackInProgress) => dispatch(updateIsPlaybackInProgress(isPlaybackInProgress))
})

export default mapDispatchToProps
