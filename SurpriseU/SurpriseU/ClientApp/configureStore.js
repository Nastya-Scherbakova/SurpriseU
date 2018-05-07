import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import reducer from './reducer'

export default function configureStore(initialState) {
    const store = createStore(
        reducer,
        initialState,
        applyMiddleware(
            promiseMiddleware,
            localStorageMiddleware,
            createLogger()
        )
    )
    return store
}