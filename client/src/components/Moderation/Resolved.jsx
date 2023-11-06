import React, {useState} from 'react';
import './Resolved.less';
import data from './Data/MOCK_DATA.json';

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
            return <button>Reject</button>;
        } else {
            return <button>Approve</button>;
        }
    }

    return (
      <span className="Resolved">
          <h1>Resolved</h1>
          <div className="container">
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Project Name</th>
                        <th>Project Thumbnail</th>
                        <th># of Views</th>
                        <th># of Reports</th>
                        <th>Status</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {resolvedIncidents.map((incident)=>
                        <tr>
                            <td>{incident.username}</td>
                            <td>{incident.project}</td>
                            <td>
                                <img src={incident.thumbnail}/>
                            </td>
                            <td>{incident.views}</td>
                            <td>{incident.reports}</td>
                            <td>
                                {convertStatus(incident)}
                            </td>
                            <td>
                                {editButton(incident)}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
          </div>
      </span>
    );
  }