import { updateStartPlayTime, updateStartRestTime, updateIsUserInteractionAllowed, updateFullScreenText } from '../Main/actions'

const mapDispatchToProps = (dispatch) => ({
  onUpdateStartPlayTime: (time) => dispatch(updateStartPlayTime(time)),
  onUpdateStartRestTime: (time) => dispatch(updateStartRestTime(time)),
  onUpdateIsUserInteractionAllowed: (isUserInteractionAllowed) => dispatch(updateIsUserInteractionAllowed(isUserInteractionAllowed)),
  onUpdateFullScreenText: (text) => dispatch(updateFullScreenText(text))
})

export default mapDispatchToProps
