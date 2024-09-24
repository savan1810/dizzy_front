import { createAsyncThunk } from "@reduxjs/toolkit";
import { setErrorAlert, setLoader, setSuccessAlert } from "../alert/alertSlice";
import { getDataAPI, postDataAPI, putDataAPI } from "../../utils/fetchData";


export const delegate_access = createAsyncThunk(
    "/setting/create-delegate-access",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('setting/create-delegate-access', tempData.body, tempData.token);
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setSuccessAlert(response.data.message));
            thunkAPI.dispatch(get_delegate_access({ token: tempData.token }))
            return;
        } catch (error) {
            console.log('error', error)
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
);

export const get_delegate_access = createAsyncThunk(
    "/setting/get-delegate-access",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await getDataAPI('setting/get-delegate-access', tempData.token);
            thunkAPI.dispatch(setLoader(false));
            // thunkAPI.dispatch(setSuccessAlert(response.data.message));
            return response.data.data.response.delegateAccess;
        } catch (error) {
            console.log('error', error)
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
)

export const delete_delegate_access = createAsyncThunk(
    "/setting/delete-delegate-access",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('setting/delete-delegate-access', { email: tempData?.email }, tempData.token);
            thunkAPI.dispatch(setLoader(false));
            // thunkAPI.dispatch(setSuccessAlert(response.data.message));
            thunkAPI.dispatch(get_delegate_access({ token: tempData.token }))
            return;
        } catch (error) {
            console.log('error', error)
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
)
