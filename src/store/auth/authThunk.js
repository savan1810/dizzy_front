import { createAsyncThunk } from "@reduxjs/toolkit";
import { setErrorAlert, setLoader, setSuccessAlert, clearAlerts } from "../alert/alertSlice";
import { uploadImage } from "../../utils/upload";
import axios from "../../utils/axios";
import { clearUser, setEmail, setPhone } from "../user/userSlice";
import { postDataAPI } from "../../utils/fetchData";
import { clearAddSection } from "../addsection/addsectionSlice";
import { clearAuth, optClear } from "./authSlice";
// import { setErrorAlert, setLoader, setSuccessAlert } from "../alert/alertSlice";


export const add_userInfo_thunk = createAsyncThunk(
    "/auth/add_user_info",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            if (typeof tempData?.avatar === 'string' && tempData?.avatar?.includes('https://')) {
                tempData.avatar = tempData.avatar;
            } else if (tempData?.avatar instanceof File) {
                let avatar = await uploadImage(tempData.avatar);
                if (!avatar) {
                    thunkAPI?.dispatch(setErrorAlert('Image cannot contain nudity , violence or drugs'));
                    return false

                }
                if (avatar) tempData.avatar = avatar;
            } else {
                console.error('Invalid avatar data');
            }
            const response = await axios.post('auth/add_user_info', tempData, {});
            localStorage.setItem('dizeeUser', JSON.stringify(response.data.data.user));
            localStorage.setItem('dizeeToken', JSON.stringify(response.data.data.token));
            thunkAPI.dispatch(setLoader(false));
            // thunkAPI.dispatch(setSuccessAlert(response.data.message));
            return response.data;
        } catch (error) {
            console.log('error', error)
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
);
export const add_personal_user_userInfo_thunk = createAsyncThunk(
    "/auth/add_user_info_personal",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            if (typeof tempData?.avatar === 'string' && tempData?.avatar?.includes('https://')) {
                tempData.avatar = tempData.avatar;
            } else if (tempData?.avatar instanceof File) {
                let avatar = await uploadImage(tempData.avatar);
                if (!avatar) {
                    thunkAPI?.dispatch(setErrorAlert('Image cannot contain nudity , violence or drugs'));
                    return false

                }
                if (avatar) tempData.avatar = avatar;
            } else {
                console.error('Invalid avatar data');
            }
            const response = await axios.post('auth/add_user_info_personal', tempData, {});
            localStorage.setItem('dizeeUser', JSON.stringify(response.data.data.user));
            localStorage.setItem('dizeeToken', JSON.stringify(response.data.data.token));
            thunkAPI.dispatch(setLoader(false));
            // thunkAPI.dispatch(setSuccessAlert(response.data.message));
            return response.data;
        } catch (error) {
            console.log('error', error)
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
);

