import React from "react"
import NavBar from "../../components/NavBar/NavBar"
import ActionButtons from "../../components/Moderation/ActionButtons"
import "./Administrator.less"

export default function Administrator(props) {
  const num = 3;
  return (
    <div className="container nav-padding">
      <NavBar />
      <ActionButtons uniqueKey={ num } />
    </div>
  )
}
