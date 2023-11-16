import "./ViewIncident.less";

function ViewIncident({ isPending, isProject }) {
  // Incident data should come from DB. Values are hardcoded for now.
  const user = "Student1";
  const title = "My Project";
  const reports = 5;
  const views = 100;
  const status = "Pending";
  const commentText = "This is a very very very very very very very very very long comment!";

  // Returns className for styling Incident Summary box. White for Pending Review tab, and green
  // or red for Resolved tab.
  function changeBoxColor() {
    if (status === "Pending") {
      return "pending";
    }
    else {
      if (status === "Approved") {
        return "resolved-approved";
      }
      else if (status === "Rejected") {
        return "resolved-rejected";
      }
    }
  }

  return (
    <div className="right-column">

      <h3><b>Incident Summary</b></h3>
      <p><b>Select an incident to view more information</b></p>

      <div className="view-incident">
        <div className={changeBoxColor()}>

          <b>User:</b> {user}
          <br />
          <b>Title:</b> {title}
          <br />
          <b>Reports:</b> {reports}
          <br />
          <b>Views:</b> {views}
          <br />
          <b>Status:</b> {status}
          <br />
          {isProject ? null : <div><b>Comment:</b> {commentText}</div>}

        </div>
      </div>

    </div>
  );
}

export default ViewIncident;
