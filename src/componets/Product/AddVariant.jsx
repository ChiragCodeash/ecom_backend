import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import $ from "jquery";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import {
  AttributeContext,
  GlobalContext,
  ImageContext,
  ProductContext,
} from "../../context/CreateContext";
import CustomeModal from "../common/CustomeModal";
import DropZone from "../common/DropZone";
import IconPack from "../common/IconPack";
import TagInput from "../common/TagInput";
import { ElectricScooterSharp } from "@mui/icons-material";
import Loading from "../common/Loading";

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
  const { loading } = useContext(GlobalContext);
  const {
    createVariant,
    getAllVariant,
    deleteVariant,
    updateVariant,
    checkVariant,
  } = useContext(ProductContext);
  const { varient, handleVarientForm, setVarient } =
    useContext(ProductContext).Variant;
  const { getColorAndSize, sizeAndColor, addColor, addSize } =
    useContext(AttributeContext);
  const { addImage, deleteImage, updateImage } = useContext(ImageContext);

  // State --------------
  const [variantData, setVatiantData] = useState([]);
  const [colorIds, setColorIds] = useState();
  const [images, setImages] = useState([]);
  const [value, setValue] = useState();
  const [files, setFiles] = useState([]);
  const [updateIndex, setUpdateIndex] = useState();
  const [isChanges, setIsChanges] = useState(false);

  const [newSize, setNewSize] = useState([]);
  const [newColor, setNewColor] = useState([]);

  const [sizeModal, setSizeModal] = useState(false);
  const [colorModal, setColorModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [updateImageModal, setUpdateImageModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);

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
    setFiles([]);
  };
  const handleUpdateImageClose = () => {
    setUpdateImageModal(false);
    setFiles([]);
  };
  const handleConfirmationClose = () => {
    setConfirmationModal(false);
  };

  const updateVariantdata = async () => {
    if (isChanges) {
      const toastId = toast.loading("Loading...", {
        closeOnClick: true,
      });
      const sendData = variantData.map(
        ({ variant_id, price, sale_price, variant_status, stock, sku_id }) => {
          return {
            variant_id,
            price,
            sale_price,
            variant_status,
            stock,
            sku_id,
          };
        }
      );
      const result = await updateVariant(sendData);
      if (result.status) {
        toast.update(toastId, {
          render: result.message,
          type: "success",
          isLoading: false,
          transition: Bounce,
          autoClose: 3000,
        });
        return true;
      } else {
        toast.update(toastId, {
          render: result.message,
          type: "error",
          isLoading: false,
          transition: Bounce,
          autoClose: 3000,
        });
        return false;
      }
    }
    return true;
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
    setIsChanges(true);
  };
  const handleOnInput = (e, number) => {
    e.target.value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*?)\..*/g, "$1")
      .slice(0, number || 9);
  };
  const validation = () => {
    // e.preventDefault();

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
      if (element.sku_id == null || element.sku_id.length === 0) {
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
  const SubmitVariantData = async (e) => {
    e.preventDefault();
    const msg = validation(e);
    if (msg || images.length == 0) {
      toast.error("Please complate this variant first");
    } else {
      const isAdded = await updateVariantdata();
      if (isAdded) {
        setConfirmationModal(true);
      }
    }
  };

  const resetFunction = () => {
    setVatiantData([]);
    setColorIds();
    setImages([]);
    setValue();
    setFiles([]);
    setUpdateIndex();
    setIsChanges(false);
    setVarient({
      size_id: "",
      color_id: "",
    });
  };

  useEffect(() => {
    if (!product_id) {
      navigate("/viewproduct");
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
    return () => {
      resetFunction();
    };
  }, []);

  // Add Variant ---------------
  const CreateVariantValidation = () => {
    if (varient.color_id.length == 0) {
      $(`#color_name`).addClass("error-input");
      return "Color name is required";
    }

    if (varient.size_id.length == 0) {
      $(`#size_name`).addClass("error-input");
      return "Size name is required";
    }
  };

  const CreateVarient = () => {
    const msg = CreateVariantValidation();
    if (msg) {
      toast.error(msg, {});
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
      // } else {
      //   if (validation()) {
      //     toast.error("Please complate this variant first", {
      //       //position: toast.POSITION.TOP_RIGHT,
      //     });
      //   }
      // }
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
  const handleChange = async (event, newValue, run) => {
    if (!validation() && images.length != 0) {
      const isDone = !run ? await updateVariantdata() : true;
      if (isDone) {
        const fetch = async () => {
          const data = await getAllVariant(product_id, newValue);
          setVatiantData(data.variants);
          setColorIds(data.color);
          setImages(data.images);
        };
        fetch();
        setValue(newValue);
        setVarient({ ...varient, color_id: newValue });
        setIsChanges(false);
        $(".error-input").removeClass("error-input");

        return true;
      }
    } else {
      toast.error("Please complate this variant first");
      return false;
    }
  };

  // Add New Sizes -----------------
  const submitNewSize = async () => {
    $("#modalSubmitBtn").text("Loading...").addClass("disabled");
    if (!newSize.length) {
      $(`.tagify`).addClass("error-input");
      toast.error("Sizes is required", {
        //position: toast.POSITION.TOP_RIGHT,
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
        //position: toast.POSITION.TOP_RIGHT,
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

  const submitNewImages = async () => {
    $("#modalSubmitBtn").text("Loading...").addClass("disabled");
    if (files.length) {
      if (files.length <= 5) {
        const data = new FormData();
        data.append("product_id", product_id);
        data.append("color_id", value);
        files.map((file) => {
          data.append("files", file);
        });
        const result = await addImage(data);
        if (result.status) {
          setImages(result.data);
          setFiles([]);
          setImageModal(false);
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } else {
        toast.error("You can add upto 5 images");
      }
    } else {
      toast.error("Images are required");
    }
    $("#modalSubmitBtn").text("Save Changes").removeClass("disabled");
  };

  const HandleDeleteImage = async (index) => {
    const { image_id } = images;

    const result = await deleteImage({ image_id, index });
    if (result.status) {
      setImages((prev) => {
        if (prev.image_array.length > 1) {
          prev.image_array.splice(index, 1);
          return { ...prev, image_array: prev.image_array };
        } else {
          return [];
        }
      });

      toast.success(result.message, {
        //position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error(result.message, {
        //position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const submitUpdateImage = async () => {
    $("#modalSubmitBtn").text("Loading...").addClass("disabled");
    if (files.length) {
      const { image_id } = images;

      const data = new FormData();
      data.append("image_id", image_id);
      data.append("index", updateIndex);
      files.map((file) => {
        data.append("image", file);
      });
      const result = await updateImage(data);
      if (result.status) {
        setImages((prev) => {
          prev.image_array.splice(updateIndex, 1, result.data.filename);
          return { ...prev, image_array: prev.image_array };
        });
        setFiles([]);
      }
      setUpdateImageModal(false);
      toast.success(result.message);
    } else {
      toast.error("Images are required");
    }
    $("#modalSubmitBtn").text("Save Changes").removeClass("disabled");
  };

  const submitProduct = async () => {
    const result = await checkVariant(product_id);
    if (result.status) {
      if (location.pathname == "/updatevariant") {
        toast.success("Your changes added...");
      } else {
        toast.success(result.message);
      }
      // setConfirmationModal(false);
      navigate("/viewproduct");
    } else {
      handleChange("q", result.data.color_id.toString(), true);
      toast.error(result.message);
    }
    setConfirmationModal(false);
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="align-items-center bg-white d-flex justify-content-between mb-4 p-5 rounded-3 shadow-sm">
              <h3 className="m-0">
                {location.pathname == "/updatevariant" ? "Update" : "Create"}{" "}
                Variants
              </h3>
              {/* <button className="btn btn-primary">Add Product</button> */}
            </div>
            <div className="card mb-4">
              <div className="card-header">
                <h4 className="mb-0">Choose Variant</h4>
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
                      {loading["CREATE_VARIANT"] ? (
                        <button className="btn btn-success w-100" disabled>
                          Loading . . .
                        </button>
                      ) : (
                        <button
                          className="btn btn-success w-100"
                          onClick={CreateVarient}
                        >
                          Add Variant
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* {!variantData.length && (
            <div className="card mb-4 mx-2 p-0">
              <div className="card-header">
              <h4 className="mb-0">Variant details</h4>
              </div>
              <div className="card-body">

              </div>
            </div>
          )} */}
        </div>
        {/* <div className="card mb-4">
          <div className="card-header">
            <h4 className="m-0">Variant details</h4>
          </div>
          <div className="card-body">
            {loading["GET_ADD_VARIANT"] ? (
              <Loading />
            ) : !variantData.length ? (
              <h4 className="text-danger mb-0">*Add At least one variant</h4>
            ) : (
              ""
            )}
          </div>
        </div> */}

        {!loading["GET_ADD_VARIANT"] ? (
          variantData.length ? (
            <>
              <div className="card mb-4">
                <div className="card-header">
                  <h4 className="m-0">Variant details</h4>
                </div>
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
                          {/* <div className="card-header d-lg-flex justify-content-between "> */}
                          {/* <div className="d-grid d-lg-block">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setImageModal(true);
                            }}
                          >
                            + Add Images
                          </button>
                        </div> */}
                          {/* <div className="d-flex mt-3 mt-lg-0">
                          <button className="btn btn-success-soft">Save</button>
                        </div> */}
                          {/* </div> */}
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
                                        value={item.sale_price || ""}
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
                                        name="sku_id"
                                        id={`sku_id_${i}`}
                                        value={item.sku_id || ""}
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
                                        value={item.stock || ""}
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

              <div className="card mb-3">
                <div className="align-items-center card-header d-flex justify-content-between">
                  <h4 className="mb-0">Product Images</h4>
                  {/* {images.length == 0 ? (images.image_array.length < 5 && ( */}
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
                  {/* // )) :}  */}
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap gap-4">
                    {images.length != 0 ? (
                      images.image_array.map((item, i) => {
                        return (
                          <div key={i}>
                            <img
                              src={item}
                              className="border rounded-3"
                              height={150}
                              width={150}
                            />
                            <div className="d-flex justify-content-between mt-1">
                              <button
                                className="btn btn-primary-soft btn-sm"
                                onClick={() => {
                                  setUpdateImageModal(true);
                                  setUpdateIndex(i);
                                }}
                              >
                                Change
                              </button>
                              <button
                                className="btn btn-danger-soft btn-sm"
                                onClick={() => {
                                  HandleDeleteImage(i);
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <h4 className="text-danger">*Add At least one image</h4>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="card mb-4">
            <div className="card-header">
              <h4 className="m-0">Variant details</h4>
            </div>
            <div className="card-body">
            <h4 className="text-danger m-0">*Add At least one variant</h4>
            </div>
          </div>
          )
        ) : (
          <div className="card mb-4">
            <div className="card-header">
              <h4 className="m-0">Variant details</h4>
            </div>
            <div className="card-body">
                <Loading />
            </div>
          </div>
        )}

        <div className="d-flex justify-content-between">
          {location.pathname != "/updatevariant" && (
            <button
              onClick={() => {
                navigate(`/addproduct?product_id=${Number(product_id)}`);
              }}
              className="btn btn-primary"
            >
              <IconPack icon={"leftarrow"} />
              Back
            </button>
          )}
          {colorIds && colorIds[colorIds.length - 1]?.color_id == value ? (
            <button onClick={SubmitVariantData} className="btn btn-primary">
              Submit
              <IconPack icon={"rightarrow"} />
            </button>
          ) : (
            ""
          )}
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

      {/* Update Image Modal */}
      <CustomeModal
        title={"Update image"}
        handleClose={handleUpdateImageClose}
        show={updateImageModal}
        onSubmit={submitUpdateImage}
        size={"md"}
      >
        <DropZone files={files} setFiles={setFiles} maxImage={1} />
      </CustomeModal>

      {/* Update Image Modal */}
      <CustomeModal
        title={"Confirmation"}
        handleClose={handleConfirmationClose}
        show={confirmationModal}
        onSubmit={submitProduct}
        size={"md"}
        save={"Yes"}
        close={"No"}
      >
        <p>Are you sure you want to submit this product?</p>
      </CustomeModal>
    </>
  );
};

export default AddVarient;
