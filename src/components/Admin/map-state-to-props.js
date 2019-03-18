const mapStateToProps = ({ admin }) => ({
  userIdentifier: admin.userIdentifier,
  playlists: admin.playlists,
  maxPlayTime: admin.maxPlayTime,
  minRestTime: admin.minRestTime
})

export default mapStateToProps
