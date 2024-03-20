import React, { useState, useEffect,useRef } from 'react';
import firebase from '../firebase';
import { Knob } from 'primereact/knob';
const FirebaseData = ({handleHumiditydata , handleTemperatureData}) => {
  const [data, setData] = useState(null);
  const [value, setValue] = useState(0);
  const [time , setTime] = useState(null);
  const [tempval , setTempval] = useState(0);
  const [temptime , setTemptime] = useState(null);
  const [wlval , setWlval] = useState(0);
  const [wltime , setWltime] = useState(null);

  const [hasApiBeenCalled, setHasApiBeenCalled] = useState(false);
  const [temphasApiBeenCalled, setTemphasApiBeenCalled] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const databaseRef = firebase.database().ref("Vertical Farming");

      databaseRef.on('value', (snapshot) => {
        const newData = snapshot.val();
        setData(newData);

        if (newData && newData.Humidity) {
          const humidityData = newData.Humidity;
          handleHumiditydata(humidityData);
          // console.log("Humidity data value : ",humidityData);
          // const firstHumidityValue = Object.values(humidityData)[0];
          const firstHumidityKey = Object.keys(humidityData).pop();
          const firstHumidityValue = Object.values(humidityData).pop();
          // console.log("first humidity value = ",firstHumidityValue , firstHumidityKey)
          setValue(parseFloat(firstHumidityValue.replace("%","")) ?? 0);
          setTime(firstHumidityKey?? '');
        }
        if (newData && newData.Temperature) {
          const tempData = newData.Temperature;
          handleTemperatureData(tempData);
          const firstTempKey = Object.keys(tempData).pop();
          const firstTempValue = Object.values(tempData).pop();
          setTempval(parseFloat(firstTempValue.replace("C","")) ?? 0);
          setTemptime(firstTempKey?? '');
        }
        if (newData && newData.waterLevel) {
          const wlData = newData.waterLevel;
          const wlKey = Object.keys(wlData).pop();
          const wlValue = Object.values(wlData).pop();
          // console.log("WATER LEVEL :",wlValue);
          setWlval((wlValue/500)*100);
          console.log("Water level :",wlval);
          setWltime(wlKey);
          // setTemptime(firstTempKey?? '');


          console.log("consolee : ", wlval)
         
        }
      });
    };

    fetchData();
    return () => {
      firebase.database().ref('Vertical Farming').off();
    };
  }, [handleHumiditydata , handleTemperatureData]);

  useEffect(()=>{
    const fun = async() => {
      
        console.log("Calling API...");
        setHasApiBeenCalled(true);
    
        fetch('https://vertical-farming-webapp.onrender.com/verticalfarming/waterlevel')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log('Water level data:', data);
            // Do something with the received data
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
        setTimeout(() => {
          setHasApiBeenCalled(false);
        }, 120000); // 2 minutes in milliseconds 
    }
    

    if(wlval < 30 && !hasApiBeenCalled) {
    fun()
    }
  },[wlval, hasApiBeenCalled])

  useEffect(()=>{
    const fun = async() => {
      
        console.log("Calling API...");
        setTemphasApiBeenCalled(true);
    
        fetch('https://vertical-farming-webapp.onrender.com/verticalfarming/temperature')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log('Temperature data:', data);
            // Do something with the received data
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
        setTimeout(() => {
          setTemphasApiBeenCalled(false);
        }, 120000); // 2 minutes in milliseconds 
    }
    

    if(tempval < 51 && !setTemphasApiBeenCalled) {
    fun()
    }
  },[tempval, temphasApiBeenCalled])

  if (!data) {
    return <div>Loading...</div>;
  }

  const humidityData = data.Humidity;
  const [firstTimestamp, firstHumidity] = Object.entries(humidityData)[0];
  const remainingEntries = Object.entries(humidityData).slice(1);


  const knobAlign = {
    display: "flex",
    alignItems: "center",
    marginTop: "10%",
    gap: "10px",
    justifyContent:"center"
  }
  const tableStyle = {
    width: '50%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    marginBottom: '20px',
  };
  
  const thStyle = {
    background: '#3498db',
    color: '#fff',
    padding: '8px',
    textAlign: 'left',
  };
  
  const tdStyle = {
    borderBottom: '1px solid #ddd',
    padding: '8px',
  };
  
  return (
    <div style={{height:"39vw"}}>
    
      <div style={knobAlign}>
      <div className="card flex justify-content-center" style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <h3>Humidity</h3>
            <Knob readOnly value={value} onChange={(e) => setValue(e.value)} size={300} />
            <h3>{time}</h3>
        </div>
        <div className="card flex justify-content-center" style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
          <h3>Temperature</h3>
            <Knob readOnly value={tempval} onChange={(e) => setValue(e.value)} size={300} />
            <h3>{temptime}</h3>
        </div>
        <div className="card flex justify-content-center" style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
          <h3>Water level</h3>
            <Knob readOnly value={wlval.toFixed(2)} onChange={(e) => setValue(e.value)} size={300} valueColor={wlval<50 ? 'red':'green'} rangeColor="#708090"/>
            {/* <h3>{wlval < 400 ? 'Low' : 'High'}</h3> */}
            <h3>{wltime}</h3>
        </div>
      </div>
    </div>
  );
};

export default FirebaseData;
