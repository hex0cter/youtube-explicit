import {
  updateDisplayMessage
} from '../Main/actions'

const mapDispatchToProps = (dispatch) => ({
  onUpdateDisplayMessage: (message) => dispatch(updateDisplayMessage(message))
})

export default mapDispatchToProps
