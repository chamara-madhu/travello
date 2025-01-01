import { IonIcon, IonTabBar, IonTabButton } from "@ionic/react";
import { addCircleOutline, albumsSharp, locationSharp } from "ionicons/icons";
import { useHistory, useLocation } from "react-router";

const BottomTabBar = () => {
  const { pathname } = useLocation();
  const history = useHistory();

  const handleTabClick = (path: string) => {
    if (pathname !== path) {
      history.push(path); // Navigate to the path
    }
  };
  return (
    <IonTabBar slot="bottom" className="custom-tab-bar">
      <IonTabButton
        tab="history"
        href="/"
        onClick={() => handleTabClick("/")}
        className="custom-tab-button"
      >
        <IonIcon
          icon={albumsSharp}
          className={pathname === "/" ? "icon active" : "icon"}
        />
      </IonTabButton>
      <IonTabButton
        tab="add"
        href="/add"
        onClick={() => handleTabClick("/add")}
        className="custom-tab-button"
      >
        <IonIcon
          icon={addCircleOutline}
          className={pathname === "/add" ? "icon active" : "icon"}
        />
      </IonTabButton>
      <IonTabButton
        tab="map"
        href="/map"
        onClick={() => handleTabClick("/map")}
        className="custom-tab-button"
      >
        <IonIcon
          icon={locationSharp}
          className={pathname === "/map" ? "icon active" : "icon"}
        />
      </IonTabButton>
    </IonTabBar>
  );
};

export default BottomTabBar;
