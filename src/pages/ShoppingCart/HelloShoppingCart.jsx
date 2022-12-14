import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import "./styles.css";
import { useCookies } from "react-cookie";
import { useContext } from "react";
import UserContext from "../../components/UserContext";
import moment from "moment/moment";
import { useLocation } from "wouter";

const API_KEY = import.meta.env.VITE_API_KEY;

export default function Chart(props) {
  let emptyProduct = {
    asset_id: null,
    cust_dept_desc: "",
    acquisition_date: "",
    tag_num: "",
    tagged: "",
    type: "",
    sub_type: "",
    description: "",
    serial_id: "",
    acquisition_cost: 0,
    company: "",
    PO_IDS: "",
    location: "",
    sub_location: "",
    building: "",
  };

  // UserContext stuff
  const { user_type_id, set_user_type_id } = useContext(UserContext);
  const { user_id, set_user_id } = useContext(UserContext);
  const { checkout_cart, set_checkout_cart } = useContext(UserContext);
  const { cart_count, set_cart_count } = useContext(UserContext);

  const [products, setProducts] = useState([]);
  const [productDialog, setProductDialog] = useState(false);
  const [addProductsDialog, setAddProductDialog] = useState(false);
  const [acceptDialog, setAcceptDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const [cookies, setCookies, removeCookies] = useCookies([
    "inventory_session_id",
  ]);

  const getCart = async () => {
    const request_url = "/users/session/getCart";

    const options = {
      method: "POST",
      headers: {
        Content_Type: "application/json",
        api_key: API_KEY,
      },
      data: {
        session_id: cookies.inventory_session_id,
      },
      url: request_url,
    };

    const res = await axios(options)
      .then((res) => {
        if (res.status === 200) {
          setProducts(res.data.cart);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const acceptCheckout = async (values) => {
    let request_url = "/checkout/approveCheckout";
    // find asset_id's that are chosen and find their counterpart checkout_id
    const checkouts = props.items;

    var chosenCheckouts = [];
    for (let i = 0; i < checkouts.length; i++) {
      for (let j = 0; j < values.length; j++) {
        if (checkouts[i].asset_id == values[j].asset_id) {
          chosenCheckouts.push(checkouts[i].checkout_id);
        }
      }
    }
    console.log(chosenCheckouts);

    const options = {
      method: "POST",
      headers: {
        Content_Type: "application/json",
        api_key: API_KEY,
      },
      data: {
        checkout_ids: chosenCheckouts,
      },
      url: request_url,
    };

    const res = await axios(options)
      .then((res) => {
        if (res.status === 200) {
          console.log("Checkouts " + chosenCheckouts + " accepted");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // used to get the checkouts of a specific key
  // and then return all of the assets
  // assicuated with that checkout
  const getCheckout = async () => {
    const request_url = "/assets/get_assets";
    var assets = [];
    for (let i in props.items) {
      assets.push(props.items[i].asset_id);
    }
    const options = {
      method: "POST",
      headers: {
        Content_Type: "application/json",
        api_key: API_KEY,
      },
      data: {
        asset_id: assets,
      },
      url: request_url,
    };

    const res = await axios(options)
      .then((res) => {
        if (res.status === 200) {
          setProducts(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // TODO: Possibly use different time scale for 72 hrs
  const checkout = async (values) => {
    const request_url = `/checkout/createCheckout`;
    const start_date = moment().format("YYYY-MM-DD HH:MM:SS");
    var end_date;
    // wednesday make due
    if (moment().day() == 4) {
      end_date = moment().add(4, "days").format("YYYY-MM-DD HH:MM:SS");
    } else if (moment().day() == 5) {
      end_date = moment().add(4, "days").format("YYYY-MM-DD HH:MM:SS");
    } else {
      end_date = moment().add(2, "days").format("YYYY-MM-DD HH:MM:SS");
    }

    const options = {
      method: "POST",
      headers: {
        Content_Type: "application/json",
        api_key: API_KEY,
      },
      data: {
        asset_id: values,
        start_date: start_date,
        end_date: end_date,
        user_id: user_id,
      },
      url: request_url,
    };
    const response = await axios(options)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          // update sess checkout
          sessionUpdateCart(values);
          //setProducts(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("checkout");
  };

  const sessionUpdateCart = async (values) => {
    let request_url = `/users/session/updateCart`;
    // edit cart to only have remaining items.
    let newCart = checkout_cart.filter((val) => !values.includes(val));
    console.log("new cart: " + newCart);
    // post the cookie session ID and the list of items
    const options = {
      method: "POST",
      headers: {
        Content_Type: "application/json",
        api_key: API_KEY,
      },
      data: {
        session_id: cookies.inventory_session_id,
        cart_items: newCart,
      },
      url: request_url,
    };

    const response = await axios(options)
      .then((response) => {
        if (response.status === 200) {
          set_cart_count(response.data.updatedCartCount);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // load in data for user's shopping cart
  useEffect(() => {
    // if it's a dialog, get list of assets from props and make that products
    if (props.inDialog) {
      console.log(props.items);
      getCheckout(props.items);
    } else {
      getCart();
    }
  }, []);
  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };
  // -------------------------------------------------------------------------------------------
  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };
  // -------------------------------------------------------------------------------------------
  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };
  // -------------------------------------------------------------------------------------------
  const hideAddToCartProductsDialog = () => {
    setAddProductDialog(false);
  };
  // -------------------------------------------------------------------------------------------
  const hideAcceptDialog = () => {
    setAcceptDialog(false);
  };
  // -------------------------------------------------------------------------------------------
  // When user pressed the save option when you edit or add an new product from the dialog box
  const saveProduct = () => {
    setSubmitted(true);
    if (product.type.trim()) {
      let _products = [...products];
      let _product = { ...product };
      if (product.asset_id) {
        const index = findIndexById(product.asset_id);
        _products[index] = _product;
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
      } else {
        _product.asset_id = createId();
        _products.push(_product);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000,
        });
      }
      setProducts(_products);
      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };
  // -------------------------------------------------------------------------------------------
  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  // -------------------------------------------------------------------------------------------
  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.length; i++) {
      if (products[i].asset_id === id) {
        index = i;
        break;
      }
    }
    return index;
  };
  // -------------------------------------------------------------------------------------------
  const createId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };
  // -------------------------------------------------------------------------------------------
  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };
  // -------------------------------------------------------------------------------------------
  const confirmAddToCartSelected = () => {
    setAddProductDialog(true);
  };
  // -------------------------------------------------------------------------------------------
  const confirmAccept = () => {
    setAcceptDialog(true);
  };
  // -------------------------------------------------------------------------------------------
  const deleteSelectedProducts = () => {
    // gets asset_ids from selected items and removes them from the cart
    var _selectedProducts = [];
    for (let i in selectedProducts) {
      _selectedProducts.push(selectedProducts[i].asset_id);
    }
    sessionUpdateCart(_selectedProducts);
    let _products = products.filter((val) => !selectedProducts.includes(val));
    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };

  // -------------------------------------------------------------------------------------------
  const addSelectedToCartProducts = () => {
    // submiting user's checkout.
    var _selectedProducts = [];
    for (let i in selectedProducts) {
      _selectedProducts.push(selectedProducts[i].asset_id);
    }
    checkout(_selectedProducts);

    let _products = products.filter((val) => !selectedProducts.includes(val));
    setProducts(_products);
    setAddProductDialog(false);
    setSelectedProducts(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Added to Shopping Cart",
      life: 3000,
    });
  };
  // -------------------------------------------------------------------------------------------
  const acceptSelectedProducts = () => {
    //Place holder for my dear friend Brad
    acceptCheckout(selectedProducts);
    hideAcceptDialog(false);
    setSelectedProducts(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Accepted",
      life: 3000,
    });
  };
  // -------------------------------------------------------------------------------------------
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };
  // -------------------------------------------------------------------------------------------
  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };
  // -------------------------------------------------------------------------------------------
  // New and Delete button on the upper left portion of the table
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success mr-2"
          onClick={openNew}
          title="Add new Asset/Non-Asset to Inventory"
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger ml-4"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
          title="Remove from the Inventory"
        />
      </React.Fragment>
    );
  };
  // -------------------------------------------------------------------------------------------
  // Edit && Delete Button on the right hand side of each table row
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger ml-4"
          onClick={confirmDeleteSelected}
          title="Remove from Shopping Cart"

          // label="Delete"
          // icon="pi pi-trash"
          // className="p-button-danger ml-4"
          // onClick={confirmDeleteSelected}
          // disabled={!selectedProducts || !selectedProducts.length}
          // title="Remove from the Inventory"
        />
      </React.Fragment>
    );
  };

  // -------------------------------------------------------------------------------------------
  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">UTA Nursing Department Inventory Checkout</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          size="30"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger ml-2"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
          title="Remove from the Inventory"
        />
        {!props.inDialog && (
          <Button
            label="Checkout"
            icon="pi pi-shopping-cart"
            className="p-button-warning ml-2"
            onClick={confirmAddToCartSelected}
            disabled={!selectedProducts || !selectedProducts.length}
            title="Checkout items from cart"
          />
        )}
        {user_type_id == 1 && (
          <Button
            label="Accept"
            icon="pi pi-check"
            className="p-button-success ml-2"
            onClick={confirmAccept}
            disabled={!selectedProducts || !selectedProducts.length}
            title="Accept items"
          />
        )}
      </span>
    </div>
  );
  // -------------------------------------------------------------------------------------------
  const productDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="cancelButton"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="saveButton"
        onClick={saveProduct}
      />
    </React.Fragment>
  );
  // -------------------------------------------------------------------------------------------
  const addProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="noAddCartButton"
        onClick={hideAddToCartProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="yesAddCartButton"
        onClick={addSelectedToCartProducts}
      />
    </React.Fragment>
  );
  // -------------------------------------------------------------------------------------------
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="noDeleteButton"
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="yesDeleteButton"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );
  // -------------------------------------------------------------------------------------------
  const acceptDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="noDeleteButton"
        onClick={hideAcceptDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="yesDeleteButton"
        onClick={acceptSelectedProducts}
      />
    </React.Fragment>
  );
  // -------------------------------------------------------------------------------------------
  return (
    <div className="searchPageAdmin">
      <Toast ref={toast} />

      <div className="card">
        {/* // ------------------------------------------------------------------------------------------- */}
        {/* // Creation of the top toolbar of the table (Add and Delete button) */}
        {sessionStorage.getItem("user_type_id") == 1 && (
          <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
        )}
        {/* // ------------------------------------------------------------------------------------------- */}
        {/* // Creation of the Data Table */}
        <DataTable
          ref={dt}
          value={products}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="asset_id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
          header={header}
          responsiveLayout="scroll"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
            exportable={false}
          ></Column>
          <Column
            field="description"
            header="Product Name"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="type"
            header="Type"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="sub_type"
            header="Sub Type"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="tag_num"
            header="Tag Number"
            sortable
            style={{ minWidth: "8rem" }}
          ></Column>
          {/* <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "8rem" }}
          ></Column> */}
        </DataTable>
      </div>
      {/* // ------------------------------------------------------------------------------------------- */}
      {/* // Dialog menu that appears when you create a new entry or edit an entry */}
      <Dialog
        visible={productDialog}
        style={{ width: "450px" }}
        header="Asset/Non-Asset Details"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <div className="formgrid grid">
          {/* // ------------------------------------------------------------------------------------------- */}
          {/* // Type Entry */}
          <div className="field col">
            <label htmlFor="type">Type</label>
            <InputText
              id="type"
              value={product.type}
              onChange={(e) => onInputChange(e, "type")}
              className={classNames({
                "p-invalid": submitted && !product.type,
              })}
            />
          </div>
          {/* // ------------------------------------------------------------------------------------------- */}
          {/* // Sub Type Entry */}
          <div className="field col">
            <label htmlFor="sub_type">Sub Type</label>
            <InputText
              id="sub_type"
              value={product.sub_type}
              onChange={(e) => onInputChange(e, "sub_type")}
              className={classNames({
                "p-invalid": submitted && !product.sub_type,
              })}
            />
          </div>
        </div>
        {/* // ------------------------------------------------------------------------------------------- */}
        {/* // Description or Product Name Entry */}
        <div className="field">
          <label htmlFor="description">Description</label>
          <InputTextarea
            id="description"
            value={product.description}
            onChange={(e) => onInputChange(e, "description")}
            className={classNames({
              "p-invalid": submitted && !product.description,
            })}
            rows={3}
            cols={20}
          />
        </div>
        {/* // ------------------------------------------------------------------------------------------- */}
        {/* // Tag Number Entry */}
        <div className="field">
          <label htmlFor="tag_num">Tag Number</label>
          <InputText
            id="tag_num"
            value={product.tag_num}
            onChange={(e) => onInputChange(e, "tag_num")}
            className={classNames({
              "p-invalid": submitted && !product.tag_num,
            })}
          />
        </div>
        <div className="formgrid grid">
          {/* // ------------------------------------------------------------------------------------------- */}
          {/* // Acquisition Cost Entry */}
          <div className="field col">
            <label htmlFor="acquisition_cost">Acquisition Cost</label>
            <InputNumber
              id="acquisition_cost"
              value={product.acquisition_cost}
              onValueChange={(e) => onInputNumberChange(e, "acquisition_cost")}
              className={classNames({
                "p-invalid": submitted && !product.acquisition_cost,
              })}
              mode="currency"
              currency="USD"
              locale="en-US"
            />
          </div>
          {/* // ------------------------------------------------------------------------------------------- */}
          {/* // Acquisition Date Entry */}
          <div className="field col">
            <label htmlFor="acquisition_date">Acquisition Date</label>
            <InputText
              id="acquisition_date"
              value={product.acquisition_date}
              onChange={(e) => onInputChange(e, "acquisition_date")}
              className={classNames({
                "p-invalid": submitted && !product.acquisition_date,
              })}
              keyfilter={/^[^#<>a-zA-Z,*!]+$/}
              placeholder="mm/dd/yyyy"
            />
          </div>
        </div>
        <div className="formgrid grid">
          {/* // ------------------------------------------------------------------------------------------- */}
          {/* // Location Entry */}
          <div className="field col">
            <label htmlFor="location">Location</label>
            <InputText
              id="location"
              value={product.location}
              onChange={(e) => onInputChange(e, "location")}
              className={classNames({
                "p-invalid": submitted && !product.location,
              })}
            />
          </div>
          {/* // ------------------------------------------------------------------------------------------- */}
          {/* // Sub Location Entry */}
          <div className="field col">
            <label htmlFor="sub_location">Sub Location</label>
            <InputText
              id="sub_location"
              value={product.sub_location}
              onChange={(e) => onInputChange(e, "sub_location")}
              className={classNames({
                "p-invalid": submitted && !product.sub_location,
              })}
            />
          </div>
        </div>
        {/* // ------------------------------------------------------------------------------------------- */}
        {/* // Serial ID Entry */}
        <div className="field">
          <label htmlFor="serial_id">Serial ID</label>
          <InputText
            id="serial_id"
            value={product.serial_id}
            onChange={(e) => onInputChange(e, "serial_id")}
            className={classNames({
              "p-invalid": submitted && !product.serial_id,
            })}
          />
        </div>
        <div className="formgrid grid">
          {/* // ------------------------------------------------------------------------------------------- */}
          {/* // Company Entry */}
          <div className="field col">
            <label htmlFor="company">Company</label>
            <InputText
              id="company"
              value={product.company}
              onChange={(e) => onInputChange(e, "company")}
              className={classNames({
                "p-invalid": submitted && !product.company,
              })}
            />
          </div>
          {/* // ------------------------------------------------------------------------------------------- */}
          {/* // PO ID(s) Entry */}
          <div className="field col">
            <label htmlFor="PO_IDS">PO ID(s)</label>
            <InputText
              id="PO_IDS"
              value={product.PO_IDS}
              onChange={(e) => onInputChange(e, "PO_IDS")}
              className={classNames({
                "p-invalid": submitted && !product.PO_IDS,
              })}
            />
          </div>
        </div>
        {/* // ------------------------------------------------------------------------------------------- */}
        {/* // Building Entry */}
        <div className="field">
          <label htmlFor="building">Building</label>
          <InputText
            id="building"
            value={product.building}
            onChange={(e) => onInputChange(e, "building")}
            className={classNames({
              "p-invalid": submitted && !product.building,
            })}
          />
        </div>
      </Dialog>
      {/* // ------------------------------------------------------------------------------------------- */}
      {/* // Add an asset/non-asset to cart dialog menu for the add button on the right side of the row on the table */}
      <Dialog
        visible={addProductsDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={addProductDialogFooter}
        onHide={hideAddToCartProductsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>
              Are you sure you want to checkout the selected product(s) from
              your Shopping Cart?
            </span>
          )}
        </div>
      </Dialog>
      {/* // ------------------------------------------------------------------------------------------- */}
      {/* // Accept an asset/non-asset for the accept button on the right side of the row on the table */}
      {user_type_id == 1 && props.inDialog && (
        <Dialog
          visible={acceptDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={acceptDialogFooter}
          onHide={hideAcceptDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {product && (
              <span>
                Are you sure you want to accept the selected product(s)?
              </span>
            )}
          </div>
        </Dialog>
      )}
      {/* // ------------------------------------------------------------------------------------------- */}
      {/* // Delete an asset(s)/non-asset(s) dialog menu for the delete button on the top left of the table */}
      <Dialog
        visible={deleteProductsDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>
              Are you sure you want to delete the selected product(s)?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
