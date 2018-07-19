import { updatePlayLists, updateUserIdentifier } from './actions'

const mapDispatchToProps = (dispatch) => ({
  onUpdatePlayLists: (playlists) => dispatch(updatePlayLists(playlists)),
  onUpdateUserIdentifier: (userIdentifier) => dispatch(updateUserIdentifier(userIdentifier))
})

export default mapDispatchToProps
