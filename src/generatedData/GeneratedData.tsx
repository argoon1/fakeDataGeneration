import React from "react";
import DataTable from "./dataTable/DataTable";
import DataActions from "./dataActions/DataActions";
import useGeneratedData from "./useGeneratedData";

const GeneratedData = () => {
  const { ref, rootRef } = useGeneratedData();
  return (
    <>
      <DataActions />
      <tbody ref={rootRef}>
        <DataTable />
      </tbody>
    </>
  );
};

export default GeneratedData;
