import { updateVideoList, updateMaxPlayTime, updateMinRestTime } from '../Main/actions'

const mapDispatchToProps = (dispatch) => ({
  onUpdateVideoList: (videoList) => dispatch(updateVideoList(videoList)),
  onUpdateMaxPlayTime: (time) => dispatch(updateMaxPlayTime(time)),
  onUpdateMinRestTime: (time) => dispatch(updateMinRestTime(time))
})

export default mapDispatchToProps
