import React from 'react';
import './App.css';
import BookList from "./components/BookList";
import {Provider} from "react-redux";
import store from "./BLL/store";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <BookList/>
            </div>
        </Provider>
    );
}

export default App;
