import { useState } from "react";
import "../styles/Header.css";
import settings from "../../../assets/settings.svg";
import { SettingsModal } from "../molecules/SettingsModal";

interface IHeader {
  selectedTeam: number;
}

export const Header = (params: IHeader) => {
  const [showSettingsModal, setshowSettingsModal] = useState(false);

  return (
    <>
      <div className="Header">
        <>ABS Taskmanager</>

        {params.selectedTeam != -1 && (
          <img
            src={settings}
            onClick={() => setshowSettingsModal(true)}
            className="UserModalButton"
          />
        )}
      </div>
      {showSettingsModal && (
        <SettingsModal
          showSettingsModal={showSettingsModal}
          setshowSettingsModal={setshowSettingsModal}
          selectedTeam={params.selectedTeam}
        />
      )}
    </>
  );
};
