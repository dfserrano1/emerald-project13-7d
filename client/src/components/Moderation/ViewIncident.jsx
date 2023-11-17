import data from './Data/MOCK_DATA.json';
import "./ViewIncident.less";

function ViewIncident({ id, isProject }) {
  const selected = data.find((incident) => (incident.id == id)); // Instead of this, do getReport() to get report with matching ID from DB.
  const commentText = "This is a comment!"; // Won't be needed in the future since DB should have commentText column.

  // Returns className for styling Incident Summary box. White for Pending Review tab, and green
  // or red for Resolved tab.
  function getStatus() {
    if (selected.status == 0) {
      return "Pending";
    }
    else if (selected.status == 1) {
      return "Approved";
    }
    else if (selected.status == 2) {
      return "Rejected";
    }
  }

  return (
    <div className="view-incident">
      <div className={getStatus().toLowerCase()}>

        <b>Username:</b> {selected.username}
        <br />
        <b>Project Name:</b> {selected.project}
        <br />
        <b>Reports:</b> {selected.reports}
        <br />
        <b>Views:</b> {selected.views}
        <br />
        <b>Status:</b> {getStatus()}
        <br />
        {isProject ? null : <div><b>Comment:</b> {commentText}</div>}

      </div>
    </div>
  );
}

export default ViewIncident;
