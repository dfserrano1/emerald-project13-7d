import React, {useState} from 'react';
import './Resolved.less';
import data from './Data/MOCK_DATA.json';
import ActionButtons from "./ActionButtons"
import './ActionButtons.less'
import '../../views/Administrator/Administrator.less'

export default function Resolved() {
    // set data from JSON file to incidentList 
    const [incidentList, setIncidentList] = useState(data);

    // filter out pending incidents
    const [resolvedIncidents, setResolvedIncidents] = useState(incidentList.filter((incident) =>
        incident.status != 0
    ));

    // change status from integer to string
    function convertStatus(incident) {
        if (incident.status == 1){
            return "Approved";
        } else if (incident.status == 2) {
            return "Rejected";
        } else {
            return "pending";
        }
    }

    function editButton(incident) {
        if (incident.status == 1){
            return <ActionButtons uniqueKey={ incident.id } display={ 2 } />;
        } else {
            return <ActionButtons uniqueKey={ incident.id } display={ 1 } />;
        }
    }

    return (
      <span className="Resolved">
          <h1>Resolved</h1>
          <div className="table-container">
            <h2>Resolved Projects</h2>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Project Name</th>
                        <th># of Reports</th>
                        <th># of Views</th>
                        <th>Status</th>
                        {/* <th>Edit</th> */}
                    </tr>
                </thead>
                <tbody>
                    {resolvedIncidents.map((incident)=>
                        <tr className={incident.status==1 ? "approved" : "rejected"}>
                            <td>{incident.username}</td>
                            <td>{incident.project}</td>
                            <td>{incident.reports}</td>
                            <td>{incident.views}</td>
                            <td>
                                {convertStatus(incident)}
                            </td>
                            {/* <td>
                                {editButton(incident)}
                            </td> */}
                        </tr>
                    )}
                </tbody>
            </table>
          </div>
          <div className='summary'>
            <h2>Incident Summary</h2>
            <h3>Select an incident to view more information</h3>
          </div>
      </span>
    );
  }