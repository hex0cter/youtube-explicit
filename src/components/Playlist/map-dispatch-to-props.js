import { addVideosToList } from '../Main/actions'

const mapDispatchToProps = (dispatch) => ({
  onAddVideosToList: (videoList) => dispatch(addVideosToList(videoList)),
})

export default mapDispatchToProps
