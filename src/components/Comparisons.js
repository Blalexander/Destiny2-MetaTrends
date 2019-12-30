import React, { useState, useEffect } from "react";


function Comparisons(props) {
  if(props.value === "") {
    return null;
  }

  let manifestDefs = props.manifest;
  const [selectedHash, setSelectedHash] = useState('');


  return (
    <div>
      hallo
    </div>
  )
}

export default Comparisons
