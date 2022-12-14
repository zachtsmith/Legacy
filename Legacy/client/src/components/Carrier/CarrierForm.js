import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap"
import { addCarrier} from "../../modules/carrierManager"

export const CarrierForm = ({ user }) => {
    const navigate = useNavigate()


    const [carrier, setCarrier] = useState({
        id: 0,
        name: "",
        phoneNumber: "",
        address: "",
        logoUrl: "",
        userProfileCarrier: {
            id: 0,
            userId: user.id,
            carrierId: 0
        }
        
    })

   


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return addCarrier(carrier)
            .then(() => {
                navigate("/carrier")
            })


    }
    return <>
        
        <Card>
            <CardBody>
                <Form className="carrierForm">
                    <FormGroup>
                        <Label for="name">Carrier</Label>
                        <Input
                            id="carrier"
                            name="carrier"
                            type="text"
                            placeholder="Carrier Name"
                            value={carrier.name}
                            style={{marginBottom: '6px'}}
                            onChange={
                                (evt) => {
                                    const copy = { ...carrier }
                                    copy.name = evt.target.value
                                    setCarrier(copy)
                                }
                            } />
                            <Input
                            id="carrier"
                            name="carrier"
                            type="text"
                            placeholder="Phone Number xxx-xxx-xxxx"
                            style={{marginBottom: '6px'}}
                            value={carrier.phoneNumber}
                            onChange={
                                (evt) => {
                                    const copy = { ...carrier }
                                    copy.phoneNumber = evt.target.value
                                    setCarrier(copy)
                                }
                            } />
                            <Input
                            id="carrier"
                            name="carrier"
                            type="text"
                            placeholder="Address"
                            style={{marginBottom: '6px'}}
                            value={carrier.address}
                            onChange={
                                (evt) => {
                                    const copy = { ...carrier }
                                    copy.address = evt.target.value
                                    setCarrier(copy)
                                }
                            } />
                            <Input
                            id="carrier"
                            name="carrier"
                            type="text"
                            placeholder="Company picture"
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
                    <Button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                        className="btn btn-primary">
                        Save
                    </Button>
                </Form>
                <Button onClick={() => navigate("/carrier")}>Cancel</Button>
            </CardBody>
        </Card>
    </>
}