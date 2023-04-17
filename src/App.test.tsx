import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import BookList from './components/BookList';
import {changeRating} from './BLL/booksSlice';
import {Store} from "@reduxjs/toolkit";
// @ts-ignore
import configureStore from 'redux-mock-store'
import {Book} from "./types/types";

const mockStore = configureStore([]);

describe('BookList', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore({
      books: [
        { id: 1, name: 'Book 1', rating: 4 },
        { id: 2, name: 'Book 2', rating: 3 },
        { id: 3, name: 'Book 3', rating: 5 },
      ],
    });
  });

  afterAll(() => console.log('The last test has finished')  )

  test('renders the list of books sorted by rating', () => {
    render(
        <Provider store={store}>
          <BookList />
        </Provider>
    );

    const bookItems = store.getState().books.sort((a: Book, b: Book) => b.rating - a.rating);
    expect(bookItems).toHaveLength(3);
    expect(bookItems[0]).toHaveTextContent('Book 3');
    expect(bookItems[1]).toHaveTextContent('Book 1');
    expect(bookItems[2]).toHaveTextContent('Book 2');
  });

  test('changes the rating of a book at a random interval', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    render(
        <Provider store={store}>
          <BookList />
        </Provider>
    );

    const startBtn = screen.getByText('Start!');
    fireEvent.click(startBtn);

    jest.useFakeTimers();
    jest.advanceTimersByTime(2500);

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
        changeRating({ id: 2, rating: expect.any(String) })
    );

    jest.advanceTimersByTime(2500);

    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect(dispatchSpy).toHaveBeenCalledWith(
        changeRating({ id: 2, rating: expect.any(String) })
    );

    const stopBtn = screen.getByText('Stop!');
    fireEvent.click(stopBtn);

    jest.advanceTimersByTime(2500);

    expect(dispatchSpy).toHaveBeenCalledTimes(2);
  });
});

