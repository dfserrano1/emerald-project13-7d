import React, { useState } from 'react';
import Less from './CommentFlagButton.less';
import {getReport} from '../../Utils/requests';
import {createReport} from '../../Utils/requests';
import {updateReport} from '../../Utils/requests';
import {HiddenStatus} from './ModerationCheck.jsx';
import { Button } from 'antd';

export default function CommentFlagButton({uniqueKey}){

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
    let report = getReport(uniqueKey); //retreive report
    if (report == null) { //if report does not exist...
      createReport(uniqueKey, userID); //create the report
      report = getReport(uniqueKey); //assign new report
    } else { //otherwise...
      addReporter(report, userID); //add user to existing reporters list
    }
    const thresholdResult = EvaluateThreshold(report); //evaluate threshold
    if (thresholdResult == HiddenStatus.GloballyHidden) { //if threshold is met...
      report.setGloballyHidden(hide); //globally hide post
    }
    hideContent(uniqueKey, userID); //call locally hidden function from gallery team
  }

  function Unflag() { //unflag content
    let report = getReport(uniqueKey); //retrieve report
    removeReporter(report, userID); //remove reporter
      if (report.report_count == 0) //if no more reporters exist...
        destroyReport(report); //remove report from database
    report = getReport(uniqueKey); //see if report still exists
    if (report != null) { //if so...
      const thresholdResult = EvaluateThreshold(report); //reevaluate threshold
      if (thresholdResult == HiddenStatus.Displayed) {//if threshold is not met...
        report.setGloballyHidden(false); //globally display post
      }
    }
    hideContent(uniqueKey, userID); //call locally unhide function from gallery team
  }

  return (
    <span className ={status}>
        <Button className="flag" onClick={ HandleClick }> </Button>
    </span>
  );
}
