import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";
import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";
import alertReducer from "./alert/alertSlice";
import addsectionReducer from "./addsection/addsectionSlice";
import eventReducer from "./eventData/eventdataSlice";
import customlinkReducer from "./customlinkData/customlinkDataSlice";
import focuspageReducer from "./focuspage/focuspageSlice";
import focuseventdataReducer from "./focuseventdata/focuseventdataSlice";
import settingReducer from "./setting/settingSlice";
import domainReducer from "./domain/domainSlice";

const persistConfig = {
  key: "root",
  storage,
  timeout: 200,
};
const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  alert: alertReducer,
  addsection: addsectionReducer,
  eventdata: eventReducer,
  customlinkdata: customlinkReducer,
  focuspage: focuspageReducer,
  focuseventdata: focuseventdataReducer,
  setting: settingReducer,
  domain: domainReducer
});
const persistedReducer = persistReducer(persistConfig, appReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
});

const { dispatch } = store;
const persister = persistStore(store);
const useDispatch = () => useAppDispatch();
const useSelector = useAppSelector;

export { store, persister, dispatch, useSelector, useDispatch };

