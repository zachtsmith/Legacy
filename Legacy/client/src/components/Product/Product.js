import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Product = ({ product, isBroker }) => {
   if (isBroker == true){
   return <>
        <tr>
            <td>{product?.productName}</td>
            <td><Link to={`/product/details/${product.id}`}>Product Details</Link></td>
            <td><Link to={`/product/${product.id}`}>Edit</Link></td>
            <td><Link to={`/product/delete/${product.id}`}>Delete</Link></td>
        </tr>
    </>}
    else {
        return <>
        <tr>
            <td>{product?.productName}</td>
            <td><Link to={`/product/details/${product.id}`}>Product Details</Link></td>
        </tr>
    </>
    }
}