import React, {useState} from 'react';
// import {Line, Bar, Pie} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';


export default function ClassComparisons() {
  function handleCCSubmit(event) {
    event.preventDefault();
    let elementsToMove = document.querySelectorAll('.navButton');
    for(let i=0; i<elementsToMove.length; i++) {
      elementsToMove[i].classList.add('moveToSide');
      elementsToMove[i].classList.remove('grantPriority');
      elementsToMove[i].classList.remove('resetFromSide');
    }

    document.getElementById('classComparisonsButton').classList.add('grantPriority');
    document.getElementById('classComparisonsButton').classList.remove('moveToSide');
    document.getElementById("backgroundTransitions").classList.remove('removeBodyShadow');
    document.getElementById("backgroundTransitions").classList.add('bodyShadow');

    document.getElementById('NavigationMenuContainer').classList.remove('hiding');
  }



  // const [classesPieChart, setClassesPieChart] = useState({
  const [classesPieChart] = useState({
    labels: ['Titan', 'Hunter', 'Warlock'],
    datasets: [
      {
        data: [147, 223, 109],
        // data: [50, 50, 50],
        backgroundColor: ['rgba(233, 11, 11, 0.6)', 'rgba(17, 17, 232, 0.6)', 'rgba(249, 160, 71, 0.6)'],
      },
    ]
  })

  // const [classesOTChart, setclassesOTChart] = useState({
  //   labels: ['yesterday', 'today', 'tomorrow'],
  //   datasets: [ //need to make this a variable thing that expects the { label } objects to come in
  //     {
  //       label: 'Titan',
  //       data: [1, 3, 8, 2, 5],
  //       // backgroundColor: ['rgba(13, 122, 231, 0.6)', 'rgba(231, 13, 13, 0.6)'],
  //       borderColor: "red"
  //     },
  //     {
  //       label: 'Hunter',
  //       data: [4, 7, 9, 6, 3],
  //       // backgroundColor: ['rgba(11, 22, 33, 0.6)', 'rgba(44, 55, 66, 0.6)'],
  //       borderColor: "blue"
  //     },
  //     {
  //       label: 'Warlock',
  //       data: [2, 1, 3, 4, 1],
  //       // backgroundColor: ['rgba(11, 22, 33, 0.6)', 'rgba(44, 55, 66, 0.6)'],
  //       borderColor: "gold"
  //     }
  //   ]
  // })


  // const [currentWeaponPopularity] = useState({
  //   labels: ['Titan'], //BAR, labels = X-axis dates
  //   datasets: [ 
  //     {
  //       label: 'Titan',
  //       data: [1],
  //       // backgroundColor: ['rgba(13, 122, 231, 0.6)', 'rgba(231, 13, 13, 0.6)'],
  //       borderColor: "red"
  //     },
  //     {
  //       label: 'Hunter',
  //       data: [3],
  //       // backgroundColor: ['rgba(11, 22, 33, 0.6)', 'rgba(44, 55, 66, 0.6)'],
  //       borderColor: "blue"
  //     },
  //     {
  //       label: 'Warlock',
  //       data: [4],
  //       // backgroundColor: ['rgba(11, 22, 33, 0.6)', 'rgba(44, 55, 66, 0.6)'],
  //       borderColor: "gold"
  //     },
  //   ]
  // })


  return (
    <form id="classComparisons" onSubmit={handleCCSubmit}>
      <button type="submit" id="classComparisonsButton" className="navButton">
      I'm for Class Comparisons!
        <div id="NavigationMenuContainer" className="hiding">
          <section className="currentClassPop Pie">
            <Pie
              data={classesPieChart}
              options={{ maintainAspectRatio: false, responsive: false, rotation: 140 }}
            />
          </section>
          <section id="titanCC" className="CCcontainer"></section>
          <section id="hunterCC" className="CCcontainer"></section>
          <section id="warlockCC" className="CCcontainer"></section>
        </div>
      </button>
    </form>
  )
}


// return (
//   <form id="classComparisons" onSubmit={handleCCSubmit}>
//     <button type="submit" id="classComparisonsButton" className="navButton">
//     I'm for Class Comparisons!
//       <div id="NavigationMenuContainer" className="hiding">
//         <section className="currentClassPop Pie">
//           <Pie
//             data={classesPieChart}
//             options={{ maintainAspectRatio: false, responsive: false }}
//           />
//         </section>
//         <section className="classPopOT line">
//           <Line
//             data={classesOTChart}
//             options={{ maintainAspectRatio: false, responsive: false }}
//           />
//         </section>
//         <section className="currentWepPop bar">
//           <Bar
//             data={currentWeaponPopularity}
//             options={{ maintainAspectRatio: false, responsive: false }}
//           />
//         </section>
//       </div>
//     </button>
//   </form>
// )