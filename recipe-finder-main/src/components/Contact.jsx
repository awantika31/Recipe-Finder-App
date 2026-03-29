import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Message sent!");
  };

  return (
    <section id="contact" style={styles.container}>
      <h2>Contact Me</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          style={styles.textarea}
          required
        />

        <button type="submit" style={styles.button}>
          Send
        </button>
      </form>
    </section>
  );
}

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
  },
  form: {
    maxWidth: "400px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  textarea: {
    padding: "10px",
    fontSize: "16px",
    height: "100px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#0f172a",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default Contact;