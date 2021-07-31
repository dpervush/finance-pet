import React from "react";
import { AvatarIcon, FlagIcon, NotificationIcon } from "../icons";
import styles from "./UserPanel.module.scss";

const UserPanel = () => {
  return (
    <div className={styles.panel}>
      <div className={styles.flag}>
        <FlagIcon />
      </div>
      <div className={styles.notification}>
        <NotificationIcon />
        <span></span>
      </div>
      <div className={styles.user}>
        <AvatarIcon />
      </div>
    </div>
  );
};

export default UserPanel;
