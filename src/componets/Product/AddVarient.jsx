import React, { useDebugValue, useEffect, useState } from "react";
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

const AddVarient = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const params = {};
  queryParams.forEach((value, key) => {
    params[key] = value;
  });
  const { product_id } = params;
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const {
    createVariant,
    varientObj,
    setVariantObj,
    getAllVariant,
    deleteVariant,
  } = useContext(ProductContext);
  const { varient, handleVarientForm } = useContext(ProductContext).Variant;

  // console.log(varientObj);
  const [variantData, setVatiantData] = useState([]);
  const [colorIds, setColorIds] = useState();

  // const [variantData, setVatiantData] = useState({
  //   product_stock: "",
  //   sku_id: "",
  //   sale_price: "",
  //   product_price: "",
  // });

  const handleVariantData = (e, variant_id, index) => {
    $(e.target).removeClass("error-input");

    // setVatiantData({ ...variantData, [e.target.name]: e.target.value });
    const { name, value } = e.target;
    const newFormData = [...variantData];
    newFormData[index] = {
      ...newFormData[index],
      [name]: value,
      variant_id: variant_id,
    };
    setVatiantData(newFormData);
  };
  const handleOnInput = (e, number) => {
    e.target.value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*?)\..*/g, "$1")
      .slice(0, number || 5);
  };
  const validation = (e) => {
    e.preventDefault();

    var msg;
    for (let index = 0; index < variantData.length; index++) {
      const element = variantData[index];
      if (element.price == null || element.price.length === 0) {
        $(`#product_price_${index}`).addClass("error-input");
        msg = "Product price name is required";
        break;
      }

      if (element.sale_price == null || element.sale_price.length === 0) {
        $(`#sale_price_${index}`).addClass("error-input");
        msg = "Sale price name is required";
        break;
      }
      if (element.sku_name == null || element.sku_name.length === 0) {
        $(`#sku_id_${index}`).addClass("error-input");
        msg = "SKU ID name is required";
        break;
      }
      if (element.stock == null || element.stock.length === 0) {
        $(`#product_stock_${index}`).addClass("error-input");
        msg = "Product stock name is required";
        break;
      }
    }
    return msg;
  };
  const SubmitVariantData = (e) => {
    e.preventDefault();
    const msg = validation(e);
    console.log(msg);
    if (msg) {
      toast.error(msg, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      console.log(variantData);
    }
  };

  const { getColorAndSize, sizeAndColor } = useContext(ColorAndSizeContext);

  useEffect(() => {
    // console.log(typeof product_id);
    if (!product_id) {
      navigate("/addproduct");
    }
    getColorAndSize();
    const fetch = async () => {
      const data = await getAllVariant(product_id );
      setValue(data.color[0].color_id.toString());
      setVatiantData(data.variants);
      setColorIds(data.color);
    };
    fetch();

    // product_id && getAllVariant(product_id);
  }, []);
  // useEffect(() => {
  //   // varientObj && setValue(varientObj[0].color_id.toString());
  //   if (varientObj) {
  //     // setValue(varientObj[0].color_id.toString());
  //     // console.log("colorIds--->" , colorIds);
  //     const selected_data = varientObj.filter((item, i) => {
  //       return item.color_id.toString() == value;
  //     });

  //     if (selected_data) {
  //       setVatiantData(selected_data[0].variants);
  //       varientObj && setColorIds(varientObj.map((item) => item.color_id));
  //     }
  //   }
  // }, [varientObj]);

  const CreateVariantValidation = (e) => {
    e.preventDefault();

    // var msg;

    if (varient.color_id.length == 0) {
      $(`#color_name`).addClass("error-input");
      return "Color name is required";
    }

    if (varient.size_id.length == 0) {
      $(`#size_name`).addClass("error-input");
      return "Size name is required";
    }
  };

  const CreateVarient = (e) => {
    e.preventDefault();
    // console.log({ ...varient, product_id: product_id })
    const msg = CreateVariantValidation(e);
    if (msg) {
      toast.error(msg, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      setValue(varient.color_id.toString());
      createVariant({ ...varient, product_id: product_id });
      // const fetch = async () => {
      //   const data = await getAllVariant(product_id , varient.color_id);
      //   // setValue(data.color[0].color_id.toString());
      //   setVatiantData(data.variants);
      //   setColorIds(data.color);
      // };
      // fetch();
    }
  };

  // Tab Management
  const [value, setValue] = React.useState();
  const handleChange = (event, newValue) => {
    const fetch = async () => {
      const data = await getAllVariant(product_id , newValue);
      // setValue(data.color[0].color_id.toString());
      setVatiantData(data.variants);
      setColorIds(data.color);
    };
    fetch();
    setValue(newValue);
    // }
    // console.log(event)
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
                      <div className="d-flex">
                        <select
                          className="form-select"
                          name="color_id"
                          id="color_name"
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
                        <button className="ms-1 btn btn-outline-primary">
                          <IconPack icon={"add"} />
                        </button>
                      </div>
                    </div>

                    <div className="mb-3 col-md-5">
                      <label className="form-label">Size</label>
                      <div className="d-flex">
                        <select
                          className="form-select"
                          name="size_id"
                          id="size_name"
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
                        <button className="ms-1 btn btn-outline-primary">
                          <IconPack icon={"add"} />
                        </button>
                      </div>
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
          {!variantData.length && (
            <div className="col-12">
              <h4 className="text-danger">*Add At least one variant</h4>
            </div>
          )}
        </div>
        {variantData.length ? (
          <div className="card mb-4">
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    {colorIds.map((item, i) => {
                      return (
                        <Tab
                          key={i}
                          label={item.color_name}
                          value={item.color_id.toString()}
                          // value={i.toString()}
                        />
                      );
                    })}
                  </TabList>
                </Box>
                {/* {variantData.map((item, i) => { */}
                  {/* return ( */}
                    <TabPanel
                      // key={i}
                      // value={item.color_id.toString()}
                      value={value}
                      // value={i.toString()}
                      className="p-1"
                    >
                      <table className="table mb-1">
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
                          {variantData &&
                            variantData.map((item, i, arr) => {
                              return (
                                <tr key={i}>
                                  <td>
                                    <span>{item.size_name}</span>
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className={`form-control `}
                                      placeholder="₹ ___"
                                      id={`product_price_${i}`}
                                      // value={item.price && "" }
                                      // name={`product_price[${i}]`}
                                      name="price"
                                      onChange={(e) => {
                                        handleVariantData(
                                          e,
                                          item.variant_id,
                                          i
                                        );
                                      }}
                                      onInput={(e) => handleOnInput(e)}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="₹ ___"
                                      name="sale_price"
                                      id={`sale_price_${i}`}
                                      // value={item.sale_price && "" }
                                      // name={`sale_price[${i}]`}
                                      // onChange={handleVariantData}
                                      onChange={(e) => {
                                        handleVariantData(
                                          e,
                                          item.variant_id,
                                          i
                                        );
                                      }}
                                      onInput={(e) => handleOnInput(e)}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter SKU ID"
                                      name="sku_name"
                                      id={`sku_id_${i}`}
                                      // value={item.sku_name && ""}
                                      // name={`sku_id[${i}]`}
                                      // onChange={handleVariantData}
                                      onChange={(e) => {
                                        handleVariantData(
                                          e,
                                          item.variant_id,
                                          i
                                        );
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="100"
                                      name="stock"
                                      id={`product_stock_${i}`}
                                      value={item.stock}
                                      // name={`product_stock[${i}]`}
                                      // onChange={handleVariantData}
                                      onChange={(e) => {
                                        handleVariantData(
                                          e,
                                          item.variant_id,
                                          i
                                        );
                                      }}
                                      onInput={(e) => handleOnInput(e)}
                                    />
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-danger-soft me-2"
                                      onClick={() => {
                                        // setValue((pre) =>
                                        //   arr.length == 1
                                        //     ? colorIds[colorIds.indexOf(Number(value)) == 0 ? 1 : 0].toString()
                                        //     : pre
                                        // );
                                        setValue((pre) =>
                                          arr.length == 1
                                            ? colorIds[0].toString()
                                            : pre
                                        );
                                        deleteVariant(
                                          item.variant_id,
                                          product_id
                                        );
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
                      <div>
                        <button className="btn btn-success-soft">Save</button>
                      </div>
                    </TabPanel>
                  {/* ); */}
                {/* })} */}
              </TabContext>
            </Box>
          </div>
        ) : ""}
        <div className="d-flex justify-content-between">
          <button
            onClick={() => {
              navigate(`/addproduct?product_id=${Number(product_id)}`);
            }}
            className="btn btn-primary"
          >
            <IconPack icon={"leftarrow"} />
            Back
          </button>
          <button onClick={SubmitVariantData} className="btn btn-primary">
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
      </CustomeModal>
    </>
  );
};

export default AddVarient;
