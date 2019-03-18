import { updatePlayLists, updateUserIdentifier, updateMaxPlayTime, updateMinRestTime } from './actions'

const mapDispatchToProps = (dispatch) => ({
  onUpdatePlayLists: (playlists) => dispatch(updatePlayLists(playlists)),
  onUpdateUserIdentifier: (userIdentifier) => dispatch(updateUserIdentifier(userIdentifier)),
  onUpdateMaxPlayTime: (time) => dispatch(updateMaxPlayTime(time)),
  onUpdateMinRestTime: (time) => dispatch(updateMinRestTime(time))
})

export default mapDispatchToProps
