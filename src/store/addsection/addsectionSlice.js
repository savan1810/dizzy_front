import { createSlice } from "@reduxjs/toolkit";
import { addCustomLinkSectionToSectionThunk, addCustomLinkToSectionThunk, addEventToSectionThunk, addFormToSectionThunk, addMusicToSectionThunk, addPlaylistToSectionThunk, addProductToSectionThunk, addSocialFeedToSectionThunk, addVideoToSectionThunk, getAllSectionsThunk, getCustomLinkSectionThunk, getCustomLinkThunk, getEventThunk, getFormThunk, getMusicThunk, getPlaylistThunk, getProductThunk, getSocialFeedThunk, getVideoThunk, searchMusicForReleaseThunk } from "./addsectionThunk";

const initialState = {
    error: null,
    searchMusic: null,
    musicLoading: false,
    music: null,
    //video
    video: null,
    videoLoading: false,
    //event
    event: null,
    eventLoading: false,
    //product
    product: null,
    productLoading: false,
    //playlist
    playlist: null,
    playlistLoading: false,
    //form
    form: null,
    formLoading: false,
    //socialfeed
    socialfeed: null,
    socialfeedLoading: false,
    //customlinksection
    customlink: null,
    customlinkLoading: null,
    //customlinksection
    customlinksection: null,
    customlinksectionLoading: null,


};


const getAllSectionsCases = (builder) => {
    builder.addCase(getAllSectionsThunk.pending, (state) => {
        // state.musicLoading = true;
        state.error = null;
    }).addCase(getAllSectionsThunk.fulfilled, (state, action) => {
        state.music = action.payload?.music
        state.video = action.payload?.video
        state.event = action.payload?.event
        state.product = action.payload?.product
        state.playlist = action.payload?.playlist
        state.form = action.payload?.form
        state.socialfeed = action.payload?.socialfeed
        state.customlink = action.payload?.customlink
    }).addCase(getAllSectionsThunk.rejected, (state, action) => {
        // state.musicLoading = false;
        state.error = action.payload || 'Redux Cases Error'
    })
}
const searchForReleaseMusicCases = (builder) => {
    builder.addCase(searchMusicForReleaseThunk.pending, (state) => {
        state.musicLoading = true;
        state.error = null;
    }).addCase(searchMusicForReleaseThunk.fulfilled, (state, action) => {
        state.musicLoading = false;
        state.searchMusic = action.payload
    }).addCase(searchMusicForReleaseThunk.rejected, (state, action) => {
        state.musicLoading = false;
        state.error = action.payload || 'Redux Cases Error'
    })
}

const addMusicToSectionCases = (builder) => {
    builder.addCase(addMusicToSectionThunk.pending, (state) => {
        state.musicLoading = true;
        state.error = null;
    }).addCase(addMusicToSectionThunk.fulfilled, (state, action) => {
        state.musicLoading = false;
        // state.searchMusic = action.payload
    }).addCase(addMusicToSectionThunk.rejected, (state, action) => {
        state.musicLoading = false;
        state.error = action.payload || 'Redux Cases Error'
    })
}

const getMusicCases = (builder) => {
    builder.addCase(getMusicThunk.pending, (state) => {
        // state.musicLoading = true;
        state.error = null;
    }).addCase(getMusicThunk.fulfilled, (state, action) => {
        // state.musicLoading = false;
        state.music = action.payload
    }).addCase(getMusicThunk.rejected, (state, action) => {
        // state.musicLoading = false;
        state.error = action.payload || 'Redux Cases Error'
    })
}
const addVideoToSectionCases = (builder) => {
    builder.addCase(addVideoToSectionThunk.pending, (state) => {
        state.videoLoading = true;
        state.error = null;
    }).addCase(addVideoToSectionThunk.fulfilled, (state, action) => {
        state.videoLoading = false;
        // state.searchMusic = action.payload
    }).addCase(addVideoToSectionThunk.rejected, (state, action) => {
        state.videoLoading = false;
        state.error = action.payload || 'Redux Cases Error'
    })
}

