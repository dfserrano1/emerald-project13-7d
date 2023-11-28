import React, { useState } from 'react';
import Less from './CommentFlagButton.less';
import {getReportFromGalleryID} from '../../Utils/requests';
import { updateGloballyHidden } from '../../Utils/requests';
import {updateReporters} from '../../Utils/requests';
import {deleteReport} from '../../Utils/requests';
import {createReport} from '../../Utils/requests';
import {updateReport} from '../../Utils/requests';
import {HiddenStatus} from './ModerationCheck.jsx';
import { Button } from 'antd';

export default function CommentFlagButton({galleryID, userID}){

  let [status, setStatus] = useState("Unclicked");
  let [clicked, setClicked] = useState(false);

  function EvaluateThreshold(report) {
    if (report.report_count >= 5)
    {
      return HiddenStatus.GloballyHidden;
    } else 
    {
      return HiddenStatus.Displayed;
    }
  }


  function HandleClick() {
    if (!clicked) {
      Flag();
    } else if (clicked) {
      Unflag();
    }
  }
  
  function Flag() { //flag content
    alert("The content has been flagged! Unique key: " + galleryID);
    setStatus("Clicked");
    setClicked(true);
    let report = getReportFromGalleryID(galleryID); //retrieve report
    if (report.unique_key == null) { //if report does not exist...
      //const content = getReportFromGalleryID(galleryID);
      const content = {id: galleryID, view_count: 1, like_count: 0 ,user_name: "liam", type: "Project", title:"", text: "hii"};
      //console.log(content.id);
      createReport(content, userID); //create the report
      report = getReportFromGalleryID(galleryID); //assign new report
    } 
    else { //otherwise...
      let newReporters = [];
      for (reporter in report.reporters.reporters) {
        newReporters.push(reporter);
      }
      newReporters.push(userID);
      updateReporters(report, newReporters); //add user to list of reporters
    }
    const thresholdResult = EvaluateThreshold(report); //evaluate threshold
    if (thresholdResult == HiddenStatus.GloballyHidden) { //if threshold is met...
      updateGloballyHidden(report, 1); //globally hide post
    }
    //hideContent(galleryID); //call locally hidden function from gallery team
  }

  function Unflag() { //unflag content
    alert("The content has been unflagged! Unique key: " + galleryID);
    setStatus("Unclicked");
    setClicked(false);
    let report = getReportFromGalleryID(galleryID); //retrieve report
    let newReporters = [];
    for (reporter in report.reporters.reporters) {
      if (userID != reporter) {
          newReporters.push(reporter);
      }
    }
    updateReporters(report, newReporters); //remove reporter
    deleteReport(report.id);
    if (newReporters.length == 0) { //if no more reporters exist...
       //remove report from database
    }
    report = getReportFromGalleryID(galleryID); //see if report still exists
    if (report != null) { //if so...
      const thresholdResult = EvaluateThreshold(report); //reevaluate threshold
      if (thresholdResult == HiddenStatus.Displayed) { //if threshold is not met...
        updateGloballyHidden(report, 0); //globally display post
      }
    }
    //hideContent(galleryID, userID); //call locally unhide function from gallery team
  }

  return (
    <span className ={status}>
        <Button className="flag" onClick={ HandleClick }> </Button>
    </span>
  );
}
