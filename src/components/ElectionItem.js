import React from 'react';
import { Link } from 'react-router-dom';

function ElectionItem(props) {
  return (
    <div className="card my-2" style={{ width: '18rem' }}>
      <div className="card-body d-flex flex-column">
        <img src={props.image} className="card-img-top mb-2" alt="Fissure in Sandstone" style={{ objectFit: "cover", width: "100%", maxHeight: "150px" }} />
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">Voter id: {props.id}</p>
        <p className="card-text">Total no. of candidates: {props.cand_no}</p>
        <Link to={props.path} className="btn btn-primary mt-auto" data-mdb-ripple-init>
          Cast your vote
        </Link>
      </div>
    </div>
  );
}

export default ElectionItem;
