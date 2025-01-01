import { IonInput } from "@ionic/react";

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  handleChange: any;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  error,
  handleChange,
}) => {
  return (
    <div>
      <IonInput
        className={error ? "input-field error" : "input-field"}
        placeholder={label}
        name={name}
        value={value}
        onIonChange={handleChange}
        required
        style={{ padding: "10px" }}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default InputField;
