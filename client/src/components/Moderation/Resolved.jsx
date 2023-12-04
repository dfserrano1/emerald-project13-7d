import React, {useState, useEffect} from 'react';
import './Resolved.less';
import '../../views/Administrator/Administrator.less';
import {createReport, getReports} from '../../Utils/requests';

export default function Resolved({isPending, updateSelectedIncident}) {
  const [dataArray, setDataArray] = useState([]);
  const [newPendingIncidents, setNewPendingIncidents] = useState([]);
  const [newResolvedIncidents, setNewResolvedIncidents] = useState([]);
  const [newPendingIncidentsComments, setNewPendingIncidentsComments] = useState([]);
  const [newResolvedIncidentsComments, setNewResolvedIncidentsComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getReports();
        const newData = result.data;
        setDataArray(newData);

        // Filter the data after setting the state
        const newPending = newData.filter((incident) => incident.report_status === "pending" && incident.content_type === "project");
        setNewPendingIncidents(newPending);

        const newResolved = newData.filter((incident) => incident.report_status !== "pending" && incident.content_type === "project");
        setNewResolvedIncidents(newResolved);

        const newPendingComments = newData.filter((incident) => incident.report_status === "pending" && incident.content_type === "comment");
        setNewPendingIncidentsComments(newPendingComments);

        const newResolvedComments = newData.filter((incident) => incident.report_status !== "pending" && incident.content_type === "comment");
        setNewResolvedIncidentsComments(newResolvedComments);
      }
      catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      }
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(dataArray);

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
            <tr className="pending" onClick={() => updateSelectedIncident(incident)}>
              <td>{incident.user_name}</td>
              <td>{incident.report_count}</td>
              <td>{incident.views}</td>
              <td>{incident.report_status}</td>
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
              <tr className={incident.report_status=="approved" ? "approved" : "rejected"} onClick={() => updateSelectedIncident(incident)}>
                <td>{incident.user_name}</td>
                <td>{incident.report_count}</td>
                <td>{incident.views}</td>
                <td>{incident.report_status}</td>
              </tr>
            )}
        </tbody>
      );
    }
  }

  function renderIncidentsComments() {
    if (isPending) {
      return(
        <tbody>
          {/* Map incident information to specific column */}
          {newPendingIncidentsComments.map((incident)=>
            <tr className="pending" onClick={() => updateSelectedIncident(incident)}>
              <td>{incident.user_name}</td>
              <td>{incident.report_count}</td>
              <td>{incident.views}</td>
              <td>{incident.report_status}</td>
            </tr>
          )}
        </tbody>
      );
    }
    else {
      return(
        <tbody>
            {/* Map incident information to specific column */}
            {newResolvedIncidentsComments.map((incident)=>
              <tr className={incident.report_status=="approved" ? "approved" : "rejected"} onClick={() => updateSelectedIncident(incident)}>
                <td>{incident.user_name}</td>
                <td>{incident.report_count}</td>
                <td>{incident.views}</td>
                <td>{incident.report_status}</td>
              </tr>
            )}
        </tbody>
      );
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error!</div>;
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
            {renderIncidentsComments()}
          </table>
        </div>
      </div>
    </span>
  );
}
