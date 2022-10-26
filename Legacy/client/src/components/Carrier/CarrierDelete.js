
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "reactstrap"
import { getCarrier } from "../../modules/carrierManager"


export const CarrierDelete = () => {
    const { carrierId } = useParams()
    const [carrier, setCarrier] = useState([])
    const navigate = useNavigate()

    const getCar = () => {
        getCarrier(carrierId).then(car => setCarrier(car));
    }
    useEffect(
        () => {
            getCar()
        },
        []
    )

    const deleteButton = () => {
        return <Button onClick={() => {
            fetch(`/api/carrier/delete/${carrierId}`, {
                method: "DELETE",
            })
                .then(() => {
                    navigate("/carrier")
                })
        }}>Yes, Delete.</Button> 
    }
    return <>
        <h2>Are you sure you want to delete {carrier.name} from your list of Carriers?</h2>
        <Button style={{marginLeft: '3px'}} 
        // className="btn-outline-primary" 
        onClick={() => {
            fetch(`/api/carrier/delete/${carrierId}`, {
                method: "DELETE",
            })
                .then(() => {
                    navigate("/carrier")
                })
        }}>Yes, Delete.</Button> 
        <Button style={{marginLeft: '3px'}}  onClick={() => {
            navigate("/carrier")
        }}>Cancel</Button>
    </>
}