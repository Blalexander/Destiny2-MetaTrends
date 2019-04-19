import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

export default function(props) {

  const chartData = {
    labels: ["this", "that", "there"],
    datasets: [{
      level:'population',
      data:[1, 2, 3, 4, 5],
      backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(255, 99, 255, 0.6)']
    }]
  }


  return (
    <div className="chart">
      <Bar
        data={chartData}
        width={100}
        height={50}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  )
}