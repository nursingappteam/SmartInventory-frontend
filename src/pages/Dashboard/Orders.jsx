
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

export default function Chart() {
  const [products, setProducts] = useState(null);
  const [globalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);


// TODO: Get the data from the DB for a specific users Checkout History.
//       This is just the code from the Search Page, needs to be modified.
  const getProductData = async () => {
    const request_url = `https://smartinventory-backend.glitch.me/assets/display_assets`;
    const options = {
      method: "GET",
      headers: {
        Content_Type: "application/json",
        api_key: API_KEY,
      },
      url: request_url,
    };
    const response = await axios(options)
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // -------------------------------------------------------------------------------------------
  useEffect(() => {
    getProductData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // -------------------------------------------------------------------------------------------
  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Checkout History</h5>
    </div>
  );
  // -------------------------------------------------------------------------------------------
  return (
    <div className="dashboard">
      <Toast ref={toast} />

      <div className="card">
        {/* // ------------------------------------------------------------------------------------------- */}
        {/* // Creation of the Data Table */}
        <DataTable
          ref={dt}
          value={products}
          dataKey="asset_id"
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
          header={header}
          responsiveLayout="scroll"
        >
          <Column
            field="description"
            header="Product Name"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="tag_num"
            header="Tag Number"
            sortable
            style={{ minWidth: "8rem" }}
          ></Column>
          <Column
            field="return_date"
            header="Return Date"
            sortable
            style={{ minWidth: "8rem" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}