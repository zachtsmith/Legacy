import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Table } from "reactstrap";
import App from "../../App";
import { getAllCarriers } from "../../modules/carrierManager";
import { Carrier } from "./Carrier";
import '../../App.css'
import { getUserProfile } from "../../modules/userProfileManager";


export const CarrierList = ({ isBroker, user }) => {
    const navigate = useNavigate()
    
    const [carrier, setCarriers] = useState([]);
    
    const getCarriers = () => {
        getAllCarriers().then(carriers => setCarriers(carriers));
    };

    useEffect(() => {
        getCarriers();
    }, []);

    return (

        <div className="container">
            <div className="row justify-content-center">
                <div className="white-text">
                <h3>CARRIERS</h3>
                <Table >
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="white-text"> 
                    {isBroker === true ? 
                        carrier.map((car) => {if (car.userProfileCarrier.userId === user.id) {
                            return <><Carrier carrier={car} key={car.userProfileCarrier.id} isBroker={isBroker} /></>
                        }}) 
                        
                        : 
                        carrier.map((car) =>  {
                            return <><Carrier carrier={car} key={car.userProfileCarrier.id} isBroker={isBroker} /></>
                        }) }
                    </tbody>
                </Table>{isBroker === true ?
                <Button style={{ marginLeft: "auto", marginTop: "6px", backgroundColor:"white", color:"goldenrod" }} className="addNewProductButton" onClick={() => navigate("/carrier/create")}>ADD NEW CARRIER</Button> : ""}
            </div>
        </div>
        </div>
    );
}