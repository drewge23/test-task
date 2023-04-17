import React, {useEffect, useState} from 'react';
import BookItem from "./BookItem";
import {useDispatch, useSelector} from "react-redux";
import {Book} from '../types/types'
import {interval} from "rxjs";
import {changeRating} from "../BLL/booksSlice";
import s from './books.module.css'

const FREQUENCY = 2000

function BookList() {
    const books: Book[] = useSelector((state: any) => state.books)
    const sortedBooks = [...books].sort((a, b) => a.rating - b.rating);

    const dispatch = useDispatch()
    const ratingChangeSubscribeFunc = () =>
        dispatch(changeRating({
                id: Math.floor(Math.random() * (books.length || 10)) + 1,
                rating: Number((Math.random() * 5).toFixed(1))
            })
        )

    const [isChanging, setIsChanging] = useState(false)
    const [subscription, setSubscription] = useState()
    useEffect(() => {
        if (isChanging) {
            let tempSubscription = interval(FREQUENCY).subscribe(ratingChangeSubscribeFunc)
            // @ts-ignore
            setSubscription(tempSubscription)
        } else if (subscription) { // @ts-ignore
            subscription.unsubscribe()
        }
    }, [isChanging])

    return (
        <div>
            {sortedBooks
                .sort((a, b) => b.rating - a.rating)
                .map((book, index) => {
                    return <BookItem id={book.id} name={book.name} rating={book.rating} key={book.id}/>
                })}
            <button onClick={() => setIsChanging(!isChanging)} className={s.changeBtn}>
                {isChanging
                    ? 'Stop!'
                    : 'Start!'}
            </button>
        </div>
    );
}

export default BookList;