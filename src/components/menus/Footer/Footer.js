import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import icons from "../../../assets/images/icon";
import { menuItems } from "../../../shared/menuItems.js";

const socials = [
  {
    href: "https://bandcamp.com/banjo_dave",
    title: "Bandcamp",
    icon: "bandcamp",
    extra: true,
  },
  {
    href: "https://discord.com/invite/W9UtSAYQXR",
    title: "Discord: The BanjoCave",
    icon: "discord",
    extra: false,
  },
  {
    href: "https://www.doomworld.com/profile/28846-banjodave/",
    title: "Doomworld",
    icon: "doomworld",
    extra: true,
  },
  {
    href: "https://www.instagram.com/banjeetz/",
    title: "Instagram",
    icon: "instagram",
    extra: false,
  },
  {
    href: "https://banjodave.itch.io/",
    title: "itch.io",
    icon: "itch",
    extra: false,
  },
  {
    href: "https://mastodon.gamedev.place/@banjeetz",
    title: "mastodon.gamedev.place",
    icon: "mastadon",
    extra: true,
  },
  {
    href: "https://www.nmaps.net/user/DW40",
    title: "N User Map Archive",
    icon: "numa",
    extra: true,
  },
  {
    href: "https://www.patreon.com/banjodave",
    title: "Patreon",
    icon: "patreon",
    extra: true,
  },
  {
    href: "https://soundcloud.com/anjoave",
    title: "SoundCloud",
    icon: "soundcloud",
    extra: true,
  },
  {
    href: "https://www.tiktok.com/@banjodave",
    title: "TikTok",
    icon: "tiktok",
    extra: true,
  },
  {
    href: "https://www.twitch.tv/banjodave",
    title: "Twitch",
    icon: "twitch",
    extra: true,
  },
  {
    href: "https://twitter.com/banjeetz",
    title: "Twitter",
    icon: "twitter",
    extra: false,
  },
  {
    href: "https://www.youtube.com/channel/UCWIX3fTPDoVGPHxReT6vC5g",
    title: "YouTube",
    icon: "youtube",
    extra: false,
  },
];

const SocialLink = ({ social }) => (
  <a
    href={social.href}
    target="_blank"
    rel="noopener noreferrer"
    title={`BanjoDave on ${social.title}`}
    aria-label={`BanjoDave on ${social.title}`}
  >
    <img src={icons[social.icon]} alt={`BanjoDave's ${social.title} Icon`} />
  </a>
);

function Footer() {
  const [showExtra, setShowExtra] = useState(false);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer>
      <div className="footer-container">
        <nav className="footer-navigation-container">
          <div className="footer-navigation">
            {menuItems.map((item) => (
              <Link
                key={item.text}
                to={item.path}
                aria-label={item.label}
                onClick={handleBackToTop}
              >
                {item.text}
              </Link>
            ))}
          </div>
        </nav>

        <div className="socials-container">
          <div className="socials">
            {socials
              .filter((social) => !social.extra || (social.extra && showExtra))
              .map((social) => (
                <SocialLink key={social.href} social={social} />
              ))}
          </div>

          {socials.some((social) => social.extra) && (
            <button
              className="socials-expand"
              onClick={() => setShowExtra(!showExtra)}
            >
              {showExtra ? "- less socials -" : "+ more socials +"}
            </button>
          )}
        </div>
      </div>

      <div className="legal">
        <p>&copy; 2023 BanjoDave. All rights reserved.</p>
      </div>

      <div className="signature">
        <img src={icons["about"]} alt="BanjoDave's Logo" />
      </div>

      <button className="back-to-top" onClick={handleBackToTop}>
        Back to Top
      </button>
    </footer>
  );
}

export default Footer;
