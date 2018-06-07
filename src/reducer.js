import * as actions from './actions'

const initialState = {
  videoList: [],
  selectedVideo: null,
  listPreviewVisibility: true
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.ACTION_APPEND_VIDEO_TO_LIST: {
      const videoList = [...state.videoList]
      videoList.push(action.payload)
      console.log('>>>>> add to videoList', videoList)
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
    default:
      console.log('Action type', action.type)
      return state
  }
}
export default reducer
