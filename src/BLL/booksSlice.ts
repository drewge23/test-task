import {createSlice} from "@reduxjs/toolkit";
import books from '../data/books.json'

const booksSlice = createSlice({
    name: 'books',
    initialState: books,
    reducers: {
        changeRating: (state, action) => {
            let index = state.findIndex(book => book.id === action.payload.id)
            state[index].rating = action.payload.rating
            return state
        }
    }
})

export default booksSlice.reducer
export const {changeRating} = booksSlice.actions