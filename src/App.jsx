import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

const Routers = () => {
  return (<Routes><Route path="/" element={<Home />} /></Routes>);
}

const App = () => {
  return (<BrowserRouter><Routers /></BrowserRouter>)
}
export default App