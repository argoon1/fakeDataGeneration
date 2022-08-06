import { CSVLink } from "react-csv";
import { useDataCtx } from "../../context/DataContext";
import { getCsvFromFakeData } from "./downloadCsvUtils";

const DownloadCSV = () => {
  const { fakePeopleData } = useDataCtx();
  return (
    <div>
      <CSVLink data={getCsvFromFakeData(fakePeopleData)}>EXPORT CSV</CSVLink>
    </div>
  );
};

export default DownloadCSV;
