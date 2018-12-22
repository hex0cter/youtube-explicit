import * as actions from './actions'

const userIdentifier = localStorage.getItem('userIdentifier') || null

const initialState = {
  playlists: [],
  userIdentifier,
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
    default: {
      return state
    }
  }
}

export default reducer
