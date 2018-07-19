import * as actions from './actions'
import shortid from 'shortid'

const initialState = {
  playlists: ['PL19XM-3U_aPtTMoaS8plg8i9gZhXtTAND', 'PLm7nLIjg0OcqThaoJeDBYt72HixUFrGu3'],
  userIdentifier: shortid.generate(),
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.ACTION_UPDATE_PLAYLIST: {
      const playlists = action.payload
      console.log('>>>>> update playlist')
      return {
        ...state,
        playlists
      }
    }
    case actions.ACTION_UPDATE_USER_IDENTIFIER: {
      console.log('>>>>> update userIdentifier')
      const userIdentifier = action.payload
      return {
        ...state,
        userIdentifier
      }
    }
    default: {
      console.log('Action type', action.type)
      return state
    }
  }
}

export default reducer
