import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import AdminTab from "../../components/Moderation/AdminTab";
import ViewIncident from "../../components/Moderation/ViewIncident";
import Resolved from "../../components/Moderation/Resolved"
import "./GalleryAdmin.less";

function GalleryAdmin() {
  const [activeTab, setActiveTab] = useState("Pending Review"); // PR tab is active by default.

  function updateActiveTab(tab) {
    setActiveTab(tab);
  }

  const [selectedID, setSelectedID] = useState(0);
  const [selectedIsProject, setSelectedIsProject] = useState(true); // Won't be needed in the future since DB should have isProject column.

  function updateSelected(id, isProject) {
    setSelectedID(id);
    setSelectedIsProject(isProject);
  }

  return (
    <div className="container nav-padding">
      <NavBar />

      {/* Tab Switcher Bar */}
      <div className="admin-tab-switcher">
        <AdminTab
          tabName="Pending Review" activeTab={activeTab} updateActiveTab={updateActiveTab}
        />
        <AdminTab
          tabName="Resolved" activeTab={activeTab} updateActiveTab={updateActiveTab}
        />
      </div>

      <br />

      <div className="right-column">
        <h3><b>Incident Summary</b></h3>
        <p><b>Select an incident to view more information</b></p>
        {selectedID == 0 ? null : <ViewIncident id={selectedID} isProject={selectedIsProject} />}
      </div>

      <Resolved isPending={activeTab === "Pending Review"} updateSelected={updateSelected} />

    </div>
  );
}

export default GalleryAdmin;
