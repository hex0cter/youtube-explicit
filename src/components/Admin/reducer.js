import * as actions from './actions'

const userIdentifier = localStorage.getItem('userIdentifier') || '1Vpsm4Yy'

const initialState = {
  playlists: [],
  userIdentifier,
  maxPlayTime: 60,
  minRestTime: 15
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.ACTION_UPDATE_PLAYLISTS: {
      const playlists = action.payload
      return {
        ...state,
        playlists
      }
    }
    case actions.ACTION_UPDATE_USER_IDENTIFIER: {
      const userIdentifier = action.payload
      return {
        ...state,
        userIdentifier
      }
    }
    case actions.ACTION_UPDATE_MAX_PLAY_TIME: {
      const maxPlayTime = action.payload
      return {
        ...state,
        maxPlayTime
      }
    }
    case actions.ACTION_UPDATE_MIN_REST_TIME: {
      const minRestTime = action.payload
      return {
        ...state,
        minRestTime
      }
    }
    default: {
      return state
    }
  }
}

export default reducer
