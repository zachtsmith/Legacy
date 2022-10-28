import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { getAllProducts } from "../../modules/productManager";
import { Product } from "./Product";

export const ProductList = ({ isBroker }) => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);

    const getProducts = () => {
        getAllProducts().then(products => setProducts(products));
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div style={{ display: 'flex' }}><h3>List of Products</h3>
                
                {isBroker === true ?
                            <Button  style={{ marginLeft: "auto" }} onClick={() => navigate("/product/create")}>Add new Product</Button> : ""}
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Take a closer look.</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((prod) => (
                            <Product product={prod} key={prod.id} isBroker={isBroker} />
                            ))}
                    </tbody>
                            </Table> 
            </div>
        </div>
    );
}