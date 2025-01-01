import { IonIcon } from "@ionic/react";
import { cloudUploadOutline } from "ionicons/icons";

interface UploadFieldProps {
  handleTakePhoto: any;
  error?: string;
}

const UploadField: React.FC<UploadFieldProps> = ({
  error,
  handleTakePhoto,
}) => {
  return (
    <div>
      <div className="upload-container" onClick={handleTakePhoto}>
        <label htmlFor="image-upload" className="upload-label">
          <IonIcon icon={cloudUploadOutline} className="upload-icon" />
          <p>Upload photos or take photos</p>
        </label>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default UploadField;
