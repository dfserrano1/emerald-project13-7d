import React, {useState} from 'react';
import './Resolved.less';
import data from './Data/MOCK_DATA.json';
import '../../views/Administrator/Administrator.less'

// Resolved Tab
export default function Resolved({isPending}) {
    // set data from JSON file to incidentList 
    const [incidentList, setIncidentList] = useState(data);

    // filter out resolved incidents
    const [pendingIncidents, setPendingIncidents] = useState(incidentList.filter((incident) =>
        incident.status == 0
    ));

    // filter out pending incidents
    const [resolvedIncidents, setResolvedIncidents] = useState(incidentList.filter((incident) =>
        incident.status != 0
    ));

    function printTableHeader(type) {
        if (isPending && type == "project") {
            return("Pending Projects");
        }
        else if (isPending && type == "comment") {
            return("Pending Comments");
        }
        else if (!isPending && type == "project") {
            return("Resolved Projects");
        }
        else {
            return("Resolved Comments");
        }
    }

    function renderIncidents() {
        if (isPending) {
            return(
                <tbody>
                    {/* Map incident information to specific column */}
                    {pendingIncidents.map((incident)=>
                        <tr className="pending" onClick={displayInfo}>
                            <td>{incident.username}</td>
                            <td>{incident.project}</td>
                            <td>{incident.reports}</td>
                            <td>{incident.views}</td>
                            <td>
                                {convertStatus(incident)}
                            </td>
                        </tr>
                    )}
                </tbody>
            );
        }
        else {
            return(
                <tbody>
                    {/* Map incident information to specific column */}
                    {resolvedIncidents.map((incident)=>
                        <tr className={incident.status==1 ? "approved" : "rejected"} onClick={displayInfo}>
                            <td>{incident.username}</td>
                            <td>{incident.project}</td>
                            <td>{incident.reports}</td>
                            <td>{incident.views}</td>
                            <td>
                                {convertStatus(incident)}
                            </td>
                        </tr>
                    )}
                </tbody>
            );
        }
    }


    // change status from integer to string
    function convertStatus(incident) {
        if (incident.status == 1){
            return "Approved";
        } else if (incident.status == 2) {
            return "Rejected";
        } else {
            return "Pending";
        }
    }

    // Temporary function to test onClick fucntionality of table
    function displayInfo() {
        if (isPending) {
            alert("info for incident");
        }
        else {
            alert("resolved");
        }
        
    }

    // Output
    return (
        // Resolved Class
      <span className="Resolved">
            {/* Create Table */}
            <div className='incident-tables'>
                <h3><b>{printTableHeader("project")}</b></h3>
                <div className="projects-table">
                    <table>
                        <thead>
                            {/* Table Column Names */}
                            <tr>
                                <th>Username</th>
                                <th>Project Name</th>
                                <th># of Reports</th>
                                <th># of Views</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        {renderIncidents()}
                    </table>
                </div>
                <h3><b>{printTableHeader("comment")}</b></h3>
                <div className='comments-table'>
                    <table>
                        <thead>
                            {/* Table Column Names */}
                            <tr>
                                <th>Username</th>
                                <th># of Reports</th>
                                <th># of Views</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
      </span>
    );
  }