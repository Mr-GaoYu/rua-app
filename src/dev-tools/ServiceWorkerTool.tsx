import React from "react";

const ServiceWorkerTool: React.FC<{}> = (_) => {
  const _workerActive =
    localStorage.getItem("devTools/mock-service-worker-enabled") ?? "disabled";
  const workerActive = _workerActive === "enabled";

  React.useEffect(() => {
    if (workerActive) {
    } else {
    }
  }, [workerActive]);

  const handleToggleWorker = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    localStorage.setItem(
      "devTools/mock-service-worker-enabled",
      checked ? "enabled" : "disabled"
    );
    window.location.reload();
  };

  return (
    <React.Fragment>
      <span>Mock Service Worker: {workerActive ? "Enabled" : "Disabled"}</span>
      <input
        type="checkbox"
        checked={workerActive}
        onChange={(e) => handleToggleWorker(e)}
      />
    </React.Fragment>
  );
};

export default ServiceWorkerTool;
