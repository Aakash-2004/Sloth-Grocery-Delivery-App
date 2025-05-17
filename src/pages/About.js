import React from 'react';
import './About.css';

const About = () => (
  <div className="about-page">
    <section className="about-hero">
      <h1>About Sloth</h1>
      <p>Delivering groceries at lightning speed with a smile!</p>
    </section>
    <section className="about-mission">
      <h2>Our Mission</h2>
      <p>To make grocery shopping effortless, fast, and joyful for everyone. We combine technology, logistics, and a passion for service to bring you the best experience possible.</p>
    </section>
    <section className="about-team">
      <h2>Meet Our Team</h2>
      <div className="team-cards">
        <div className="team-card">
          <img src="/images/team1.jpg" alt="Founder" />
          <h3>Aakash</h3>
          <p>Founder & CEO</p>
        </div>
        <div className="team-card">
          <img src="/images/team2.jpg" alt="CTO" />
          <h3>Priya</h3>
          <p>Chief Technology Officer</p>
        </div>
        <div className="team-card">
          <img src="/images/team3.jpg" alt="COO" />
          <h3>Rahul</h3>
          <p>Chief Operations Officer</p>
        </div>
      </div>
    </section>
    <section className="about-values">
      <h2>Why Choose Us?</h2>
      <ul>
        <li>⚡ Superfast delivery</li>
        <li>🛒 Wide range of products</li>
        <li>🤝 Friendly support</li>
        <li>🌱 Sustainable practices</li>
      </ul>
    </section>
  </div>
);

export default About; 