import React, { useContext, useEffect, useState } from "react";
import TextEditor from "../common/TextEditor";
import {
  ProductCategoryContext,
  ProductContext,
} from "../../context/CreateContext";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import IconPack from "../common/IconPack";
import { FieldRequiredValidation, TitleValidation } from "../../Validation";
// import CreateVariantUI from "./CreateVariantUI";

const CreateProduct = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get("product_id");
  const {
    CreateProductData,
    setCreateProductData,
    createProduct,
    updateProduct,
    getSingalProduct,
    createVariant,
  } = useContext(ProductContext);
  const { varient } = useContext(ProductContext).Variant;
  const { GetCategory, ProductCategory } = useContext(ProductCategoryContext);
  const [value, setValue] = useState("");
  const [isValidate, setIsValidate] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    GetCategory();
    // console.log(typeof(paramValue))
    if ( paramValue) {
      
      const fetch = async () => {
        const { pc_id, product_title, product_desc, pack_of, ideal_for } =
          await getSingalProduct(paramValue);
        setCreateProductData({
          pc_id,
          product_title,
          product_desc,
          pack_of,
          ideal_for,
        });
        setValue(product_desc);
      };
      fetch();
    } else {
      navigate("/addproduct");
    }
  }, []);

  const handleForm = (e) => {
    // console.log(e.target.value)
    setIsValidate();
    setCreateProductData({
      ...CreateProductData,
      [e.target.name]: e.target.value,
    });
  };

  const validation = () => {
    var isValidate;
    isValidate = TitleValidation(
      CreateProductData.product_title,
      "product_title"
    );
    if (!isValidate.status) {
      setIsValidate(isValidate.name);
      return isValidate;
    }

    isValidate = FieldRequiredValidation(CreateProductData.pc_id, "Category");
    if (!isValidate.status) {
      setIsValidate(isValidate.name);
      return isValidate;
    }
    isValidate = FieldRequiredValidation(
      CreateProductData.pack_of,
      "Number Pack Of"
    );
    if (!isValidate.status) {
      setIsValidate(isValidate.name);
      return isValidate;
    }
    isValidate = FieldRequiredValidation(CreateProductData.ideal_for, "Ideal");
    if (!isValidate.status) {
      setIsValidate(isValidate.name);
      return isValidate;
    }

    isValidate = FieldRequiredValidation(value, "Description");
    if (!isValidate.status) {
      setIsValidate(isValidate.name);
      return isValidate;
    }

    return { status: true };
  };

  const SubmitForm = () => {
    const msg = validation();
    if (!msg.status) {
      toast.error(msg.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      console.log({ ...CreateProductData, product_desc: value });
      if (paramValue) {
        updateProduct({
          ...CreateProductData,
          product_desc: value,
          product_id: paramValue,
        });
      } else {
        createProduct({
          ...CreateProductData,
          product_desc: value,
        });
      }
    }
  };

  const CreateVarient = () => {
    createVariant({ ...varient, product_id: product_id });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-12">
            <div className="card mb-4">
              <div className="card-header">
                <h4 className="mb-0">Basic Information</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Product Title</label>
                    <input
                      type="text"
                      className={`form-control ${
                        isValidate == "product_title" && "error-input"
                      }`}
                      placeholder="Enter Product Title"
                      name="product_title"
                      value={CreateProductData.product_title}
                      onChange={handleForm}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Product Category</label>
                    <select
                      className={`form-select ${
                        isValidate == "Category" && "error-input"
                      }`}
                      aria-label="Default select example"
                      name="pc_id"
                      onChange={handleForm}
                      value={CreateProductData.pc_id}
                    >
                      <option>Select Category</option>
                      {ProductCategory &&
                        ProductCategory.map((category, i) => {
                          return (
                            <option value={category.pc_id} key={i}>
                              {category.category_name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Pack of</label>
                    <select
                      className={`form-select ${
                        isValidate == "Number Pack Of" && "error-input"
                      }`}
                      aria-label="Default select example"
                      name="pack_of"
                      onChange={handleForm}
                      value={CreateProductData.pack_of}
                      
                    >
                      <option value={""}>Select pack of</option>
                      <option value={"1"}>1</option>
                      <option value={"2"}>2</option>
                      <option value={"3"}>3</option>
                      <option value={"4"}>4</option>
                    </select>
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" id="productSKU">
                      Ideal for
                    </label>
                    <br />
                    <div className="form-check form-check-inline">
                      <input
                        // className="form-check-input"
                        className={`form-check-input ${
                          isValidate == "Ideal" && "error-input"
                        }`}
                        type="radio"
                        name="ideal_for"
                        id="inlineRadio1"
                        value={"male"}
                        onChange={handleForm}
                        checked={CreateProductData.ideal_for == "male"}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio1"
                      >
                        Male
                      </label>
                    </div>
                    {/* input */}
                    <div className="form-check form-check-inline">
                      <input
                        className={`form-check-input ${
                          isValidate == "Ideal" && "error-input"
                        }`}
                        type="radio"
                        name="ideal_for"
                        value={"female"}
                        onChange={handleForm}
                        id="inlineRadio2"
                        checked={CreateProductData.ideal_for == "female"}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio2"
                      >
                        Female
                      </label>
                    </div>
                    {/* input */}
                    <div className="form-check form-check-inline">
                      <input
                        className={`form-check-input ${
                          isValidate == "Ideal" && "error-input"
                        }`}
                        type="radio"
                        name="ideal_for"
                        id="inlineRadio3"
                        value={"kids"}
                        onChange={handleForm}
                        checked={CreateProductData.ideal_for == "kids"}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio3"
                      >
                        Kids
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  {/* heading */}
                  <h5 className="mb-1">Product Description</h5>
                  <p>Add Product Description</p>
                  {/* input */}
                  <TextEditor
                    value={value}
                    onChange={setValue}
                    className={isValidate == "Description" && "error-input"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end">
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
    </>
  );
};

export default CreateProduct;
