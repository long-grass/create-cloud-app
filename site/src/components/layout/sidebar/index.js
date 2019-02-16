import React, { Component } from "react";
import styles from "./sidebar.css";

const classNames = require("classnames");

const Sidebar = props => {
  const lastYear = classNames(
    styles.sidebarTitle,
    styles.justifyCenter,
    styles.itemsCenter
  );
  const sideText = props.sideText;

  return <div className={lastYear} />;
};

export default Sidebar;
