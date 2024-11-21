import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    reason: "",
  });

  const [success, setSuccess] = useState(false);
  const [serverStats, setServerStats] = useState({ players: 0, uptime: "0%" });

  // Handle Input Changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const webhookUrl =
      "https://discord.com/api/webhooks/1307061556567212163/rZ5IItXmyUXUYqHYL4NITLED3eaIqtyiInycHjtTzaME6yFTu8fV-X4mpZZJnrBgHFvZ"; // Replace with your actual webhook URL

    try {
      await axios.post(webhookUrl, {
        content: `**Whitelist Application Received**\nName: ${formData.name}\nExperience: ${formData.experience}\nReason: ${formData.reason}`,
      });
      setSuccess(true);
    } catch (error) {
      console.error("Error sending form data to Discord:", error);
    }
  };

  // Fetch Server Stats (optional)
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("https://api.example.com/server/stats"); // Replace with your API endpoint
        setServerStats(response.data);
      } catch (error) {
        console.error("Error fetching server stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className={styles.container}>
      {/* Dynamic Background */}
      <div className={styles.background}></div>

      {/* Header Section */}
      <header className={styles.header}>
        <img
          src="/NARCOS_png.png"
          alt="Narcos RolePlay"
          className={styles.logo}
        />
        <h1 className={styles.headerTitle}>Narcos RolePlay</h1>
      </header>

      {/* Trailer Section */}
      <section className={styles.trailer}>
        <h2 className={styles.trailerTitle}>Watch the Trailer</h2>
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
      <section className={styles.about}>
        <h2>About Our Server</h2>
        <p className={styles.aboutText}>
          Welcome to Narcos RolePlay, where immersive roleplaying meets a rich
          and dynamic community. Join us on Discord to learn more and connect!
        </p>
        <a
          href="https://discord.com"
          target="_blank"
          className={styles.discordButton}
          rel="noreferrer"
        >
          Join Our Discord
        </a>
      </section>

      {/* Live Stats Section */}
      <section className={styles.stats}>
        <h2>Live Server Stats</h2>
        <div className={styles.statsCards}>
          <div className={styles.statCard}>
            <h3 className={styles.statCardTitle}>Players Online</h3>
            <p>{serverStats.players}</p>
          </div>
          <div className={styles.statCard}>
            <h3 className={styles.statCardTitle}>Uptime</h3>
            <p>{serverStats.uptime}</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2>Server Features</h2>
        <div className={styles.featureCards}>
          <div className={styles.featureCard}>
            <h3 className={styles.featureCardTitle}>Custom Vehicles</h3>
            <p>Unique vehicles that elevate your roleplay experience.</p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureCardTitle}>Dynamic Economy</h3>
            <p>A balanced economy with jobs, businesses, and more!</p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureCardTitle}>Active Community</h3>
            <p>Engage with a vibrant and welcoming player base.</p>
          </div>
        </div>
      </section>

      {/* Whitelist Application Section */}
      <section className={styles.whitelist}>
        <h2>Whitelist Application</h2>
        {success ? (
          <p className={styles.successMessage}>
            Thank you for your application! We will review it soon.
          </p>
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
      </section>

      {/* Footer Section */}
      <footer className={styles.footer}>
        <p>&copy; 2024 Narcos RolePlay</p>
      </footer>
    </div>
  );
}

