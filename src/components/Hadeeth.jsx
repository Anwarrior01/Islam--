import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import rouah from '../data/rawi.json'

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.dark,
  padding: theme.spacing(1),
  margin: "0 auto",
}));


export default function Hadeeth() {
  const [rawi, setRawi] = useState(null);
  const [selectedRawi, setSelectedRawi] = useState("");
  const [hadeeth, setHadeeth] = useState(null);
  const [loading,setLoading] = useState(true)
  

  useEffect(()=>{
   fetch(`https://hadis-api-id.vercel.app/hadith/${selectedRawi.slug?selectedRawi.slug:"abu-dawud"}?page=2&limit=300`)
   .then(res=>res.json())
   .then(data=>{
    setHadeeth(data.items)
    setLoading(false)})
   .catch(err=>{
    console.error(err)
    setLoading(false)})
  },[selectedRawi])
 
useEffect(()=>{
  setRawi(rouah)
},[])
const handleRawiSelect = (ev) =>{
  setSelectedRawi(ev.target.value)
}
  return (
    <section className="hadeeth">
      {/* <NavBar /> */}
      <h1 className="hadeeth-title">حديث | Hadeeth</h1>
      <div className="hadeeth-section">
        <Swiper
          rewind={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
         {hadeeth && hadeeth.map((h,i) => {
          return(
            <SwiperSlide key={i}>
              {hadeeth[i].arab}
              <p className="hadeeth-sub">رواه الإمام {selectedRawi.slug?selectedRawi.nameArabic:"أبو داوود"}</p>
            </SwiperSlide>
          )
         })}
         
        </Swiper>
      <FormControl
            style={{ marginLeft: "2rem", textAlign: "center" ,}}
            sx={{
              width: {
                xs: "70vw",
                sm: "70vw",
                md: "20vw",
                lg: "20vw",
                xl: "20vw",
              },
            }} 
          >
            <InputLabel
              id="demo-simple-select-label"
              style={{
                color: "var(--select-label)",
                background:"transparent",
                fontFamily: "cairo",
                paddingRight: "1rem3",
                fontWeight:"700",
                }} className="select-rawi"
            >
              {" "}
              الراوي{" "}
            </InputLabel>
            <Select
              style={{background:"transparent"}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="الراوي"
              value={selectedRawi}
              onChange={handleRawiSelect}        
              className="select-rawi"
            >
              {rawi &&
                rawi.map((r,i) => {
                  return (
                    <MenuItem key={i} value={r} style={{fontFamily:'Cairo'}}>
                      {r.nameArabic}
                    </MenuItem>
                  );
                })}
            </Select>
            <Div className="salaat-place" style={{fontFamily:'Cairo'}}>{selectedRawi.nameArabic?selectedRawi.nameArabic:"أبو داوود"}</Div>
          </FormControl>
      </div>

    </section>
  );
}
