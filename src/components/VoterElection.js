import React from 'react'
import Navbar from './NavBar'
import ElectionItem from './ElectionItem'

function VoterElection() {
  return (
   <>
   <Navbar/>
   <div className="container">
    <div className="row">
      <ElectionItem/>
    </div>
   </div>
   </>
  )
}

export default VoterElection
