// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { add_userInfo_thunk, checkEmail, verifyPhone, checkDomain, checkUserName, verifyOTP, loginWithOtp, logoutThunk } from "./authThunk";

const initialState = {
  isAuthenticated: false,
  token: null,
  checkemail: false,
  sentOTP: false,
  otpVerified: false,
  checkdomain: false,
  checkusername: false,
  loading: false,
  isLogin: false,
  error: null,
  protect: false,
  emailOtpVerified: false
};

const signupCases = (builder) => {
  builder.addCase(add_userInfo_thunk.pending, (state) => {
    state.loading = true;
    state.error = null;
  }).addCase(add_userInfo_thunk.fulfilled, (state, action) => {
    state.isLogin = true
    state.loading = false;
  }).addCase(add_userInfo_thunk.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || 'Redux Cases Error'
  })
}

const checkEmailCases = (builder) => {
  builder.addCase(checkEmail.pending, (state) => {
    state.loading = true;
    state.error = null;
  }).addCase(checkEmail.fulfilled, (state, action) => {
    state.loading = false;
    state.checkemail = action.payload;
  }).addCase(checkEmail.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || 'Redux Cases Error'
  })
}
const verifyPhoneCases = (builder) => {
  builder.addCase(verifyPhone.pending, (state) => {
    state.loading = true;
    state.error = null;
  }).addCase(verifyPhone.fulfilled, (state, action) => {
    state.loading = false;
    state.sentOTP = action.payload;
  }).addCase(verifyPhone.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || 'Redux Cases Error'
  })
}
const verifyOTPCases = (builder) => {
  builder.addCase(verifyOTP.pending, (state) => {
    state.loading = true;
    state.error = null;
  }).addCase(verifyOTP.fulfilled, (state, action) => {
    state.loading = false;
    state.otpVerified = action.payload;
  }).addCase(verifyOTP.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || 'Redux Cases Error'
  })
}
const checkDomainCases = (builder) => {
  builder.addCase(checkDomain.pending, (state) => {
    state.loading = true;
    state.error = null;
  }).addCase(checkDomain.fulfilled, (state, action) => {
    state.loading = false;
    state.checkdomain = action.payload;
  }).addCase(checkDomain.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || 'Redux Cases Error'
  })
}
const checkUserNameCases = (builder) => {
  builder.addCase(checkUserName.pending, (state) => {
    state.loading = true;
    state.error = null;
  }).addCase(checkUserName.fulfilled, (state, action) => {
    state.loading = false;
    state.checkusername = action.payload;
  }).addCase(checkUserName.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || 'Redux Cases Error'
  })
}
const loginWithOtpCases = (builder) => {
  builder.addCase(loginWithOtp.pending, (state) => {
    state.loading = true;
    state.error = null;
  }).addCase(loginWithOtp.fulfilled, (state, action) => {
    state.isLogin = true
    state.loading = false;
  }).addCase(loginWithOtp.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || 'Redux Cases Error'
  })
}

const logoutCases = (builder) => {
  builder.addCase(logoutThunk.pending, (state) => {
    state.loading = true;
    state.error = null;
  }).addCase(logoutThunk.fulfilled, (state, action) => {
    state.loading = false;
    state.isLogin = false;
  }).addCase(logoutThunk.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || 'Redux Cases Error'
  })
}

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth(state, action) {
      state.isAuthenticated = false
      state.token = null
      state.checkemail = false
      state.sentOTP = false
      state.otpVerified = false
      state.checkdomain = false
      state.checkusername = false
      state.loading = false
      state.isLogin = false
      state.error = null
    },
    protect: (state) => {
      state.protect = true;
    },
    optClear: (state) => {
      state.sentOTP = false
      state.otpVerified = false
    },
    LoginFun: (state, action) => {
      state.isLogin = action.payload
    }
    // hasError(state, action) { },
    // checkEmailSuccess(state, action) {
    //   state.checkemail = action.payload;
    // },
    // sentOTPSuccess(state, action) {
    //   state.sentOTP = action.payload;
    // },
    // otpVerified(state, action) {
    //   state.otpVerified = action.payload;
    // },
    // checkDomain(state, action) {
    //   state.checkdomain = action.payload;
    // },
    // checkUserName(state, action) {
    //   state.checkusername = action.payload;
    // },
  },
  extraReducers: (builder) => {
    signupCases(builder)
    checkEmailCases(builder)
    verifyPhoneCases(builder)
    verifyOTPCases(builder)
    checkDomainCases(builder)
    checkUserNameCases(builder)
    loginWithOtpCases(builder)
    logoutCases(builder)
  }
});

export default slice.reducer;
export const { clearAuth, protect, optClear, LoginFun } = slice.actions;
