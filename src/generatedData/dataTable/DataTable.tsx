import DataTableBody from "./DataTableBody/DataTableBody";
import DataTableHeader from "./DataTableHeader/DataTableHeader";
import styles from "./data.module.css";
const DataTable = () => {
  return (
    <table className={styles.data}>
      <DataTableHeader />
      <DataTableBody />
    </table>
  );
};

export default DataTable;
