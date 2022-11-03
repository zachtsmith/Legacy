import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { getAllCarriers } from "../../modules/carrierManager";
import { getAllProducts } from "../../modules/productManager";
import { Product } from "./Product";

export const ProductList = ({ isBroker, user }) => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const [carrier, setCarriers] = useState([]);

    const getProducts = () => {
        getAllProducts().then(products => setProducts(products));
    };

    useEffect(() => {
        getProducts();
    }, []);

    
    const getCarriers = () => {
        getAllCarriers().then(carriers => setCarriers(carriers));
    };

    useEffect(() => {
        getCarriers();
    }, []);


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div style={{ display: 'flex' }} className="white-text"><h3>List of Products</h3>
                
                {isBroker === true ?
                            <Button  style={{ marginLeft: "auto", marginTop: "6px", backgroundColor:"white", color:"goldenrod" }} className="addNewProductButton" onClick={() => navigate("/product/create")}>ADD NEW PRODUCT</Button> : ""}
                </div>
                <Table className="white-text">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Take a closer look.</th>
                            <th></th>
                        </tr>
                    </thead>
                    
                    <tbody className="white-text">
                    {isBroker === true ? 
                    products.map((prod) => {if (prod.userProfileProduct.userId === user.id){ 
                            return <Product product={prod} key={prod.id} isBroker={isBroker} />}
                    }) 
                :
                products.map((prod) => { 
                    return <Product product={prod} key={prod.id} isBroker={isBroker} />}
            )}
                    </tbody>
                            </Table> 
            </div>
        </div>
    );
}

