import { useDataCtx } from "../../context/DataContext";
import useDataAction from "./useDataAction";

const DataActions = () => {
  const { register, handleSubmit, errors } = useDataAction();
  const { submitFormHandle } = useDataCtx();

  return (
    <form action="" onSubmit={handleSubmit(submitFormHandle)}>
      <label htmlFor="region">Choose country</label>

      <select id="region" {...register("region")}>
        <option value="England">England</option>
        <option value="Poland">Poland</option>
        <option value="Spain">Spain</option>
      </select>
      <input type="range" {...register("errorCount")} />
      <input type="number" {...register("seed")} />
      <button type="submit">generate data</button>
    </form>
  );
};

export default DataActions;
