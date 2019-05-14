import React from "react";


export default function FindShipments(props) {
    function handleFindShipments(e) {
        const date = document.getElementById("date").value || "%";
        const vendor = document.getElementById("vendor").value || "%";
        const pickup_city = document.getElementById("pickup_city").value || "%";
        const customer_name =
            document.getElementById("customer_name").value || "%";
        let query = {};
        if (date !== "%") {
            query.vendor = vendor;
            query.field = "date";
            query.value = date;
        } else if (pickup_city !== "%") {
            query.vendor = vendor;
            query.field = "fromCity";
            query.value = pickup_city;
        } else if (customer_name !== "%") {
            query.vendor = vendor;
            query.field = "fromName";
            query.value = customer_name;
        } else if (vendor !== "%") {
            query.vendor = vendor;
            query.field = "vendor";
            query.value = vendor;
        } else {
            query.vendor = "%";
            query.field = "fromName";
            query.value = "%";
        }

        fetch("http://localhost:5000/search", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(query)
        })
            .then(res => res.json())
            .then(data => {
                //set the HTML
               let sortedData = data.sort((a, b) => {
                  a = new Date(a.date);
                  b = new Date(b.date);
                  return b-a;
               })
                let html = "";
                sortedData.map(pro => {
                    html =
                        html +
                        `
        <tr>
        <td>${pro.vendor}</td>
          <td>${pro.pro}</td>
          <td>${pro.date}</td>
          <td>${pro.fromName}</td>
          <td>${pro.toName}</td>
          <td>${pro.pallets}</td>
          <td>${pro.weight}</td>
          <td>${pro.status}</td>
  
        <tr>
        `;
                });
                document.getElementById("results").innerHTML = html;
            });
    }
    return (
        <section>
            <div className="container my-5">
                <div className="row">
                    <div className="col">
                        <h6>Date: </h6>
                        <input id="date" type="date" className="form-control" />
                    </div>

                    <div className="col">
                        <h6>Vendor Name: </h6>
                        <input
                            id="vendor"
                            type="text"
                            className="form-control"
                        />
                    </div>

                    <div className="col">
                        <h6>Pickup City: </h6>
                        <input
                            id="pickup_city"
                            type="text"
                            className="form-control"
                        />
                    </div>

                    <div className="col">
                        <h6>Customer Name: </h6>
                        <input
                            id="customer_name"
                            type="text"
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="row my-5">
                    <div className="col">
                        <button
                            className="btn btn-danger"
                            onClick={e => props.handleBackBtn(e)}
                        >
                            Back
                        </button>
                    </div>
                    <div className="col" />
                    <div className="col" />
                    <div className="col">
                        <button
                            className="btn btn-primary"
                            onClick={e => handleFindShipments(e)}
                        >
                            Fetch
                        </button>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <hr />
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Vendor</th>
                            <th>Pro#</th>
                            <th>Date:(new first)</th>
                            <th>From:</th>
                            <th>To:</th>
                            <th>Pallets:</th>
                            <th>Weight:</th>
                            <th>Status:</th>
                        </tr>
                    </thead>
                    <tbody className="text-dark" id="results" />
                </table>
            </div>
        </section>
    );
}
