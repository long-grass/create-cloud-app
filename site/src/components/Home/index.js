import React from "react";
import styles from "./style.css";

class Home extends React.Component {
  render() {
    console.log(this.props);
    let display;
    this.props.location.pathname === "/"
      ? (display = "flex")
      : (display = "flex");

    const style = {
      general: {
        display: display,
        background: this.props.colour || "#7aa7c1",
        paddingTop: "5%",
        height:'100vh',
        color:'#f9f7ee',
        fontSize:'44px'
      }
    };

    return (
      <div className={styles.grid} style={style.general}>
        content goes here
      </div>
    );
  }
}

export default Home;
