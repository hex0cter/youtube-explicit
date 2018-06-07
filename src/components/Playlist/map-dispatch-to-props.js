import { appendVideoToList } from '../../actions'

const mapDispatchToProps = (dispatch) => ({
  onAppendVideoToList: (videoList) => dispatch(appendVideoToList(videoList)),
})

export default mapDispatchToProps
