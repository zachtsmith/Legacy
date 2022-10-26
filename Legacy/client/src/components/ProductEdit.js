import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap"
import { getCarrier } from "../../modules/carrierManager"
import { getProduct } from "../modules/productManager"

export const ProductEdit = ({ }) => {
    const navigate = useNavigate()
    const { productId } = useParams()

    const [product, setProduct] = useState({
        id: 0,
        productName: "",
        productType: "",
        length: "",
        benefitAmount: 0
    })

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
                        <Input
                            id="product"
                            name="product"
                            type="text"
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