import { updatePlaylists } from '../Main/actions'

const mapDispatchToProps = (dispatch) => ({
  onUpdatePlaylists: (playlists) => dispatch(updatePlaylists(playlists)),
})

export default mapDispatchToProps
