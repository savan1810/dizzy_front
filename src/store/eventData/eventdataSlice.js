import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    link: '',
    location: '',
    venue: '',
    date: '',
    previousUrl: '',
    previousSource: '',
    type: null,
    image:''
}

const slice = createSlice({
    name: "eventdata",
    initialState,
    reducers: {
        updateLink: (state, action) => {
            state.link = action.payload
        },
        updateLocation: (state, action) => {
            state.location = action.payload
        },
        updateVenue: (state, action) => {
            state.venue = action.payload
        },
        updateEventDate: (state, action) => {
            state.date = action.payload
        },
        updatePreviousUrl: (state, action) => {
            state.previousUrl = action.payload
        },
        updatePreviousSource: (state, action) => {
            state.previousSource = action.payload
        },
        updateType: (state, action) => {
            state.type = action.payload
        },
        updateImage: (state, action) => {
            state.image = action.payload
        },
        clearEvent: (state) => {
            state.date = ''
            state.venue = ''
            state.location = ''
            state.link = ''
            state.previousUrl = ''
            state.previousSource = ''
            state.type = null
        }
    }
})

export const { updateLink, updateLocation,updateImage, updateVenue, updateEventDate, clearEvent, updatePreviousUrl, updatePreviousSource, updateType } = slice.actions;

export default slice.reducer;
