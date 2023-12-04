import React, {useState, useEffect} from 'react';
import './Resolved.less';
import '../../views/Administrator/Administrator.less';
import { getReports } from '../../Utils/requests';

export default function Resolved({isPending, updateSelectedIncident}) {
  const [pendingProjects, setPendingProjects] = useState([]);
  const [resolvedProjects, setResolvedProjects] = useState([]);
  const [pendingComments, setPendingComments] = useState([]);
  const [resolvedComments, setResolvedComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieves incident data from Reports table of DB.
    const fetchData = async () => {
      try {
        const result = await getReports();
        const data = result.data; // Array of all reported incidents in the DB.

        // Filter data into pendingProjects/resolvedProjects/pendingComments/resolvedComments.
        const filter1 = data.filter((incident) =>
          incident.report_status === "pending" && incident.content_type === "project"
        );
        setPendingProjects(filter1);

        const filter2 = data.filter((incident) =>
          incident.report_status !== "pending" && incident.content_type === "project"
        );
        setResolvedProjects(filter2);

        const filter3 = data.filter((incident) =>
          incident.report_status === "pending" && incident.content_type === "comment"
        );
        setPendingComments(filter3);

        const filter4 = data.filter((incident) =>
          incident.report_status !== "pending" && incident.content_type === "comment"
        );
        setResolvedComments(filter4);
      }
      catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data!");
      }
      finally {
        setLoading(false); // All incidents have been retrieved.
      }
    };

    fetchData();
  }, []);

  if (loading) {
    // Needed so that React doesn't try to render incidents before they've been retrieved.
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  // Returns string with the appropriate header to render above Incident Tables.
  function printTableHeader(type) {
    if (isPending && type === "project") {
      return("Pending Projects");
    }
    else if (isPending && type === "comment") {
      return("Pending Comments");
    }
    else if (!isPending && type === "project") {
      return("Resolved Projects");
    }
    else {
      return("Resolved Comments");
    }
  }

  // Returns a new table row for each incident in the passed-in pending incidents array.
  function renderPending(incidents) {
    return (
      <tbody>
        {/* Map incident data to specific column. */}
        {incidents.map((incident) =>
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

  // Returns a new table row for each incident in the passed-in resolved incidents array.
  function renderResolved(incidents) {
    return(
      <tbody>
          {/* Map incident data to specific column. */}
          {incidents.map((incident)=>
            <tr
              className={incident.report_status === "approved" ? "approved" : "rejected"}
              onClick={() => updateSelectedIncident(incident)}
            >
              <td>{incident.user_name}</td>
              <td>{incident.report_count}</td>
              <td>{incident.views}</td>
              <td>{incident.report_status}</td>
            </tr>
          )}
      </tbody>
    );
  }

  // Output
  return (
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
            {isPending ? renderPending(pendingProjects) : renderResolved(resolvedProjects)}
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
            {isPending ? renderPending(pendingComments) : renderResolved(resolvedComments)}
          </table>
        </div>
      </div>
    </span>
  );
}