const getVideoCases = (builder) => {
    builder.addCase(getVideoThunk.pending, (state) => {
        state.videoLoading = true;
        state.error = null;
    }).addCase(getVideoThunk.fulfilled, (state, action) => {
        state.videoLoading = false;
        state.video = action.payload
    }).addCase(getVideoThunk.rejected, (state, action) => {
        state.videoLoading = false;
        state.error = action.payload || 'Redux Cases Error'
    })
}
const addEventToSectionCases = (builder) => {
    builder.addCase(addEventToSectionThunk.pending, (state) => {
        state.eventLoading = true;
        state.error = null;
    }).addCase(addEventToSectionThunk.fulfilled, (state, action) => {
        state.eventLoading = false;
        // state.searchMusic = action.payload
    }).addCase(addEventToSectionThunk.rejected, (state, action) => {
        state.eventLoading = false;
        state.error = action.payload || 'Redux Cases Error'
    })
}

const getEventCases = (builder) => {
    builder.addCase(getEventThunk.pending, (state) => {
        state.eventLoading = true;
        state.error = null;
    }).addCase(getEventThunk.fulfilled, (state, action) => {
        state.eventLoading = false;
        state.event = action.payload
    }).addCase(getEventThunk.rejected, (state, action) => {
        state.eventLoading = false;
        state.error = action.payload || 'Redux Cases Error'
    })
}
const addProductToSectionCases = (builder) => {
    builder.addCase(addProductToSectionThunk.pending, (state) => {
        state.productLoading = true;
        state.error = null;
    }).addCase(addProductToSectionThunk.fulfilled, (state, action) => {
        state.productLoading = false;
    }).addCase(addProductToSectionThunk.rejected, (state, action) => {
        state.productLoading = false;
        state.error = action.payload || 'Redux Cases Error'
    })
}

const getProductCases = (builder) => {
    builder.addCase(getProductThunk.pending, (state) => {
        state.productLoading = true;
        state.error = null;
    }).addCase(getProductThunk.fulfilled, (state, action) => {
        state.productLoading = false;
        state.product = action.payload
    }).addCase(getProductThunk.rejected, (state, action) => {
        state.productLoading = false;
        state.error = action.payload || 'Redux Cases Error'
    })
}
const addPlaylistToSectionCases = (builder) => {
    builder.addCase(addPlaylistToSectionThunk.pending, (state) => {
        state.playlistLoading = true;
        state.error = null;
    }).addCase(addPlaylistToSectionThunk.fulfilled, (state, action) => {
        state.playlistLoading = false;
    }).addCase(addPlaylistToSectionThunk.rejected, (state, action) => {
        state.playlistLoading = false;
        state.error = action.payload || 'Redux Cases Error'
    })
}

const getPlaylistCases = (builder) => {
    builder.addCase(getPlaylistThunk.pending, (state) => {
        state.playlistLoading = true;
        state.error = null;
    }).addCase(getPlaylistThunk.fulfilled, (state, action) => {
        state.playlistLoading = false;
        state.playlist = action.payload
    }).addCase(getPlaylistThunk.rejected, (state, action) => {
        state.playlistLoading = false;
        state.error = action.payload || 'Redux Cases Error'
    })
}
const addFormToSectionCases = (builder) => {
    builder.addCase(addFormToSectionThunk.pending, (state) => {
        state.formLoading = true;
        state.error = null;
    }).addCase(addFormToSectionThunk.fulfilled, (state, action) => {
        state.formLoading = false;
    }).addCase(addFormToSectionThunk.rejected, (state, action) => {
        state.formLoading = false;
        state.error = action.payload || 'Redux Cases Error'
    })
}
const getFormCases = (builder) => {
    builder.addCase(getFormThunk.pending, (state) => {
        state.formLoading = true;
        state.error = null;
    }).addCase(getFormThunk.fulfilled, (state, action) => {
        state.formLoading = false;
        state.form = action.payload
    }).addCase(getFormThunk.rejected, (state, action) => {
        state.formLoading = false;
        state.error = action.payload || 'Redux Cases Error'
    })
}


