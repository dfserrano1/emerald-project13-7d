import Logo from '../../assets/casmm_logo.png';
import "./ViewIncident.less";

function ViewIncident({ isPending, isProject }) {
  // Incident data should come from DB. Values are hardcoded for now.
  const user = "Student1";
  const title = "My Project";
  const reports = 5;
  const views = 100;
  const status = "Approved";

  // Renders status depending on if we're in the Pending Review or Resolved tab. Throws exception
  // if status value is unexpected with regards to the current tab.
  function renderStatus() {
    if (isPending) {
      if (status == null) {
        return null;
      }
      else {
        /*
        throw new Error("Selected incident in Pending Review tab has a status defined. " +
          "Only resolved incidents should have a status."
        );
        */
      }
    }
    else { // !isPending
      if (status === "Approved" || status === "Rejected") {
        return (
          <div>
            <b>Status:</b> {status}
          </div>
        );
      }
      else {
        /*
        throw new Error("Selected incident in Resolved tab has unexpected or undefined status." +
          "Expected \"Approved\" or \"Rejected\"."
        );
        */
      }
    }
  }

  let comment;
  let preview;
  if (isProject) {
    preview = <img src={Logo} className="preview" />; // Logo is a placeholder image.
  }
  else {
    comment = "This is a very very very very very very very very very very very long comment!";
    preview = (
      <div className="preview">
        <div>
          <b>Comment:</b> {comment}
        </div>
      </div>
    );
  }

  return (
    <div className="right-column">

      <h3><b>Incident Summary</b></h3>
      <p><b>Select an incident to view more information</b></p>

      <div className="view-post">
        <div className="left-text">

          <b>User:</b> {user}
          <br />
          <b>Title:</b> {title}
          <br />
          <b>Reports:</b> {reports}
          <br />
          <b>Views:</b> {views}
          <br />

          {/* If we're in Pending Review tab, render nothing. Else, render Status. */}
          {renderStatus()}
          <br />

          {/* If it's a project, render thumbnail. Else, render Comment. */}
          {preview}

        </div>
      </div>

    </div>
  );
}

export default ViewIncident;
