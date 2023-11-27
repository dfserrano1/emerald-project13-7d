import React from "react"
import NavBar from "../../components/NavBar/NavBar"
import CommentFlagButton from "../../components/Moderation/CommentFlagButton"
import "./FlagPage.less"

export default function FlagPage(props) {
    const userID = 3;
    return (
        <div className="container nav-padding">
            <NavBar/>
            <CommentFlagButton uniqueKey={ userID } />
        </div>
    )
}