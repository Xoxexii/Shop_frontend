import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'admin',
    initialState: {
        username: "",
        password: null,
        token: [],
        status: "usual",
        items: [],
        category: [],
        csscategory: [],
        statuscategory:"",
    },
    reducers: {
        
        addAdmin: (state, action) => {
            state.username = action.payload
        },
        addAdmin2: (state, action) => {
            state.password = action.payload
        },
        addToken: (state, action) => {
            state.admin3 = action.payload
            
        },
        addStatus: (state, action) => {
            state.status = action.payload

        },
        setItem: (state, action) => {
            state.items = action.payload

        },
        addCategory: (state, action) => {
            state.category = action.payload
            state.csscategory = state.category.map((e) => "background__sidebar__area")
        },
        addCssCategory: (state, action) => {
            state.csscategory = action.payload

        },
        addStatusCategory: (state, action) => {
            state.statuscategory = action.payload

        },
    }
},)

// Action creators are generated for each case reducer function
export const { addAdmin, addAdmin2, addToken, addStatus, setItem, addCategory, addCssCategory, addStatusCategory } = counterSlice.actions

export default counterSlice.reducer