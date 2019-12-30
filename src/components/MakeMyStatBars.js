import React from 'react'

function MakeMyStatBars(props) {
  // console.log(props.stat)

  let revisedWep = props.value;
  let revisedPlayerPerfs = revisedWep.playerPerformances ? revisedWep.playerPerformances : revisedWep
  let stat = props.stat;
  let eachPlayerStatAverages = props.avs;
  let type = revisedWep.weaponType ? revisedWep.weaponType : props.type;
  let eachStatHash = props.mani;

  // if(testPath.statDefs) {
  //   eachStatHash = props.mani
  // }

  if(revisedPlayerPerfs[stat] || stat === "KaD" || stat === "wepPrecKillsAvg") {
    if(stat === "KaD") {
      return( 
        <div className="eachWepStat playerPerformances">
          <div className="statNames">KA/D</div>
          <div className="playerStatBarContainers">
            <span className="eachPlayerStatBar" style={{width: ((((revisedPlayerPerfs.killsAvg + revisedPlayerPerfs.assistsAvg) / revisedPlayerPerfs.deathsAvg) / eachPlayerStatAverages[type]["kdAvg"]) * 50 + "%")}}></span>
            <span className="eachPlayerStatBarLeft" style={{width: (50 + "%")}}></span>
            <span className="eachPlayerStatBarRight" style={{width: (50 + "%")}}></span>
          </div>
          <div className="statVals">{" " + ((revisedPlayerPerfs.killsAvg + revisedPlayerPerfs.assistsAvg) / revisedPlayerPerfs.deathsAvg).toFixed(1)}</div>
        </div>
      )
    }
    else if(stat === "wepPrecKillsAvg") {
      return( 
        <div className="eachWepStat playerPerformances">
          <div className="statNames">Precision Kills</div>
          <div className="playerStatBarContainers">
              <span className="eachPlayerStatBar" style={{width: ((revisedPlayerPerfs[stat] / eachPlayerStatAverages[type][stat]) * 50 + "%")}}></span>
              <span className="eachPlayerStatBarLeft" style={{width: (50 + "%")}}></span>
              <span className="eachPlayerStatBarRight" style={{width: (50 + "%")}}></span>
            </div>
            <div className="statVals">{" " + (revisedPlayerPerfs[stat] * 100).toFixed(0) + "%"}</div>
          </div>
      )
    }
    else if(revisedPlayerPerfs[stat]) {
      // console.log(stat)
      if(eachPlayerStatAverages[type][stat]) {
        let statname = stat;
        // if(stat === "wepPrecKillsAvg") {
        //   statname = "% Precision Kills"
        // }
        if(stat === "killsAvg") {
          statname = "Kills";
        }
        else if(stat === "deathsAvg") {
          statname = "Deaths";
        }
        else if(stat === "assistsAvg") {
          statname = "Assists";
        }
        else if(stat === "effAvg") {
          statname = "Efficiency";
        }
        else if(stat === "perKAvg") {
          statname = "Points Per Kill";
        }
        else if(stat === "perLAvg") {
          statname = "Points Per Life";
        }
        else if(stat === "scoreAvg") {
          statname = "Score";
        }
        return(
          <div className="eachWepStat playerPerformances">
            <div className="statNames">{statname + " "}</div>
            <div className="playerStatBarContainers">
              <span className="eachPlayerStatBar" style={{width: ((revisedPlayerPerfs[stat] / eachPlayerStatAverages[type][stat]) * 50 + "%")}}></span>
              <span className="eachPlayerStatBarLeft" style={{width: (50 + "%")}}></span>
              <span className="eachPlayerStatBarRight" style={{width: (50 + "%")}}></span>
            </div>
            <div className="statVals">{" " + revisedPlayerPerfs[stat].toFixed(1)}</div>
            {/* <div className="avStatVals">{" " + eachPlayerStatAverages[type][stat].toFixed(1)}</div> */}
          </div>
        )
      }
    }
  }
  else if(revisedWep.weaponValues && revisedWep.weaponValues[eachStatHash]) { //CREATOR FOR INNATE WEAPON STATS
    // console.log(stat, eachStatHash, props.mani)
    // console.log(revisedWep.weaponValues, eachStatHash)

    if(stat === "Magazine" || stat === "Rounds Per Minute" || stat === "Ammo Capacity" || stat === "Draw Time") {
      // console.log(manifest[wepId])
      return( 
        <div className="eachWepStat leftHalf">
          <div className="statNames">{stat + " "}</div>
          <div className="statVals">{" " + revisedWep.weaponValues[eachStatHash].value}</div>
        </div>
      )
    }
    else {
      return( 
        <div className="eachWepStat instrinsicStats">
          <div className="statNames">{stat + " "}</div>
          <div className="statBarContainers">
            <span className="eachWepStatBar" style={{width: (revisedWep.weaponValues[eachStatHash].value + "%")}}></span>
            <span className="eachStatBarBg" style={{width: ((100 - revisedWep.weaponValues[eachStatHash].value) + "%")}}></span>
            <span className="eachAvStatBar" style={{width: ((eachPlayerStatAverages[type][eachStatHash]) + "%")}}></span>
          </div>
          <div className="statVals">{" " + revisedWep.weaponValues[eachStatHash].value}</div>
        </div>
      )
    }
  }
  else {
    // console.log(revisedWep.weaponValues, eachStatHash)
    return(null)
  }
}

export default MakeMyStatBars
