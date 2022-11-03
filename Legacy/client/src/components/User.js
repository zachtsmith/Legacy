import { useNavigate } from "react-router-dom"
import { Button, Card, CardBody, CardGroup, CardImg, CardText, CardTitle, Col, Container, Row } from "reactstrap"


export const User = ({ userProfile, isBroker }) => {
    const navigate = useNavigate()

    return <>
 



        <Card key={userProfile.id} style={{ width: '15rem' }}>
                    <CardImg top width="50%" height="300px" src={userProfile?.imageLocation} alt="Card image cap" />
                    <CardBody>
                        <CardTitle><strong><h3>{userProfile?.name}</h3></strong></CardTitle>
                        <CardTitle><strong>Email:</strong></CardTitle>
                        <CardText>{userProfile?.email}</CardText>
                         {isBroker === true ? 
                        <Button onClick={() => navigate(`/profiles/details/${userProfile.id}`)}>Client Details</Button> : ""
                    }                 
                    </CardBody>
        </Card>
    
                    
                    

    
                    
    </>
}