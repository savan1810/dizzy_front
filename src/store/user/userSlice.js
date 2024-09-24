import { createSlice } from "@reduxjs/toolkit";
import { add_video_message_thunk, delete_video_message_thunk, get_user_articles_thunk, get_video_message_thunk, update_save_type_thunk, update_user_article_thunk } from "./userThunk";

const initialState = {
  setting: {
    bgColor: "#222222",
  },
  email: "",
  phone: "",
  userArticle: "",
  videoMessage: null,
  isPhotoOverlay: false,
  socialApiCall: false
};


const getUserArticleCases = (builder) => {
  builder.addCase(get_user_articles_thunk.pending, (state) => {
    state.loading = true;
    state.error = null;
  }).addCase(get_user_articles_thunk.fulfilled, (state, action) => {
    state.loading = false;
    state.userArticle = action.payload;
  }).addCase(get_user_articles_thunk.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || 'Redux Cases Error'
  })
}
const updateUserArticleCases = (builder) => {
  builder.addCase(update_user_article_thunk.pending, (state) => {
    state.loading = true;
    state.error = null;
  }).addCase(update_user_article_thunk.fulfilled, (state, action) => {
    state.loading = false;
    state.userArticle = action.payload;
  }).addCase(update_user_article_thunk.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || 'Redux Cases Error'
  })
}

const addVideoMessageThunk = (builder) => {
  builder.addCase(add_video_message_thunk.pending, (state) => {
    state.loading = true;
    state.error = null;
  }).addCase(add_video_message_thunk.fulfilled, (state, action) => {
    state.loading = false;
    state.videoMessage = action.payload;
  }).addCase(add_video_message_thunk.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || 'Redux Cases Error'
  })
}

const deleteVideoMessageThunk = (builder) => {
  builder.addCase(delete_video_message_thunk.pending, (state) => {
    state.loading = true;
    state.error = null;
  }).addCase(delete_video_message_thunk.fulfilled, (state, action) => {
    state.loading = false;
    state.videoMessage = state.videoMessage?.filter(el => el.link !== action.payload);
  }).addCase(delete_video_message_thunk.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || 'Redux Cases Error'
  })
}

const updateSaveTypeThunk = (builder) => {
  builder.addCase(update_save_type_thunk.pending, (state) => {
    state.loading = true;
    state.error = null;
  }).addCase(update_save_type_thunk.fulfilled, (state, action) => {
    state.loading = false;
  }).addCase(update_save_type_thunk.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || 'Redux Cases Error'
  })
}

const getVideoMessage = (builder) => {
  builder.addCase(get_video_message_thunk.pending, (state) => {
    state.loading = true;
    state.error = null;
  }).addCase(get_video_message_thunk.fulfilled, (state, action) => {
    state.loading = false;
    state.videoMessage = action.payload;
  }).addCase(get_video_message_thunk.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || 'Redux Cases Error'
  })
}
const followUnfollowCases = (builder) => {
  builder.addCase(get_video_message_thunk.pending, (state) => {
    state.loading = true;
    state.error = null;
  }).addCase(get_video_message_thunk.fulfilled, (state, action) => {
    state.loading = false;
    state.videoMessage = action.payload;
  }).addCase(get_video_message_thunk.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || 'Redux Cases Error'
  })
}


const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateBgColor(state, action) {
      state.setting.bgColor = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPhone(state, action) {
      state.phone = action.payload
    },
    setVideoMessage(state, action) {
      state.videoMessage = action.payload
    },
    setUserArticle(state, action) {
      state.userArticle = action.payload
    },
    updatePhotoOverlay(state, action) {
      state.isPhotoOverlay = action.payload
    },
    updateSocialApiCall(state, action) {
      state.socialApiCall = action.payload
    },
    clearUser(state, action) {
      state.setting = {
        bgColor: "#222222",
      }
      state.email = ""
      state.phone = ""
      state.userArticle = ""
      state.videoMessage = null
    }
  },
  extraReducers: (builder) => {
    getUserArticleCases(builder)
    updateUserArticleCases(builder)
    addVideoMessageThunk(builder)
    deleteVideoMessageThunk(builder)
    updateSaveTypeThunk(builder)
    getVideoMessage(builder)
  },
});

export default slice.reducer;

export const { updateBgColor, setEmail, setPhone, clearUser, setVideoMessage, setUserArticle, updatePhotoOverlay, updateSocialApiCall } = slice.actions;
