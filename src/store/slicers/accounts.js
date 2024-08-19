import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    account: null,
    accNFTs: null,
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
        }
    }
})

export const {setAccount, setMyNFTs} = accountsSlice.actions;
export default accountsSlice.reducer;