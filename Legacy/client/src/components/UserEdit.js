import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap"
import { getCurrentUserByFirebaseId, getUserHealth, getUserProfile } from "../modules/userProfileManager"



export const UserEdit = ({ }) => {
    const navigate = useNavigate()
    const [userProfile, setUserProfile] = useState({
        id: 0,
        name: "",
        firebaseUserId: "",
        email: "",
        imageLocation: "",
        userTypeId: 0,
        userType: "",
        weight: 0,
        age: 0,
        isDiabetic: "",
        isSmoker: "",
        medications: ""
    })
      useEffect(() => {
        getCurrentUserByFirebaseId()?.then((user) => {
          setUserProfile(user)
        });
      }, [])

      const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`/api/userProfile/${userProfile.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userProfile)
        })
            .then(() => {
                navigate("/")
            })

    }
    return <>
        
        <Card>
            <CardBody>
                <Form className="HealthForm"><strong>Health Information</strong>
                    <FormGroup>
                        
                        <Label for="weight">Weight:</Label>
                        <Input
                            id="userHealth"
                            name="userHealth"
                            type="text"
                            placeholder="Weight"
                            value={userProfile.weight}
                            style={{marginBottom: '6px'}}
                            onChange={
                                (evt) => {
                                    const copy = { ...userProfile }
                                    copy.weight = evt.target.value
                                    setUserProfile(copy)
                                }
                            } 
                            />
                             <Label for="Age">Age:</Label>
                        <Input
                            id="userHealth"
                            name="userHealth"
                            type="text"
                            placeholder="Age"
                            value={userProfile.age}
                            style={{marginBottom: '6px'}}
                            onChange={
                                (evt) => {
                                    const copy = { ...userProfile }
                                    copy.age = evt.target.value
                                    setUserProfile(copy)
                                }
                            } />
                            <Label for="isDiabetic">Are you diabetic?</Label>
                        {/* <Input
                            id="userHealth"
                            name="userHealth"
                            type="radio"
                            value={userProfile.isDiabetic}
                            style={{marginBottom: '6px'}}
                            onChange={
                                (evt) => {
                                    const copy = { ...userProfile }
                                    copy.isDiabetic = evt.target.value
                                    setUserProfile(copy)
                                } */}
                            <div>
                            <label>
                                <input 
                                    type="radio" 
                                    name="isPublished" 
                                     value="true"
                                     checked={userProfile.isDiabetic === true}
                                    onChange={
                                        (evt) => {
                                            const copy = { ...userProfile }
                                            copy.isDiabetic = evt.target.value
                                            setUserProfile(copy)
                                    }} />
                                        Yes
                            </label>
                            </div>
                            <div className="radio">
                            <label>
                            <input 
                                    type="radio" 
                                    name="isPublished" 
                                    value="false"
                                   checked={userProfile.isDiabetic === false}
                                    onChange={(evt) => {
                                        const copy = { ...userProfile }
                                        copy.isDiabetic = evt.target.value
                                        setUserProfile(copy)
                                }} />
                                         No
                            </label></div>
                            <Label for="isSmoker">Are you a smoker?</Label>
                        <Input
                        id="userHealth"
                        name="userHealth"
                        type="text"
                        placeholder="Weight"
                        value={userProfile.isSmoker}
                        style={{marginBottom: '6px'}}
                        onChange={
                            (evt) => {
                                const copy = { ...userProfile }
                                copy.isSmoker = evt.target.value
                                setUserProfile(copy)
                                }
                            } />
                            <Label for="medications">Please list all of your medications.</Label>
                        <Input
                            id="userHealth"
                            name="userHealth"
                            type="form"
                            placeholder="Please list all your medications."
                            value={userProfile.medications}
                            style={{marginBottom: '6px'}}
                            onChange={
                                (evt) => {
                                    const copy = { ...userProfile }
                                    copy.medications = evt.target.value
                                    setUserProfile(copy)
                                }
                            } />

                    </FormGroup>
                    <Button style={{marginBottom: '6px'}} onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                        className="btn btn-primary">
                        Save
                    </Button>
                </Form>
                <Button onClick={() => navigate("/")}>Cancel</Button>
            </CardBody>
        </Card>
    </>
}