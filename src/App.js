import MainContent from "./components/mainContent";
import Container from "@mui/material/Container";
import "./App.css";
import "./index.css";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import DarkMode from "./components/DarkMode/DarkMode";
import Hadeeth from "./components/Hadeeth";
import Quran from "./components/Quran";

function App() {
  return (

      <>
        <Hero />
        {/* <NavBar /> */}
        <MainContent />
        <Hadeeth />
        <Quran />
      </>
   
  );
}

export default App;
