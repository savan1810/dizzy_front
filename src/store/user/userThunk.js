import { createAsyncThunk } from "@reduxjs/toolkit";
import { setErrorAlert, setLoader } from "../alert/alertSlice";
import { getDataAPI, postDataAPI, putDataAPI } from "../../utils/fetchData";
import { get_domain_articles_thunk } from "../domain/domainThunk";


export const get_user_articles_thunk = createAsyncThunk(
    "/user/get-user-article",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await getDataAPI('user/get-user-article', tempData.token);
            thunkAPI.dispatch(setLoader(false));
            return response.data.data.user;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
);

export const update_user_article_thunk = createAsyncThunk(
    "/user/update-user-article",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await putDataAPI('user/update-user-article', tempData.body, tempData.token);
            thunkAPI.dispatch(setLoader(false));
            return response.data.data.user;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
);

export const add_video_message_thunk = createAsyncThunk(
    "/user/add-video-message",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('user/add-video-message', { videoMessage: tempData.videoMessage, previosUrl: tempData.previosUrl }, tempData.token);
            thunkAPI.dispatch(setLoader(false));
            return response.data.data.videoMessage;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
)

export const delete_video_message_thunk = createAsyncThunk(
    "/user/delete-video-message",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            await postDataAPI('user/delete-video-message', { link: tempData.link }, tempData.token);
            thunkAPI.dispatch(setLoader(false));
            return tempData.link;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
)

export const update_save_type_thunk = createAsyncThunk(
    "/user/update-save-type",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            await postDataAPI('user/update-save-type', { link: tempData.link, saveType: tempData.saveType }, tempData.token);
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(get_video_message_thunk({ token: tempData.token }));
            return tempData;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
)

export const get_video_message_thunk = createAsyncThunk(
    "/user/get-video-message",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await getDataAPI('user/get-video-message', tempData.token);
            thunkAPI.dispatch(setLoader(false));
            return response.data.data.videoMessage;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
)


export const follow_unfollow_thunk = createAsyncThunk(
    "/user/follow-unfollow",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('user/follow-unfollow', { domain: tempData.domain }, tempData.token);
            // thunkAPI.dispatch(get_user_articles_thunk({ token: tempData.token }));
            thunkAPI.dispatch(get_domain_articles_thunk({ domain: tempData.domain }));
            thunkAPI.dispatch(setLoader(false));
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
)


