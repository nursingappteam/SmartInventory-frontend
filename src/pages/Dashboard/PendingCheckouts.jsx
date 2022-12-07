import React, { useState, useEffect, useRef } from "react";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_API_KEY;

export const PendingCheckouts = () => {
  const [checkouts, setCheckouts] = useState([]);
  const [selectedCheckout, setSelectedCheckout] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const navigate = useNavigate();

  const toast = useRef(null);
  const dt = useRef(null);

  const toCheckout = (value) => {
    console.log(value);
    navigate("/shoppingcart", { state: { user_name: value.user_name } });
  };

  // get all pending checkouts for admin
  const getPendingCheckouts = async () => {
    const request_url = `/checkout/getPendingCheckouts`;

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
          setCheckouts(response.data);
          console.log(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPendingCheckouts();
  }, []);

  return (
    <div className="pending">
      <Toast ref={toast} />
      <div className="card">
        <DataTable
          ref={dt}
          value={checkouts}
          selection={selectedCheckout}
          onSelectionChange={(e) => {
            toCheckout(e.value);
          }}
          selectionMode="single"
        >
          <Column field="checkout_id" header="Checkout ID" />
          <Column field="user_name" header="Instructor Name" />
          <Column field="start_date" header="Start Date" />
        </DataTable>
      </div>
      PendingCheckouts
    </div>
  );
};
