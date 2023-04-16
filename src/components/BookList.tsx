import React from 'react';
import BookItem from "./BookItem";
import {useSelector} from "react-redux";
import {Book} from '../types/types'

function BookList() {
    const books: Book[] = useSelector((state: any) => state.books)
    const sortedBooks = [...books].sort((a, b) => a.rating - b.rating);

    return (
        <div>
            {sortedBooks
                .sort((a, b) => b.rating - a.rating)
                .map((book, index) => {
                return <BookItem id={book.id} name={book.name} rating={book.rating} key={book.id}/>
            })}
        </div>
    );
}

export default BookList;