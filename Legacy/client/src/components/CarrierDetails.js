import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from "reactstrap"
import { getCarrierDets } from "../modules/carrierManager"

export const CarrierDetails = () => {
    const { carrierId } = useParams()
    const [carrier, setCarrier] = useState()

    const getCarrierInfo = () => {
        getCarrierDets(carrierId).then((c) => setCarrier(c))
    }

    useEffect(
        () => {
            getCarrierInfo()
        },
        []
    )
    return <>

        <Card key={carrier?.id} style={{ width: '18rem' }}>
            <Row >
                <Col >
                    <CardImg top width="50%" src={carrier?.logoUrl} alt="Card image cap" />
                    <CardBody>
                        <CardTitle><strong>Contact Info for {carrier?.name}</strong></CardTitle>
                        <CardText>Phone: {carrier?.phoneNumber}</CardText>
                        <CardText>Address: {carrier?.address}</CardText>
                    </CardBody>
                </Col>
            </Row>
        </Card>
    </>
}