import React from "react"
import NavBar from "../../components/NavBar/NavBar"
import ActionButtons from "../../components/Moderation/ActionButtons"
import Resolved from "../../components/Moderation/Resolved"
import "./Administrator.less"
import { useGlobalState } from "../../Utils/userState"

// Output for Administrator Page 
export default function Administrator(props) {
  const [value] = useGlobalState("currUser")
  const num = 3;
  if (value.role === "ContentCreator") { // Change to administrator role
    return (
      <div className="container nav-padding">
        <NavBar />
        <Resolved/>
        <ActionButtons reportID={1} />
      </div>
    )
  } else {
    return (
      <p>Unauthorized.</p>
    )
  }

}
