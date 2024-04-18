import MainContent from "./components/mainContent";
import Container from "@mui/material/Container";
import "./App.css";
import "./index.css";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import DarkMode from "./components/DarkMode/DarkMode";
import Hadeeth from "./components/Hadeeth";
import Quran from "./components/Quran";
import Chat from "./components/Chat";
import Authentication from "./components/authentication/Authentication";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { auth } from "./firebase";
import { loginUser, setLoading } from "./features/userSlice";
import { BrowserRouter , Route,  Routes } from "react-router-dom";
import Loader from "./components/Loader";


function App() {
   const salaatRef = useRef(null);
   const quranRef = useRef(null);
   const hadeethRef = useRef(null);
  const dispatch = useDispatch()
  useEffect(()=>{
    auth.onAuthStateChanged(authUser => {
      if(authUser){
        dispatch(loginUser(
          {
            uid:authUser.uid,
            username : authUser.displayName,
            email:authUser.email
          }
        ))
        dispatch(setLoading(false))
      }else{
        console.log("User is not Logged in")
        dispatch(setLoading(false));
      }
    })
  },[])
  const user = useSelector((state) => state.data.user.user);
  const isLoading = useSelector((state) => state.data.user.isLoading);
  console.log(user)
  return (
    <div className="app">
      {/* <BrowserRouter>
        <Routes>
          <Route path="/salaat" element={<MainContent />} />
          <Route path="/hadeeth" element={<Hadeeth />} />
          <Route path="/quran" element={<Quran />} />
        </Routes>
      </BrowserRouter> */}
      {isLoading ? (
       <Loader />
      ) : user ? (
        <>
          {/* <Chat /> */}
          <Hero />
          <NavBar
          
          />
          <MainContent  />
          <Hadeeth  />
          <Quran  />
        </>
      ) : (
        <Authentication />
      )}
    </div>
  );
}

export default App;
