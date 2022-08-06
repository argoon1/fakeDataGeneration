import { useDataCtx } from "../../../context/DataContext";
import { PersonData } from "../../../sharedDataTypes";
import styles from "./dataTableBody.module.css";
import useDataBody from "./useDataBody";
const DataTableBody = ({}) => {
  const { fakePeopleData, updateData } = useDataCtx();
  const { lastItemRef } = useDataBody(updateData);
  return (
    <tbody className={styles.dataTable}>
      {fakePeopleData.map(
        ({ idx: personIdx, id, fullName, address, phone }: PersonData, idx) => (
          <tr ref={idx === fakePeopleData.length - 1 ? lastItemRef : null}>
            <td>{personIdx}</td>
            <td>{id}</td>
            <td>{fullName}</td>
            <td>{address}</td>
            <td>{phone}</td>
          </tr>
        )
      )}
    </tbody>
  );
};

export default DataTableBody;
// 1) Index (1, 2, 3, ...)
// 2) Random identifier
// 3) Name + middle name + last name (in region format)
// 4) Address (in several possible formats, e.g. city+street+building+appartment or county+city+street+house)
// 5) Phone (again, it's great to have several formats, e.g. international or local ones)
