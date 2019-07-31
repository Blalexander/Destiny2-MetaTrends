import React from 'react';
import PowerfulCombos from './PowerfulCombos';
import PopularCombos from './PopularCombos';


function PowerfulAndPopular(props) {
  if(props[0] === undefined) {
    return null;
  }

  function handlePnPSubmit(event) {
    event.preventDefault();
    // let elementsToMove = document.querySelectorAll('.navButton');
    // for(let i=0; i<elementsToMove.length; i++) {
    //   elementsToMove[i].classList.add('moveToSide');
    //   elementsToMove[i].classList.remove('grantPriority');
    //   elementsToMove[i].classList.remove('resetFromSide');
    // }

    // document.getElementById('powerfulAndPopularButton').classList.add('grantPriority');
    // document.getElementById('powerfulAndPopularButton').classList.remove('moveToSide');
    // document.getElementById("backgroundTransitions").classList.remove('removeBodyShadow');
    // document.getElementById("backgroundTransitions").classList.add('bodyShadow');

    // document.getElementById('pnpContent').classList.remove('hiding');
  }



  return (
    <form id="powerfulAndPopular" onSubmit={handlePnPSubmit}>
      <button type="submit" id="powerfulAndPopularButton" className="navButton">
        <section id="pnpContent" className="hiding">
          <h1 className="popCombos">Popular</h1>
          <PopularCombos {...props} />
          <h1 className="powCombos">Powerful</h1>
          <PowerfulCombos {...props} />
        </section>
      </button>
    </form>
  )
}

export default PowerfulAndPopular