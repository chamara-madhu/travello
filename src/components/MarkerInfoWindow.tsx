import React from "react";
import { IonContent } from "@ionic/react";
import TravelCard from "./TravelCard";

interface Marker {
  selectedMarker: {
    id: number;
    title: string;
    note: string;
    location: string;
    photos: string[];
    createdAt: string;
  };
}

const MarkerInfoWindow: React.FC<Marker> = ({ selectedMarker }) => {
  return (
    <IonContent>
      <TravelCard {...selectedMarker} />
    </IonContent>
  );
};

export default MarkerInfoWindow;
