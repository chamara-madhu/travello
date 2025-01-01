import { IonTextarea } from "@ionic/react";

interface TextareaFieldProps {
  label: string;
  name: string;
  value: string;
  handleChange: any;
  error?: string;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  name,
  value,
  error,
  handleChange,
}) => {
  return (
    <div>
      <IonTextarea
        className={error ? "textarea-field error" : "textarea-field"}
        placeholder={label}
        name={name}
        value={value}
        onIonChange={handleChange}
        required
      ></IonTextarea>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default TextareaField;
