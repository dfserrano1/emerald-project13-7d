import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import AdminTab from "../../components/Moderation/AdminTab";
import PostPreview from "../../components/Moderation/PostPreview";
import "./GalleryAdmin.less";

function GalleryAdmin() {
  const [activeTab, setActiveTab] = useState("Pending Review"); // PR tab is active by default.
  
  function displayTabContent() {
    let tabContent = null;

    if (activeTab === "Pending Review") {
      tabContent = (
        <p>This is the Pending Review tab!</p>
      );
    }
    else { // activeTab === Resolved tab.
      tabContent = (
        <p>This is the Resolved tab!</p>
      );
    }

    return tabContent;
  }

  return (
    <div className="container nav-padding">
      <NavBar />

      {/* Tab Switcher Bar */}
      <div className="admin-tab-switcher">
        <AdminTab tabName="Pending Review" activeTab={activeTab} setActiveTab={setActiveTab} />
        <AdminTab tabName="Resolved" activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {displayTabContent()}
      <PostPreview />

    </div>
  );
}

export default GalleryAdmin;
