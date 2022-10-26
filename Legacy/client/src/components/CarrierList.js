import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { getAllCarriers } from "../modules/carrierManager";
import { Carrier } from "./Carrier";
export const CarrierList = ({ isAdmin }) => {
    const navigate = useNavigate()
    const [carriers, setCarriers] = useState([]);

    const getCarriers = () => {
        getAllCarriers().then(carriers => setCarriers(carriers));
    };

    useEffect(() => {
        getCarriers();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <h3>CARRIERS</h3>
                <Table>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {carriers.map((car) => (
                            <Carrier carrier={car} key={car.id} isAdmin={isAdmin} />
                        ))}
                    </tbody>
                </Table>
                <Button onClick={() => navigate("/carrier/create")}>Add new Carrier</Button>
            </div>
        </div>
    );
}