import React from "react";
import {Navigate, Outlet, Route, Routes, useParams} from "react-router-dom";

import Authentication from "./pages/Authentification/Authentication.tsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Profile from "./pages/Profile/Profile.tsx";
import Parking from "./pages/Parking/Parking.tsx";

import "primereact/resources/themes/saga-green/theme.css";
import './App.css'
import 'primeicons/primeicons.css';


function App() {
    const isAuthenticated = () => {
        const myAccount = localStorage.getItem('account');
        return !!myAccount;
    }

    const PrivateRoute = ({path}) => {
        const auth = isAuthenticated();
        return auth ? <Outlet/> : <Navigate to={path}/>;
    };

    return (
        <Routes>
            <Route path="/auth" element={<Authentication/>}/>
            <Route path="/homepage" element={<PrivateRoute path="/auth"/>}>
                <Route path="/homepage" element={<Homepage/>}/>
            </Route>
            <Route path="/parking/:id" element={<PrivateRoute path="/auth"/>}>
                <Route path="/parking/:id" element={<Parking id={useParams()}/>}/>
            </Route>
            <Route path="/profile" element={<PrivateRoute path="/auth"/>}>
                <Route path="/profile" element={<Profile/>}/>
            </Route>
            <Route path="*" element={"404 error"}/>
        </Routes>
    )
}

export default App

