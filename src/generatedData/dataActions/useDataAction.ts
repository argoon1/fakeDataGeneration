import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { GenerateDataForm } from "../../sharedDataTypes";
const useDataAction = () => {
  let schema = yup.object().shape({
    region: yup.string().required(),
    errorCount: yup.number().required().positive().integer(),
    seed: yup.number().required().positive().integer(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GenerateDataForm>({
    resolver: yupResolver(schema),
  });

  return {
    register,
    handleSubmit,
    errors,
  };
};

export default useDataAction;
