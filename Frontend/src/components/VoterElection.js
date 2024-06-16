import React from "react";
import Navbar from "./NavBar";
import ElectionItem from "./ElectionItem";

function VoterElection() {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col">
            <ElectionItem
              image="https://tse2.mm.bing.net/th?id=OIP.WjdshgattHHx2-_NWilXCwHaD0&pid=Api&P=0&h=180"
              title="Loksabha"
              id="1223"
              cand_no="12"
              path="../voter/loksabha/cast-vote"
            />{" "}
            {/* Need to fetch the data for  id and no. of the candidates */}
          </div>
          <div className="col">
            <ElectionItem
              image="https://tse2.mm.bing.net/th?id=OIP.tteW9OVQTbMV-wXzAMT_JAHaE_&pid=Api&P=0&h=180"
              title="Vidhan Sabha"
              id="1223"
              cand_no="12"
              path="../voter/vidhansabha/cast-vote"
            />
          </div>
          <div className="col">
            <ElectionItem
              image="https://tse1.mm.bing.net/th?id=OIP.ejy6TX31OP0-tGb7mtgyqwHaFj&pid=Api&P=0&h=180"
              title="Municipal Corporation"
              id="1223"
              cand_no="12"
              path="../voter/municipal/cast-vote"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default VoterElection;
