import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Product = ({ product, isBroker }) => {
   if (isBroker == true){
   return <>
        <tr className="white-text">
            <td>{product?.productName}</td>
            <td><Link className="white-text" to={`/product/details/${product.id}`}>Product Details</Link></td>
            <td><Link className="white-text" to={`/product/${product.id}`}>Edit</Link></td>
            <td><Link className="white-text" to={`/product/delete/${product.id}`}>Delete</Link></td>
        </tr>
    </>}
    else {
        return <>
        <tr className="white-text">
            <td>{product?.productName}</td>
            <td><Link className="white-text" to={`/product/details/${product.id}`}>Product Details</Link></td>
        </tr>
    </>
    }
}