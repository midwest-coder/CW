import React, { useState, useEffect } from 'react'
import { Line } from '@reactchartjs/react-chart.js'
import Typography from '@material-ui/core/Typography'


const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

const LineChart = (props) =>{
// const [matchLabels, setMatchLabels] = useState([])
let count = 0
const labels = props.data.map(() => {
    count++
    return count
})
 
const data = {
    labels: labels,
    datasets: [
      {
        label: 'Kills per Match',
        data: props.data,
        fill: false,
        backgroundColor: 'linear-gradient(45deg, #32a883, #3290a8)',
        borderColor: 'rgba(0, 166, 255, 0.4)',
      },
    ],
  }

    return(
    <>
    <div className='header'>
      <Typography variance="h6" align="center">Match Stats</Typography>
    </div>
    <Line data={data} options={options} />
    </>
    )
} 

export default LineChart
