import React from "react";
import NavBar from "./NavBar";
import { Parallax } from "react-parallax";
import Bg from "../pics/maghrib-prayer-mosque-muslim-praying-afternoo-upscaled.png";
import './HeroHeader.css'
export default function Hero() {
  return (
    
      <div className="hero">
        <NavBar />
       <div className="hero-text">
       <div className="hero-text-ar">
        <h1 className="hero-head-ar">
          موقعنا اسلامي     100% </h1>
          <h2 className="hero-subhead-ar"> {"  "} لدينا {"  "}
          <span className="slider">
            <span className="slider__word">  مواعيد الصلاة</span>
            <span className="slider__word">  قران</span>
            <span className="slider__word">  حديث و سنة</span>
            <span className="slider__word">  تفسير</span>
          </span>
        </h2>
       </div>
       <div className="hero-text-en">
        <h1  className="hero-head-en">
          100% Islamic Website</h1>
          <h2 className="hero-subhead-en"> We Have
          <span className="sliderEn">
            <span className="slider__word">Salaat Timer</span>
            <span className="slider__word">Holy Quran</span>
            <span className="slider__word">Hadeeth</span>
            <span className="slider__word"> Tafseer</span>
          </span>
        </h2>
       </div>
       
       </div>
        
      </div>
      
  
  );
}
