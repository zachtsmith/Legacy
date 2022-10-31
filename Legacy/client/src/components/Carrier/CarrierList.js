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
    // const { profileId } = useParams()
    const [carrier, setCarriers] = useState([]);
    
    // const [user, setUser] = useState()
    // const getUser = () => {
    //     getUserProfile(profileId).then((u) => setUser(u))
    // }

    // useEffect(
    //     () => {
    //         getUser()
    //     },
    //     []
    // )
   

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
                    
                        {carrier.map((car) => {if (car.userProfileCarrier.userId === user.id) {

                            return <><Carrier carrier={car} key={car.userProfileCarrier.id} isBroker={isBroker} /></>
                        }})}
                    </tbody>
                </Table>{isBroker === true ?
                <Button onClick={() => navigate("/carrier/create")}>Add new Carrier</Button> : ""}
            </div>
        </div>
        </div>
    );
}