import React, {useState, useEffect} from 'react';
import './Resolved.less';
import data from './Data/MOCK_DATA.json';
import '../../views/Administrator/Administrator.less'
import {createReport, getReports} from '../../Utils/requests'

// Resolved Tab
export default function Resolved({isPending, updateSelected}) {
    // set data from JSON file to incidentList 
    const [incidentList, setIncidentList] = useState(data);

    const [dataArray, setDataArray] = useState();
    const [newPendingIncidents, setNewPendingIncidents] = useState();
    const [newResolvedIncidents, setNewResolvedIncidents] = useState();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getReports();
                const newData = result.data;
                setDataArray(newData);
    
                // Filter the data after setting the state
                const newPending = newData.filter((incident) => incident.report_status === 0);
                setNewPendingIncidents(newPending);

                const newResolved = newData.filter((incident) => incident.report_status !== 0);
                setNewResolvedIncidents(newResolved);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, []);

    
    console.log(dataArray);



    // filter out resolved incidents
    const [pendingIncidents, setPendingIncidents] = useState(incidentList.filter((incident) =>
        incident.status < 1
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
                    {newPendingIncidents.map((incident)=>
                        <tr className="pending" onClick={displayInfo}>
                            <td>{incident.user_name}</td>
                            <td>{incident.report_count}</td>
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
                    {newResolvedIncidents.map((incident)=>
                        <tr className={incident.report_status==1 ? "approved" : "rejected"} onClick={displayInfo}>
                            <td>{incident.user_name}</td>
                            <td>{incident.report_count}</td>
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
        if (incident.report_status == 1){
            return "Approved";
        } else if (incident.report_status == 2) {
            return "Rejected";
        } else {
            return "Pending";
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