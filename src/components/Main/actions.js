export const ACTION_ADD_VIDEOS_TO_LIST = 'ACTION_ADD_VIDEOS_TO_LIST'
export const ACTION_UPDATE_VIDEO_LIST_VISIBILTY = 'ACTION_UPDATE_VIDEO_LIST_VISIBILTY'
export const ACTION_UPDATE_SELECTED_VIDEO = 'ACTION_UPDATE_SELECTED_VIDEO'

export const addVideosToList = (payload) => ({
  type: ACTION_ADD_VIDEOS_TO_LIST, payload
})

export const updateListVisibilty = (payload) => ({
  type: ACTION_UPDATE_VIDEO_LIST_VISIBILTY, payload
})

export const updateSelectedVideo = (payload) => ({
  type: ACTION_UPDATE_SELECTED_VIDEO, payload
})
