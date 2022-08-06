import { useDataCtx } from "../../context/DataContext";
import useDataAction from "./useDataAction";
import styles from "./dataActions.module.css";
const DataActions = () => {
  const { register, handleSubmit, errors, generateRandomSeed } =
    useDataAction();
  const { submitFormHandle } = useDataCtx();

  return (
    <>
      <form
        action=""
        onSubmit={handleSubmit(submitFormHandle)}
        className={styles.generateDataForm}
      >
        <label htmlFor="region">Choose country</label>
        <select id="region" {...register("region")}>
          <option value="England">England</option>
          <option value="Poland">Poland</option>
          <option value="Spain">Spain</option>
        </select>
        <label htmlFor="errorCount"> Error count</label>
        <input
          id="errorCount"
          type="range"
          {...register("errorCount")}
          min={0}
          max={10}
        />

        <label htmlFor="seed">Input seed</label>
        <input type="number" id="seed" {...register("seed")} />
        <button type="submit">generate data</button>
      </form>
      <div className={Object.values(errors).length && styles.errorMessages}>
        {Object.values(errors).map((err) => err.message)}
      </div>
    </>
  );
};

export default DataActions;
