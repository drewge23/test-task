import Rating from '@mui/material/Rating';
import React from 'react';
import {changeRating} from "../BLL/booksSlice";
import {useDispatch} from "react-redux";
import {Book} from "../types/types";

function BookItem(props: Book) {
    const dispatch = useDispatch()

    return (
        <div>
            <h3>{props.name}</h3>
            <Rating name="book-rating"
                    value={props.rating}
                    onChange={(e, newValue) => {
                        dispatch(changeRating({
                            id: props.id,
                            rating: newValue,
                        }));
                    }} precision={0.1} />
        </div>
    );
}

export default BookItem;