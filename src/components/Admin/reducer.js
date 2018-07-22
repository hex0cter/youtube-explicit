import * as actions from './actions'
import shortid from 'shortid'

const userIdentifier = localStorage.getItem('userIdentifier') || shortid.generate()

const initialState = {
  playlists: [],
  userIdentifier,
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.ACTION_UPDATE_PLAYLIST: {
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
