import { createSlice } from "@reduxjs/toolkit";
import { get_domain_articles_thunk, getDomainAllSectionsThunk, getDomainDataForFocusThunk } from "./domainThunk";

const initialState = {
    loading: false,
    error: null,
    userArticle: "",
    videoMessage: null,
    music: null,
    video: null,
    event: null,
    product: null,
    playlist: null,
    form: null,
    socialfeed: null,
    customlink: null,
    customlinksection: null,
    focusData: null
};


const getDomainArticleCases = (builder) => {
    builder.addCase(get_domain_articles_thunk.pending, (state) => {
        state.loading = true;
        state.error = null;
    }).addCase(get_domain_articles_thunk.fulfilled, (state, action) => {
        state.loading = false;
        state.userArticle = action.payload;
    }).addCase(get_domain_articles_thunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Redux Cases Error'
    })
}


const getDomainAllSectionsCases = (builder) => {
    builder.addCase(getDomainAllSectionsThunk.pending, (state) => {
        // state.musicLoading = true;
        state.error = null;
    }).addCase(getDomainAllSectionsThunk.fulfilled, (state, action) => {
        state.videoMessage = action.payload?.videoMessage
        state.music = action.payload?.music
        state.video = action.payload?.video
        state.event = action.payload?.event
        state.product = action.payload?.product
        state.playlist = action.payload?.playlist
        state.form = action.payload?.form
        state.socialfeed = action.payload?.socialfeed
        state.customlink = action.payload?.customlink
    }).addCase(getDomainAllSectionsThunk.rejected, (state, action) => {
        // state.musicLoading = false;
        state.error = action.payload || 'Redux Cases Error'
    })
}

const getDomainDataForFocusCases = (builder) => {
    builder.addCase(getDomainDataForFocusThunk.pending, (state) => {
        // state.musicLoading = true;
        state.error = null;
    }).addCase(getDomainDataForFocusThunk.fulfilled, (state, action) => {
        // state.musicLoading = false;
        state.focusData = action.payload
    }).addCase(getDomainDataForFocusThunk.rejected, (state, action) => {
        // state.musicLoading = false;
        state.error = action.payload || 'Redux Cases Error'
    })
}

const slice = createSlice({
    name: "domain",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        getDomainArticleCases(builder)
        getDomainAllSectionsCases(builder)
        getDomainDataForFocusCases(builder)
    },
});

export default slice.reducer;