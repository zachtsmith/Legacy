import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap"
import { getAllCarriers } from "../../modules/carrierManager"
import { getProduct } from "../../modules/productManager"

export const ProductEdit = ({ user }) => {
    const navigate = useNavigate()
    const { productId } = useParams()
    const [carriers, setCarriers] = useState([]);

    const [product, setProduct] = useState({
        id: 0,
        productName: "",
        productType: "",
        length: "",
        benefitAmount: 0,
        carrier: {
            id: 0,
            name: "",
            phoneNumber: 0,
            address: "",
            logoUrl: ""
        }
    })


    const getCarriers = () => {
        getAllCarriers().then(carriers => setCarriers(carriers));
    };

    useEffect(() => {
        getCarriers();
    }, []);

    const getProducts = () => {
        getProduct(productId).then(prod => setProduct(prod));
    }
    useEffect(
        () => {
            getProducts()
        },
        []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`/api/product/${productId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(() => {
                navigate("/product")
            })


    }
    return <>

        <Card>
            <CardBody>

                <Form className="ProductForm">
                    <FormGroup>
                        <Label for="name">Product</Label>
                        <div>
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
                            } ><option value={0}
                            > {product.carrier.name} </option>
                                {carriers.map( 
                                    (carrier, index) => { if(carrier.userProfileCarrier.userId === user.id){
                                        return (<option value={carrier.id} key={index}
                                        >{carrier?.name}</option>
                                        )}
                                    })}
        
                            </select>
                            </div>
                        <Input
                            id="product"
                            name="product"
                            type="text"
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
                            style={{marginBottom: '6px'}}
                            value={product.benefitAmount}
                            onChange={
                                (evt) => {
                                    const copy = { ...product }
                                    copy.benefitAmount = evt.target.value
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