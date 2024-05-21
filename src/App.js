import logo from "./logo.svg";
import "./App.css";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";


const  App  = () =>  {
  const [progress, setProgress] = useState(0)
    const pageSize=6
  const apiKey= process.env.REACT_APP_NEWS_API
  
  

    return (
      <div>
        <BrowserRouter>
        <Navbar />
        <LoadingBar
        color='#f11946'
        progress={progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <Routes>
          <Route  path="/" element={ <News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country='us' category='general' />}/>
          <Route  path="/business" element={ <News setProgress={setProgress} apiKey={apiKey}  key='business' pageSize={pageSize} country='us' category='business' />}/>
          <Route  path="/entertainment" element={ <News setProgress={setProgress} apiKey={apiKey} key='entertainment' pageSize={pageSize} country='us' category='entertainment' />}/>
          <Route  path="/general" element={ <News setProgress={setProgress} apiKey={apiKey} key='general' pageSize={pageSize} country='us' category='general' />}/>
          <Route  path="/health" element={ <News setProgress={setProgress} apiKey={apiKey} key='health' pageSize={pageSize} country='us' category='health' />}/>
          <Route  path="/science" element={ <News setProgress={setProgress} apiKey={apiKey} key='science' pageSize={pageSize} country='us' category='science' />}/>
          <Route  path="/sports" element={ <News setProgress={setProgress} apiKey={apiKey} key='sports' pageSize={pageSize} country='us' category='sports' />}/>
          <Route  path="/technology" element={ <News setProgress={setProgress} apiKey={apiKey} key={'technology'} pageSize={pageSize} country='us' category='technology' />}/>
       
        </Routes>
        </BrowserRouter>
      </div>
    );
  
}
export default App;