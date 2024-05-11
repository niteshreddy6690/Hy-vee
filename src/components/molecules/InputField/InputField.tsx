import Field from "@/components/atoms/field";
import { useFormContext, Controller, useController } from "react-hook-form";
import Input from "@/components/atoms/input";

const getFieldValidationStatus = ({
  errorMessage,
  shouldDisableValidation,
  value,
}) => {
  if (errorMessage !== undefined) {
    return "invalid";
  }

  if (shouldDisableValidation || !value) {
    return "noValidation";
  }

  return "valid";
};

export default function InputField({
  type = "text",
  placeholder = "Enter your Name",
  attribute = "text",
  label = "Name: ",
  ...rest
}) {
  const { control, formState } = useFormContext();
  const {
    field,
    fieldState: { invalid, isTouched, isDirty, error },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name: attribute,
    control,
    rules: { required: true },
  });
  const isValid =
    getFieldValidationStatus({
      errorMessage: error,
      shouldDisableValidation: false,
      value: field.value,
    }) === "valid";
  return (
    <Field error={error} label={label}>
      <Input
        placeholder={placeholder}
        onChange={field.onChange} // send value to hook form
        onBlur={field.onBlur} // notify when input is touched/blur
        value={field.value} // input value
        name={field.name} // send down the input name
        ref={field.ref}
        isValid
      />
    </Field>
  );
}
