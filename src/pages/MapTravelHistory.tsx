import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  IonCol,
  IonContent,
  IonModal,
  IonPage,
  IonRow,
  useIonViewWillEnter,
} from "@ionic/react";
import { GoogleMap } from "@capacitor/google-maps";
import MarkerInfoWindow from "../components/MarkerInfoWindow";
import { Geolocation } from "@capacitor/geolocation";
import { Preferences } from "@capacitor/preferences";
import { Directory, Filesystem } from "@capacitor/filesystem";
import "../styles/map.css";
import { Capacitor } from "@capacitor/core";

interface MarkerData {
  id: number;
  lat: number;
  lng: number;
  title: string;
  note: string;
  location: string;
  photos: string[];
  createdAt: string;
}

// const customMapStyle = [
//   {
//     featureType: "all",
//     elementType: "labels.text",
//     stylers: [
//       {
//         color: "#000000",
//       },
//       {
//         visibility: "simplified",
//       },
//     ],
//   },
//   {
//     featureType: "all",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         hue: "#ff0000",
//       },
//     ],
//   },
//   {
//     featureType: "all",
//     elementType: "labels.text.stroke",
//     stylers: [
//       {
//         color: "#ff0000",
//       },
//       {
//         visibility: "simplified",
//       },
//     ],
//   },
//   {
//     featureType: "administrative",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#000000",
//       },
//       {
//         visibility: "off",
//       },
//     ],
//   },
//   {
//     featureType: "administrative.country",
//     elementType: "geometry.fill",
//     stylers: [
//       {
//         visibility: "off",
//       },
//       {
//         color: "#ff0000",
//       },
//     ],
//   },
//   {
//     featureType: "administrative.country",
//     elementType: "geometry.stroke",
//     stylers: [
//       {
//         visibility: "on",
//       },
//     ],
//   },
//   {
//     featureType: "administrative.country",
//     elementType: "labels",
//     stylers: [
//       {
//         visibility: "simplified",
//       },
//       {
//         color: "#9b30f2",
//       },
//     ],
//   },
//   {
//     featureType: "administrative.province",
//     elementType: "all",
//     stylers: [
//       {
//         visibility: "off",
//       },
//     ],
//   },
//   {
//     featureType: "administrative.locality",
//     elementType: "all",
//     stylers: [
//       {
//         visibility: "simplified",
//       },
//       {
//         color: "#7620bd",
//       },
//     ],
//   },
//   {
//     featureType: "landscape.man_made",
//     elementType: "all",
//     stylers: [
//       {
//         visibility: "off",
//       },
//     ],
//   },
//   {
//     featureType: "landscape.man_made",
//     elementType: "geometry",
//     stylers: [
//       {
//         visibility: "off",
//       },
//     ],
//   },
//   {
//     featureType: "landscape.man_made",
//     elementType: "geometry.fill",
//     stylers: [
//       {
//         visibility: "off",
//       },
//     ],
//   },
//   {
//     featureType: "landscape.man_made",
//     elementType: "geometry.stroke",
//     stylers: [
//       {
//         visibility: "off",
//       },
//     ],
//   },
//   {
//     featureType: "landscape.man_made",
//     elementType: "labels",
//     stylers: [
//       {
//         visibility: "off",
//       },
//     ],
//   },
//   {
//     featureType: "landscape.natural",
//     elementType: "all",
//     stylers: [
//       {
//         visibility: "off",
//       },
//     ],
//   },
//   {
//     featureType: "landscape.natural",
//     elementType: "geometry",
//     stylers: [
//       {
//         visibility: "off",
//       },
//     ],
//   },
//   {
//     featureType: "landscape.natural",
//     elementType: "geometry.fill",
//     stylers: [
//       {
//         visibility: "off",
//       },
//     ],
//   },
//   {
//     featureType: "landscape.natural.landcover",
//     elementType: "all",
//     stylers: [
//       {
//         visibility: "on",
//       },
//     ],
//   },
//   {
//     featureType: "landscape.natural.terrain",
//     elementType: "all",
//     stylers: [
//       {
//         visibility: "off",
//       },
//     ],
//   },
//   {
//     featureType: "poi",
//     elementType: "all",
//     stylers: [
//       {
//         visibility: "off",
//       },
//     ],
//   },
//   {
//     featureType: "road",
//     elementType: "all",
//     stylers: [
//       {
//         saturation: -100,
//       },
//       {
//         lightness: 45,
//       },
//       {
//         visibility: "simplified",
//       },
//     ],
//   },
//   {
//     featureType: "road.highway",
//     elementType: "all",
//     stylers: [
//       {
//         visibility: "simplified",
//       },
//       {
//         color: "#c4c6f4",
//       },
//     ],
//   },
//   {
//     featureType: "road.highway",
//     elementType: "labels",
//     stylers: [
//       {
//         visibility: "off",
//       },
//       {
//         color: "#d3d4f3",
//       },
//     ],
//   },
//   {
//     featureType: "road.highway",
//     elementType: "labels.text",
//     stylers: [
//       {
//         visibility: "simplified",
//       },
//       {
//         color: "#000000",
//       },
//       {
//         weight: "0.01",
//       },
//     ],
//   },
//   {
//     featureType: "road.highway",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         visibility: "simplified",
//       },
//       {
//         weight: "0.01",
//       },
//     ],
//   },
//   {
//     featureType: "transit.station.bus",
//     elementType: "all",
//     stylers: [
//       {
//         visibility: "off",
//       },
//     ],
//   },
//   {
//     featureType: "water",
//     elementType: "all",
//     stylers: [
//       {
//         color: "#eeeeff",
//       },
//       {
//         visibility: "on",
//       },
//     ],
//   },
// ];

