import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  GlobalContext,
  ProductCategoryContext,
  ProductContext,
} from "../../context/CreateContext";
import CustomeModal from "../common/CustomeModal";
import DataTable from "../common/DataTable";
import IconPack from "../common/IconPack";
import Pagination from "../common/Pagination";
import TextEditor from "../common/TextEditor";
import { TbAwardOff } from "react-icons/tb";
import Loading from "../common/Loading";

const SingleProductList = ({
  active,
  data,
  onClick,
  handleDelete,
  handleUpdate,
}) => {
  return (
    <div
      // onClick={() => {
      //   onClick(data.product_id);
      // }}
      className={`d-block pointer mb-2 p-2 rounded-3 ${
        active ? "bg-gray-100" : ""
      }`}
    >
      <div className="d-flex align-items-center ">
        <img
          src={data.image_array}
          alt="Image"
          className="img-4by3-lg rounded-3"
          width={104}
          height={104}
          onClick={() => {
            onClick(data.product_id);
          }}
        />
        <div className="ms-4">
          <h5
            className="mb-0"
            onClick={() => {
              onClick(data.product_id);
            }}
          >
            {data.product_title.length >= 60
              ? data.product_title.slice(0, 60).concat("...")
              : data.product_title}
          </h5>
          <div className="row g-2">
            <small className="text-muted col-6 ">
              Category: <span className="fw-bold">{data.category_name}</span>
            </small>
            <small className="text-muted col-6">
              Ideal:{" "}
              <span className="fw-bold text-capitalize">{data.ideal_for}</span>
            </small>
            <small className="text-muted col-6">
              Status:{" "}
              {data.draft ? (
                <span className="badge badge-secondary-soft text-capitalize">
                  Draft
                </span>
              ) : data.status ? (
                <span className="badge badge-success-soft text-capitalize">
                  Active
                </span>
              ) : (
                <span className="badge badge-danger-soft text-capitalize">
                  Deactive
                </span>
              )}
            </small>
          </div>
          <div className="d-flex gap-1 mt-2">
            <button
              className="btn btn-light-soft p-1 text-dark"
              onClick={() => {
                handleUpdate(data.product_id, data);
              }}
            >
              <IconPack icon={"edit"} className={" pointer"} />
            </button>
            <button
              className="btn btn-light-soft p-1 text-dark"
              onClick={() => {
                handleDelete(data.product_id);
              }}
            >
              <IconPack icon={"trash"} className={" pointer"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ViewProduct = () => {
  const { loading } = useContext(GlobalContext);
  // console.log("loading==>" , loading["GET_PRODUCT"])
  const navigate = useNavigate();
  const { GetCategory, ProductCategory } = useContext(ProductCategoryContext);
  const {
    getProduct,
    getVariant,
    deleteProduct,
    updateProduct,
    updateVariant,
    deleteVariant,
  } = useContext(ProductContext);

  // STATE-------------------------
  const [activeProduct, setActiveProduct] = useState();
  const [Products, setProducts] = useState();
  const [Variants, setVariants] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [tempId, setTempId] = useState();
  const [description, setDescription] = useState("");
  const [variantFilter, setVariantFilter] = useState("");
  const [variantFilterButton, setVariantFilterButton] = useState([
    {
      title: "All Product",
      key: "",
    },
    {
      title: "Low Stock",
      key: "LOW_STOCK",
    },
    {
      title: "Out Of Stock",
      key: "OUT_OF_STOCK",
    },
    {
      title: "Active",
      key: "ACTIVE",
    },
    {
      title: "Deactive",
      key: "DEACTIVE",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newProductData, setNewProductData] = useState({
    pc_id: "",
    product_title: "",
    product_desc: "",
    ideal_for: "",
    pack_of: "",
    status: "",
  });

  const filterData = {
    query: "",
    status: "",
    category: "",
  };

  // Modal State
  const [productDeleteMD, setProductDeleteMD] = useState(false);
  const [variantDeleteMD, setVariantDeleteMD] = useState(false);
  const [productUpdateMD, setProductUpdateMD] = useState(false);

  const HandleCloseProductDeleteMD = () => {
    setTempId(undefined);
    setProductDeleteMD(false);
  };
  const HandleShowProductDeleteMD = (id) => {
    setTempId(id);
    setProductDeleteMD(true);
  };
  const HandleCloseVariantDeleteMD = () => {
    setTempId(undefined);
    setVariantDeleteMD(false);
  };
  const HandleShowVariantDeleteMD = (id) => {
    setTempId(id);
    setVariantDeleteMD(true);
  };

  const HandleCloseProductUpdateMD = () => {
    setTempId(undefined);
    setProductUpdateMD(false);
    setNewProductData({
      pc_id: "",
      product_title: "",
      product_desc: "",
      ideal_for: "",
      pack_of: "",
      status: "",
    });
  };
  const HandleShowProductUpdateMD = (
    id,
    { pack_of, product_desc, pc_id, ideal_for, product_title, status }
  ) => {
    setNewProductData({
      pack_of,
      product_desc,
      pc_id,
      ideal_for,
      product_title,
      status,
    });
    setDescription(product_desc);
    setTempId(id);
    setProductUpdateMD(true);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const { values, handleSubmit, handleChange, handleReset, initialValues } =
    useFormik({
      initialValues: filterData,
      onSubmit: () => {
        fetchProduct({ ...values, page: 1 });
      },
      onReset: async (values) => {
        fetchProduct({ ...initialValues, page: 1 });
      },
    });

  const fetchVariant = async (data) => {
    const result = await getVariant(data);
    if (result.status) {
      setVariants(result.data);
    } else {
      toast.error(result.message);
    }
  };

  const fetchProduct = async (data) => {
    const result = await getProduct({ ...data });
    if (result.status) {
      setProducts(result.result.data);
      setActiveProduct(
        result.result.data.length ? result.result.data[0].product_id : undefined
      );
      setTotalPage(result.result.totalPage);
      if (result.result.data.length) {
        await fetchVariant({
          product_id: result.result.data[0].product_id,
          condition: variantFilter,
        });
      } else {
        setVariants([]);
      }
    } else {
      toast.error(result.message);
    }
  };

  const ChangeActiveProduct = async (id) => {
    if (id != activeProduct) {
      setActiveProduct(id);
      await fetchVariant({ product_id: id, condition: variantFilter });
    }
  };

  useEffect(() => {
    fetchProduct({ ...values, page: currentPage });
  }, [currentPage]);

  useEffect(() => {
    GetCategory();
  }, []);

  const col = [
    {
      name: "Product",
      accessor: "image_array",
      type: "img",
      actions: {
        onclick: (args) => {
          console.log(args);
        },
      },
      width: 10,
    },

    {
      name: "SKU ID",
      accessor: "sku_id",
    },
    {
      name: "Color",
      accessor: "color_name",
      width: 7.5,
    },
    {
      name: "Size",
      accessor: "size_name",
      width: 7.5,
    },

    {
      name: "Price",
      accessor: "price",
    },
    {
      name: "Sale Price",
      accessor: "sale_price",
    },
    // {
    //   name: "Status",
    //   accessor: "variant_status",
    //   type: "badge",
    // },
    {
      name: "Status",
      accessor: "variant_status",
      width: "15",
      type: "custom",
      element: (value, id) => {
        return (
          <div>
            <select
              className={`form-select form-select-sm border-2 ${
                value ? "border-success" : "border-danger"
              }`}
              onChange={async (e) => {
                const result = await updateVariant([
                  { variant_status: e.target.value, variant_id: id },
                ]);
                if (result.status) {
                  toast.success(result.message);
                  await fetchVariant({
                    product_id: activeProduct,
                    condition: variantFilter,
                  });
                } else {
                  toast.error(result.message);
                }
              }}
              value={value}
            >
              <option value="1">Active</option>
              <option value="0">Deactive</option>
            </select>
          </div>
        );
      },
    },
    {
      name: "Stock",
      accessor: "stock",
    },
    // {
    //   name: "Stock",
    //   accessor: "stock",
    //   width: 15,
    //   type: "input",
    //   input: {
    //     onchange: (args) => {
    //       console.log(args)
    //     },
    //     onclick: async (args, id) => {
    //       const result = await updateVariant([{ variant_id: id, stock: args }]);
    //       if (result.status) {
    //         toast.success("Stock updated...");
    //         await fetchVariant({
    //           product_id: activeProduct,
    //           condition: variantFilter,
    //         });
    //       } else {
    //         toast.error(result.message);
    //       }
    //     },

    //     name: "stock",
    //     type: "text",
    //   },

    //   when: (value) => {
    //     if (value == null || !value) {
    //       return (
    //         <small className="text-danger fw-bold fs-6">Out Of Stock</small>
    //       );
    //     }
    //     if (value < 10) {
    //       return <small className="text-danger fw-bold fs-6">Low Stock</small>;
    //     }
    //     return false;
    //   },
    //   // width : 15
    // },
  ];

  const actions = [
    // {
    //   title: "View",
    //   icon: <IconPack icon={"eye"} />,
    //   onclick: (args) => {
    //     console.log(args);
    //   },
    // },
    {
      title: "Edit",
      icon: <IconPack icon={"edit"} />,
      onclick: (args) => {
        navigate(`/updatevariant?product_id=${Number(activeProduct)}`);
      },
    },
    {
      title: "Delete",
      icon: <IconPack icon={"trash"} />,
      onclick: (args) => {
        HandleShowVariantDeleteMD(args);
      },
    },
  ];

  // =======================================================================================
  // const HandleChangeFilter = async(filter) => {

  //   setVariantFilter(filter);
  //   await fetchVariant({ product_id: activeProduct, condition: filter })
  //   // console.log({ product_id: activeProduct, condition: filter });
  // };
  // =======================================================================================

  const DeleteProduct = async () => {
    const result = await deleteProduct(tempId);
    if (result.status) {
      toast.success(result.message);
      setCurrentPage(
        Products.length == 1
          ? currentPage == 1
            ? currentPage
            : currentPage - 1
          : currentPage
      );
      fetchProduct({ ...values, page: currentPage });
      setProductDeleteMD(false);
      setNewProductData({
        pc_id: "",
        product_title: "",
        product_desc: "",
        ideal_for: "",
        pack_of: "",
        status: "",
      });
    } else {
      toast.error(result.message);
    }
  };

  const DeleteVariant = async () => {
    const result = await deleteVariant(tempId);
    if (result) {
      await fetchVariant({
        product_id: activeProduct,
        condition: variantFilter,
      });
    }
    HandleCloseVariantDeleteMD();
    // console.log("DeleteVariant")
  };

  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const UpdateProduct = useFormik({
    enableReinitialize: true,
    initialValues: newProductData,
    validationSchema: Yup.object({
      product_title: Yup.string()
        .required("Title is Required")
        .min(5, "Title is too short")
        .matches(/[^0-9]/, { message: "Can not containe only number" }),
      pc_id: Yup.string().required("Product category is Required"),
      pack_of: Yup.string().required("Pack Of is Required"),
      ideal_for: Yup.string().required("Ideal for is Required"),
      status: Yup.number().required("Status for is Required"),
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
      const result = await updateProduct({ ...data, product_id: tempId });
      if (result.status) {
        toast.success("Change saved");
        setProductUpdateMD(false);
        setTempId();
        await fetchProduct({ ...values, page: currentPage });
      } else {
        toast.error(result.message);
      }
    },
  });

  return (
    <>
      <div className="align-items-center bg-white d-flex justify-content-between mb-4 p-5 rounded-3 shadow-sm">
        <h3 className="m-0">Product List</h3>
        <Link to={"/addproduct"} className="btn btn-primary">
          Add Product
        </Link>
      </div>

      <div className="bg-white shadow-sm mb-4 mx-0 p-3 rounded">
        <div className=" row">
          <div className="col-3">
            <select
              className="form-select"
              name="category"
              value={values.category}
              onChange={handleChange}
            >
              <option value="">All category</option>
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
          <div className="col-3">
            <select
              className="form-select"
              name="status"
              value={values.status}
              onChange={handleChange}
            >
              <option value="">All Status</option>
              <option value={1}>Active</option>
              <option value={0}>Deactive</option>
              <option value={2}>In Draft</option>
            </select>
          </div>
          <div className="col-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search here"
              name="query"
              value={values.query}
              onChange={handleChange}
            />
          </div>
          <div className="col-3 align-content-end">
            <div className="d-flex gap-2">
              <button
                className="btn btn-success-soft w-100 "
                onClick={handleSubmit}
                type="button"
              >
                Search
              </button>
              <button
                className="btn btn-danger-soft w-100"
                onClick={handleReset}
                type="button"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
        {/* <div className="d-flex mt-3 gap-2">
          {variantFilterButton.map((item, i) => {
            return (
              <button
                key={i}
                className={`btn btn-primary${variantFilter === item.key ? "" : "-soft"}`}
                onClick={() => {
                  HandleChangeFilter(item.key);
                }}
              >
               {item.title}
              </button>
            );
          })}
        </div> */}
      </div>

      <div className="row">
        <div className="col-4">
          <div className="card h-100">
            <div className="card-header p-5 ">
              <h4 className="mb-0">Product</h4>
            </div>
            <div className="card-body">
              {loading["GET_PRODUCT"] ? (
                <Loading />
              ) : Products && Products.length != 0 ? (
                Products.map((item, i) => {
                  return (
                    <SingleProductList
                      key={i}
                      active={item.product_id == activeProduct}
                      data={item}
                      onClick={ChangeActiveProduct}
                      handleDelete={HandleShowProductDeleteMD}
                      handleUpdate={HandleShowProductUpdateMD}
                    />
                  );
                })
              ) : (
                <p className="text-center fw-bold m-0">No Product</p>
              )}

              {/* {Products &&
              loading["GET_PRODUCT"] ? Products.length != 0 ? (
                Products.map((item, i) => {
                  return (
                    <SingleProductList
                      key={i}
                      active={item.product_id == activeProduct}
                      data={item}
                      onClick={ChangeActiveProduct}
                      handleDelete={HandleShowProductDeleteMD}
                      handleUpdate={HandleShowProductUpdateMD}
                    />
                  );
                })
              ) : (
                <p className="text-center fw-bold m-0">No Product</p>
              ) : 
               <Loading/> 
              } */}
            </div>
            {totalPage && totalPage > 1 ? (
              <div className="card-footer">
                <Pagination
                  className={"d-flex justify-content-center"}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  TotalPage={totalPage && totalPage}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-8">
          <DataTable
            col={col}
            data={Variants}
            actions={actions}
            unique={"variant_id"}
            isLoading={loading["GET_VARIANT"]}
          />
        </div>
      </div>

      <CustomeModal
        title={"Delete product"}
        handleClose={HandleCloseProductDeleteMD}
        show={productDeleteMD}
        size={"md"}
        close={"No"}
        save={"Yes"}
        onSubmit={DeleteProduct}
      >
        Are you sure, you want to delete this product ?
      </CustomeModal>

      <CustomeModal
        title={"Delete variant"}
        handleClose={HandleCloseVariantDeleteMD}
        show={variantDeleteMD}
        size={"md"}
        close={"No"}
        save={"Yes"}
        onSubmit={DeleteVariant}
      >
        Are you sure, you want to delete this variant ?
      </CustomeModal>

      <CustomeModal
        title={"Update product"}
        handleClose={HandleCloseProductUpdateMD}
        show={productUpdateMD}
        size={"lg"}
        onSubmit={UpdateProduct.handleSubmit}
      >
        <div className="row">
          <div className="mb-3 col-md-12">
            <label className="form-label">Product Title</label>
            <input
              type="text"
              className={`form-control ${
                UpdateProduct.touched.product_title &&
                UpdateProduct.errors.product_title &&
                "error-input"
              }`}
              placeholder="Enter Product Title"
              name="product_title"
              value={UpdateProduct.values.product_title}
              onChange={UpdateProduct.handleChange}
              onBlur={UpdateProduct.handleBlur}
            />
            {UpdateProduct.touched.product_title &&
              UpdateProduct.errors.product_title && (
                <small className="fs-6 fw-bold text-danger">
                  {UpdateProduct.errors.product_title}
                </small>
              )}
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Product Category</label>
            <select
              className={`form-select ${
                UpdateProduct.touched.pc_id &&
                UpdateProduct.errors.pc_id &&
                "error-input"
              }`}
              aria-label="Default select example"
              name="pc_id"
              onChange={UpdateProduct.handleChange}
              value={UpdateProduct.values.pc_id}
              onBlur={UpdateProduct.handleBlur}
            >
              {ProductCategory &&
                ProductCategory.map((category, i) => {
                  return (
                    <option value={category.pc_id} key={i}>
                      {category.category_name}
                    </option>
                  );
                })}
            </select>
            {UpdateProduct.touched.pc_id && UpdateProduct.errors.pc_id && (
              <small className="text-danger">
                {UpdateProduct.errors.pc_id}
              </small>
            )}
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Pack of</label>
            <select
              className={`form-select `}
              aria-label="Default select example"
              name="pack_of"
              onChange={UpdateProduct.handleChange}
              value={UpdateProduct.values.pack_of}
              onBlur={UpdateProduct.handleBlur}
            >
              <option value={"1"}>1</option>
              <option value={"2"}>2</option>
              <option value={"3"}>3</option>
              <option value={"4"}>4</option>
            </select>
            {UpdateProduct.touched.pack_of && UpdateProduct.errors.pack_of && (
              <small className="fs-6 fw-bold text-danger">
                {UpdateProduct.errors.pack_of}
              </small>
            )}
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Ideal For</label>
            <select
              className={`form-select `}
              aria-label="Default select example"
              name="ideal_for"
              onChange={UpdateProduct.handleChange}
              value={UpdateProduct.values.ideal_for}
              onBlur={UpdateProduct.handleBlur}
            >
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
              <option value={"kids"}>Kids</option>
            </select>
            {UpdateProduct.touched.ideal_for &&
              UpdateProduct.errors.ideal_for && (
                <small className="fs-6 fw-bold text-danger">
                  {UpdateProduct.errors.ideal_for}
                </small>
              )}
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Status</label>
            <select
              className={`form-select `}
              aria-label="Default select example"
              name="status"
              onChange={UpdateProduct.handleChange}
              value={UpdateProduct.values.status}
              onBlur={UpdateProduct.handleBlur}
            >
              <option value={1}>Active</option>
              <option value={0}>Deactive</option>
            </select>
            {UpdateProduct.touched.status && UpdateProduct.errors.status && (
              <small className="fs-6 fw-bold text-danger">
                {UpdateProduct.errors.status}
              </small>
            )}
          </div>
          <div>
            <div>
              {/* heading */}
              <label className="m-0 form-label">Product Description</label>
              <p className="fs-5 m-0 mb-3 text-muted">
                Add Product Description
              </p>
              {/* input */}
              <TextEditor
                value={UpdateProduct.values.product_desc}
                onChange={(value) => {
                  UpdateProduct.setFieldValue("product_desc", value);
                }}
                className={
                  UpdateProduct.touched.product_desc &&
                  UpdateProduct.errors.product_desc &&
                  "error-input"
                }
              />
              {UpdateProduct.touched.product_desc &&
                UpdateProduct.errors.product_desc && (
                  <small className="fs-6 fw-bold text-danger">
                    {UpdateProduct.errors.product_desc}
                  </small>
                )}
            </div>
          </div>
        </div>
      </CustomeModal>
    </>
  );
};

export default ViewProduct;
