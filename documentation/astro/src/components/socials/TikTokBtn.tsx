import { FaTiktok } from "react-icons/fa";
import type { JSX } from 'preact';
import { IconContext } from "react-icons"
// import { useRef, useEffect } from "preact/hooks"
// import React from "preact/compat";
import './TikTokBtn.module.css';

interface TikTokBtnProps {
  link?: string;
  size?: number;
}

export default function TikTokBtn({link = "https://www.tiktok.com/@decoder-leco", size = 80}: TikTokBtnProps): JSX.Element {
  return (
    <>
    <a
      href={link}
      aria-label="Décoder l'éco sur TikTok"
      class="absolute right-0 top-0 z-10 text-black hover:text-black focus:ring-0 focus:ring-offset-0"
      >
      
      <IconContext.Provider value={{ color: "currentColor", className: "", size: size }} >
        <FaTiktok />
      </IconContext.Provider>
    </a>

      
    </>
)
}