export const checkEmail = createAsyncThunk(
    '/auth/checkemail',
    async (email, thunkAPI) => {
        try {
            // thunkAPI.dispatch(setLoader(true));
            const res = await axios.get(`/auth/checkemail?email=${email}`);
            thunkAPI.dispatch(setLoader(false));
            if (res.data.status === 200) {
                thunkAPI.dispatch(setPhone(null));
                thunkAPI.dispatch(optClear(null));
                // Optionally add success alert here if needed
                // thunkAPI.dispatch(setSuccessAlert(res.data.message));
            }
            return res.data.data.exist;
        } catch (error) {
            // thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
);

export const sendOtpToEmailThunk = createAsyncThunk(
    '/auth/sendOtpToEmail',
    async (email, thunkAPI) => {
        try {
            thunkAPI.dispatch(clearAlerts());
            thunkAPI.dispatch(setLoader(true));
            const res = await axios.post('/auth/sendOtpToEmail', { email });
            thunkAPI.dispatch(setLoader(false));
            if (res.data.status === 200) {
                thunkAPI.dispatch(setEmail(email));
                thunkAPI.dispatch(setSuccessAlert(res.data.message));
            }
            return res.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
);

export const verifyEmailOTP = createAsyncThunk(
    '/auth/verifyOtpForEmail',
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(clearAlerts());
            thunkAPI.dispatch(setLoader(true));
            console.log('tempData.code', tempData.code)
            console.log('tempData.email', tempData.email)
            const res = await axios.post('/auth/verifyOtpForEmail', { code: tempData.code, email: tempData.email });
            thunkAPI.dispatch(setLoader(false));
            if (res.data.status === 200) {
                thunkAPI.dispatch(setSuccessAlert(res.data.message));
            }
            return res.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            console.log('error', error)
            thunkAPI.dispatch(setErrorAlert(error?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
);
export const verifyPhone = createAsyncThunk(
    '/auth/verifyphone',
    async (phone, thunkAPI) => {
        try {
            thunkAPI.dispatch(clearAlerts());
            thunkAPI.dispatch(setLoader(true));
            const res = await axios.post('/auth/verifyphone', { phone });
            thunkAPI.dispatch(setLoader(false));
            if (res.data.status === 200) {
                thunkAPI.dispatch(setPhone(phone));
                thunkAPI.dispatch(setSuccessAlert(res.data.message));
            }
            return res.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
);

export const verifyOTP = createAsyncThunk(
    '/auth/verifycode',
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(clearAlerts());
            thunkAPI.dispatch(setLoader(true));
            const res = await axios.post('/auth/verifycode', { code: tempData.code, phone: tempData.phone });
            thunkAPI.dispatch(setLoader(false));
            if (res.data.status === 200) {
                thunkAPI.dispatch(setSuccessAlert(res.data.message));
            }
            return res.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            console.log('error', error)
            thunkAPI.dispatch(setErrorAlert(error?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
);

export const checkDomain = createAsyncThunk(
    'auth/checkDomain',
    async (bool, thunkAPI) => {
        try {
            return bool
        } catch (error) {
            // thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
);

export const checkUserName = createAsyncThunk(
    'auth/checkUserName',
    async (bool, thunkAPI) => {
        try {
            return bool
        } catch (error) {
            // thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
);

export const stripePaymentThunk = createAsyncThunk(
    'auth/stripePayment',
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true))
            let { plan, user, email, phone } = tempData
            const response = await postDataAPI("stripe/create-checkout-session", { plan, user, email, phone }, {});
            thunkAPI.dispatch(setLoader(false))
            window.location.href = response.data.data.url
        } catch (error) {
            // thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            thunkAPI.dispatch(setLoader(false))
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
);

export const changePlanStripePaymentThunk = createAsyncThunk(
    'auth/stripePayment_changeplan',
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true))
            let { plan, token } = tempData
            const response = await postDataAPI("stripe/change_plan_checkout_session", { plan }, token);
            thunkAPI.dispatch(setLoader(false))
            window.location.href = response.data.data.url
        } catch (error) {
            // thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            thunkAPI.dispatch(setLoader(false))
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
);

export const loginPhoneNumberVerify = createAsyncThunk(
    'auth/loginPhoneNumberVerify',
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true))
            const response = await postDataAPI("auth/loginPhoneNumberVerify", { phone: tempData.phone, email: tempData.email }, {});
            thunkAPI.dispatch(setLoader(false))
            thunkAPI.dispatch(setSuccessAlert(response.data.message));
            return response.data
        } catch (error) {
            thunkAPI.dispatch(setLoader(false))
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data || 'An error occurred');
        }
    }
)
export const loginWithOtp = createAsyncThunk(
    'auth/loginWithOtp',
    async (tempData, thunkAPI) => {
        try {
            // thunkAPI.dispatch(setLoader(true))
            const response = await postDataAPI("auth/loginWithOtp", { phone: tempData.phone, email: tempData.email, code: tempData.code }, {});
            localStorage.setItem('dizeeUser', JSON.stringify(response.data.data.user));
            localStorage.setItem('dizeeToken', JSON.stringify(response.data.data.token));
            // thunkAPI.dispatch(setLoader(false))
            thunkAPI.dispatch(setSuccessAlert(response.data.message));
            return response.data
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data || 'An error occurred');
        }
    }
)

export const logoutThunk = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(clearAlerts());
            thunkAPI.dispatch(clearAddSection());
            thunkAPI.dispatch(clearUser());
            thunkAPI.dispatch(clearAuth());
            localStorage.removeItem('dizeeUser');
            localStorage.removeItem('dizeeToken');
            localStorage.removeItem('persist:root');
            localStorage.clear();
            window.location.href = '/';

            return
        } catch (error) {
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data || 'An error occurred');
        }
    }
)

export const getRandomUserThunk = createAsyncThunk(
    'auth/get-random-user-list',
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true))
            const response = await postDataAPI("auth/get-random-user-list", { username: tempData.username, size: tempData?.size }, {});
            thunkAPI.dispatch(setLoader(false))
            return response.data
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data || 'An error occurred');
        }
    }
)
export const getTopUserThunk = createAsyncThunk(
    'auth/get-top-user-list',
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true))
            const response = await postDataAPI("auth/get-top-user-list", { username: tempData.username, size: tempData?.size }, {});
            thunkAPI.dispatch(setLoader(false))
            return response.data
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data || 'An error occurred');
        }
    }
)
export const getUserFollowingListThunk = createAsyncThunk(
    'auth/get-user-following-list',
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true))
            const response = await postDataAPI("auth/get-user-following-list", { username: tempData.username, size: tempData?.size }, {});
            thunkAPI.dispatch(setLoader(false))
            return response.data
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data || 'An error occurred');
        }
    }
)
export const getSearchByUserDomainThunk = createAsyncThunk(
    'auth/search-user-by-domain',
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true))
            const response = await postDataAPI("auth/search-user-by-domain", { username: tempData.username, domain: tempData.domain, size: tempData?.size }, tempData?.token);
            thunkAPI.dispatch(setLoader(false))
            return response.data
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data || 'An error occurred');
        }
    }
)

export const follow_unfollow_auth_thunk = createAsyncThunk(
    "/auth/follow-unfollow-auth-user",
    async (tempData, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoader(true));
            const response = await postDataAPI('auth/follow-unfollow-auth-user', { username: tempData?.username, user: tempData?.user }, null);
            thunkAPI.dispatch(setLoader(false));
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(setLoader(false));
            thunkAPI.dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'An error occurred');
        }
    }
)

