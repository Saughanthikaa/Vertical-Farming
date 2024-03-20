// src/App.js
import React, { useState ,useRef} from 'react';
import FirebaseData from './compoents/FirebaseData'; 
import Chartdata from './compoents/Chartdata';
import 'primeicons/primeicons.css';
function App() {

  const bottomDivRef = useRef(null);
  const [humidityData, setHumidityData] = useState([]);
  const [temperatureData , setTemperatureData] = useState([]);
  const [isvisible , setIsvisible] = useState(true);
  const scrollToBottom = () => {
    setIsvisible(false);
    bottomDivRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    setIsvisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHumiditydata = (newData)=>{
    setHumidityData(newData);
  }
  const handleTemperatureData = (tempdata)=>{
    setTemperatureData(tempdata);
  }

  return (
    <div className="App">
      <div className='topDiv'>
      <FirebaseData handleHumiditydata={handleHumiditydata} handleTemperatureData={handleTemperatureData}/>
      {isvisible && (
        <div style={{width:"100vw",display:"flex",justifyContent:"center"}}>
          <i className="pi pi-chevron-down" style={{ fontSize: '3rem',color:"gray" }} onClick={scrollToBottom}></i>
        </div>
      )}
      </div>
      <div className='bottomDiv' ref={bottomDivRef}>
      <div style={{width:"100vw",display:"flex",justifyContent:"center"}}>
          <i className="pi pi-chevron-up" style={{ fontSize: '3rem',color:"gray" }} onClick={scrollToTop}></i>
        </div>
      <Chartdata  humidityData={humidityData} temperatureData={temperatureData}/>
      </div>
    </div>
  );
}

export default App;
