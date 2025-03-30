type FieldErrorProps = {
  fieldErrors: Record<string, string[] | undefined>;
  errorName: string;
};

const FieldError = ({ fieldErrors, errorName }: FieldErrorProps) => {
  return <span>{fieldErrors?.[errorName]?.[0]}</span>;
};

export default FieldError;
