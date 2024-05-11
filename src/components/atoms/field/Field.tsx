import {
  StyledField,
  StyledLabel,
  StyledMessage,
} from "@/components/atoms/field/styles";

export default function Field({ children, error, label }) {
  return (
    <StyledField>
      {label && <StyledLabel>{label}</StyledLabel>}
      {children}
      {error?.message && (
        <StyledMessage isValid={false}>{error?.message}</StyledMessage>
      )}
    </StyledField>
  );
}
