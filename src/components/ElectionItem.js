import React from 'react'

function ElectionItem() {
  return (
    <div className="card my-2" style={{ width: '18rem' }}>
    <img src="https://tse2.mm.bing.net/th?id=OIP.WjdshgattHHx2-_NWilXCwHaD0&pid=Api&P=0&h=180" className="card-img-top" alt="Fissure in Sandstone" />
    <div className="card-body">
      <h5 className="card-title">Lok Sabha Election</h5>
      <p className="card-text">Election id: 312212121</p>
      <p className="card-text">Total Candidates: 32</p>
      <a href="#!" className="btn btn-primary" data-mdb-ripple-init>Cast your vote</a>
    </div>
  </div>
  

  )
}

export default ElectionItem
