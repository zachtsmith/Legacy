import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Carrier = ({ carrier, isBroker }) => {
   if (isBroker == true){
   return <>
        <tr className="white-text">
            <td>{carrier?.name}</td>
            <td><Link className="white-text" to={`/carrier/details/${carrier.id}`}>Contact Info</Link></td>
            <td><Link className="white-text" to={`/carrier/${carrier.id}`}>Edit</Link></td>
            <td><Link className="white-text" to={`/carrier/delete/${carrier.id}`}>Delete</Link></td>
        </tr>
    </>}
    else {
        return <>
        <tr className="white-text">
            <td>{carrier?.name}</td>
            <td><Link className="white-text" to={`/carrier/details/${carrier.id}`}>Contact Info</Link></td>
        </tr>
    </>
    }
}