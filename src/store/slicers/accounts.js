import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    account: null,
    accNFTs: null,
    listedNFTs: []
}

export const accountsSlice = createSlice({
    name: "accounts",
    initialState,
    reducers: {
        setAccount: (state, action) => {
            state.account = action.payload;
        },
        setMyNFTs: (state, action) => {
            state.accNFTs = action.payload;
        },
        setListedNFTs: (state, action) => {
            state.listedNFTs = action.payload;
        }
    }
})

export const {setAccount, setMyNFTs, setListedNFTs} = accountsSlice.actions;
export default accountsSlice.reducer;