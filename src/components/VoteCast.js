import React from 'react'

function VoteCast() {
    return (
        <>
            <div className="container my-2">
                <div class="p-3 mb-2 bg-danger text-white">Kindly cast your vote</div>
                <div className="container text-center">
                    <div className="row">
                        <div className="col">
                            <p>Election id: 31212121</p>
                        </div>
                        <div className="col">
                            <p>Total no. of candidates registered: 32</p>
                        </div>
                       
                        
                    </div>
                </div>

                <p>Here are the list of all registered candidates:</p>
                <table class="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th scope="col">S.No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Party Name</th>
                            <th scope="col">Party Symbol</th>
                            <th scope="col">Total No. of Votes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>4223</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>221</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>221</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default VoteCast
