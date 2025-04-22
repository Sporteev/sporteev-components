import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const Page = () => {
  return <div className="flex flex-col gap-4 p-4">Testing page</div>;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
);
