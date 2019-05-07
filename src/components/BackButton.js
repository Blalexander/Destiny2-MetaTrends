import React from 'react'

function BackButton() {
  function handleBackButtonSubmit(event) {
    event.preventDefault();
    let resetElements = document.querySelectorAll('.navButton');
    for(let i=0; i<resetElements.length; i++) {
      resetElements[i].classList.add('resetFromSide');
      resetElements[i].classList.remove('moveToSide');
      resetElements[i].classList.remove('grantPriority');
    }

    document.getElementById("backgroundTransitions").classList.remove('bodyShadow');
    document.getElementById("backgroundTransitions").classList.add('removeBodyShadow');
    // document.body.classList.remove('bodyShadow');


    document.getElementById('pnpContent').classList.add('hiding');
    document.getElementById('NavigationMenuContainer').classList.add('hiding');
  }


  return (
    <form id="backButtonForm" onSubmit={handleBackButtonSubmit}>
      <button type="submit" className="back-button">Back</button>
    </form>
  )
}

export default BackButton