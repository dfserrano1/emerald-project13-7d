import React from "react"
import NavBar from "../../components/NavBar/NavBar"
import CommentFlagButton from "../../components/Moderation/CommentFlagButton"
import "./Administrator.less"

export default function Administrator(props) {
  const num = 3;
  return (
    <div className="container nav-padding">
      <NavBar />
      <CommentFlagButton uniqueKey={ num } />
    </div>
  )
}
