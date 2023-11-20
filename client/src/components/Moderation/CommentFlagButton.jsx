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

  function Flag() {
    alert("The content has been flagged! Uniqiue key: " + uniqueKey);
    setStatus("Clicked");
    setClicked(true);
    const report = getReport(uniqueKey);
    if (report == null)
    {
      //createReport(uniqueKey);
      report = getReport(uniqueKey);
    } else
    {
      //add user to reports array
      updateReport(report.unique_key, report.views, (report.report_count + 1), report.user_name, report.report_status, report.id);
    }
    const thresholdResult = EvaluateThreshold(report);
    if (thresholdResult == HiddenStatus.GloballyHidden)
    {
      //report.setGloballyHidden(globallyhidden)
    } else if (thresholdResult == HiddenStatus.Displayed)
    {
      //report.setGloballyHidden(displayed)
    }
    //call locally hidden function from gallery team
  }

  function Unflag() {
    alert("The content has been unflagged! Unique key: " + uniqueKey);
    setStatus("Unclicked");
    setClicked(false);
    const report = getReport(uniqueKey);
    if (report == null)
    {
      //throw error
    } else
    {
      //remove user from reports array
      updateReport(report.unique_key, report.views, (report.report_count - 1), report.user_name, report.report_status, report.id);
      if (report.report_count == 0) {
        //remove report from db
      }
    }
    const thresholdResult = EvaluateThreshold(report);
    if (thresholdResult == HiddenStatus.GloballyHidden)
    {
      //report.setGloballyHidden(globallyhidden)
    } else if (thresholdResult == HiddenStatus.Displayed)
    {
      //report.setGloballyHidden(displayed)
    }
    //call locally unhide function from gallery team
  }

  return (
    <span className ={status}>
        <Button className="flag" onClick={ HandleClick }> </Button>
    </span>
  );
}
