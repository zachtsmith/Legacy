import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button, Card, CardBody, CardGroup, CardImg, CardText, CardTitle, Col, Row } from "reactstrap"
import { getUserProfile } from "../modules/userProfileManager"

export const UserDetails = () => {
    const { profileId } = useParams()
    const [user, setUser] = useState()
    const [userPolicy, setUserPolicy] = useState()

    const getUser = () => {
        getUserProfile(profileId).then((u) => setUser(u))
    }

    useEffect(
        () => {
            getUser()
        },
        []
    )
    return <>

        <Card key={user?.id} style={{ width: '16rem' }}>
            <Row >
                <CardGroup >
                    <CardImg top width="50%" src={user?.imageLocation} alt="Card image cap" />
                    <CardBody>
                        <CardTitle><strong>Name:</strong></CardTitle>
                        <CardText>{user?.name}</CardText>
                        <CardTitle><strong>Email:</strong></CardTitle>
                        <CardText>{user?.email}</CardText>
                        <CardTitle><strong>Age:</strong></CardTitle>
                        <CardText>{user?.age}</CardText>

                    </CardBody>
                </CardGroup>
            </Row>
        </Card>
    </>
}