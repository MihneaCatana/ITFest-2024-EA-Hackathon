import React from 'react'
import ReactDOM from 'react-dom/client'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import App from './App.jsx'
import {PrimeReactProvider} from "primereact/api";
import {BrowserRouter} from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <PrimeReactProvider>
        <BrowserRouter>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </BrowserRouter>
    </PrimeReactProvider>
)
