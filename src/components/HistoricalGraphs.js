import React from 'react'

export default function HistoricalGraphs() {
  function handleHGSubmit(event) {
    event.preventDefault();
    let elementsToMove = document.querySelectorAll('.navButton');
    for(let i=0; i<elementsToMove.length; i++) {
      elementsToMove[i].classList.add('moveToSide');
      elementsToMove[i].classList.remove('grantPriority');
      elementsToMove[i].classList.remove('resetFromSide');
    }

    document.getElementById('historicalGraphsButton').classList.add('grantPriority');
    document.getElementById('historicalGraphsButton').classList.remove('moveToSide');
    document.getElementById("backgroundTransitions").classList.remove('removeBodyShadow');
    document.getElementById("backgroundTransitions").classList.add('bodyShadow');
  }


  return (
    <form id="historicalGraphs" onSubmit={handleHGSubmit}>
      <button type="submit" id="historicalGraphsButton" className="navButton">I'm for Historical Graphs!</button>
    </form>
  )
}
