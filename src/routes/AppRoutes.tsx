import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Login } from "../pages/Login";
import { Application } from "../pages/Application";

export function AppRoutes() {
    return(
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/" element={<Login />}   />
                <Route path="/reset_password/:token" element={<Login />}  />
                <Route path="/application" element={<Application />}  />
            </Routes>
        </BrowserRouter>
    );
}