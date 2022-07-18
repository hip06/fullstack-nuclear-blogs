import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./App";
import './index.css'
import 'tippy.js/dist/tippy.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import reduxConfig from './reduxConfig'
import { PersistGate } from "redux-persist/lib/integration/react";

const { store, persistor } = reduxConfig()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store} >
        <PersistGate persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>

);