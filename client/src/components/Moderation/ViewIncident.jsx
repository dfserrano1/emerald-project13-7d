import Logo from '../../assets/casmm_logo.png';
import "./ViewIncident.less";

function ViewIncident({ isPending, isProject }) {
  const comment = "This is a very very very very very very very very very very very long comment!";

  let preview;
  if (isProject) {
    preview = <img src={Logo} className="preview" />
  }
  else {
    preview = (
      <p>
        <b>Comment:</b> {comment}
      </p>
    )
  }

  return (
    <div className="right-column">
      
      <h3>Incident Summary</h3>
      <p><b>Select an incident to view more information</b></p>

      <div className="view-post">
        <div className="left-text">
          <b>User:</b> Student1
          <br />
          <b>Title:</b> My Project
          <br />
          <b>Reports:</b> 5
          <br />
          <b>Views:</b> 100
          <br />

          {/* If we're in Pending Review tab, render nothing. Else, render Status. */}
          {isPending ? "" : <b>Status:</b>}
          <br />

          {/* If it's a project, render thumbnail. Else, render Comment preview. */}
          <div className="preview">
            {preview}
          </div>
        </div>
      </div>

    </div>
  );
}

export default ViewIncident;
