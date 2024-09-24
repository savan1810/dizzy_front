import { createSlice } from "@reduxjs/toolkit";
import { get_delegate_access } from "./settingThunk";

const initialState = {
    oldPhone: '',
    newPhone: '',
    delegateaccess: '',

    filter: 'alltime',
    // location: '',
    // venue: '',
    // date: '',
    // previousUrl: '',
    // previousSource: '',
    // type: null
}

const getDelegateFocusCases = (builder) => {
    builder.addCase(get_delegate_access.pending, (state) => {
        // state.musicLoading = true;
        state.error = null;
    }).addCase(get_delegate_access.fulfilled, (state, action) => {
        // state.musicLoading = false;
        state.delegateaccess = action.payload
    }).addCase(get_delegate_access.rejected, (state, action) => {
        // state.musicLoading = false;
        state.error = action.payload || 'Redux Cases Error'
    })
}

const slice = createSlice({
    name: "setting",
    initialState,
    reducers: {
        setOldPhone: (state, action) => {
            state.oldPhone = action.payload
        },
        setNewPhone: (state, action) => {
            state.newPhone = action.payload
        },
        setFilter: (state, action) => {
            state.filter = action.payload
        }
        // updateLink: (state, action) => {
        //     state.link = action.payload
        // },
        // updateLocation: (state, action) => {
        //     state.location = action.payload
        // },
        // updateVenue: (state, action) => {
        //     state.venue = action.payload
        // },
        // updateEventDate: (state, action) => {
        //     state.date = action.payload
        // },
        // updatePreviousUrl: (state, action) => {
        //     state.previousUrl = action.payload
        // },
        // updatePreviousSource: (state, action) => {
        //     state.previousSource = action.payload
        // },
        // updateType: (state, action) => {
        //     state.type = action.payload
        // },
        // clearEvent: (state) => {
        //     state.date = ''
        //     state.venue = ''
        //     state.location = ''
        //     state.link = ''
        //     state.previousUrl = ''
        //     state.previousSource = ''
        //     state.type = null
        // }

    },
    extraReducers: (builder) => {
        getDelegateFocusCases(builder)
    },
})

export const { setOldPhone, setNewPhone, setFilter } = slice.actions;

export default slice.reducer;
