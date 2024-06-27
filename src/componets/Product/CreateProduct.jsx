import { useFormik } from "formik";
import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  GlobalContext,
  ProductCategoryContext,
  ProductContext,
} from "../../context/CreateContext";
import IconPack from "../common/IconPack";
import TextEditor from "../common/TextEditor";
import Loading from "../common/Loading";
// import CreateVariantUI from "./CreateVariantUI";

const CreateProduct = () => {
  const location = useLocation();
  const { loading } = useContext(GlobalContext);
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get("product_id");
  const {
    CreateProductData,
    setCreateProductData,
    createProduct,
    updateProduct,
    getSingalProduct,
  } = useContext(ProductContext);
  const { GetCategory, ProductCategory } = useContext(ProductCategoryContext);
  const navigate = useNavigate();

  useEffect(() => {
    GetCategory();
    // console.log(typeof(paramValue))
    if (paramValue) {
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
      };
      fetch();
    } else {
      console.log("Run");
      navigate("/addproduct");
    }

    return () => {
      setCreateProductData({
        pc_id: "",
        product_title: "",
        product_desc: "",
        ideal_for: "",
        pack_of: "",
      });
    };
  }, []);

  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: CreateProductData,
    validationSchema: Yup.object({
      product_title: Yup.string()
        .required("Title is Required")
        .min(5, "Title is too short")
        .matches(/[^0-9]/, { message: "Can not containe only number" }),
      pc_id: Yup.string().required("Product category is Required"),
      pack_of: Yup.string().required("Pack Of is Required"),
      ideal_for: Yup.string().required("Ideal for is Required"),
      product_desc: Yup.string()
        .test(
          "product_desc",
          "Product description cannot be empty",
          (value) => {
            const strippedValue = stripHtml(value);
            return strippedValue.trim().length > 0;
          }
        )
        .test(
          "product_desc",
          "Product description is too short , add at least 50 charaters",
          (value) => {
            const strippedValue = stripHtml(value);
            return strippedValue.trim().length > 50;
          }
        ),
    }),
    onSubmit: async (data) => {
      if (paramValue) {
        const result = await updateProduct({
          ...data,

          product_id: paramValue,
        });
        if (result.status) {
          navigate(`/addproduct/createvariant?product_id=${paramValue}`);
          toast.success("Change saved");
        } else {
          toast.error(result.message);
        }
      } else {
        createProduct({
          ...data,
        });
      }
    },
  });

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-12">
            <div className="align-items-center bg-white d-flex justify-content-between mb-4 p-5 rounded-3 shadow-sm">
              <h3 className="m-0">Create Product</h3>
            </div>
            <div className="card mb-4">
              <div className="card-header">
                <label className="mb-0 form-label">Basic Information</label>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Product Title</label>
                    <input
                      type="text"
                      className={`form-control ${
                        touched.product_title &&
                        errors.product_title &&
                        "error-input"
                      }`}
                      placeholder="Enter Product Title"
                      name="product_title"
                      value={values.product_title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.product_title && errors.product_title && (
                      <small className="fs-6 fw-bold text-danger">
                        {errors.product_title}
                      </small>
                    )}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Product Category</label>
                    <select
                      className={`form-select ${
                        touched.pc_id && errors.pc_id && "error-input"
                      }`}
                      aria-label="Default select example"
                      name="pc_id"
                      value={values.pc_id}
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                    {touched.pc_id && errors.pc_id && (
                      <small className="fs-6 fw-bold text-danger">
                        {errors.pc_id}
                      </small>
                    )}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Pack of</label>
                    <select
                      className={`form-select ${
                        touched.pack_of && errors.pack_of && "error-input"
                      }`}
                      aria-label="Default select example"
                      name="pack_of"
                      onChange={handleChange}
                      value={values.pack_of}
                      onBlur={handleBlur}
                    >
                      <option value={""}>Select pack of</option>
                      <option value={"1"}>1</option>
                      <option value={"2"}>2</option>
                      <option value={"3"}>3</option>
                      <option value={"4"}>4</option>
                    </select>
                    {touched.pack_of && errors.pack_of && (
                      <small className="fs-6 fw-bold text-danger">
                        {errors.pack_of}
                      </small>
                    )}
                  </div>

                  <div className="mb-3 col-md-6">
                    <label className="form-label">Ideal For</label>
                    <select
                      className={`form-select ${
                        touched.ideal_for && errors.ideal_for && "error-input"
                      }`}
                      aria-label="Default select example"
                      name="ideal_for"
                      onChange={handleChange}
                      value={values.ideal_for}
                      onBlur={handleBlur}
                    >
                      <option value={""}>Select Ideal</option>
                      <option value={"male"}>Male</option>
                      <option value={"female"}>female</option>
                      <option value={"kids"}>Kids</option>
                    </select>
                    {touched.ideal_for && errors.ideal_for && (
                      <small className="fs-6 fw-bold text-danger">
                        {errors.ideal_for}
                      </small>
                    )}
                  </div>
                </div>

                <div>
                  {/* heading */}
                  <label className="m-0 form-label">Product Description</label>
                  <p className="fs-5 m-0 mb-3 text-muted">
                    Add Product Description
                  </p>
                  {/* input */}
                  <TextEditor
                    value={values.product_desc}
                    onChange={(value) => {
                      setFieldValue("product_desc", value);
                    }}
                    className={
                      touched.product_desc &&
                      errors.product_desc &&
                      "error-input"
                    }
                  />
                  {touched.product_desc && errors.product_desc && (
                    <small className="fs-6 fw-bold text-danger">
                      {errors.product_desc}
                    </small>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          {loading["CREATE_PRODUCT"] ? (
            <button className="btn btn-primary " disabled>Loading . . .</button>
          ) : (
            <button onClick={handleSubmit} className="btn btn-primary">
              Next
              <IconPack icon={"rightarrow"} />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
