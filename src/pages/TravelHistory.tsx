import React, { useState, useCallback } from "react";
import {
  IonContent,
  IonPage,
  IonText,
  useIonViewWillEnter,
} from "@ionic/react";
import "../styles/travelHistory.css";
import { Preferences } from "@capacitor/preferences";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { Capacitor } from "@capacitor/core";
import TravelCard from "../components/TravelCard";
import SearchBar from "../components/SearchBar";

const TravelHistory: React.FC = () => {
  const [savedData, setSavedData] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const platform = Capacitor.getPlatform();

  const loadImage = async (filePath: string): Promise<string | null> => {
    try {
      if (platform === "web") {
        const file = await Filesystem.readFile({
          path: filePath.replaceAll("/DATA/", ""),
          directory: Directory.Data,
        });

        // Convert the base64 data to an image URL
        return `data:image/jpeg;base64,${file.data}`;
      } else {
        const convertedPath = (window as any).Ionic.WebView.convertFileSrc(
          filePath
        );

        return convertedPath;
      }
    } catch (error) {
      console.warn(`Error reading file at ${filePath}:`, error);
      return null;
    }
  };

  const loadSavedData = useCallback(async () => {
    try {
      const { value } = await Preferences.get({ key: "travelHistory" });

      if (value) {
        const data = JSON.parse(value);

        // Process each entry and load images
        for (const entry of data) {
          if (entry.photos && Array.isArray(entry.photos)) {
            const imageUrls = await Promise.all(
              entry.photos.map(async (filePath: string) => {
                const imageUrl = await loadImage(filePath);

                if (!imageUrl) {
                  console.warn(`File not found: ${filePath}`);
                }
                return imageUrl;
              })
            );

            // Filter out null or missing images
            entry.photos = imageUrls.filter((url) => url);
          }
        }
        // sort by date
        const sorted = data.sort((a: any, b: any) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });

        setSavedData(sorted);
      }
    } catch (error) {
      console.error("Error loading saved data:", error);
    }
  }, []);

  useIonViewWillEnter(() => {
    loadSavedData();
  });

  const filtered = savedData.filter(
    (place) => place.title.toLowerCase().includes(searchInput) // Assuming each place has a 'title' property
  );

  return (
    <IonPage>
      <IonContent className="travel-history-container">
        <div className="banner-section">
          <SearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
        </div>

        {filtered.length > 0 ? (
          filtered.map((place, i) => <TravelCard {...place} key={i} />)
        ) : (
          <IonText className="no-records">No tavel records.</IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default TravelHistory;
