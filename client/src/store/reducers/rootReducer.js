import { persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'
import userReducer from './userReducer'
import postReducer from './postReducer'


const commonConfig = {
    storage,
    stateReconciler: autoMergeLevel2
}

const userReducerConfig = {
    ...commonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'token']
}

export default combineReducers({
    user: persistReducer(userReducerConfig, userReducer),
    post: postReducer
})