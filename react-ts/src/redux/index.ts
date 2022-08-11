import { legacy_createStore as createStore, combineReducers, Store, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { applyMiddleware } from "redux";
import storage from "redux-persist/lib/storage";
import reduxThunk from "redux-thunk";
import reduxPromise from "redux-promise";
import global from "./modules/global/reducer";
import menu from "./modules/menu/reducer";
import auth from "./modules/auth/reducer";
import breadcrumb from "./modules/breadcrumb/reducer";

const reducer = combineReducers({
	global,
	menu,
	auth,
	breadcrumb
});

// redux persistConfig
const persistConfig = {
	key: "redux-state",
	storage: storage
};
const persistReducerConfig = persistReducer(persistConfig, reducer);

// open redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// use redux middleware
const middleWares = applyMiddleware(reduxThunk, reduxPromise);

// create store
const store: Store = createStore(persistReducerConfig, composeEnhancers(middleWares));

// create persist store
const persistor = persistStore(store);

export { store, persistor };
