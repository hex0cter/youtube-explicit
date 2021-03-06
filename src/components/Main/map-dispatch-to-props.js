import {
  updateMaxPlayTime,
  updateMinRestTime,
  updateSelectedVideo,
  updateUIMode,
  updateUserMode,
  updateStartPlayTime,
  updateStartRestTime,
  updateIsUserInteractionAllowed,
  updateFullScreenText,
  updateUserIdentifier,
  updateForceReposition,
  updateVideosByPlaylist,
  updateVideosByTimestamp,
  updateVideoSortingMode,
  updateDisplayMessage
} from '../Main/actions'

const mapDispatchToProps = (dispatch) => ({
  onUpdateMaxPlayTime: (time) => dispatch(updateMaxPlayTime(time)),
  onUpdateMinRestTime: (time) => dispatch(updateMinRestTime(time)),
  onUpdateSelectedVideo: (videoIndex) => dispatch(updateSelectedVideo(videoIndex)),
  onUpdateUIMode: (mode) => dispatch(updateUIMode(mode)),
  onUpdateUserMode: (mode) => dispatch(updateUserMode(mode)),
  onUpdateIsUserInteractionAllowed: (isUserInteractionAllowed) => dispatch(updateIsUserInteractionAllowed(isUserInteractionAllowed)),
  onUpdateStartPlayTime: (time) => dispatch(updateStartPlayTime(time)),
  onUpdateStartRestTime: (time) => dispatch(updateStartRestTime(time)),
  onUpdateFullScreenText: (text) => dispatch(updateFullScreenText(text)),
  onUpdateUserIdentifier: (userIdentifier) => dispatch(updateUserIdentifier(userIdentifier)),
  onUpdateForceReposition: (shouldReposition) => dispatch(updateForceReposition(shouldReposition)),
  onUpdateVideosByPlaylist: (videoList) => dispatch(updateVideosByPlaylist(videoList)),
  onUpdateVideosByTimestamp: (videoList) => dispatch(updateVideosByTimestamp(videoList)),
  onUpdateVideoSortingMode: (mode) => dispatch(updateVideoSortingMode(mode)),
  onUpdateDisplayMessage: (message) => dispatch(updateDisplayMessage(message))
})

export default mapDispatchToProps
