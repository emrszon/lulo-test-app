import React from "react";
import {  Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import { routes } from "./Routes";

const AppRouter = () => {
  
  return (
    <Routes>
      <Route
      path={"/"}
      element={<HomePage/>}
    />
      <Route
      path={routes.ROOMS.path}
      element={<routes.ROOMS.element/>}
    />
      <Route
      path={routes.RESERVATIONS.path}
      element={<routes.RESERVATIONS.element/>}
    />
    <Route
      path={routes.NOT_FOUND.path}
      element={<routes.NOT_FOUND.element />}
    />
      </Routes>
  )
}


export default AppRouter;