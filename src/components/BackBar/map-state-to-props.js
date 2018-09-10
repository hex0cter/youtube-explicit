const mapStateToProps = ({ main }) => {
  return {
    isPlaybackInProgress: main.isPlaybackInProgress
  }
}

export default mapStateToProps
