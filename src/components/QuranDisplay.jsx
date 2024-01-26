import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function QuranDisplay({ surahName, surahNumber , back}) {
  const [loading, setLoading] = useState(true);
  const [ayahs, setAyahs] = useState(null);
  useEffect(() => {
    axios
      .get(`http://api.alquran.cloud/v1/surah/${surahNumber}`)
      .then((data) => {
        setAyahs(data.data.data.ayahs);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [surahNumber]);
  return (
    <div className="displayQuran">
      <h1 className="displayQuran-title" style={{ fontFamily: "reem kufi" }}>
        {surahName} {surahNumber}
      </h1>
      <div className="display">
        {ayahs &&
          ayahs.map((a, i) => {
            return (
              <p style={{ display: "inline-block" }} key={i}>
                {a.text} <span>{`(${a.numberInSurah})`}</span>
              </p>
            );
          })}
      </div>
      <Button
        variant="outlined"
        sx={{
          color: "var(--select-border)",
          fontFamily: "Cairo",
          fontWeight: 700,
          border: "4px solid var(--select-border)",
          boxShadow: "var(--button-shadow )",
          "&:hover": {
            color: "var(--button-hover-color)",
            background: "var(--button-hover-bg)",
            boxShadow: "var(--button-hover-shadow)",
            border: "none",
          },
          transition: "all .7s ease-in-out",
          padding: ".7rem 4rem",
          fontSize: "1.3rem",

          fontFamily: "cairo",
        }}
        onClick={()=>{back(null)}}
      >
        العودة
      </Button>
    </div>
  );
}
