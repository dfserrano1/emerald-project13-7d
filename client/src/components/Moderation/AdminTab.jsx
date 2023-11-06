import "./AdminTab.less";

function AdminTab({ tabName, activeTab, setActiveTab }) {
  const isActive = (activeTab === tabName);
  
  function handleTabClick() {
    setActiveTab(tabName);
  };
  
  return (
    // Color of tab depends on whether it's selected or not.
    <div className={`admin-tab ${isActive ? "active" : ""}`} onClick={handleTabClick}>
      {tabName}
    </div>
  );
}

export default AdminTab;
