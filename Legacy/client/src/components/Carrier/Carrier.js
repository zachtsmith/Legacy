import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Carrier = ({ carrier, isBroker }) => {
   if (isBroker == true){
   return <>
        <tr className="white-text">
            <td className="bold">{carrier?.name}</td>
            <td><Link style={{textDecoration: 'none'}} className="white-text" to={`/carrier/details/${carrier.id}`}>Contact Info</Link></td>
            <td><Link style={{textDecoration: 'none'}} className="white-text" to={`/carrier/${carrier.id}`}>Edit</Link></td>
            <td><Link style={{textDecoration: 'none'}} className="white-text" to={`/carrier/delete/${carrier.id}`}>Delete</Link></td>
        </tr>
    </>}
    else {
        return <>
        <tr>
            <td className="bold">{carrier?.name}</td>
            <td><Link style={{textDecoration: 'none'}} to={`/carrier/details/${carrier.id}`}>Contact Info</Link></td>
        </tr>
    </>
    }
}