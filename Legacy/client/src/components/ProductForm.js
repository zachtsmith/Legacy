import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap"
import { getAllCarriers } from "../modules/carrierManager"
import { addProduct } from "../modules/productManager"


export const ProductForm = ({ }) => {
    const navigate = useNavigate()
    
    
    const [product, setProduct] = useState({
        id: 0,
        carrierId: 0,
        productName: "",
        productType: "",
        length: "",
        benefitAmount: ""
    })
    
    const [carriers, setCarriers] = useState([]);

    const getCarriers = () => {
        getAllCarriers().then(carriers => setCarriers(carriers));
    };

    useEffect(() => {
        getCarriers();
    }, []);


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return addProduct(product)
            .then(() => {
                navigate("/product")
            })


    }
    return <>
        
        <Card>
            <CardBody>

                <Form className="productForm">
                    <FormGroup>
                        <Label for="name"><h3>New Product</h3></Label><div>
                        <select
                            id="product"
                            name="product"
                            type="text"
                            style={{marginBottom: '6px'}}
                            onChange={
                                (evt) => {
                                    const copy = { ...product }
                                    copy.carrierId = parseInt(evt.target.value)
                                    setProduct(copy)
                                }
                            } ><option value={0}> Select Carrier </option>
                                {carriers.map(
                                    (carrier, index) => {
                                        return (<option value={carrier.id} key={index}
                                        >{carrier?.name}</option>
                                        )
                                    })}
        
                            </select>
                            </div>
                        <Input
                            id="product"
                            name="product"
                            type="text"
                            placeholder="Product Name"
                            style={{marginBottom: '6px'}}
                            value={product.productName}
                            onChange={
                                (evt) => {
                                    const copy = { ...product }
                                    copy.productName = evt.target.value
                                    setProduct(copy)
                                }
                            } />
                            <Input
                            id="product"
                            name="product"
                            type="text"
                            placeholder="Product Type"
                            style={{marginBottom: '6px'}}
                            value={product.productType}
                            onChange={
                                (evt) => {
                                    const copy = { ...product }
                                    copy.productType = evt.target.value
                                    setProduct(copy)
                                }
                            } />
                            <Input
                            id="product"
                            name="product"
                            type="text"
                            placeholder="Term Length"
                            style={{marginBottom: '6px'}}
                            value={product.length}
                            onChange={
                                (evt) => {
                                    const copy = { ...product }
                                    copy.length = evt.target.value
                                    setProduct(copy)
                                }
                            } />
                            <Input
                            id="product"
                            name="product"
                            type="number"
                            placeholder="Benefit Amount (values only) ex. $100,000 = 100000"
                            style={{marginBottom: '6px'}}
                            value={product.benefitAmount}
                            onChange={
                                (evt) => {
                                    const copy = { ...product }
                                    copy.benefitAmount = parseInt(evt.target.value)
                                    setProduct(copy)
                                }
                            } />
                            

                    </FormGroup>
                    <Button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                        className="btn btn-primary">
                        Save
                    </Button>
                </Form>
                <Button onClick={() => navigate("/product")}>Cancel</Button>
            </CardBody>
        </Card>
    </>
}