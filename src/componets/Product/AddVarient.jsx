import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import {
  ColorAndSizeContext,
  ProductContext,
} from "../../context/CreateContext";
import CustomeModal from "../common/CustomeModal";
import IconPack from "../common/IconPack";
import { toast } from "react-toastify";
import $ from "jquery";
import { Icon } from "@mui/material";

const AddVarient = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const params = {};
  queryParams.forEach((value, key) => {
    params[key] = value;
  });
  const { product_id, variant_id } = params;
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const { createVariant, varientObj, getAllVariant, deleteVariant } =
    useContext(ProductContext);
  // console.log("🚀 ~ AddVarient ~ varientObj:", varientObj)
  const { varient, handleVarientForm } = useContext(ProductContext).Variant;
  // const [varient, setVarient] = useState({
  //   size_id: [],
  //   color_id: "",
  // });

  // const handleVarientForm = (e) => {
  //   setVarient({ ...varient, [e.target.name]: e.target.value });
  // };

  const [variantData, setVatiantData] = useState({
    product_stock: "",
    sku_id: "",
    sale_price: "",
    product_price: "",
  });
  // const [isValidate, setIsValidate] = useState();
  const [files, setFiles] = useState([]);
  const handleVariantData = (e) => {
    $(e.target).removeClass("error-input");
    setVatiantData({ ...variantData, [e.target.name]: e.target.value });
  };
  const handleOnInput = (e, number) => {
    e.target.value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*?)\..*/g, "$1")
      .slice(0, number || 5);
  };
  const validation = (e) => {
    e.preventDefault();
    if (variantData.product_price.length === 0) {
      $("input[name='product_price']").addClass("error-input");
      return "Product price name is required";
    }
    if (variantData.sale_price.length === 0) {
      $("input[name='sale_price']").addClass("error-input");
      return "Sale price name is required";
    }
    if (variantData.sku_id.length === 0) {
      $("input[name='sku_id']").addClass("error-input");
      return "SKU ID name is required";
    }
    if (variantData.product_stock.length === 0) {
      $("input[name='product_stock']").addClass("error-input");
      return "Product stock name is required";
    }
    if (files.length === 0) {
      // $("input[name='product_length']").addClass("error-input")
      return "Product image is required";
    }
  };
  const SubmitVariantData = (e) => {
    e.preventDefault();
    const msg = validation(e);
    if (msg) {
      toast.error(msg, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      console.log(variantData);
      console.log(files);
    }
  };

  const { getColorAndSize, sizeAndColor } = useContext(ColorAndSizeContext);

  useEffect(() => {
    // console.log(typeof product_id);
    if (!product_id) {
      navigate("/addproduct");
    }
    // GetSingalCategory(category);
    getColorAndSize();
    product_id && getAllVariant(product_id);
  }, []);

  const CreateVarient = () => {
    // console.log(varient)
    // const varient1 = varient.size_id.map((name) => {
    //   // console.log("name--->" , name)
    //   const selectedSize = sizeAndColor.size.find(
    //     (size) => size.size_name == name
    //   );
    //   // console.log("🚀 ~ varient1 ~ selectedSize:", selectedSize)
    //   return selectedSize.size_id;
    // });
    // console.log({ ...varient, product_id: product_id });
    // varient.size_id = varient1;
    // // console.log("varient1-->" , varient1)
    console.log({ ...varient, product_id: product_id });
    createVariant({ ...varient, product_id: product_id });
    // setShow(false);
  };

  // Tab Management
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="card mb-4">
              <div className="card-header">
                <h4 className="mb-0">Create Variant</h4>
              </div>
              <div className="card-body">
                {sizeAndColor && (
                  <div className="row">
                    <div className="mb-3 col-md-5">
                      <label className="form-label">Color</label>
                      <select
                        className="form-select"
                        name="color_id"
                        onChange={handleVarientForm}
                      >
                        <option value={""}>Select color</option>
                        {sizeAndColor.color.map((color, i) => {
                          return (
                            <option value={color.color_id} key={i}>
                              {color.color_name}
                            </option>
                          );
                        })}
                        {/* <option value={"yellow"}>Yellow</option> */}
                      </select>
                    </div>

                    <div className="mb-3 col-md-5">
                      <label className="form-label">Size</label>
                      <select
                        className="form-select"
                        name="size_id"
                        onChange={handleVarientForm}
                      >
                        <option value={""}>Select Size</option>
                        {sizeAndColor.size.map((size, i) => {
                          return (
                            <option value={size.size_id} key={i}>
                              {size.size_name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="mb-3 col-md-2">
                      <label
                        className="form-label"
                        style={{ visibility: "hidden" }}
                      >
                        Size
                      </label>
                      <button
                        className="btn btn-success w-100"
                        onClick={CreateVarient}
                      >
                        Add Variant
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {!varientObj && (
            <div className="col-12">
              <h4 className="text-danger">*Add At least one variant</h4>
            </div>
          )}
        </div>
        {
          varientObj && (
            <div className="card">
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="Item One" value="1" />
                      <Tab label="Item Two" value="2" />
                      <Tab label="Item Three" value="3" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    {varientObj.map((item, i) => {
                      return (
                        <div className="row" key={i}>
                          <div className="col-lg-12 col-12">
                            <div className="card mb-4">
                              <div className="card-header d-flex justify-content-between">
                                <h4 className="mt-auto">Basic Information</h4>
                                <div className="">
                                  <button
                                    className="btn btn-danger-soft me-2"
                                    onClick={() => {
                                      deleteVariant(
                                        item.variant_id,
                                        product_id
                                      );
                                    }}
                                  >
                                    Delete
                                  </button>
                                  <button
                                    className="btn btn-success"
                                    onClick={SubmitVariantData}
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                              <div className="card-body">
                                <div className="row">
                                  {/* input */}
                                  <div className="mb-3 col-md-3">
                                    <label className="form-label">
                                      Product Price
                                    </label>
                                    <input
                                      type="text"
                                      className={`form-control `}
                                      placeholder="₹ ___"
                                      name="product_price"
                                      onChange={handleVariantData}
                                      onInput={(e) => handleOnInput(e)}
                                    />
                                  </div>
                                  {/* input */}

                                  <div className="mb-3 col-md-3">
                                    <label className="form-label">
                                      Sale Price
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="₹ ___"
                                      name="sale_price"
                                      onChange={handleVariantData}
                                      onInput={(e) => handleOnInput(e)}
                                    />
                                  </div>
                                  <div className="mb-3 col-md-3">
                                    <label className="form-label">SKU ID</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter SKU ID"
                                      name="sku_id"
                                      onChange={handleVariantData}
                                    />
                                  </div>
                                  <div className="mb-3 col-md-3">
                                    <label className="form-label">Stock</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="100"
                                      name="product_stock"
                                      onChange={handleVariantData}
                                      onInput={(e) => handleOnInput(e)}
                                    />
                                  </div>
                                  {/* <div className="mb-3 col-md-12">
                           <label className="form-label">Product Images</label>
                           <DropZone files={files} setFiles={setFiles} />
                         </div> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </TabPanel>
                  <TabPanel value="2">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Size</th>
                          <th scope="col">Price</th>
                          <th scope="col">Sale Price</th>
                          <th scope="col">SKU ID</th>
                          <th scope="col">Stock</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {varientObj.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>M</td>
                              <td>
                                <input
                                  type="text"
                                  className={`form-control `}
                                  placeholder="₹ ___"
                                  name="product_price"
                                  onChange={handleVariantData}
                                  onInput={(e) => handleOnInput(e)}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="₹ ___"
                                  name="sale_price"
                                  onChange={handleVariantData}
                                  onInput={(e) => handleOnInput(e)}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter SKU ID"
                                  name="sku_id"
                                  onChange={handleVariantData}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="100"
                                  name="product_stock"
                                  onChange={handleVariantData}
                                  onInput={(e) => handleOnInput(e)}
                                />
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger-soft me-2"
                                  onClick={() => {
                                    deleteVariant(item.variant_id, product_id);
                                  }}
                                >
                                  <IconPack icon={"delete"} />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </TabPanel>
                  <TabPanel value="3">Item Three</TabPanel>
                </TabContext>
              </Box>
            </div>
          )
          // varientObj.map((item, i) => {
          //   return (
          //     <div className="row" key={i}>
          //       <div className="col-lg-12 col-12">
          //         <div className="card mb-4">
          //           <div className="card-header d-flex justify-content-between">
          //             <h4 className="mt-auto">Basic Information</h4>
          //             <div className="">
          //               <button
          //                 className="btn btn-danger-soft me-2"
          //                 onClick={() => {
          //                   deleteVariant(item.variant_id, product_id);
          //                 }}
          //               >
          //                 Delete
          //               </button>
          //               <button
          //                 className="btn btn-success"
          //                 onClick={SubmitVariantData}
          //               >
          //                 Save
          //               </button>
          //             </div>
          //           </div>
          //           <div className="card-body">
          //             <div className="row">
          //               {/* input */}
          //               <div className="mb-3 col-md-3">
          //                 <label className="form-label">Product Price</label>
          //                 <input
          //                   type="text"
          //                   className={`form-control `}
          //                   placeholder="₹ ___"
          //                   name="product_price"
          //                   onChange={handleVariantData}
          //                   onInput={(e) => handleOnInput(e)}
          //                 />
          //               </div>
          //               {/* input */}

          //               <div className="mb-3 col-md-3">
          //                 <label className="form-label">Sale Price</label>
          //                 <input
          //                   type="text"
          //                   className="form-control"
          //                   placeholder="₹ ___"
          //                   name="sale_price"
          //                   onChange={handleVariantData}
          //                   onInput={(e) => handleOnInput(e)}
          //                 />
          //               </div>
          //               <div className="mb-3 col-md-3">
          //                 <label className="form-label">SKU ID</label>
          //                 <input
          //                   type="text"
          //                   className="form-control"
          //                   placeholder="Enter SKU ID"
          //                   name="sku_id"
          //                   onChange={handleVariantData}
          //                 />
          //               </div>
          //               <div className="mb-3 col-md-3">
          //                 <label className="form-label">Stock</label>
          //                 <input
          //                   type="text"
          //                   className="form-control"
          //                   placeholder="100"
          //                   name="product_stock"
          //                   onChange={handleVariantData}
          //                   onInput={(e) => handleOnInput(e)}
          //                 />
          //               </div>
          //               {/* <div className="mb-3 col-md-12">
          //                 <label className="form-label">Product Images</label>
          //                 <DropZone files={files} setFiles={setFiles} />
          //               </div> */}
          //             </div>
          //           </div>
          //         </div>
          //       </div>
          //     </div>
          //   );
          // })
        }
        <div className="d-flex justify-content-between">
          <button
            onClick={() => {
              navigate(`/addproduct?product_id=${product_id}`);
            }}
            className="btn btn-primary"
          >
            <IconPack icon={"leftarrow"} />
            Back
          </button>
          <button
            onClick={() => {
              SubmitForm();
            }}
            className="btn btn-primary"
          >
            Next
            <IconPack icon={"rightarrow"} />
          </button>
        </div>
      </div>

      {/* Modal */}
      <CustomeModal
        title={"Create Varient"}
        handleClose={handleClose}
        show={show}
        onSubmit={CreateVarient}
      >
        {sizeAndColor && (
          <div className="row">
            <div className="mb-3 col-md-12">
              <label className="form-label">Color</label>
              <select
                className="form-select"
                name="color_id"
                onChange={handleVarientForm}
              >
                <option value={""}>Select color</option>
                {sizeAndColor.color.map((color, i) => {
                  return (
                    <option value={color.color_id} key={i}>
                      {color.color_name}
                    </option>
                  );
                })}
                {/* <option value={"yellow"}>Yellow</option> */}
              </select>
            </div>
            {/* <div className="mb-3 col-md-12">
              <label className="form-label">Size</label>
              <TagInput
                className={"form_control"}
                value={varient.size_id}
                placeholder={"Enter Sizes"}
                tagifyObject={{
                  whitelist: sizeAndColor.size.map((size) => {
                    return size.size_name;
                  }),
                  userInput: false,
                  dropdown: {
                    maxItems: 100,
                  },
                }}
              />
            </div> */}
            <div className="mb-3 col-md-12">
              <label className="form-label">Size</label>
              <select
                className="form-select"
                name="size_id"
                onChange={handleVarientForm}
              >
                <option value={""}>Select Size</option>
                {sizeAndColor.size.map((size, i) => {
                  return (
                    <option value={size.size_id} key={i}>
                      {size.size_name}
                    </option>
                  );
                })}
                <option value={"yellow"}>Yellow</option>
              </select>
            </div>
            {/* <div className="mb-3 col-md-2 m-auto">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={createVarient}
              >
                Create
              </button>
            </div> */}
          </div>
        )}

        {/* <div>
          {varientgp.map((varient, i) => {
            return (
              <button
                type="button"
                key={i}
                className="btn btn-success-soft mb-2 me-2"
                onClick={() => {
                  console.log(sizeAndColor.color);
                  deleteVarient(i);
                }}
              >
                {varient}
              </button>
            );
          })}
        </div>
        <div>
          {varientgp.length ? (
            <span className="username">
              *Click on varient name delete varient
            </span>
          ) : (
            ""
          )}
        </div> */}
      </CustomeModal>
    </>
  );
};

export default AddVarient;
