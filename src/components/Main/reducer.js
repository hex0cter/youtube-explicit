import * as actions from './actions'

const userIdentifier = localStorage.getItem('userIdentifier') || null

const initialState = {
  playlists: [],
  videoList: [],
  selectedVideo: {},
  listPreviewVisibility: true,
  userIdentifier
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.ACTION_ADD_VIDEOS_TO_LIST: {
      const videoList = [...state.videoList]
      videoList.push(action.payload)
      return {
        ...state,
        videoList
      }
    }
    case actions.ACTION_UPDATE_VIDEO_LIST_VISIBILTY: {
      const listPreviewVisibility = action.payload
      return {
        ...state,
        listPreviewVisibility
      }
    }
    case actions.ACTION_UPDATE_SELECTED_VIDEO: {
      const selectedVideo = action.payload
      return {
        ...state,
        selectedVideo
      }
    }
    case actions.ACTION_UPDATE_USER_IDENTIFIER: {
      const userIdentifier = action.payload
      return {
        ...state,
        userIdentifier
      }
    }
    case actions.ACTION_UPDATE_PLAYLISTS: {
      const playlists = action.payload
      return {
        ...state,
        playlists
      }
    }
    default:
      return state
  }
}
export default reducer
