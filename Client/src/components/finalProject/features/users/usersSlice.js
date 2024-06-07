import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {loginUser,addUser,getUsers} from './usersApi'
const initialState={
    currentUser:null,
    arrUsers:[],
    status:'guest'
}

export const login = createAsyncThunk(
    'user/login',
   async  (user,thunkAPI) => {  
      const res = await loginUser(user)
        return res
    },
)

export const addCurrentUser = createAsyncThunk(
    'user/add',
    async (user, thunkAPI) => {
        const res = await addUser(user)
        return res
    }
)

export const getAllUsers = createAsyncThunk(
    'user/getAll',
    async (thunkAPI) => {
        const res = await getUsers()
        return res
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state, action) => {
            state.currentUser = null
            state.arrUsers = []
            state.status="guest"
        },
        admin: (state, action) => {
            state.arrUsers = []
            state.status="admin"
        },
    },

    extraReducers: (builder) => {
        builder
        .addCase(login.fulfilled, (state, { payload }) => {
            state.currentUser = payload
            if(payload.password=='1234')
                state.status = "admin"
            else
            state.status = "customer"
        })
        .addCase(addCurrentUser.fulfilled, (state, { payload }) => {
            state.currentUser = payload
            state.status = "customer"
        })
        .addCase(getAllUsers.fulfilled, (state, { payload }) => {
            state.arrUsers = payload
        })
    },

})
export const {logout,admin} = userSlice.actions

export default userSlice.reducer