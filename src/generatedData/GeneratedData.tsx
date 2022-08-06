import React from "react";
import DataTable from "./dataTable/DataTable";
import DataActions from "./dataActions/DataActions";
import DownloadCSV from "./downloadCsv/DownloadCsv";

const GeneratedData = () => {
  return (
    <>
      <DataActions />
      <DataTable />
      <DownloadCSV />
    </>
  );
};

export default GeneratedData;
