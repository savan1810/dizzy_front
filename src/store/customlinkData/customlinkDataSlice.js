import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: '',
    image: '',
    link: '',
    section: '',
    previousUrl: '',
}

const slice = createSlice({
    name: "customlinkdata",
    initialState,
    reducers: {
        updateTitle: (state, action) => {
            state.title = action.payload
        },
        updateImage: (state, action) => {
            state.image = action.payload
        },
        updateLink: (state, action) => {
            state.link = action.payload
        },

        updateSection: (state, action) => {
            state.section = action.payload
        },
        updatePreviousUrl: (state, action) => {
            state.previousUrl = action.payload
        },

        clearCustomLinkData: (state) => {
            state.title = ''
            state.image = ''
            state.link = ''
            state.section = ''
            state.previousUrl = ''
        }
    }
})

export const { updateTitle, updateImage, updateLink, updateSection, updatePreviousUrl, clearCustomLinkData } = slice.actions;

export default slice.reducer;
