import React from 'react';
import './ActionButtons.less';
import { getReport, updateReport, updateGloballyHidden, updateReportStatus } from "../../Utils/requests";
import { Button } from 'antd';

export default function ActionButtons({reportID, display = 0}) {

  function Approve() {
    // Mark content as appropriate and remove any restrictions on it
    alert("The content has been approved! Report ID: " + reportID);
    
    // Use setter from requests.js to update status column as approved
    updateReportStatus(reportID, "approved")

    // Remove hidden status from gallery, if hidden
    updateGloballyHidden(reportID, 0);
  }

  function Reject() {
    // Mark content as inappropriate and restrict it from being displayed publically
    alert("The content has been rejected! Report ID: " + reportID);

    // Use setter from requests.js to update status column as rejected
    updateReportStatus(reportID, "rejected")

    // Enabling hiding post from gallery if not already hidden
    updateGloballyHidden(reportID, 1);
  }

  if (display == 0) {
    return (
      <span className="ActionButtons">
          <Button className={'approve'} onClick={ Approve }>Approve</Button>
          <Button className={'reject'} onClick={ Reject }>Reject</Button>
      </span>
    );
  }
  if (display == 1) {
    return (
      <span className="ActionButtons">
          <Button className={'approve'} onClick={ Approve }>Approve</Button>
      </span>
    );
  }
  if (display == 2) {
    return (
      <span className="ActionButtons">
          <Button className={'reject'} onClick={ Reject }>Reject</Button>
      </span>
    );
  } else {
    return (
      <span className="ActionButtons">
          <Button className={'approve'} onClick={ Approve }>Approve</Button>
          <Button className={'reject'} onClick={ Reject }>Reject</Button>
      </span>
    );
  }
}
