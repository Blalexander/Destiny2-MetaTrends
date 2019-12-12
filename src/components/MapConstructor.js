import React from 'react';


function MapConstructor(props) {
  // console.log(mapItem)
  // const titanMaps = props[7].filter(gameMap => {
  //   return gameMap._id.class === "Titan"
  // })
  if(props[0] === undefined) {
    return null;
  }



  const titanMaps = props.filter(gameMap => {
    return gameMap._id.class === "Titan"
  })
  const hunterMaps = props.filter(gameMap => {
    return gameMap._id.class === "Hunter"
  })    
  const warlockMaps = props.filter(gameMap => {
    return gameMap._id.class === "Warlock"
  })

  function MapDataPopulator(item) {
    // console.log(item.value)
    let mapHash = item.value._id.map;
    // let mapIcon = "https://www.bungie.net" + manifest.mapHashes[mapHash].locationImage;
    let revisedWinRate = (1 - item.value.standing) * 100;


    return(
      <div className="eachMapHolder">
        {/* <img src={mapIcon} className="mapIcons" alt="mapIcon"></img>  */}
        {/* <p>{manifest.mapHashes[mapHash].locationName}</p> */}
        <p>Win Rate: {revisedWinRate.toFixed(0)}%</p>
        <p>Games Played: {item.value.count}</p>
        <br></br>
      </div>
    )
  }

  const MapsData = titanMaps.map((gameMap) => 
    <MapDataPopulator key={gameMap._id.map} value={gameMap} />
  );

  return(
    <div>
      <div className="mapsContainer">
        {MapsData}
      </div>
    </div>
  )
    
}

export default MapConstructor
