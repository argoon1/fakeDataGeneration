import styles from "./dataTableHeader.module.css";
const DataTableHeader = () => {
  return (
    <thead className={styles.dataHeader}>
      <tr>
        <th>index</th>
        <th>id</th>
        <th>full name</th>
        <th>Address</th>
        <th>Phone</th>
      </tr>
    </thead>
  );
};

export default DataTableHeader;
