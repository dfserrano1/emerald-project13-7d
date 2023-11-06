import React, { useState } from 'react';
import './CommentFlagButton.less';
import FlagImage from '../../assets/flag.png'
//import { <-- Import database getter/setters necessary for button function
//  createActivity,
//  deleteActivity,
//  getLessonModuleActivities,
//} from "../../Utils/requests";
import { Button } from 'antd';

export default function CommentFlagButton({uniqueKey}) {

  let [status, setStatus] = useState("flag_unclicked");
  let [clicked, setClicked] = useState(false);
  //if user already reported comment: setAction("Unflag");
  //if user already reported comment: setClicked(true);
  //will be done by iterating through the array of reporters
  //for comment and attempting to match them with the user
  function HandleClick() {
    if (!clicked) {
      Flag();
    } else if (clicked) {
      Unflag();
    }
  }
  function Flag() {
    alert("The content has been flagged! Uniqiue key: " + uniqueKey);
    setStatus("flag_clicked");
    setClicked(true);
    //add user to array of reporters for specific post
    //hide content for specific user
  }

  function Unflag() {
    alert("The content has been unflagged! Unique key: " + uniqueKey);
    setStatus("flag_unclicked");
    setClicked(false);
    //remove user from array of reporters for specific post
    //unhide content from specific user
  }

  return (
    <span className="CommentFlagButton">
        <Button className={status} onClick={ HandleClick }> </Button>
    </span>
  );
} //style={{backgroundImage:"url('./images/logo.png')",backgroundSize:"cover", width:"40px", height:"40px"}}
