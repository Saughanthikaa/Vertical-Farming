// import React from 'react';
import Chart from 'chart.js/auto';

// import { Line } from 'react-chartjs-2';

// const LineChart = () => {
//   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//   const data = {
//     labels: months,
//     datasets: [
//       {
//         label: 'Values',
//         data: [0, 20, 40, 60, 80, 100],
//         fill: false,
//         borderColor: 'rgba(75,192,192,1)',
//         borderWidth: 2,
//         pointBackgroundColor: 'rgba(75,192,192,1)',
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       x: {
//         type: 'category',
//         labels: months,
//         title: {
//           display: true,
//           text: 'Months',
//         },
//       },
//       y: {
//         min: 0,
//         max: 100,
//         stepSize: 20,
//         title: {
//           display: true,
//           text: 'Values',
//         },
//       },
//     },
//   };

//   return (
//     <div>
//       <Line data={data} options={options} />
//     </div>
//   );
// };

// export default LineChart;


import React from 'react';
import { Line } from 'react-chartjs-2';

const Chartdata = ({ humidityData, temperatureData }) => {
  // ... (existing code)

  const prepareChartData = (data, label, color) => {
    const dataArray = Object.keys(data).map((date) => ({
      date,
      value: parseFloat(data[date]),
    }));

    const groupedData = dataArray.reduce((acc, dataPoint) => {
      const date = dataPoint.date.split(' ')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(dataPoint.value);
      return acc;
    }, {});

    const dailyAverages = Object.keys(groupedData).map((date) => {
      const values = groupedData[date];
      const average = values.reduce((sum, val) => sum + val, 0) / values.length;
      return { date, average };
    });

    return {
      labels: Object.keys(groupedData),
      datasets: [
        {
          label,
          data: Object.values(dailyAverages).map((entry) => entry.average),
          fill: false,
          borderColor: color,
          borderWidth: 2,
          pointBackgroundColor: color,
        },
      ],
    };
  };

  const humidityChartData = prepareChartData(humidityData, 'Humidity', 'rgba(75,192,192,1)');
  const temperatureChartData = prepareChartData(temperatureData, 'Temperature', 'rgba(255, 99, 132, 1)');

  const options = {
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
        },
      },
    },
  };

  return (
    <div style={{display:"flex",height:"48vw"}}>
      <div style={{width:"50%",display:"flex",flexDirection:"column",alignItems:"center"}}>
      <h2>Humidity Chart</h2>
      <Line data={humidityChartData} options={options} />
      </div>

      <div style={{width:"50%",display:"flex",flexDirection:"column",alignItems:"center"}}>
      <h2>Temperature Chart</h2>
      <Line data={temperatureChartData} options={options} />
      </div>
    </div>
  );
};

export default Chartdata;

