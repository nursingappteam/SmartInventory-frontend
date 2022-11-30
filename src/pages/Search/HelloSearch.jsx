import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductService } from "../../components/ProductService";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import axios from "axios";

import "./styles.css";
const API_KEY = import.meta.env.VITE_API_KEY;

export default function Chart() {
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

  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const productService = new ProductService();

  // get data from db TODO: Check for surplused Items
  const getProductData = async () => {
    const request_url = `/assets/display_assets`;

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

  // update Asset
  const updateProduct = async (values) => {
    let request_url = "/assets/update";

    const options = {
      method: "POST",
      headers: {
        Content_Type: "application/json",
        api_key: API_KEY,
      },
      data: {
        values,
      },
      url: request_url,
    };

    const response = await axios(options)
      .then((response) => {
        if (response.status === 200) {
          console.log("product updated");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // add new Asset
  const addProduct = async (values) => {
    let request_url = "/assets/add";

    const options = {
      method: "POST",
      headers: {
        Content_Type: "application/json",
        api_key: API_KEY,
      },
      data: {
        values,
      },
      url: request_url,
    };

    const response = await axios(options)
      .then((response) => {
        if (response.status === 200) {
          console.log("product added");
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
  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };
  // -------------------------------------------------------------------------------------------
  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };
  // -------------------------------------------------------------------------------------------
  const saveProduct = () => {
    setSubmitted(true);
    if (product.type.trim()) {
      let _products = [...products];
      let _product = { ...product };
      if (product.asset_id) {
        // console.log("product exists"); ADD UPDATING ITEM IN DB````````````````````````````````````````````````````````TODO:
        /* const index = findIndexById(product.asset_id);
        _products[index] = _product; */
        console.log(product);
        updateProduct(product);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
      } else {
        /* _product.asset_id = createId();
        _products.push(_product); */
        addProduct(product);
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
  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };
  // -------------------------------------------------------------------------------------------
  const deleteProduct = () => {
    //TODO: make add to checkout button with request
    let _products = products.filter((val) => val.asset_id !== product.asset_id);
    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
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
  const deleteSelectedProducts = () => {
    //TODO: make delete Selected Items
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
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
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
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };
  // -------------------------------------------------------------------------------------------
  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Manage Products</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );
  // -------------------------------------------------------------------------------------------
  const productDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveProduct}
      />
    </React.Fragment>
  );
  // -------------------------------------------------------------------------------------------
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  // -------------------------------------------------------------------------------------------
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedProducts}
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
        {sessionStorage.getItem("user_type_id") == 2 && (
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
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "8rem" }}
          ></Column>
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
      {/* // Delete an asset/non-asset dialog menu for the delete button on the top left of the table */}
      <Dialog
        visible={deleteProductDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>
              Are you sure you want to delete <b>{product.description}</b>?
            </span>
          )}
        </div>
      </Dialog>
      {/* // ------------------------------------------------------------------------------------------- */}
      {/* // Delete an asset/non-asset dialog menu for the delete button on the right side of a row */}
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
            <span>Are you sure you want to delete the selected products?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
