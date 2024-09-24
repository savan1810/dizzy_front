import { createAsyncThunk } from "@reduxjs/toolkit";
import { setErrorAlert, setLoader } from "../alert/alertSlice";
import { getDataAPI, postDataAPI, putDataAPI } from "../../utils/fetchData";


export const update_focus_data_thunk = createAsyncThunk(
    "/focus/update-focus-data",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await putDataAPI('focus/update-focus-data', tempData.body, tempData.token);
            thunkAPI.dispatch(setLoader(false));
            return response.data.data.response;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
);

export const searchMusicForReleaseFocusThunk = createAsyncThunk(
    "/focuspage/search-music-for-release",
    async (tempData, thunkAPI) => {
        try {
            const response = await postDataAPI('user/search-music-for-release', { search: tempData.search }, tempData.token);
            return response?.data?.data?.response;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
);

export const getDataForFocusThunk = createAsyncThunk(
    "/focus/get-data-for-focus",
    async (tempData, thunkAPI) => {
        try {
            // thunkAPI.dispatch(setLoader(true));
            const response = await getDataAPI('focus/get-data-for-focus', tempData.token);
            // thunkAPI.dispatch(setLoader(false));
            return response?.data?.data?.response;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
)

// music
export const addMusicForFocusThunk = createAsyncThunk(
    "/focus/add-music-for-focus",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('focus/add-music-for-focus', { payload: tempData.payload }, tempData.token);
            thunkAPI.dispatch(setLoader(false));
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)

export const checkExtensionAvailableForMusicThunk = createAsyncThunk(
    "/focus/check-extension-available-for-music",
    async (tempData, thunkAPI) => {
        try {
            const response = await postDataAPI('focus/check-extension-available-for-music', { extension: tempData.extension }, tempData.token);
            return response.data;
        } catch (error) {
            // thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)

export const checkPageAvailableForMusicThunk = createAsyncThunk(
    "/focus/check-page-available-for-music",
    async (tempData, thunkAPI) => {
        try {
            const response = await postDataAPI('focus/check-page-available-for-music', { page: tempData.page }, tempData.token);
            return response.data;
        } catch (error) {
            // thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)

// product
export const addProductForFocusThunk = createAsyncThunk(
    "/focus/add-product-for-focus",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('focus/add-product-for-focus', { payload: tempData.payload }, tempData.token);
            thunkAPI.dispatch(setLoader(false));
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)

export const checkExtensionAvailableForProductThunk = createAsyncThunk(
    "/focus/check-extension-available-for-product",
    async (tempData, thunkAPI) => {
        try {
            const response = await postDataAPI('focus/check-extension-available-for-product', { extension: tempData.extension }, tempData.token);
            return response.data;
        } catch (error) {
            // thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)

export const checkPageAvailableForProductThunk = createAsyncThunk(
    "/focus/check-page-available-for-product",
    async (tempData, thunkAPI) => {
        try {
            const response = await postDataAPI('focus/check-page-available-for-product', { page: tempData.page }, tempData.token);
            return response.data;
        } catch (error) {
            // thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)
// event
export const addEventForFocusThunk = createAsyncThunk(
    "/focus/add-event-for-focus",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('focus/add-event-for-focus', { payload: tempData.payload }, tempData.token);
            thunkAPI.dispatch(setLoader(false));
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)

export const checkExtensionAvailableForEventThunk = createAsyncThunk(
    "/focus/check-extension-available-for-event",
    async (tempData, thunkAPI) => {
        try {
            const response = await postDataAPI('focus/check-extension-available-for-event', { extension: tempData.extension }, tempData.token);
            return response.data;
        } catch (error) {
            // thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)

export const checkPageAvailableForEventThunk = createAsyncThunk(
    "/focus/check-page-available-for-event",
    async (tempData, thunkAPI) => {
        try {
            const response = await postDataAPI('focus/check-page-available-for-event', { page: tempData.page }, tempData.token);
            return response.data;
        } catch (error) {
            // thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)
// newsletter   
export const addNewsletterForFocusThunk = createAsyncThunk(
    "/focus/add-newsletter-for-focus",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('focus/add-newsletter-for-focus', { payload: tempData.payload }, tempData.token);
            thunkAPI.dispatch(setLoader(false));
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)

export const checkExtensionAvailableForNewsletterThunk = createAsyncThunk(
    "/focus/check-extension-available-for-newsletter",
    async (tempData, thunkAPI) => {
        try {
            const response = await postDataAPI('focus/check-extension-available-for-newsletter', { extension: tempData.extension }, tempData.token);
            return response.data;
        } catch (error) {
            // thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)

export const checkPageAvailableForNewsletterThunk = createAsyncThunk(
    "/focus/check-page-available-for-newsletter",
    async (tempData, thunkAPI) => {
        try {
            const response = await postDataAPI('focus/check-page-available-for-newsletter', { page: tempData.page }, tempData.token);
            return response.data;
        } catch (error) {
            // thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)