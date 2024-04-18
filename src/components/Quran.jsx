import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import QuranDisplay from "./QuranDisplay";
import { useNavigate } from "react-router-dom";

export default function Quran() {
  const [surah, setSurah] = useState(null);
  const [selectedSurahName, setSelectedSurahName] = useState(null);
  const [selectedSurahNumber, setSelectedSurahNumber] = useState(null);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`http://api.alquran.cloud/v1/surah`)
      .then((data) => {
        setSurah(data.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [loading]);
  const handleSurahSelection = (ev) => {
    setSelectedSurahNumber(ev.target.value);
    setSelectedSurahName(ev.target.id);
  };
  return (
    <>
      {!selectedSurahName ? (
        <section className="quran" id="quran">
          <div>
            <h1 className="quran-title">القران الكريم | Holy Quran</h1>
            <div className="grid grid-cols-3 gap-4 mt-8 surahs  md:grid-cols-12 sm:grid-cols-4 ">
              {surah &&
                surah.map((s, i) => {
                  return (
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        color: "var(--quran-button-color)",
                        fontFamily: "Cairo",
                        fontWeight: 700,
                        border: "var(--quran-button)",
                        boxShadow: "var(--quran-button-shadow )",
                        "&:hover": {
                          color: "var(--button-hover-color)",
                          background: "var(--button-hover-bg)",
                          boxShadow: "var(--button-hover-shadow)",
                          border: "none",
                        },
                        transition: "all .5s ease-in-out",

                        fontFamily: "cairo",
                      }}
                      key={i}
                      value={s.number}
                      id={s.name}
                      onClick={handleSurahSelection}
                    >
                      {s.name}
                      <br /> {s.numberOfAyahs}
                    </Button>
                  );
                  {
                    /* {console.log(s.name)} */
                  }
                })}
            </div>
          </div>
        </section>
      ) : (
        <QuranDisplay
          surahName={selectedSurahName}
          surahNumber={selectedSurahNumber}
          back={setSelectedSurahName}
        />
      )}
    </>
  );
}
