import ActionButtons from "../../components/Moderation/ActionButtons";
import OpenButton from "../../components/Moderation/OpenButton";
import "./ViewIncident.less";

function ViewIncident({ incident }) {
  // Passes a different value into the ActionButtons display prop depending on how many buttons
  // must be rendered.
  function setActionButtonDisplay() {
    if (incident.report_status == "pending") {
      return 0; // Pending Incidents: Display both buttons.
    }
    else if (incident.report_status == "approved") {
      return 2; // Approved Incidents: Display only the Reject button.
    }
    else if (incident.report_status == "rejected") {
      return 1; // Rejected Incidents: Display only the Approve button.
    }
  }

  // Renders Incident Summary box content depending on whether an incident is selected.
  function renderContent() {
    if (incident === null) {
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
        <div className={incident.report_status}>
          <b>Username:</b> {incident.user_name}
          {
            incident.content_type === "project" ?
            <div><b>Project Name:</b> {incident.content_title}</div>
            : <div><b>Comment:</b> {incident.content_text}</div>
          }
          <b>Reports:</b> {incident.report_count}
          <br />
          <b>Views:</b> {incident.views}
          <br />
          <b>Status:</b> {incident.report_status}
          <br />
          <br />
          <ActionButtons reportID={incident.id} display={setActionButtonDisplay()} />
          <OpenButton incident={incident} />
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
