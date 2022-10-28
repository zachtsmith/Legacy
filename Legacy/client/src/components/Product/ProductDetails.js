import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from "reactstrap"
import { getProductDets } from "../../modules/productManager"
import CurrencyFormat from 'react-currency-format';
export const ProductDetails = () => {
    const { productId } = useParams()
    const [product, setProduct] = useState()

    const getProductInfo = () => {
        getProductDets(productId).then((c) => setProduct(c))
    }

    useEffect(
        () => {
            getProductInfo()
        },
        []
    )
    return <>

        <Card key={product?.id} style={{ width: '18rem' }}>
            <Row >
                <Col >
                    <CardImg top width="50%" src={product?.carrier?.logoUrl} alt="Card image cap" />
                    <CardBody>
                        <CardTitle><h3>{product?.productName}</h3></CardTitle>
                        <CardText>Type: {product?.productType}</CardText>
                        <CardText>Length: {product?.length} (years)</CardText>
                        <CardText>Benefit Amount: <CurrencyFormat value={product?.benefitAmount} displayType={'text'} thousandSeparator={true} prefix={'$'}/></CardText>
                        <CardText>Carrier: {product?.carrier.name}</CardText>
                    </CardBody>
                </Col>
            </Row>
        </Card>
    </>
}