import { updateVideoList, updateMaxPlayTime, updateMinRestTime, updateSelectedVideo, updateUIMode } from '../Main/actions'

const mapDispatchToProps = (dispatch) => ({
  onUpdateVideoList: (videoList) => dispatch(updateVideoList(videoList)),
  onUpdateMaxPlayTime: (time) => dispatch(updateMaxPlayTime(time)),
  onUpdateMinRestTime: (time) => dispatch(updateMinRestTime(time)),
  onUpdateSelectedVideo: (videoIndex) => dispatch(updateSelectedVideo(videoIndex)),
  onUpdateUIMode: (mode) => dispatch(updateUIMode(mode))
})

export default mapDispatchToProps