const addSocialFeedToSectionCases = (builder) => {
    builder.addCase(addSocialFeedToSectionThunk.pending, (state) => {
        state.socialfeedLoading = true;
        state.error = null;
    }).addCase(addSocialFeedToSectionThunk.fulfilled, (state, action) => {
        state.socialfeedLoading = false;
    }).addCase(addSocialFeedToSectionThunk.rejected, (state, action) => {
        state.socialfeedLoading = false;
        state.error = action.payload || 'Redux Cases Error'
    })
}

const getSocialFeedCases = (builder) => {
    builder.addCase(getSocialFeedThunk.pending, (state) => {
        state.socialfeedLoading = true;
        state.error = null;
    }).addCase(getSocialFeedThunk.fulfilled, (state, action) => {
        state.socialfeedLoading = false;
        state.socialfeed = action.payload
    }).addCase(getSocialFeedThunk.rejected, (state, action) => {
        state.socialfeedLoading = false;
        state.error = action.payload || 'Redux Cases Error'
    })
}


const addCustomLinkSectionToSectionCases = (builder) => {
    builder.addCase(addCustomLinkSectionToSectionThunk.pending, (state) => {
        state.customlinksectionLoading = true;
        state.error = null;
    }).addCase(addCustomLinkSectionToSectionThunk.fulfilled, (state, action) => {
        state.customlinksectionLoading = false;
    }).addCase(addCustomLinkSectionToSectionThunk.rejected, (state, action) => {
        state.customlinksectionLoading = false;
        state.error = action.payload || 'Redux Cases Error'
    })
}

const getCustomLinkSectionCases = (builder) => {
    builder.addCase(getCustomLinkSectionThunk.pending, (state) => {
        state.customlinksectionLoading = true;
        state.error = null;
    }).addCase(getCustomLinkSectionThunk.fulfilled, (state, action) => {
        state.customlinksectionLoading = false;
        state.customlinksection = action.payload
    }).addCase(getCustomLinkSectionThunk.rejected, (state, action) => {
        state.customlinksectionLoading = false;
        state.error = action.payload || 'Redux Cases Error'
    })
}


const addCustomLinkToSectionCases = (builder) => {
    builder.addCase(addCustomLinkToSectionThunk.pending, (state) => {
        state.customlinkLoading = true;
        state.error = null;
    }).addCase(addCustomLinkToSectionThunk.fulfilled, (state, action) => {
        state.customlinkLoading = false;
    }).addCase(addCustomLinkToSectionThunk.rejected, (state, action) => {
        state.customlinkLoading = false;
        state.error = action.payload || 'Redux Cases Error'
    })
}

const getCustomLinkCases = (builder) => {
    builder.addCase(getCustomLinkThunk.pending, (state) => {
        state.customlinkLoading = true;
        state.error = null;
    }).addCase(getCustomLinkThunk.fulfilled, (state, action) => {
        state.customlinkLoading = false;
        state.customlink = action.payload
    }).addCase(getCustomLinkThunk.rejected, (state, action) => {
        state.customlinkLoading = false;
        state.error = action.payload || 'Redux Cases Error'
    })
}


const slice = createSlice({
    name: "addsection",
    initialState,
    reducers: {
        clearSearchMusic: (state) => {
            state.searchMusic = null
        },
        clearAddSection: (state) => {
            state.music = null
            state.video = null
            state.error = null
            state.videoLoading = false
            state.musicLoading = false
            state.searchMusic = null
        }
    },
    extraReducers: (builder) => {
        getAllSectionsCases(builder)
        searchForReleaseMusicCases(builder)
        addMusicToSectionCases(builder)
        getMusicCases(builder)
        addVideoToSectionCases(builder)
        getVideoCases(builder)
        addEventToSectionCases(builder)
        getEventCases(builder)
        addProductToSectionCases(builder)
        getProductCases(builder)
        addPlaylistToSectionCases(builder)
        getPlaylistCases(builder)
        addFormToSectionCases(builder)
        getFormCases(builder)
        addSocialFeedToSectionCases(builder)
        getSocialFeedCases(builder)
        addCustomLinkSectionToSectionCases(builder)
        getCustomLinkSectionCases(builder)
        addCustomLinkToSectionCases(builder)
        getCustomLinkCases(builder)
    },
});

export default slice.reducer;

export const { clearSearchMusic, clearAddSection } = slice.actions;
