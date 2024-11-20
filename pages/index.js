import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    reason: "",
  });

  const [success, setSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const webhookUrl = "https://discord.com/api/webhooks/your_webhook_url"; // Replace with your webhook URL
    try {
      await axios.post(webhookUrl, {
        content: `**Whitelist Application Received**\nName: ${formData.name}\nExperience: ${formData.experience}\nReason: ${formData.reason}`,
      });
      setSuccess(true);
    } catch (error) {
      console.error("Error sending form data to Discord:", error);
    }
  };

  return (
    <div className={styles.container}>
      {/* Navigation Bar */}
      <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
          <img src="/NARCOS_png.png" alt="Narcos Logo" className={styles.logo} />
          <span className={styles.navTitle}>Narcos RolePlay</span>
        </div>
        <ul className={styles.navLinks}>
          <li><a href="#trailer">Trailer</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#whitelist">Whitelist</a></li>
          <li><a href="https://discord.com" target="_blank">Discord</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className={styles.header}>
        <h1>Welcome to Narcos RolePlay</h1>
        <p>Your immersive roleplay experience awaits.</p>
      </header>

      {/* Trailer Section */}
      <section id="trailer" className={styles.trailer}>
        <h2>Watch the Trailer</h2>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/vVRp76R0iaM"
          title="Narcos RolePlay Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </section>

      {/* About Section */}
      <section id="about" className={styles.about}>
        <h2>About Our Server</h2>
        <p>
          Welcome to Narcos RolePlay, where immersive roleplaying meets a rich and dynamic
          community. Join us on Discord to learn more and connect!
        </p>
        <a href="https://discord.com" target="_blank" className={styles.discordButton}>
          Join Our Discord
        </a>
      </section>

      {/* Whitelist Application Section */}
      <section id="whitelist" className={styles.whitelist}>
        <h2>Whitelist Application</h2>
        <button className={styles.openWhitelistButton} onClick={() => setShowPopup(true)}>
          Apply for Whitelist
        </button>
      </section>

      {/* Popup Form */}
      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={() => setShowPopup(false)}>
              &times;
            </button>
            <h2>Whitelist Application</h2>
            {success ? (
              <p className={styles.successMessage}>Thank you for your application! We will review it soon.</p>
            ) : (
              <form onSubmit={handleSubmit}>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Roleplay Experience:
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Why do you want to join?
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <button type="submit">Submit Application</button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer Section */}
      <footer className={styles.footer}>
        <p>&copy; 2024 Narcos RolePlay. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
