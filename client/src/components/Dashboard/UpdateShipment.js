import React from "react";

export default function UpdateShipment(props) {
  function handleSubmit(e) {
    e.preventDefault();
    let pro = document.getElementById("proNumber").value;
    let vendor = document.getElementById("vendor").value.toUpperCase();
    let date = document.getElementById("date").value;
    let pieces = document.getElementById("pieces").value;
    let pallets = document.getElementById("pallets").value;
    let status = document.getElementById("status").value;
    let weight = document.getElementById("weight").value;
    let fromName = document.getElementById("from-name").value || " ";
    let fromStreet = document.getElementById("from-street").value || " ";
    let fromCity = document.getElementById("from-city").value || " ";
    let fromState = document.getElementById("from-state").value || " ";
    let fromZipcode = document.getElementById("from-zip").value || " ";
    let toName = document.getElementById("to-name").value || " ";
    let toStreet = document.getElementById("to-street").value || " ";
    let toCity = document.getElementById("to-city").value || " ";
    let toState = document.getElementById("to-state").value || " ";
    let toZipcode = document.getElementById("to-zip").value || " ";
    let manifest = document.getElementById("manifest").value || " ";
    let status_code = document.getElementById('status_code').value;

    let body = {
      pro,
      vendor,
      date,
      pieces,
      pallets,
      status,
      weight,
      fromName,
      fromStreet,
      fromCity,
      fromState,
      fromZipcode,
      toName,
      toStreet,
      toCity,
      toState,
      toZipcode,
      manifest,
      status_code
    };

    fetch(`http://73.10.32.79:8137/pro/${pro}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
      .then(res => {
        if (res.status === 200) {
          document.getElementById("success").style.display = "block";
        }
        if (res.status === 401) {
          document.getElementById("error").style.display = "block";
          document.getElementById("error").textContent =
            "That Pro Number Already Exists!";
        }
      })
      .catch(err => {
        document.getElementById("error").style.display = "block";
        document.getElementById("error").textContent = "Error: " + err;
      });
  }
  function fetchInfo(e) {
    e.preventDefault();
    let errorDiv = document.getElementById("error");
    const pro = document.getElementById("proNumber").value;
    fetch(`http://73.10.32.79:8137/pro/${pro}`)
      .then(data => data.json())
      .then(myJson => {
        if (myJson.length === 0) {
          errorDiv.style.display = "block";
          errorDiv.textContent = "Pro not found";
        } else {
          errorDiv.style.display = "none";
          const {
            date,
            status,
            pieces,
            pallets,
            fromCity,
            fromName,
            fromState,
            fromStreet,
            fromZipcode,
            toCity,
            toName,
            toState,
            toStreet,
            toZipcode,
            vendor,
            weight,
            manifest,
            status_code
          } = myJson[0];

          document.getElementById("vendor").value = vendor;
          document.getElementById("date").value = date;
          document.getElementById("pieces").value = pieces;
          document.getElementById("pallets").value = pallets;
          document.getElementById("status").value = status;
          document.getElementById("weight").value = weight;
          document.getElementById("from-name").value = fromName;
          document.getElementById("from-street").value = fromStreet;
          document.getElementById("from-city").value = fromCity;
          document.getElementById("from-state").value = fromState;
          document.getElementById("from-zip").value = fromZipcode;
          document.getElementById("to-name").value = toName;
          document.getElementById("to-street").value = toStreet;
          document.getElementById("to-city").value = toCity;
          document.getElementById("to-state").value = toState;
          document.getElementById("to-zip").value = toZipcode;
          document.getElementById("manifest").value = manifest;
          document.getElementById("status_code").value = status_code;
          console.log(status_code)
        }
      });
  }

  return (
    <div>
      <form className="bg-light py-5 mt-5 " onSubmit={e => handleSubmit(e)}>
        <h3 className="text-dark  mb-5 text-center">Update a Shipment</h3>
        <div className="container mb-5 ">
          <div className="form-inline">
            
              <div className="form-group mb-5">
                <label  htmlFor="proNumber" className="mr-1 mt-4">
                  Pro Number:
                </label>
                <input
                  id="proNumber"
                  name="proNumber"
                  className="form-control border border-primary mr-3 mt-4"
                />
              
              <div className="form-group">
                <button
                  style={{ marginTop: "26px" }}
                  className="btn btn-primary "
                  onClick={e => fetchInfo(e)}
                >
                  Fetch Pro
                </button>
              </div>

              <div className="form-group">
                <label className='mt-4' htmlFor="manifest">Manifest:</label>
                <input
                  style={{ width: "125px" }}
                  id="manifest"
                  name="manifest"
                  className="form-control border border-primary mt-4 "
                />
              </div>
              <div className="form-group">
                <label htmlFor="status_code" className="mt-4  mr-1">
                  Status:
                </label>
                <select
                  id="status_code"
                  name="status_code"
                  className="form-control border border-primary mr-3 mt-4"
                >
                  <option value="Picked Up">Picked Up</option>
                  <option value="inbound">Inbound</option>
                  <option value="Picked Up">On Hand</option>
                  <option value="delivered">Delivered</option>
                  <option value="returned">Returned</option>
                  <option value="transfered">Transfered</option>
                  <option value="ofd">Out For Delivery</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form-inline">
            <div className="form-group">
              <label htmlFor="vendor" className="mr-1">
                Vendor:
              </label>
              <input
                id="vendor"
                name="vendor"
                type="text"
                className="form-control border border-primary  mr-3"
              />

              <label htmlFor="date" className="mr-1">
                Date:
              </label>
              <input
                id="date"
                type="date"
                name="date"
                className="form-control border border-primary"
              />
              <label htmlFor="status" className="ml-5 ">
                Notes for Tracking:
              </label>
              <input
                id="status"
                type="text"
                name="status"
                className="form-control border border-danger"
              />
            </div>
            <div className="mt-3 form-inline">
              <div className="form-group">
                <label htmlFor="pieces" type="number" className="mr-1">
                  Pieces:{" "}
                </label>
                <input
                  id="pieces"
                  name="pieces"
                  className="form-control border border-primary  mr-3"
                />

                <label htmlFor="pallets" type="number" className="mr-1">
                  Pallets:
                </label>
                <input
                  id="pallets"
                  name="pallets"
                  className="form-control border border-primary  mr-3"
                />

                <label htmlFor="weight" className="mr-1">
                  Weight:
                </label>
                <input
                  style={{ width: "220px" }}
                  id="weight"
                  name="weight"
                  className="form-control border border-primary  "
                />
              </div>
              <button
                className="btn btn-danger  mr-4 mt-4"
                onClick={e => props.handleBackBtn(e)}
              >
                Back
              </button>
              <input
                className="btn btn-success ml-auto mr-4 mt-4"
                type="submit"
              />
            </div>
            <div
              id="success"
              style={{ width: "100%", paddingleft: "125px", display: "none" }}
              className="alert alert-success mt-3"
            >
              SUCCESS
            </div>
            <div
              id="error"
              style={{ width: "100%", paddingleft: "125px", display: "none" }}
              className="alert alert-danger mt-3"
            >
              Something Went Wrong
            </div>
          </div>
        </div>

        <hr />
        <div className="container my-4">
          <p>Pickup Information**</p>

          <div className="form-group">
            <label htmlFor="from-name">Customer Name:</label>
            <input
              type="text"
              id="from-name"
              name="from-name"
              className="form-control border border-primary"
            />
            <label htmlFor="from-street">Street Address:</label>
            <input
              type="text"
              id="from-street"
              name="from-street"
              className="form-control border border-primary"
            />
          </div>
          <div className="form-inline">
            <div className="form-group">
              <label htmlFor="from-city">City:</label>
              <input
                type="text"
                id="from-city"
                name="from-city"
                className="form-control border border-primary"
              />

              <label htmlFor="from-state">State:</label>
              <input
                type="text"
                id="from-state"
                name="from-state"
                className="form-control border border-primary"
              />

              <label htmlFor="from-zip">Zipcode:</label>
              <input
                id="from-zip"
                name="from-zip"
                className="form-control border border-primary"
              />
            </div>
          </div>
        </div>

        <hr />
        <div className="container my-4">
          <p>Delivery Information**</p>

          <div className="form-group">
            <label htmlFor="to-name">Customer Name:</label>
            <input
              type="text"
              id="to-name"
              name="to-name"
              className="form-control border border-primary"
            />
            <label htmlFor="to-street">Street Address:</label>
            <input
              type="text"
              id="to-street"
              name="to-street"
              className="form-control border border-primary"
            />
          </div>
          <div className="form-inline">
            <div className="form-group">
              <label htmlFor="to-city">City:</label>
              <input
                type="text"
                id="to-city"
                name="to-city"
                className="form-control border border-primary"
              />

              <label htmlFor="to-state">State:</label>
              <input
                type="text"
                id="to-state"
                name="to-state"
                className="form-control border border-primary"
              />

              <label htmlFor="to-zip">Zipcode:</label>
              <input
                id="to-zip"
                name="to-zip"
                className="form-control border border-primary"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
