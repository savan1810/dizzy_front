import { createAsyncThunk } from "@reduxjs/toolkit";
import { setErrorAlert, setLoader } from "../alert/alertSlice";
import { getDataAPI, postDataAPI, putDataAPI } from "../../utils/fetchData";


export const get_domain_articles_thunk = createAsyncThunk(
    "/auth/get-domain-article",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('auth/get-domain-article', { domain: tempData.domain }, null);
            thunkAPI.dispatch(setLoader(false));
            return response.data.data.response;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
);


export const getDomainAllSectionsThunk = createAsyncThunk(
    "/auth/get-domain-add-section",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('auth/get-domain-add-section', { domain: tempData.domain }, null);
            thunkAPI.dispatch(setLoader(false));
            return response.data.data.response;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
);


export const getDomainDataForFocusThunk = createAsyncThunk(
    "/auth/get-domain-data-for-focus",
    async (tempData, thunkAPI) => {
        try {
            // thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('auth/get-domain-data-for-focus', { domain: tempData.domain }, null);
            // thunkAPI.dispatch(setLoader(false));
            return response?.data?.data?.response;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
)



export const get_follower_list = createAsyncThunk(
    "/user/get-user-follower-list",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('user/get-user-follower-list', { domain: tempData.domain }, tempData.token);
            thunkAPI.dispatch(setLoader(false));
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
)

export const get_following_list = createAsyncThunk(
    "/user/get_user_following_list",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('user/get-user-following-list', { domain: tempData.domain }, tempData.token);
            thunkAPI.dispatch(setLoader(false));
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
)