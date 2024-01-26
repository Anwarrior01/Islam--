import React, { useState, useEffect } from "react";
import "../App.css";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Prayer from "./Prayer";
import moment from "moment";
import axios from "axios";
import { styled } from "@mui/material/styles";
import DarkMode from "./DarkMode/DarkMode";
import NavBar from "./NavBar";

export default function MainContent() {
  const cUrl = "https://api.countrystatecity.in/v1/countries";
  const ckey = "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==";
    const [isLoading,setIsLoading] = useState(false)
    // cities and countries Data------------------
    const [countryData, setCountryData] = useState(null);
    const [stateData, setStateData] = useState([]);
    const [cityData, setCityData] = useState(null);
    //  selected Cities and Countries Data ------------
    const [dataC, setDataC] = useState(null);
    const [dataS, setDataS] = useState("");
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState("");
    const [selectedInputs, setSelectedInputs] = useState("");
  
    // dates and times -----------------------------
    const [currentDate, setCurrentDate] = useState(new Date());
    const [dateToday, setDateToday] = useState({
      miladi: "",
      hijri: "",
    });
    const [timings, setTimings] = useState({
      Fajr: "xx:xx",
      Dhuhr: "xx:xx",
      Asr: "xx:xx",
      Maghrib: "xx:xx",
      Isha: "xx:xx",
    });
    const [time, setTime] = useState();
    const [nextPrayerIndex, setNextPrayerIndex] = useState(0);
    const prayersArray = [
      {key:'Fajr' ,displayName:"الفجر"},
      {key:'Dhuhr' ,displayName:"الظهر"},
      {key:'Asr' ,displayName:"العصر"},
      {key:'Maghrib' ,displayName:"المغرب"},
      {key:'Isha' ,displayName:"العشاء"}
    ]
    const [remainingTime,setRemainingTime] = useState("")
    const getTimings = async () => {
      try{
        setIsLoading(true)
        const response = await axios.get(
          `https://api.aladhan.com/v1/timingsByCity?city=${
            selectedCity
              ? !selectedCity
                ? selectedState
                : selectedCity
              : selectedState
              ? selectedState
              : "Laayoune"
          }&country=${"Ma" ? !dataC : dataC}`
        );
        setTimings(response.data.data.timings);
        setDateToday({
          miladi: response.data.data.date.readable,
          hijri:
            response.data.data.date.hijri.weekday.ar +
            "    " +
            response.data.data.date.hijri.date,
        });
        setIsLoading(false)
      } catch(error) {
        console.log(error)
        setIsLoading(false)
      }
      
 };

  const handleCountrySelect = (e) => {
    setSelectedCountry(e.target.value.name);
    setDataC(e.target.value.iso2);
    setSelectedInputs(e.target.value.name);
    setSelectedState("");
    setSelectedCity("");
    // alert(selectedInputs.country)
  };
  const handleStateSelect = (e) => {
    setSelectedState(e.target.value.name);
    setDataS(e.target.value.iso2);
    setSelectedCity("");
  };
  const handleCitySelect = (event) => {
    console.log(event.target.value);
    setSelectedCity(event.target.value);
  };
  // function formatDate(date) {
  //   const hours = String(date.getHours()).padStart(2, "0");
  //   const minutes = String(date.getMinutes()).padStart(2, "0");
  //   return `${hours}:${minutes}`;
  // }

    // setDateToday(response.data.data.date.readable  , response.data.data.date.hijri.date  ,  response.data.data.date.hijri.weekday.ar)
 
  const getTime = async () => {
    try{
      setIsLoading(true)
      const response = await axios.get(
        `https://api.aladhan.com/v1/timingsByCity?city=${
          selectedCity
            ? !selectedCity
              ? selectedState
              : selectedCity
            : selectedState
            ? selectedState
            : ""
        }&country=${"Ma" ? !dataC : dataC}`
      );
      let date = new Date();
    let options = { timeZone: response.data.data.meta.timezone };
    let wwTime = date.toLocaleString("en-US", options);
    setTime(wwTime);
    }catch(error) {
        console.log(error)
        setIsLoading(false)
      }
    
  };
  const getCountDownTimer = () => {
    let momentNow = moment(time);
    let prayerIndex = 2;
    if (
      momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
    ) {
      // console.log("next prayer is Dhuhr");
      prayerIndex = 1 ;
    } else if (
      momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
    ) {
      // console.log("next prayer is Asr");
      prayerIndex = 2
    } else if (
      momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Maghrib"], "hh:mm"))
    ) {
      // console.log("next prayer is Maghrib");
      prayerIndex = 3
    } else if (
      momentNow.isAfter(moment(timings["Maghrib"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
    ) {
      // console.log("next prayer is Isha");
      prayerIndex = 4
    } else  {
      // console.log("next prayer is Fajr");
      prayerIndex = 0
    }
    setNextPrayerIndex(prayerIndex)
    const nextPrayerObject = prayersArray[prayerIndex]
    const nextPrayerTime = timings[nextPrayerObject.key]
    const nextPrayerTimeMoment = moment(nextPrayerTime,"hh:mm ") 
    console.log("next prayer time is " ,nextPrayerTime)
    let remainingTime = moment(nextPrayerTime,"hh:mm").diff(momentNow)
    if(remainingTime < 0){
      const midNightdiff = moment("23:59:59","hh:mm:ss").diff(momentNow)
      const fajrToMidNightDiff = nextPrayerTimeMoment.diff(moment("00:00:00","hh:mm:ss"))
      console.log("the diff to fajr :" ,fajrToMidNightDiff)
      const totalDifference = midNightdiff + fajrToMidNightDiff
      remainingTime = totalDifference
    }
    // console.log(remainingTime)
    const durationRemainingTime = moment.duration(remainingTime)
    setRemainingTime(`${durationRemainingTime.hours()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.seconds()}`);

  };

  function loadCountries() {
    fetch(cUrl, { headers: { "X-CSCAPI-KEY": ckey } })
      .then((Response) => Response.json())
      .then((data) => {
        setCountryData(data);
      })
      .catch((error) => console.error("Error loading countries: ", error));
  }
  function loadStates() {
    fetch(`${cUrl}/${!dataC ? "MA" : dataC}/states`, {
      headers: { "X-CSCAPI-KEY": ckey },
    })
      .then((response) => response.json())
      .then((data) => {
        setStateData(data);
      })
      .catch((error) => console.error("Error loading countries:", error));
  }
  function loadCities() {
    fetch(`${cUrl}/${dataC}/states/${dataS}/cities`, {
      headers: { "X-CSCAPI-KEY": ckey },
    })
      .then((response) => response.json())
      .then((data) => {
        setCityData(data);
      });
  }
  useEffect(() => {
    setSelectedCity("Laayoune");
    setSelectedCountry("Morocco");
  }, []);
  // useEffect(() => {},[])
  useEffect(() => {
    loadCountries();
    loadStates();
    loadCities();

    // setDataC(countryData && countryData.find((c) => c.name === selectedCountry));
  }, [countryData]);
  useEffect(() => {
    const interval = setInterval(() => {
      getTime();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [time]);
  useEffect(() => {
    getTimings();
  }, []);
  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.dark,
    padding: theme.spacing(1),
    margin: "0 auto",
  }));
  useEffect(() => {
    getCountDownTimer();
  }, [time]);
  return (
    <>
  
      <div className="times-container">
        {/* Header Informations  */}

        <Grid container>
          <Grid
            xs={12}
            md={6}
            sx={{
              fontSize: {
                xs: "70%",
                sm: "70%",
                md: "110%",
                lg: "130%",
                xl: "150%",
              },
              display: "flex",
              justifyContent: {
                xs: "center",
                sm: "center",
              },
              textAlign: {
                xs: "center",
                sm: "center",
                md: "right",
                lg: "right",
                xl: "right",
              },
            }}
          >
            <div>
              <h2 className="salaat-info">
                {time} | {dateToday.hijri} | {/* {formatDate(currentDate)} */}
              </h2>
              {/* <h2>{timer}</h2> */}
              <h1 className="salaat-info"> 
                {selectedCity ? selectedCity : selectedState} |{" "}
                {selectedCountry}
              </h1>
            </div>
          </Grid>
          <Grid
            xs={12}
            md={6}
            sx={{
              fontSize: {
                xs: "80%",
                sm: "80%",
                md: "110%",
                lg: "130%",
                xl: "150%",
              },
              display: "flex",
              justifyContent: {
                xs: "center",
                sm: "center",
              },
              textAlign: {
                xs: "center",
                sm: "center",
                md: "right",
                lg: "right",
                xl: "right",
              },
            }}
          >
            <div>
              <h2 className="salaat-info">متبقي حتى صلاة {prayersArray[nextPrayerIndex].displayName}</h2>
              <h1 className="salaat-info" style={{direction:"ltr"}}>{remainingTime}</h1>
            </div>
          </Grid>
        </Grid>
        {/* Header Informations ------ END */}
        <Divider
          style={{
            width: "100%",
            opacity: ".8",
            borderColor: "white",
            marginTop: "1rem",
          }}
        />
        {/* Mobile View Selections  */}
        <Stack
          justifyContent={"center"}
          style={{ marginTop: "40px" }}
          sx={{
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
              xl: "row",
            },
            display: {
              xs: "flex",
              sm: "flex",
              md: "none",
              lg: "none",
              xl: "none",
            },
          }}
        >
          <FormControl
            style={{ marginLeft: "2rem", textAlign: "center" }}
            sx={{
              width: {
                xs: "100%",
                sm: "100%",
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
                fontFamily: "cairo",
                paddingRight: "1rem3",
                fontWeight:"700",
              }}
            >
              {" "}
              البلد{" "}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Country"
              value={selectedInputs}
              onChange={handleCountrySelect}
              className="select-salaat"
            >
              {countryData &&
                countryData.map((c) => {
                  return (
                    <MenuItem key={c.id} value={c}>
                      {c.name}
                    </MenuItem>
                  );
                })}
            </Select>
            <Div className="salaat-place">{selectedCountry}</Div>
          </FormControl>

          {/*  State Selection  */}
          <FormControl
            style={{ marginLeft: "1rem" }}
            sx={{
              width: {
                xs: "100%",
                sm: "100%",
                md: "20%",
                lg: "20%",
                xl: "20vw",
              },
            }}
          >
            <InputLabel id="demo-simple-select-label" >
              <span style={{
                color: "var(--select-label)",
                fontFamily: "cairo",
                paddingRight: "1rem3",
                fontWeight:"700",
              }}>
                {" "}
                المنطقة{" "}
              </span>
            </InputLabel>
            <Select
              disabled={selectedCountry === "morocco"}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              onChange={handleStateSelect}
              className=""
            >
              {stateData &&
                Object.keys(stateData).map((s) => {
                  return (
                    <MenuItem key={stateData[s].id} value={stateData[s]}>
                      {stateData[s].name}
                    </MenuItem>
                  );
                })}
            </Select>
            <Div className="salaat-place">{selectedState}</Div>
          </FormControl>
          {/*  city Selection  */}
          <FormControl
            style={{ marginLeft: "1rem" }}
            sx={{
              width: {
                xs: "100%",
                sm: "100%",
                md: "20vw",
                lg: "20vw",
                xl: "20vw",
              },
            }}
          >
            <InputLabel id="demo-simple-select-label">
              <span style={{
                color: "var(--select-label)",
                fontFamily: "cairo",
                paddingRight: "1rem3",
                fontWeight:"700",
              }}>
                {" "}
                المدينة{" "}
              </span>
            </InputLabel>
            <Select
              disabled={selectedState === ""}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Age"
              onChange={handleCitySelect}
            >
              {cityData &&
                Object.keys(cityData).map((c) => {
                  return (
                    <MenuItem key={cityData[c].id} value={cityData[c].name}>
                      {cityData[c].name}
                    </MenuItem>
                  );
                })}
            </Select>
            <Div className="salaat-place">{selectedCity}</Div>
          </FormControl>
          <Button
            variant="outlined"
            sx={{
              color: "var(--select-border)",
              fontFamily: "Cairo",
              fontWeight:700,
              fontSize:"1.05rem",
              height: "3.5rem",
              border:"4px solid var(--select-border)",
              boxShadow: "var(--button-shadow )",
              '&:hover':{color:"var(--button-hover-color)",background:"var(--button-hover-bg)",boxShadow: "var(--button-hover-shadow)",border:"none"},
              transition:"all .5s ease-in-out",
          
              marginRight: {
                xs: "0px",
                sm: "0px",
                md: "2rem",
                lg: "2rem",
                xl: "2rem",
              },
            }}
            onClick={() => {
              getTimings();
            }}
          >
            أرني مواعيد الصلاة
          </Button>
        </Stack>

        <Divider
          style={{ width: "100%", opacity: ".8", borderColor: "#666666" }}
        />
        {/* Prayers Card  */}
        <Stack
          style={{ marginTop: "2.5rem" }}
          sx={{
            fontSize: {
              xs: "50%",
              sm: "70%",
              md: "90%",
              lg: "100%",
              xl: "100%",
            },
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
              xl: "row",
            },
            justifyContent: {
              xs: "center",
              sm: "center",
              md: "space-around",
              lg: "space-around",
              xl: "space-around",
            },
            alignItems: {
              xs: "center",
              sm: "center",
              md: "space-around",
              lg: "space-around",
              xl: "space-around",
            },
            textAlign: {
              xs: "center",
              sm: "center",
              md: "right",
              lg: "right",
              xl: "right",
            },
            gap: {
              xs: 5,
              sm: 5,
              md: 2,
              lg: 2,
              xl: 2,
            },
          }}
        >
          <Prayer
            name="الفجر"
            time={timings.Fajr}
            image="https://i.ibb.co/1ZYNy4Q/11.png"
          />
          <Prayer
            name="الظهر"
            time={timings.Dhuhr}
            image="https://i.ibb.co/RjKsF8w/2.png"
          />
          <Prayer
            name="العصر"
            time={timings.Asr}
            image="https://i.ibb.co/4S4xWVr/3.png"
          />
          <Prayer
            name="المغرب"
            time={timings.Maghrib}
            image="https://i.ibb.co/QjQQ458/4.jpg"
          />
          <Prayer
            name="العشاء"
            time={timings.Isha}
            image="https://i.ibb.co/3YKf0Vh/5.png"
          />
        </Stack>
        {/* Prayers Card  -------- END */}

        {/* City Selection */}
        <Stack
          justifyContent={"center"}
          style={{ marginTop: "40px" }}
          sx={{
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
              xl: "row",
            },
            display: {
              xs: "none",
              sm: "none",
              md: "flex",
              lg: "flex",
              xl: "flex",
            },
          }}
        >
          <FormControl
            style={{ marginLeft: "2rem", textAlign: "center" }}
            sx={{
              width: {
                xs: "100%",
                sm: "100%",
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
                fontFamily: "cairo",
                paddingRight: "1rem3",
                fontWeight:"700",
              }}
            >
              {" "}
              البلد{" "}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Country"
              value={selectedInputs}
              onChange={handleCountrySelect}
              className="select-salaat"
            >
              {countryData &&
                countryData.map((c) => {
                  return (
                    <MenuItem key={c.id} value={c}>
                      {c.name}
                    </MenuItem>
                  );
                })}
            </Select>
            <Div className="salaat-place">{selectedCountry}</Div>
          </FormControl>

          {/*  State Selection  */}
          <FormControl
            style={{ marginLeft: "1rem" }}
            sx={{
              width: {
                xs: "100%",
                sm: "100%",
                md: "20%",
                lg: "20%",
                xl: "20vw",
              },
            }}
          >
            <InputLabel id="demo-simple-select-label" >
              <span style={{
                color: "var(--select-label)",
                fontFamily: "cairo",
                paddingRight: "1rem3",
                fontWeight:"700",
              }}>
                {" "}
                المنطقة{" "}
              </span>
            </InputLabel>
            <Select
              disabled={selectedCountry === "morocco"}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              onChange={handleStateSelect}
              className=""
            >
              {stateData &&
                Object.keys(stateData).map((s) => {
                  return (
                    <MenuItem key={stateData[s].id} value={stateData[s]}>
                      {stateData[s].name}
                    </MenuItem>
                  );
                })}
            </Select>
            <Div className="salaat-place">{selectedState}</Div>
          </FormControl>
          {/*  city Selection  */}
          <FormControl
            style={{ marginLeft: "1rem" }}
            sx={{
              width: {
                xs: "100%",
                sm: "100%",
                md: "20vw",
                lg: "20vw",
                xl: "20vw",
              },
            }}
          >
            <InputLabel id="demo-simple-select-label">
              <span style={{
                color: "var(--select-label)",
                fontFamily: "cairo",
                paddingRight: "1rem3",
                fontWeight:"700",
              }}>
                {" "}
                المدينة{" "}
              </span>
            </InputLabel>
            <Select
              disabled={selectedState === ""}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Age"
              onChange={handleCitySelect}
            >
              {cityData &&
                Object.keys(cityData).map((c) => {
                  return (
                    <MenuItem key={cityData[c].id} value={cityData[c].name}>
                      {cityData[c].name}
                    </MenuItem>
                  );
                })}
            </Select>
            <Div className="salaat-place">{selectedCity}</Div>
          </FormControl>
          <Button
            variant="outlined"
            sx={{
              color: "var(--button-color)",
              fontFamily: "Cairo",
              fontWeight:800,
              fontSize:"1.05rem",
              height: "3.5rem",
              border:"4px solid var(--select-border)",
              boxShadow: "var(--button-shadow )",
              '&:hover':{color:"var(--button-hover-color)",background:"var(--button-hover-bg)",boxShadow: "var(--button-hover-shadow)",border:"none"},
              transition:"all .5s ease-in-out",
          
              marginRight: {
                xs: "0px",
                sm: "0px",
                md: "2rem",
                lg: "2rem",
                xl: "2rem",
              },
            }}
            onClick={() => {
              getTimings();
            }}
          >
            أرني مواعيد الصلاة
          </Button>
        </Stack>

        {/* City Selection ------ END */}
      </div>
    </>
  );
}
