import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    link: '',
    contentLink: '',
    location: '',
    venue: '',
    date: '',
    time: '',
    previousUrl: '',
    previousSource: '',
    type: null
}

const slice = createSlice({
    name: "focuseventdata",
    initialState,
    reducers: {
        updateLink: (state, action) => {
            state.link = action.payload
        },
        updateContentLink: (state, action) => {
            state.contentLink = action.payload
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
        updateEventTime: (state, action) => {
            state.time = action.payload
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
        clearEvent: (state) => {
            state.date = ''
            state.time = ''
            state.venue = ''
            state.location = ''
            state.link = ''
            state.contentLink = ''
            state.previousUrl = ''
            state.previousSource = ''
            state.type = null

        }
    }
})

export const { updateLink, updateLocation, updateVenue, updateEventDate, clearEvent, updatePreviousUrl, updatePreviousSource, updateType, updateContentLink, updateEventTime } = slice.actions;

export default slice.reducer;
