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
import TagInput from "../common/TagInput";
import DropZone from "../common/DropZone";

const AddVarient = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const params = {};
  queryParams.forEach((value, key) => {
    params[key] = value;
  });
  const { product_id } = params;

  // Context API -----------------
  const { createVariant, getAllVariant, deleteVariant } =
    useContext(ProductContext);
  const { varient, handleVarientForm, setVarient } =
    useContext(ProductContext).Variant;
  const { getColorAndSize, sizeAndColor, addColor, addSize } =
    useContext(ColorAndSizeContext);

  // State --------------
  const [variantData, setVatiantData] = useState([]);
  const [colorIds, setColorIds] = useState();
  const [images, setImages] = useState([]);
  const [value, setValue] = useState();
  const [files, setFiles] = useState([]);

  const [newSize, setNewSize] = useState([]);
  const [newColor, setNewColor] = useState([]);

  const [sizeModal, setSizeModal] = useState(false);
  const [colorModal, setColorModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);

  // Modal ------------------
  const handleClose = () => {
    setSizeModal(false);
  };
  const handleColorClose = () => {
    setColorModal(false);
    setNewColor([]);
  };
  const handleImageClose = () => {
    setImageModal(false);
    setNewSize([]);
  };

  const handleVariantData = (e, variant_id, index) => {
    $(e.target).removeClass("error-input");

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
    // console.log(msg);
    if (msg) {
      toast.error(msg, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      console.log(variantData);
    }
  };

  useEffect(() => {
    if (!product_id) {
      navigate("/addproduct");
    } else {
      getColorAndSize();
      const fetch = async () => {
        const data = await getAllVariant(product_id);
        if (data.color.length) {
          setValue(data.color[0].color_id.toString());
        }
        setVatiantData(data.variants);
        setColorIds(data.color);
        setImages(data.images);
      };
      fetch();
    }
  }, []);

  // Add Variant ---------------
  const CreateVariantValidation = (e) => {
    e.preventDefault();

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

    const msg = CreateVariantValidation(e);
    if (msg) {
      toast.error(msg, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      const fetch = async () => {
        const status = await createVariant({
          ...varient,
          product_id: product_id,
        });
        if (status) {
          const data = await getAllVariant(product_id, varient.color_id);
          setValue(varient.color_id.toString());
          setVatiantData(data.variants);
          setColorIds(data.color);
          setImages(data.images);
        }
      };
      fetch();
      setVarient({
        ...varient,
        size_id: "",
      });
    }
  };

  // Delete Variant -------------------
  const DeleteVariant = (variant_id, product_id, color_id) => {
    const fetch = async () => {
      const status = await deleteVariant(variant_id, product_id);
      if (status) {
        if (variantData.length == 1) {
          var data = await getAllVariant(product_id);
          if (data.color.length) {
            setValue(data.color[0].color_id.toString());
          }
        } else {
          var data = await getAllVariant(product_id, color_id);
        }

        setVatiantData(data.variants);
        setColorIds(data.color);
        setImages(data.images);
      }
    };
    fetch();
    setVarient({
      ...varient,
      size_id: "",
    });
  };

  // Handle Tab  ------------------
  const handleChange = (event, newValue) => {
    const fetch = async () => {
      const data = await getAllVariant(product_id, newValue);
      setVatiantData(data.variants);
      setColorIds(data.color);
      setImages(data.images);
      console.log(images)
    };
    fetch();
    setValue(newValue);
    setVarient({ ...varient, color_id: newValue });
    $(".error-input").removeClass("error-input");
  };

  // Add New Sizes -----------------
  const submitNewSize = async () => {
    $("#modalSubmitBtn").text("Loading...").addClass("disabled");
    if (!newSize.length) {
      $(`.tagify`).addClass("error-input");
      toast.error("Sizes is required", {
        position: toast.POSITION.TOP_RIGHT,
      });
      $("#modalSubmitBtn").text("Save Changes");
    } else {
      const isAdded = await addSize(newSize);
      if (isAdded) {
        setSizeModal(false);
        $("#modalSubmitBtn").text("Save Changes");
        setNewSize([]);
      }
      // console.log();
    }
  };

  // Add New Colors --------------------
  const submitNewColor = async () => {
    $("#modalSubmitBtn").text("Loading...").addClass("disabled");
    if (!newColor.length) {
      $(`.tagify`).addClass("error-input");
      toast.error("Colors is required", {
        position: toast.POSITION.TOP_RIGHT,
      });
      $("#modalSubmitBtn").text("Save Changes");
    } else {
      const isAdded = await addColor(newColor);
      if (isAdded) {
        setColorModal(false);
        $("#modalSubmitBtn").text("Save Changes");
        setNewColor([]);
      }
    }
  };
  const submitNewImages = () => {
    console.log(files);
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
                          value={varient.color_id}
                        >
                          <option value={""}>Select color</option>
                          {sizeAndColor.color.map((color, i) => {
                            return (
                              <option value={color.color_id} key={i}>
                                {color.color_name}
                              </option>
                            );
                          })}
                        </select>
                        <button
                          className=" p-2 ms-1 btn btn-outline-primary"
                          onClick={() => {
                            setColorModal(true);
                          }}
                        >
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
                          value={varient.size_id}
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
                        <button
                          className="p-2  ms-1 btn btn-outline-primary"
                          onClick={() => {
                            setSizeModal(true);
                          }}
                        >
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

                <TabPanel value={value} className="p-0">
                  <div>
                    <div className="border-0 card-header p-0">
                      <div className="card-header d-lg-flex justify-content-between ">
                        <div className="d-grid d-lg-block">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setImageModal(true);
                            }}
                          >
                            + Add Images
                          </button>
                        </div>
                        <div className="d-flex mt-3 mt-lg-0">
                          <button className="btn btn-success-soft">Save</button>
                        </div>
                      </div>
                    </div>
                    <table className="table mb-1">
                      <thead className="table-light">
                        <tr className="text-center">
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
                              <tr className="text-center" key={i}>
                                <td>
                                  <span>{item.size_name}</span>
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className={`form-control `}
                                    placeholder="₹ ___"
                                    id={`product_price_${i}`}
                                    value={item.price || ""}
                                    name="price"
                                    onChange={(e) => {
                                      handleVariantData(e, item.variant_id, i);
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
                                    value={item.sale_price || ""}
                                    onChange={(e) => {
                                      handleVariantData(e, item.variant_id, i);
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
                                    value={item.sku_name || ""}
                                    onChange={(e) => {
                                      handleVariantData(e, item.variant_id, i);
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
                                    value={item.stock || ""}
                                    onChange={(e) => {
                                      handleVariantData(e, item.variant_id, i);
                                    }}
                                    onInput={(e) => handleOnInput(e)}
                                  />
                                </td>
                                <td>
                                  <button
                                    className="btn btn-danger-soft"
                                    onClick={() => {
                                      DeleteVariant(
                                        item.variant_id,
                                        product_id,
                                        item.color_id
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
                  </div>
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        ) : (
          ""
        )}

        {images.length !=0   ? (
          <div className="card mb-3">
            <div className="card-header">
              <h4 className="mb-0">Product Images</h4>
            </div>
            <div className="card-body">
              <div className="d-flex flex-wrap gap-4">
                {images.image_array.map((item, i) => {
                  return (
                    <div key={i}>
                      <img
                        src={item}
                        className="rounded-3"
                        height={150}
                        width={150}
                      />
                      <div className="d-flex justify-content-between mt-1">
                        <button className="btn btn-primary-soft btn-sm">
                          Change
                        </button>
                        <button className="btn btn-danger-soft btn-sm">
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
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

      {/* Add new size Modal */}
      <CustomeModal
        title={"Add new size"}
        handleClose={handleClose}
        show={sizeModal}
        onSubmit={submitNewSize}
        size={"md"}
      >
        {sizeAndColor && (
          <div className="row">
            <div className="mb-3 col-md-12">
              <label className="form-label">New Size</label>
              <TagInput
                className={"form_control"}
                value={newSize}
                placeholder={"Enter Sizes"}
                tagifyObject={{
                  blacklist: sizeAndColor.size.map((item) => {
                    return item.size_name;
                  }),
                }}
              />
            </div>
          </div>
        )}
      </CustomeModal>
      {/* Add new Color Modal */}
      <CustomeModal
        title={"Add new color"}
        handleClose={handleColorClose}
        show={colorModal}
        onSubmit={submitNewColor}
        size={"md"}
      >
        {sizeAndColor && (
          <div className="row">
            <div className="mb-3 col-md-12">
              <label className="form-label">New color</label>
              <TagInput
                className={"form_control"}
                value={newColor}
                id={"colorInput"}
                placeholder={"Enter color"}
                tagifyObject={{
                  blacklist: sizeAndColor.color.map((item) => {
                    return item.color_name;
                  }),
                }}
              />
            </div>
          </div>
        )}
      </CustomeModal>

      {/* Add new Image Modal */}
      <CustomeModal
        title={"Add images"}
        handleClose={handleImageClose}
        show={imageModal}
        onSubmit={submitNewImages}
        size={"md"}
      >
        <DropZone files={files} setFiles={setFiles} />
      </CustomeModal>
    </>
  );
};

export default AddVarient;
