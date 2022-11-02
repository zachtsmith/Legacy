import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap"
import { getCarrier } from "../../modules/carrierManager"

export const CarrierEdit = ({ }) => {
    const navigate = useNavigate()
    const { carrierId } = useParams()

    const [carrier, setCarrier] = useState({
        id: 0,
        name: "",
        phoneNumber: "",
        address: "",
        logUrl: ""
    })

    const getCarriers = () => {
        getCarrier(carrierId).then(car => setCarrier(car));
    }
    useEffect(
        () => {
            getCarriers()
        },
        []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`/api/carrier/${carrierId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carrier)
        })
            .then(() => {
                navigate("/carrier")
            })


    }
    return <>

        <Card>
            <CardBody>

                <Form className="carrierForm">
                    <FormGroup>
                        <Label for="name"><strong>Carrier</strong></Label>
                        <Input
                            id="carrier"
                            name="carrier"
                            type="text"
                            style={{marginBottom: '6px'}}
                            value={carrier.name}
                            onChange={
                                (evt) => {
                                    const copy = { ...carrier }
                                    copy.name = evt.target.value
                                    setCarrier(copy)
                                }
                            } />
                            <Label for="phoneNumber"><strong>Phone Number</strong></Label>
                            <Input
                            id="carrier"
                            name="carrier"
                            type="text"
                            style={{marginBottom: '6px'}}
                            value={carrier.phoneNumber}
                            onChange={
                                (evt) => {
                                    const copy = { ...carrier }
                                    copy.phoneNumber = evt.target.value
                                    setCarrier(copy)
                                }
                            } />
                            <Label for="address"><strong>Address</strong></Label>
                            <Input
                            id="carrier"
                            name="carrier"
                            type="text"
                            style={{marginBottom: '6px'}}
                            value={carrier.address}
                            onChange={
                                (evt) => {
                                    const copy = { ...carrier }
                                    copy.address = evt.target.value
                                    setCarrier(copy)
                                }
                            } />
                            <Label for="logoUrl"><strong>Carrier Logo</strong></Label>
                            <Input
                            id="carrier"
                            name="carrier"
                            type="text"
                            style={{marginBottom: '6px'}}
                            value={carrier.logoUrl}
                            onChange={
                                (evt) => {
                                    const copy = { ...carrier }
                                    copy.logoUrl = evt.target.value
                                    setCarrier(copy)
                                }
                            } />

                    </FormGroup>
                    <Button style={{marginBottom: '6px'}} onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                        className="btn btn-primary">
                        Save
                    </Button>
                </Form>
                <Button style={{marginBottom: '6px'}} onClick={() => navigate("/carrier")}>Cancel</Button>
            </CardBody>
        </Card>
    </>
}