import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import { CarrierList } from "./Carrier/CarrierList";
import { CarrierDetails } from "./Carrier/CarrierDetails";
import { CarrierEdit } from "./Carrier/CarrierEdit";
import { CarrierForm } from "./Carrier/CarrierForm";
import { CarrierDelete } from "./Carrier/CarrierDelete";




export default function ApplicationViews({ isLoggedIn, isAdmin }) {
  return (
    <main>
      <Routes>
        <Route path="/">
           <Route
            index
            element={isLoggedIn ? <Hello /> : <Navigate to="/login" />}
          /> 
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="carrier" element={isLoggedIn ? <CarrierList isAdmin={isAdmin}/> : <Navigate to="/login" />} />
          <Route path="carrier/create" element={isLoggedIn ? <CarrierForm /> : <Navigate to="/login" />} />
          <Route path="carrier/details/:carrierId" element={isLoggedIn ? <CarrierDetails /> : <Navigate to="/login" />} />
          <Route path="carrier/:carrierId" element={isLoggedIn ? <CarrierEdit /> : <Navigate to="/login" />} />
          <Route path="carrier/delete/:carrierId" element={isLoggedIn ? <CarrierDelete /> : <Navigate to="/login" />} />
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
};
