import React, {useState} from 'react';

function PowerfulAndPopular() {
  function handlePnPSubmit(event) {
    event.preventDefault();
    let elementsToMove = document.querySelectorAll('.navButton');
    for(let i=0; i<elementsToMove.length; i++) {
      elementsToMove[i].classList.add('moveToSide');
      elementsToMove[i].classList.remove('grantPriority');
      elementsToMove[i].classList.remove('resetFromSide');
    }

    document.getElementById('powerfulAndPopularButton').classList.add('grantPriority');
    document.getElementById('powerfulAndPopularButton').classList.remove('moveToSide');
    document.getElementById("backgroundTransitions").classList.remove('removeBodyShadow');
    document.getElementById("backgroundTransitions").classList.add('bodyShadow');

    document.getElementById('pnpContent').classList.remove('hiding');
  }



  return (
    <form id="powerfulAndPopular" onSubmit={handlePnPSubmit}>
      <button type="submit" id="powerfulAndPopularButton" className="navButton">
        I'm for Powerful & Popular!
        <section id="pnpContent" className="hiding">
          <div id="twoweppop1" className="pnpBoxes">twoweppop1</div>
          <div id="twoweppop2" className="pnpBoxes">twoweppop2</div>

          <div id="twoweppow1" className="pnpBoxes">twoweppow1</div>
          <div id="twoweppow2" className="pnpBoxes">twoweppow2</div>

          <div id="threeweppop1" className="pnpBoxes">threeweppop1</div>
          <div id="threeweppop2" className="pnpBoxes">threeweppop2</div>
          <div id="threeweppop3" className="pnpBoxes">threeweppop3</div>

          <div id="threeweppow1" className="pnpBoxes">threeweppow1</div>
          <div id="threeweppow2" className="pnpBoxes">threeweppow2</div>
          <div id="threeweppow3" className="pnpBoxes">threeweppow3</div>
        </section>
      </button>
    </form>
  )
}

export default PowerfulAndPopular