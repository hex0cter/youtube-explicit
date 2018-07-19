const mapStateToProps = ({ admin }) => ({
  userIdentifier: admin.userIdentifier,
  playlists: admin.playlists
})

export default mapStateToProps
