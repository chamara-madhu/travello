import React, { useState } from "react";
import { IonContent, IonPage, IonButton, IonText, IonIcon } from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import { Camera, CameraResultType } from "@capacitor/camera"; // for camera
import { Geolocation } from "@capacitor/geolocation"; // for geolocation
import { Preferences } from "@capacitor/preferences"; // for local data storage
import { Filesystem, Directory } from "@capacitor/filesystem"; // for file storage
import InputField from "../components/fields/InputField"; // for file storage
import "../styles/addTravel.css";
import TextareaField from "../components/fields/TextareaField";
import UploadField from "../components/fields/UploadField";
import { useHistory } from "react-router";

const AddTravelHistory: React.FC = () => {
  const [form, setForm] = useState<{ title: string; note: string }>({
    title: "",
    note: "",
  });
  const [errors, setErrors] = useState<{
    title?: string;
    note?: string;
    photo?: string;
  }>({});
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleTakePhoto = async () => {
    try {
      setErrors((prev) => ({
        ...prev,
        photo: "",
      }));

      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: "camera",
        quality: 90,
      });

      if (photo.webPath) {
        setPhotos((prev: any[]) => [...prev, photo.webPath]);
      }
    } catch (error) {
      console.error("Error capturing photo:", error);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { title?: string; note?: string; photo?: string } = {};
    if (!form.title) newErrors.title = "Title is required.";
    if (!form.note) newErrors.note = "Note is required.";
    if (photos.length === 0)
      newErrors.photo = "At least one photo is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveImage = async (imagePath: string, fileName: string) => {
    try {
      const base64Data = await convertToBase64(imagePath);

      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Data,
      });

      return savedFile?.uri;
    } catch (error) {
      console.error("Error saving image to filesystem:", error);
      throw error; // Re-throw error if you need to handle it elsewhere
    }
  };

  const convertToBase64 = async (imagePath: string): Promise<string | null> => {
    try {
      const response = await fetch(imagePath);
      const blob = await response.blob();
      const reader = new FileReader();

      return new Promise<string>((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error converting image to base64:", error);
      return null;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      // Get the current location
      const coordinates = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = coordinates.coords;

      // Reverse geocoding to get location name
      const geocodeUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`;
      const response = await fetch(geocodeUrl);
      const data = await response.json();

      if (data.error) {
        console.error("Geocoding failed:", data.error);
        return;
      }

      const locationName = data.display_name || "Unknown Location";

      // Process photos and save them
      const savedPhotos = await Promise.all(
        photos.map(async (photo, index) => {
          const uniquePath = `${Date.now()}_${index}_${Math.random().toString(
            36
          )}.jpg`;
          const path = await saveImage(photo, uniquePath);
          return path;
        })
      );

      // Construct the object to save
      const obj = {
        ...form,
        photos: savedPhotos,
        location: locationName,
        lat: latitude,
        lng: longitude,
        createdAt: new Date(),
      };

      // Retrieve existing travel history and add the new entry
      const { value } = await Preferences.get({ key: "travelHistory" });
      const travelHistory = value ? JSON.parse(value) : [];
      travelHistory.push(obj);

      // Save updated travel history to Storage
      await Preferences.set({
        key: "travelHistory",
        value: JSON.stringify(travelHistory),
      });

      // Navigate to home page after successful submission
      history.push("/"); // Redirecting to home page

      // Reset form after submission
      setForm({ title: "", note: "" });
      setPhotos([]);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePhoto = (index: number) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos); // Update the state with the remaining photos
  };

  return (
    <IonPage>
      <IonContent className="add-travel-container">
        <div className="form-container">
          <IonText className="title">Add Travel Record</IonText>
          <InputField
            label="Title"
            name="title"
            error={errors.title}
            value={form.title}
            handleChange={handleChange}
          />
          <TextareaField
            label="Note"
            name="note"
            error={errors.note}
            value={form.note}
            handleChange={handleChange}
          />
          <UploadField handleTakePhoto={handleTakePhoto} error={errors.photo} />

          {photos?.length > 0 && (
            <div className="image-preview">
              {photos.map((img, index) => (
                <div key={index} className="image-container">
                  <img
                    src={img}
                    alt={`Captured ${index}`}
                    className="captured-image"
                  />
                  {/* Close icon to remove the photo */}
                  <IonIcon
                    icon={closeCircle}
                    className="close-icon"
                    onClick={() => handleRemovePhoto(index)} // Trigger the remove photo function
                  />
                </div>
              ))}
            </div>
          )}

          <IonButton
            expand="block"
            className="purple-button"
            onClick={handleSubmit}
          >
            {loading ? "Saving..." : "Save"}
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AddTravelHistory;
