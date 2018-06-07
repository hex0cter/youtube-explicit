import { updateListVisibilty } from '../../actions'

const mapDispatchToProps = (dispatch) => ({
  onUpdateListVisibilty: (visibility) => dispatch(updateListVisibilty(visibility))
})

export default mapDispatchToProps
