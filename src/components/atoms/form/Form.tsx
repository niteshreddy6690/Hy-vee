import {
  useForm,
  FormProvider,
  useFormContext,
  SubmitHandler,
  useWatch,
} from "react-hook-form";
import Input from "@/components/atoms/input";
import { useEffect } from "react";

export default function Form({
  onSubmit,
  children,
  currentData,
  mode = "onTouched",
  onWatch,
  errors = [],
  ...rest
}) {
  const methods = useForm({
    defaultValues: currentData,
    mode,
  });
  const watching = useWatch({
    control: methods.control,
    defaultValue: currentData,
  });
  useEffect(() => {
    onWatch && onWatch(watching);
  }, [watching]);

  useEffect(() => {
    errors.forEach(({ target, type, message } = {}) => {
      if (!target) {
        return;
      }
      methods.setError(target, {
        type: type || "serverError",
        message,
      });
    });
  }, [errors]);

  return (
    <FormProvider {...methods} defaultValues={currentData}>
      <form onSubmit={methods.handleSubmit(onSubmit)} {...rest} noValidate>
        {children}
      </form>
    </FormProvider>
  );
}
