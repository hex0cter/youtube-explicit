import { updateVideoList } from '../Main/actions'

const mapDispatchToProps = (dispatch) => ({
  onUpdateVideoList: (videoList) => dispatch(updateVideoList(videoList)),
})

export default mapDispatchToProps
