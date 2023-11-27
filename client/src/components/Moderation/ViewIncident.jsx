import data from './Data/MOCK_DATA.json';
import ActionButtons from "../../components/Moderation/ActionButtons";
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

  // Passes a different value into the ActionButtons display prop depending on how many buttons
  // must be rendered.
  function setActionButtonDisplay() {
    if (selected.status == 0) {
      return 0; // Pending Incidents: Display both buttons.
    }
    else if (selected.status == 1) {
      return 2; // Approved Incidents: Display only the Reject button.
    }
    else if (selected.status == 2) {
      return 1; // Rejected Incidents: Display only the Approve button.
    }
  }

  // Renders Incident Summary box content depending on whether an incident is selected.
  function renderContent() {
    if (id == 0) {
      return (
        <div className="pending">
          <b>Username:</b>
          <br />
          <b>Project Name:</b>
          <br />
          <b>Reports:</b>
          <br />
          <b>Views:</b>
          <br />
          <b>Status:</b>
          <br />
        </div>
      );
    }
    else {
      return (
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
          <br />
          <ActionButtons reportID={id} display={setActionButtonDisplay()} />
        </div>
      );
    }
  }

  return (
    <div className="view-incident">
      {renderContent()}
    </div>
  );
}

export default ViewIncident;
