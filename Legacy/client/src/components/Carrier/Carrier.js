import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Carrier = ({ carrier, isAdmin }) => {
   if (isAdmin == true){
   return <>
        <tr>
            <td>{carrier?.name}</td>
            <td><Link to={`/carrier/details/${carrier.id}`}>Contact Info</Link></td>
            <td><Link to={`/carrier/${carrier.id}`}>Edit</Link></td>
            <td><Link to={`/carrier/delete/${carrier.id}`}>Delete</Link></td>
        </tr>
    </>}
    else {
        return <>
        <tr>
            <td>{carrier?.name}</td>
            <td><Link to={`/carrier/details/${carrier.id}`}>Contact Info</Link></td>
        </tr>
    </>
    }
}