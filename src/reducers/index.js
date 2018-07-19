import { combineReducers } from 'redux'

import main from '../components/Main/reducer'
import admin from '../components/Admin/reducer'

export default combineReducers({
  admin,
  main
})
