import React, { Component } from "react";

export default class PrintTruckManifest extends Component {
    constructor() {
        super();
        this.state = {
            carrier: "",
            trailer: "",
            destination: "",
            manifest_date: "",
            loader: '',
            pros: []
        };
    }
    calcWeight() {
      let weight = 0;
      this.state.pros.forEach(pro => {
        weight = weight + parseInt(pro.weight)
      })
      return weight;
    }
    calcPallets() {
      let pallets = 0;
      this.state.pros.forEach(pro => {
        pallets = pallets + parseInt(pro.pallets)
      })
      return pallets;
    }
    calcPieces() {
      let pieces = 0;
      this.state.pros.forEach(pro => {
        pieces = pieces + parseInt(pro.pieces)
      })
      return pieces;
    }
    
    createPrintablePage(){

       //timeout to make sure state gets loaded
       setTimeout(() => {
        let table = ``
        this.state.pros.map(pro => {
            table = table +
            `<tr>
              <td>${pro.date}</td>
              <td>${pro.pro}</td>
              <td>${pro.fromName}</td>
              <td>${pro.pieces}</td>
              <td>${pro.pallets}</td>
              <td>${pro.weight}</td>
              <td></td>
            </tr>`
          
        })
        
          let htmlHeader = `
        <style> @page {size: A4 landscape;}</style>
        <style>td {height: 25px; border: 1px solid black; text-align: center;}</style>
        <style>th {height: 25px; border: 1px solid black; text-align: center;}</style>
      <div class="text-center"><h3>JSL TRANSPORTATION TRUCK MANIFEST</h3></div>
      <div style='display: flex; flex-direction: row; justify-content: center' class='text-center mt-5'>
      <u><h5 class='px-5'>Carrier: ${this.state.carrier}</h5></u>
      <u><h5 class='px-5'>Tractor# : ________</h5></u>
      <u><h5 class='px-5'>Date: ${this.state.manifest_date}</h5></u>
      
      </div>

      <div style='display: flex; flex-direction: row; justify-content: center' class='text-center mt-3'>
      <u><h5 class='px-5'>Destination: ${this.state.destination}</h5></u>
      <u><h5 class='px-5'>Trailer# : ${this.state.trailer}</h5></u>
      <u><h5 class='px-5'>Seal# : ________</h5></u>
      </div>
      <hr />
      <table class='container-fluid'>
        <thead>
        <tr>
          <th style='width: 125px'>P/U DATE</th>
          <th>PRO#</th>
          <th>SHIPPER</th>
          <th>PCS</th>
          <th>PALLETS</th>
          <th>WEIGHT</th>
          <th>COMMENTS</th>
        </tr>
        </thead>
        <tbody>
        ${table}
        </tbody>
      </table>
      <div style='display: flex; flex-direction: row; justify-content: flex-end' class='text-center mt-5'>
      <u><h6 class='px-5'>Loader: ${this.state.loader}</h6></u>
      <u><h6 class='px-5'>Total Weight : ${this.calcWeight()}</h6></u>
      <u><h6 class='px-5'>Total Pallets : ${this.calcPallets()}</h6></u>
      
      </div>

      <div style='display: flex; flex-direction: row; justify-content: flex-end;' class='text-center mt-3'>
      <u><h6 class='px-5'>Unloader: ________</h6></u>
      <u><h6 class='px-5'>Total Pieces : ${this.calcPieces()}</h6></u>
      
      </div>
      <div class='text-center mt-3'>
      <p>EMAIL COMPLETED MANIFESTS TO: dispatch@eightsons.com</p>
      </div>
      
      
      `;

          
          let win = window.open(
              "",
              "TRUCK MANIFEST",
              "toolbar=yes,directories=no, status=no, width=1280, height=720 "
          );
          win.document.head.insertAdjacentHTML(
              "afterbegin",
              `<link
      rel="stylesheet"
      href="https://bootswatch.com/4/lux/bootstrap.min.css"
  />`
          );
          win.document.body.classList.add("container-fluid");
          win.document.body.classList.add("py-3");

          win.document.body.insertAdjacentHTML("beforeend", htmlHeader);
          
          
      }, 500);


    }

    generateTruckManifest = e => {
        e.preventDefault();
        let manifestNumber = document.getElementById("manifest").value;
        
        let data = {
            vendor: "%",
            field: "manifest",
            value: manifestNumber
        };
        fetch("http://localhost:5000/search", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(myJson => {
              if(myJson.length === 0) {
                document.getElementById('manifest-error').textContent = 'MANIFEST NOT FOUND';
                document.getElementById('manifest-error').style.display = 'block';
              } else {

              
                let date;
                if(myJson[0].manifest_date) {
                   date = myJson[0].manifest_date.slice(0,10);
                } else {
                   date = " ";
                }
                this.setState({
                  carrier: myJson[0].manifest_carrier || " ",
                  trailer:myJson[0].manifest_trailer || " ",
                  destination:myJson[0].manifest_destination || " ",
                  manifest_date:date,
                  loader: myJson[0].manifest_loader || " ",
                  pros: myJson
                });

                this.createPrintablePage();


              }
            });
       
    };

    render() {
        return (
            <div className="container mt-5">
                <form
                    className="form-inline my-5"
                    onSubmit={e => this.generateTruckManifest(e)}
                >
                    <div className="form-group">
                        <label htmlFor="manifest">Manfiest Number</label>
                        <input
                            id="manifest"
                            className="form-control ml-3 border border-dark"
                            name="manifest"
                        />

                        <button className="btn btn-success ml-5">
                            Generate
                        </button>
                    </div>
                </form>
                <hr />
                <button
                    className="btn btn-danger mt-5"
                    onClick={this.props.handleBackBtn}
                >
                    Back
                </button>
                <div id='manifest-error' style={{display: 'none'}} className='alert alert-danger mt-5'></div>
            </div>
        );
    }
}
