import React, { useState, useEffect } from "react";
import { CardGroup } from "reactstrap";
import { getUserProfiles } from "../modules/userProfileManager";
import { User } from "./User";

export const ClientProfiles = ({ isBroker }) => {
    const [userProfiles, setUserProfiles] = useState();


    useEffect(() => {
        getUserProfiles().then((userProfiles) => {
            setUserProfiles(userProfiles)
        });
    }, []);

    return <>
        {
            userProfiles?.map((up) => {if (up.userType === "Client"){
                return <User userProfile={up} key={up.id} isBroker={isBroker}/>}
            })}

    </>
}

export const BrokerProfiles = ({isBroker}) => {
    const [userProfiles, setUserProfiles] = useState();


    useEffect(() => {
        getUserProfiles().then((userProfiles) => {
            setUserProfiles(userProfiles)
        });
    }, []);

    return <>
        {
            userProfiles?.map((up) => {if (up.userType === "Broker"){
                return <User userProfile={up} key={up.id} isBroker={isBroker}/>}
            })}

    </>
}