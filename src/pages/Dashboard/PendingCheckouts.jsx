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
import ShoppingCartMain from "../ShoppingCart/HelloShoppingCart";
import { Dialog } from "primereact/dialog";
const API_KEY = import.meta.env.VITE_API_KEY;

export const PendingCheckouts = () => {
  const [allPendingCheckouts, setAllPendingCheckouts] = useState([]);
  const [key, setKey] = useState(null);
  const [checkouts, setCheckouts] = useState([]);
  const [selectedCheckout, setSelectedCheckout] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [checkoutItemsDialog, setCheckoutItemsDialog] = useState(false);
  const navigate = useNavigate();

  const hideList = () => {
    setCheckoutItemsDialog(false);
  };

  const toast = useRef(null);
  const dt = useRef(null);

  // TODO: Make popup with list of all checkout items
  // made state allPendingCheckouts that holds the return
  // from getPendingCheckouts for easier retreival of list of assetIDs
  const toCheckout = (value) => {
    console.log(value);
    //navigate("/shoppingcart", { state: { user_id: value.user_id } });
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
          // set checkout data into a useable table layout
          setAllPendingCheckouts(response.data);
          var checkoutData = [];

          for (const key in response.data) {
            let user_name = response.data[key][0].user_name;
            let user_id = response.data[key][0].user_id;
            let start_date = response.data[key][0].start_date;
            let num = response.data[key].length;
            checkoutData.push({ user_id, user_name, start_date, num });
          }
          setCheckouts(checkoutData);
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
          header="Pending Checkouts"
          value={checkouts}
          selection={selectedCheckout}
          onSelectionChange={(e) => {
            setKey(e.value.user_id);
            setCheckoutItemsDialog(true);
          }}
          selectionMode="single"
        >
          <Column field="user_name" header="Instructor Name" />
          <Column field="num" header="Size" />
          <Column field="start_date" header="Start Date" />
        </DataTable>
        {/* Pop up that shows the list of the checkout assets to the Admin*/}
        <Dialog
          header="Checkout Items"
          visible={checkoutItemsDialog}
          onHide={hideList}
        >
          <ShoppingCartMain items={allPendingCheckouts[key]} inDialog={true} />
        </Dialog>
      </div>
    </div>
  );
};
