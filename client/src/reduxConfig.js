import rootReducer from "./store/reducers/rootReducer";
import { persistStore } from "redux-persist";
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'


export default () => {
    let store = createStore(rootReducer, applyMiddleware(thunk))
    let persistor = persistStore(store)
    return { store, persistor }
}