const MapTravelHistory: React.FC = () => {
  const key = "AIzaSyDmwNFfvv3ClUoYkxeYNi372U5-zB6uY70";
  let newMap: GoogleMap | null = null;
  const mapRef = useRef<HTMLDivElement | null>(null);

  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [markers, setMarkers] = useState<MarkerData[]>([]);
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

        return convertedPath; // Return the converted path directly
      }
    } catch (error) {
      // setTest(`error: ${JSON.stringify(error)}`);
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

        setMarkers(data);
      }
    } catch (error) {
      console.error("Error loading saved data:", error);
    }
  }, []);

  useIonViewWillEnter(() => {
    loadSavedData();
  });

  const modalOptions = {
    initialBreakpoint: 0.5,
    breakpoints: [0, 0.5, 0.6, 0.7, 0.8, 0.9],
    backdropBreakpoint: 0,
    onDidDismiss: () => setIsOpen(false),
    marker: { ...selectedMarker },
  };

  // Handle marker click to open the modal
  const markerClick = (marker: any) => {
    setSelectedMarker(
      markers.find(
        (m) => m.lat === marker.latitude && m.lng === marker.longitude
      ) || null
    );
    setIsOpen(true);
  };

  // Add a single marker to the map
  const addMapMarker = async (marker: MarkerData) => {
    if (newMap) {
      await newMap.addMarker({
        coordinate: {
          lat: marker.lat,
          lng: marker.lng,
        },
        title: marker.title,
        iconUrl: "./marker.svg",
      });
    }
  };

  // Add all markers to the map
  const addMapMarkers = (markers: MarkerData[]) => {
    if (!newMap) return; // Ensure newMap is initialized

    markers.forEach((marker) => addMapMarker(marker));
  };

  // Create the map
  const createMap = async () => {
    if (!mapRef.current || markers.length === 0) return;

    const coordinates = await Geolocation.getCurrentPosition();

    newMap = await GoogleMap.create({
      id: "google-map",
      element: mapRef.current,
      apiKey: key,
      config: {
        zoom: 10,
        center: {
          lat: coordinates?.coords?.latitude,
          lng: coordinates?.coords?.longitude,
        },
        disableDefaultUI: true,
        // styles: customMapStyle,
      },
    });

    newMap.setOnMarkerClickListener((marker) => markerClick(marker));

    // Add markers once map is created
    addMapMarkers(markers);
  };

  // Initialize the map when the page is about to enter
  const initMap = () => {
    createMap().catch((error) => {
      console.error("Error creating map:", error);
    });
  };

  useEffect(() => {
    initMap();
  }, [markers]);

  return (
    <IonPage>
      <IonContent>
        <IonRow style={{ position: "relative", top: 50 }}>
          <IonCol size="12" style={{ padding: 0 }}>
            <capacitor-google-map ref={mapRef} id="map"></capacitor-google-map>
          </IonCol>
        </IonRow>
        <IonModal isOpen={isOpen} {...modalOptions} className="model-content">
          {selectedMarker && (
            <MarkerInfoWindow selectedMarker={selectedMarker} />
          )}
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default MapTravelHistory;