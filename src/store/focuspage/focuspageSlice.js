import { createSlice } from "@reduxjs/toolkit";
import { addMusicForFocusThunk, addProductForFocusThunk, getDataForFocusThunk, searchMusicForReleaseFocusThunk, update_focus_data_thunk } from "./focuspageThunk";
// import { searchMusicForReleaseThunk } from "./addsectionThunk";

const initialState = {
    error: null,
    searchMusic: null,
    musicLoading: false,

    music: {},
    product: {},
    event: {},
    newsletter: {},

    isMusicOverlay: false,
    isProductOverlay: false,
    isEventOverlay: false,
    isNewsletterOverlay: false,

    focusData: null
};


const getDataForFocusCases = (builder) => {
    builder.addCase(getDataForFocusThunk.pending, (state) => {
        // state.musicLoading = true;
        state.error = null;
    }).addCase(getDataForFocusThunk.fulfilled, (state, action) => {
        // state.musicLoading = false;
        state.focusData = action.payload
    }).addCase(getDataForFocusThunk.rejected, (state, action) => {
        // state.musicLoading = false;
        state.error = action.payload || 'Redux Cases Error'
    })
}

const searchForReleaseMusicCases = (builder) => {
    builder.addCase(searchMusicForReleaseFocusThunk.pending, (state) => {
        state.musicLoading = true;
        state.error = null;
    }).addCase(searchMusicForReleaseFocusThunk.fulfilled, (state, action) => {
        state.musicLoading = false;
        state.searchMusic = action.payload
    }).addCase(searchMusicForReleaseFocusThunk.rejected, (state, action) => {
        state.musicLoading = false;
        state.error = action.payload || 'Redux Cases Error'
    })
}

const addMusicForFocusCases = (builder) => {
    builder.addCase(addMusicForFocusThunk.pending, (state) => {
        state.error = null;
    }).addCase(addMusicForFocusThunk.fulfilled, (state, action) => {
        // state.searchMusic = action.payload
    }).addCase(addMusicForFocusThunk.rejected, (state, action) => {
        state.error = action.payload || 'Redux Cases Error'
    })
}

const updateFocusDataCases = (builder) => {
    builder.addCase(update_focus_data_thunk.pending, (state) => {
        state.loading = true;
        state.error = null;
    }).addCase(update_focus_data_thunk.fulfilled, (state, action) => {
        state.loading = false;
        state.focusData = action.payload;
    }).addCase(update_focus_data_thunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Redux Cases Error'
    })
}

const slice = createSlice({
    name: "focuspage",
    initialState,
    reducers: {
        clearSearchMusic: (state) => {
            state.searchMusic = null
        },
        setFocusMusic: (state, action) => {
            state.music = { ...(state.music || {}), ...action.payload };
        },
        setWholeFocusMusic: (state, action) => {
            state.music = action.payload
        },
        setFocusProduct: (state, action) => {
            state.product = { ...(state.product || {}), ...action.payload };
        },
        setWholeFocusProduct: (state, action) => {
            state.product = action.payload
        },
        setFocusEvent: (state, action) => {
            state.event = { ...(state.event || {}), ...action.payload };
        },
        setWholeFocusEvent: (state, action) => {
            state.event = action.payload
        },
        setFocusNewsletter: (state, action) => {
            state.newsletter = { ...(state.newsletter || {}), ...action.payload };
        },
        setWholeFocusNewsletter: (state, action) => {
            state.newsletter = action.payload
        },
        updateMusicOverlay(state, action) {
            state.isMusicOverlay = action.payload
        },
        updateProductOverlay(state, action) {
            state.isProductOverlay = action.payload
        },
        updateEventOverlay(state, action) {
            state.isEventOverlay = action.payload
        },
        updateNewsletterOverlay(state, action) {
            state.isNewsletterOverlay = action.payload
        },
        clearFocusSection: (state) => {
            state.music = {}
            state.product = {}
            state.event = {}
            state.newsletter = {}
            // state.video = null
            // state.error = null
            // state.videoLoading = false
            // state.musicLoading = false
            // state.searchMusic = null
        }
    },
    extraReducers: (builder) => {
        searchForReleaseMusicCases(builder)
        addMusicForFocusCases(builder)
        getDataForFocusCases(builder)
        updateFocusDataCases(builder)
    },
});

export default slice.reducer;

export const { clearSearchMusic, setFocusMusic, clearFocusSection, setWholeFocusMusic, setFocusProduct, setWholeFocusProduct, setFocusEvent, setWholeFocusEvent, setFocusNewsletter, setWholeFocusNewsletter, updateMusicOverlay, updateProductOverlay, updateEventOverlay, updateNewsletterOverlay } = slice.actions;
