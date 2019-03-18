import { updateStartPlayTime, updateStartRestTime, updateIsUserInteractionAllowed } from '../Main/actions'

const mapDispatchToProps = (dispatch) => ({
  onUpdateStartPlayTime: (time) => dispatch(updateStartPlayTime(time)),
  onUpdateStartRestTime: (time) => dispatch(updateStartRestTime(time)),
  onUpdateIsUserInteractionAllowed: (isUserInteractionAllowed) => dispatch(updateIsUserInteractionAllowed(isUserInteractionAllowed))
})

export default mapDispatchToProps
