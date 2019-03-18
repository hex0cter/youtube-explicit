import { updateSelectedVideo, updateIsPlaybackInProgress, updatePlaybackProgress, updatePlayer, updateStartPlayTime } from '../Main/actions'

const mapDispatchToProps = (dispatch) => ({
  onUpdateSelectedVideo: (videoIndex) => dispatch(updateSelectedVideo(videoIndex)),
  onUpdatePlaybackProgress: (progress) => dispatch(updatePlaybackProgress(progress)),
  onUpdatePlayer: (player) => dispatch(updatePlayer(player)),
  onUpdateIsPlaybackInProgress: (isPlaybackInProgress) => dispatch(updateIsPlaybackInProgress(isPlaybackInProgress)),
  onUpdateStartPlayTime: (time) => dispatch(updateStartPlayTime(time)),
})

export default mapDispatchToProps
