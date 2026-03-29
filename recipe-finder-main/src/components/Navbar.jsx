import React from "react";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Awantika Singh</h2>
      <h3> I am the student of UIT</h3>

      <ul style={styles.navLinks}>
        <li><a href="#home" style={styles.link}>Home</a></li>
        <li><a href="#projects" style={styles.link}>Projects</a></li>
        <li><a href="#contact" style={styles.link}>Contact</a></li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#0f172a",
    color: "white",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
};

export default Navbar;