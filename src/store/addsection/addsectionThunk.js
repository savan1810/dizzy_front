import { createAsyncThunk } from "@reduxjs/toolkit";
import { setErrorAlert, setLoader } from "../alert/alertSlice";
import { getDataAPI, postDataAPI } from "../../utils/fetchData";
import { setVideoMessage } from "../user/userSlice";


export const getAllSectionsThunk = createAsyncThunk(
    "/user/get-all-sections",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await getDataAPI('user/get-all-sections', tempData.token);
            thunkAPI.dispatch(setVideoMessage(response?.data?.data?.response?.videoMessage));
            thunkAPI.dispatch(setLoader(false));
            return response?.data?.data?.response;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
);


export const searchMusicForReleaseThunk = createAsyncThunk(
    "/user/search-music-for-release",
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

export const addMusicToSectionThunk = createAsyncThunk(
    "/user/add-music-to-section",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('user/add-music-to-section', { payload: tempData.payload }, tempData.token);
            thunkAPI.dispatch(setLoader(false));
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)

export const getMusicThunk = createAsyncThunk(
    "/user/get-music",
    async (tempData, thunkAPI) => {
        try {
            // thunkAPI.dispatch(setLoader(true));
            const response = await getDataAPI('user/get-music', tempData.token);
            // thunkAPI.dispatch(setLoader(false));
            return response?.data?.data?.response;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
)

export const deleteMusicThunk = createAsyncThunk(
    "/user/delete-music",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('user/delete-music', { avatar: tempData.avatar }, tempData.token);
            thunkAPI.dispatch(getMusicThunk({ token: tempData.token }));
            thunkAPI.dispatch(setLoader(false));
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)



export const addVideoToSectionThunk = createAsyncThunk(
    "/user/add-video-to-section",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('user/add-video-to-section', { payload: tempData.payload }, tempData.token);
            thunkAPI.dispatch(setLoader(false));
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)

export const getVideoThunk = createAsyncThunk(
    "/user/get-video",
    async (tempData, thunkAPI) => {
        try {
            const response = await getDataAPI('user/get-video', tempData.token);
            return response?.data?.data?.response;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
)


export const deleteVideoThunk = createAsyncThunk(
    "/user/delete-video",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('user/delete-video', { avatar: tempData.avatar }, tempData.token);
            thunkAPI.dispatch(getVideoThunk({ token: tempData.token }));
            thunkAPI.dispatch(setLoader(false));
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)


// event
export const addEventToSectionThunk = createAsyncThunk(
    "/user/add-event-to-section",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('user/add-event-to-section', { payload: tempData.payload, previousUrl: tempData.previousUrl }, tempData.token);
            thunkAPI.dispatch(setLoader(false));
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)

export const getEventThunk = createAsyncThunk(
    "/user/get-event",
    async (tempData, thunkAPI) => {
        try {
            const response = await getDataAPI('user/get-event', tempData.token);
            return response?.data?.data?.response;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
)

export const deleteEventThunk = createAsyncThunk(
    "/user/delete-event",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('user/delete-event', { link: tempData.link }, tempData.token);
            thunkAPI.dispatch(getEventThunk({ token: tempData.token }));
            thunkAPI.dispatch(setLoader(false));
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)


// product
export const addProductToSectionThunk = createAsyncThunk(
    "/user/add-product-to-section",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('user/add-product-to-section', { payload: tempData.payload, previousUrl: tempData.previousUrl }, tempData.token);
            thunkAPI.dispatch(setLoader(false));
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)

export const getProductThunk = createAsyncThunk(
    "/user/get-product",
    async (tempData, thunkAPI) => {
        try {
            const response = await getDataAPI('user/get-product', tempData.token);
            return response?.data?.data?.response;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
)

export const deleteProductThunk = createAsyncThunk(
    "/user/delete-product",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('user/delete-product', { link: tempData.link }, tempData.token);
            thunkAPI.dispatch(getProductThunk({ token: tempData.token }));
            thunkAPI.dispatch(setLoader(false));
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)
export const deleteBulkProductThunk = createAsyncThunk(
    "/user/delete-product",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('user/delete-bulk-product', { link: tempData.link, title: tempData.title }, tempData.token);
            thunkAPI.dispatch(getProductThunk({ token: tempData.token }));
            thunkAPI.dispatch(setLoader(false));
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)

// playlist
export const addPlaylistToSectionThunk = createAsyncThunk(
    "/user/add-playlist-to-section",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('user/add-playlist-to-section', { payload: tempData.payload, previousUrl: tempData.previousUrl }, tempData.token);
            thunkAPI.dispatch(setLoader(false));
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)

export const getPlaylistThunk = createAsyncThunk(
    "/user/get-playlist",
    async (tempData, thunkAPI) => {
        try {
            const response = await getDataAPI('user/get-playlist', tempData.token);
            return response?.data?.data?.response;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
)

export const deletePlaylistThunk = createAsyncThunk(
    "/user/delete-playlist",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('user/delete-playlist', { avatar: tempData.avatar }, tempData.token);
            thunkAPI.dispatch(getPlaylistThunk({ token: tempData.token }));
            thunkAPI.dispatch(setLoader(false));
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)

// form
export const addFormToSectionThunk = createAsyncThunk(
    "/user/add-form-to-section",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('user/add-form-to-section', { payload: tempData.payload }, tempData.token);
            thunkAPI.dispatch(setLoader(false));
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)

export const getFormThunk = createAsyncThunk(
    "/user/get-form",
    async (tempData, thunkAPI) => {
        try {
            const response = await getDataAPI(`user/get-form`, tempData.token);
            return response?.data?.data?.response;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
)

export const deleteFormThunk = createAsyncThunk(
    "/user/delete-form",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('user/delete-form', { title: tempData.title, type: tempData.type }, tempData.token);
            thunkAPI.dispatch(getFormThunk({ token: tempData.token }));
            thunkAPI.dispatch(setLoader(false));
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)
// socialfeed
export const addSocialFeedToSectionThunk = createAsyncThunk(
    "/user/add-socialfeed-to-section",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('user/add-socialfeed-to-section', { payload: tempData.payload, previousUrl: tempData.previousUrl }, tempData.token);
            thunkAPI.dispatch(setLoader(false));
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)

export const getSocialFeedThunk = createAsyncThunk(
    "/user/get-socialfeed",
    async (tempData, thunkAPI) => {
        try {
            const response = await getDataAPI(`user/get-socialfeed`, tempData.token);
            return response?.data?.data?.response;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
)

export const deleteSocialFeedThunk = createAsyncThunk(
    "/user/delete-socialfeed",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('user/delete-socialfeed', { link: tempData.link }, tempData.token);
            thunkAPI.dispatch(getSocialFeedThunk({ token: tempData.token }));
            thunkAPI.dispatch(setLoader(false));
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)


// custom link
export const addCustomLinkToSectionThunk = createAsyncThunk(
    "/user/add-customlink-to-section",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('user/add-customlink-to-section', { payload: tempData.payload, previousUrl: tempData.previousUrl }, tempData.token);
            thunkAPI.dispatch(setLoader(false));
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)

export const getCustomLinkThunk = createAsyncThunk(
    "/user/get-customlink",
    async (tempData, thunkAPI) => {
        try {
            const response = await getDataAPI('user/get-customlink', tempData.token);
            return response?.data?.data?.response;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
)

export const deleteCustomLinkThunk = createAsyncThunk(
    "/user/delete-customlink",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('user/delete-customlink', { link: tempData.link }, tempData.token);
            thunkAPI.dispatch(getCustomLinkThunk({ token: tempData.token }));
            thunkAPI.dispatch(setLoader(false));
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)

// custom link section
export const addCustomLinkSectionToSectionThunk = createAsyncThunk(
    "/user/add-customlinksection-to-section",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('user/add-customlinksection-to-section', { payload: tempData.payload, previousUrl: tempData.previousUrl }, tempData.token);
            thunkAPI.dispatch(setLoader(false));
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)

export const getCustomLinkSectionThunk = createAsyncThunk(
    "/user/get-customlinksection",
    async (tempData, thunkAPI) => {
        try {
            const response = await getDataAPI('user/get-customlinksection', tempData.token);
            return response?.data?.data?.response;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
)

export const deleteCustomLinkSectionThunk = createAsyncThunk(
    "/user/delete-customlinksection",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('user/delete-customlinksection', { title: tempData.title }, tempData.token);
            thunkAPI.dispatch(getCustomLinkSectionThunk({ token: tempData.token }));
            thunkAPI.dispatch(setLoader(false));
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response || 'An error occurred');
        }
    }
)