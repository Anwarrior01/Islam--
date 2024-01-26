import React from 'react'
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Filters() {

    const   cUrl =  'https://api.countrystatecity.in/v1/countries'
    const  ckey ='NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
    const [countryData, setCountryData] = useState(null)

  const handleCityChange = (event) => {
    console.log(event.target.value);
    setSelectedCity(event.target.value);
  };
  return (
    <div>
             <Stack
          direction="row"
          justifyContent={"center"}
          style={{ marginTop: "40px" }}
        >
          <FormControl style={{ width: "20vw", marginLeft: "2rem" }}>
            <InputLabel id="demo-simple-select-label">
              <span style={{ color: "white", fontFamily: "cairo" ,  paddingLeft : "1rem3"}}>
                {" "}
                {" "}
                {"البلد"}
              </span>      
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              // onChange={console.log("e")}
              tabIndex={selectedCountry}
              onChange={(c)=>{setSelectedCountry(c.target.value)}}
            >
                 {
                  countryData && countryData.map(c => {
                    return (
                      <MenuItem key={c.id} value={c.name} >
                        {c.name}
                      </MenuItem>
                    )
                  })
                 } 
            </Select>
          </FormControl>
          <FormControl style={{ width: "20vw", marginLeft: "1rem" }}>
            <InputLabel id="demo-simple-select-label">
              <span style={{ color: "white", fontFamily: "cairo" }}>
                {" "}
                المنطقة{" "}
              </span>
            </InputLabel>
            <Select
            disabled={selectedCountry === "morocco"}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Age"
              // onChange={}
            >
              <MenuItem style={{ fontFamily: "Cairo" }} value={"Laayoune"}>
                العيون
              </MenuItem>
              <MenuItem style={{ fontFamily: "Cairo" }} value={"Rabat"}>
                الرباط
              </MenuItem>
              <MenuItem style={{ fontFamily: "Cairo" }} value={"Casablanca"}>
                الدار البيضاء
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl style={{ width: "20vw", marginLeft: "1rem" }}>
            <InputLabel id="demo-simple-select-label">
              <span style={{ color: "white", fontFamily: "cairo" }}>
                {" "}
                المدينة{" "}
              </span>
            </InputLabel>
            <Select
            disabled={selectedCountry === "Morocco"}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Age"
              onChange={handleCityChange}
            >
              <MenuItem style={{ fontFamily: "Cairo" }} value={"Laayoune"}>
                العيون
              </MenuItem>
              <MenuItem style={{ fontFamily: "Cairo" }} value={"Rabat"}>
                الرباط
              </MenuItem>
              <MenuItem style={{ fontFamily: "Cairo" }} value={"Casablanca"}>
                الدار البيضاء
              </MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            style={{
              color: "white",
              borderColor: "white",
              marginRight: "2rem",
            }}
          >
            Outlined
          </Button>
        </Stack>
    </div>
  )
}
