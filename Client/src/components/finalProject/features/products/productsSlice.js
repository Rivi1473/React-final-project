import { createSlice ,createAsyncThunk } from '@reduxjs/toolkit'
import { getProducts,getProductByIdA,addProductA,putProductA, deleteProductA } from './productsApi'

const initialState = {
    arrProducts: [],
    status: "idle",
    poststatus: "idle"
}

export const getAllProducts = createAsyncThunk(
    'product',
    async (thunkAPI) => {
        const res = await getProducts()
        return res
    },
)

export const getProductById = createAsyncThunk(
    'product',
    async (id,thunkAPI) => {
        const res = await getProductByIdA(id)
        return res
    },
)

export const postProduct = createAsyncThunk(
    'product',
    async (newProduct,thunkAPI) => {
        const res = await addProductA(newProduct)
        return res
    },
)

export const putProduct = createAsyncThunk(
    'product',
    async ({id,updatedProduct},thunkAPI) => {
        const res = await putProductA(id,updatedProduct)
        return res
    },
)

export const deleteProduct = createAsyncThunk(
    'product',
    async (id,thunkAPI) => {
        const res = await deleteProductA(id)
        return res
    },
)


export const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.fulfilled, (state, { payload }) => {
                state.arrProducts = payload
                state.status = "fullfilled"
            })
            
           

    },
})


//export const {  updateProduct } = ProductSlice.actions

export default ProductSlice.reducer