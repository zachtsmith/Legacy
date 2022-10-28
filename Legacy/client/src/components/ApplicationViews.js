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
import { ProductList } from "./Product/ProductList";
import { ProductDetails } from "./Product/ProductDetails";
import { ProductForm } from "./Product/ProductForm";
import { ProductEdit } from "./Product/ProductEdit";
import { ProductDelete } from "./Product/ProductDelete";
import { BrokerProfiles, ClientProfiles, UserProfiles } from "./UserProfiles";
import { UserDetails } from "./UserDetails";
import { UserEdit} from "./UserEdit";




export default function ApplicationViews({ isLoggedIn, isBroker }) {
  return (
    <main>
      <Routes>
        <Route path="/">
           <Route
            index
            element={isLoggedIn ? <Hello isLoggedIn={isLoggedIn}/> : <Navigate to="/login" />}
          /> 
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="profiles" element={!isLoggedIn ? <Navigate to="/login" /> : isBroker ? <ClientProfiles isBroker={isBroker}/> : <BrokerProfiles isBroker={isBroker}/>}/>
          {/* <Route path="profiles" element={!isLoggedIn ? <Navigate to="/login" /> : isBroker === false ? <BrokerProfiles/> : <h1>Access Denied!</h1>}/> */}
          <Route path="profiles/details/:profileId" element={!isLoggedIn ? <Navigate to="/login" /> : isBroker ? <UserDetails /> : <h1>Access Denied!</h1>}/>

          <Route path="carrier" element={isLoggedIn ? <CarrierList isBroker={isBroker}/> : <Navigate to="/login" />} />
          <Route path="carrier/create" element={isLoggedIn ? <CarrierForm /> : <Navigate to="/login" />} />
          <Route path="carrier/details/:carrierId" element={isLoggedIn ? <CarrierDetails /> : <Navigate to="/login" />} />
          <Route path="carrier/:carrierId" element={isLoggedIn ? <CarrierEdit /> : <Navigate to="/login" />} />
          <Route path="carrier/delete/:carrierId" element={isLoggedIn ? <CarrierDelete /> : <Navigate to="/login" />} />

          <Route path="product" element={isLoggedIn ? <ProductList isBroker={isBroker}/> : <Navigate to="/login" />} />
          <Route path="product/details/:productId" element={isLoggedIn ? <ProductDetails /> : <Navigate to="/login" />} />
          <Route path="product/create" element={isLoggedIn ? <ProductForm /> : <Navigate to="/login" />} />
          <Route path="product/:productId" element={isLoggedIn ? <ProductEdit /> : <Navigate to="/login" />} />
          <Route path="product/delete/:productId" element={isLoggedIn ? <ProductDelete /> : <Navigate to="/login" />} />

          <Route path="profiles/:profileId" element={isLoggedIn ? <UserEdit /> : <Navigate to="/login" />} />

          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
};
