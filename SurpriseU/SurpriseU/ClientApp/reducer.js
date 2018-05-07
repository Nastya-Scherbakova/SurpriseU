import { combineReducers } from 'redux'
import user from './features/user/reducers'
import present from './features/present/reducers'
import auth from './features/auth/reducers'
import tag from './features/tag/reducers'
import common from './features/reducers'


const reducer = combineReducers({
    auth,
    common,
    present,
    tag,
    user, 
})

export default reducer