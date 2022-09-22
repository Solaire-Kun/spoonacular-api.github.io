import React from 'react';
import { Link, useLocation } from "react-router-dom";

function ItemDetails(props) {
  const { state } = useLocation()
  //const item = props.location?.state?.title
  //const image = props.location?.items.image
  
  console.log(state)
  //console.log(item)

  function createSummary() {
    return {__html: `${state.summary}`};
  }

  return (
    <div className="d-flex d-block flex-column container-fluid justify-content-center text-justify align-items-center">
      <h3>{state.title}</h3>
        <img className="rounded mx-auto mb-2 mt-2 img-thumbnail bg-dark" src={state.image} alt="" />
        <div className="w-75 mx-auto list-inline border border-light rounded bg-dark p-3 mb-2 mt-2" dangerouslySetInnerHTML={createSummary()}></div>
        <Link to='/' className="btn btn-primary d-flex mb-2 mt-2">
          ← Go to Home
        </Link>
    </div>
  )
}

export default ItemDetails