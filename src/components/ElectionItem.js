import React from 'react'

function ElectionItem() {
    return (
        <div class="col-md-4 mb-4 position-static">
        <div class="card mb-4">
          <div class="card-header py-3">
            <h5 class="mb-0 text-font">1 item <span class="float-end mt-1"
                style={{fontSize: '13px'}}>Edit</span></h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-4">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/12a.webp"
                  class="rounded-3" style={{width:"100px"}} alt="Blue Jeans Jacket" />
              </div>
              <div class="col-md-6 ms-3">
                <span class="mb-0 text-price">$35.00</span>
                <p class="mb-0 text-descriptions">Denim jacket </p>
                <span class="text-descriptions fw-bold">Black</span> <span
                  class="text-descriptions fw-bold">UK 8</span>
                <p class="text-descriptions mt-0">Qty:<span class="text-descriptions fw-bold">1</span>
                </p>
              </div>
            </div>
            <div class="card-footer mt-4">
              <ul class="list-group list-group-flush">
                <li
                  class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 text-muted">
                  Subtotal
                  <span>$35.00</span>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center px-0 fw-bold text-uppercase">
                  Total to pay
                  <span>$35.00</span>
                </li>
              </ul>
            </div>


          </div>
        </div>
      </div>

    )
}

export default ElectionItem
