import React, { useState } from 'react';
import CanvasJSReact from '../canvas/canvasjs.react';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default function GameHistory(props) {
  if(props[0] === undefined) {
    return null;
  }

  const options = {
    title: {
      text: "Basic Column Chart in React"
    },
    data: [{				
      type: "column",
      dataPoints: [
          { label: "Apple",  y: 10  },
          { label: "Orange", y: 15  },
          { label: "Banana", y: 25  },
          { label: "Mango",  y: 30  },
          { label: "Grape",  y: 28  }
      ]
    }]
 }

  return (
    <div id="gameHistoryContainer" value={props}>
      <CanvasJSChart options = {options}  />
    </div>
  )
}