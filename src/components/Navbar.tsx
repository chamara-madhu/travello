import React from "react";
import { IonHeader, IonImg, IonTitle, IonToolbar } from "@ionic/react";
import "../styles/navbar.css";
import AppLogo from "../assets/logo.png";

const Navbar: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar className="custom-header">
        <div className="header-content">
          <div className="header-left">
            <IonImg src={AppLogo} alt="App Logo" className="app-logo" />
            <IonTitle className="header-title">Travello</IonTitle>
          </div>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default Navbar;
