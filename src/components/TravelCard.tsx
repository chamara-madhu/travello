import { Capacitor } from "@capacitor/core";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonImg,
  IonLabel,
  IonText,
} from "@ionic/react";
import { locationSharp } from "ionicons/icons";
import moment from "moment";

interface Card {
  title: string;
  note: string;
  location: string;
  photos: string[];
  createdAt: string;
}

const TravelCard: React.FC<Card> = ({
  location,
  title,
  photos,
  note,
  createdAt,
}) => {
  const platform = Capacitor.getPlatform();

  return (
    <IonCard className="travel-card">
      <IonCardHeader className="header">
        {platform === "web" && (
          <div className="location">
            <div className="icon-wrapper">
              <IonIcon icon={locationSharp} className="icon" />
            </div>
            <IonLabel className="label">{location}</IonLabel>
          </div>
        )}
        <IonCardTitle className="title">{title}</IonCardTitle>
        {platform !== "web" && (
          <div className="location">
            <div className="icon-wrapper">
              <IonIcon icon={locationSharp} className="icon" />
            </div>
            <IonLabel className="label">{location}</IonLabel>
          </div>
        )}
      </IonCardHeader>

      <IonCardContent className="card-content">
        {photos && photos.length > 0 && (
          <div className="image-gallery">
            {photos.map((img: string, imgIndex: number) => (
              <IonImg
                key={imgIndex}
                src={img}
                alt={`Travel photo ${imgIndex + 1}`}
                className="travel-photo"
              />
            ))}
          </div>
        )}

        <IonText className="description">{note}</IonText>

        <IonLabel className="date-time">
          {moment.utc(createdAt).local().format("YYYY-MM-DD HH:MM A")}
        </IonLabel>
      </IonCardContent>
    </IonCard>
  );
};

export default TravelCard;
