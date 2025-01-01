import { Route } from "react-router-dom";
import { IonTabs, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import React, { useEffect } from "react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Dark Mode */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import "./styles/tabBottom.css";
import Navbar from "./components/Navbar";
import TravelHistory from "./pages/TravelHistory";
import AddTravelHistory from "./pages/AddTravelHistory";
import MapTravelHistory from "./pages/MapTravelHistory";
import BottomTabBar from "./components/BottomTabBar";
import { SplashScreen } from "@capacitor/splash-screen";

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    // Hide the splash screen after the app is loaded
    SplashScreen.hide();
  }, []);

  return (
    <IonTabs>
      <Navbar />
      <IonRouterOutlet>
        <Route exact path="/" component={TravelHistory} />
        <Route exact path="/add" component={AddTravelHistory} />
        <Route exact path="/map" component={MapTravelHistory} />
      </IonRouterOutlet>
      <BottomTabBar />
    </IonTabs>
  );
};

export default App;
