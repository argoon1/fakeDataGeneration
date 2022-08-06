import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { GenerateDataForm } from "../../sharedDataTypes";
const useDataAction = () => {
  let schema = yup.object().shape({
    region: yup.string().required(),
    errorCount: yup.number().required().integer().min(0).max(10),
    seed: yup.number().required().positive().integer(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<GenerateDataForm>({
    resolver: yupResolver(schema),
  });
  function generateRandomSeed() {
    setValue("seed", Math.floor(Math.random() * 1000) + 1);
  }

  return {
    register,
    handleSubmit,
    errors,
    generateRandomSeed,
  };
};

export default useDataAction;
