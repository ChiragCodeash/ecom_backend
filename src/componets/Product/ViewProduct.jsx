import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../common/DataTable";
import IconPack from "../common/IconPack";
import Pagination from "../common/Pagination";
import {
  ProductCategoryContext,
  ProductContext,
} from "../../context/CreateContext";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const SingleProductList = ({ active, data, onClick }) => {
  return (
    <div
      onClick={() => {
        onClick(data.product_id);
      }}
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
        />
        <div className="ms-4">
          <h5 className="mb-0">
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
                <span className="badge badge-warning-soft text-capitalize">
                  Deactive
                </span>
              )}
            </small>
          </div>
          <div className="d-flex gap-3 mt-1">
            <IconPack icon={"edit"} className={"text-muted pointer"} />
            <IconPack icon={"trash"} className={"text-muted pointer"} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ViewProduct = () => {
  const { GetCategory, ProductCategory } = useContext(ProductCategoryContext);
  const { getProduct, getVariant } = useContext(ProductContext);

  // STATE-------------------------
  const [activeProduct, setActiveProduct] = useState();
  const [Products, setProducts] = useState();
  const [Variants, setVariants] = useState();
  const [totalPage, setTotalPage] = useState();
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
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const filterData = {
    query: "",
    status: "",
    category: "",
  };

  const { values, handleSubmit, handleChange, handleReset, initialValues } =
    useFormik({
      initialValues: filterData,
      onSubmit: () => {
        fetchProduct({...values , page : 1});
      },
      onReset: async (values) => {
        fetchProduct({...initialValues , page : 1});
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
      if(result.result.data.length){
        await fetchVariant({product_id : result.result.data[0].product_id , condition : variantFilter})
      }
     
    } else {
      toast.error(result.message);
    }
  };

  

  const ChangeActiveProduct = async(id) => {
    setActiveProduct(id);
    await fetchVariant({ product_id: id, condition: variantFilter })
  };

  useEffect(() => {
    fetchProduct({...values , page: currentPage});
  }, [currentPage]);

  useEffect(() => {
    GetCategory();
  }, []);
  const col = [
    {
      name: "Product",
      accessor: "image_array",
      type: "img",
      // nested: ["name", "imgSrc"],
      // width : 40,
      actions: {
        onclick: (args) => {
          console.log(args);
        },
      },
    },
    // {
    //   name: "Product",
    //   accessor: "title",
    //   type: "imgContent",
    //   nested: ["name", "imgSrc"],
    //   width : 40,
    //   actions : {
    //     onclick : (args)=>{
    //       console.log(args)
    //     }
    //   }
    // },
    // {
    //   name: "Variants",
    //   accessor: "variant",
    //   width : 15,
    //   actions : {
    //     onclick : (args)=>{
    //       console.log(args)
    //     }
    //   }
    // },
    {
      name: "SKU ID",
      accessor: "sku_id",
      // width : 15
    },
    // {
    //   name: "Color",
    //   accessor: "color_name",
    //   // width : 15
    // },
    // {
    //   name: "Size",
    //   accessor: "size_name",
    //   // width : 15
    // },
    {
      name: "Price",
      accessor: "price",
      // width : 15
    },
    {
      name: "Sale Price",
      accessor: "sale_price",
      // width : 15
    },
    {
      name: "Status",
      accessor: "variant_status",
      type: "badge",
      // width : 15
    },
    {
      name: "Stock",
      accessor: "stock",
      width: 15,
      type: "input",
      input: {
        onchange: (args) => {
          console.log(args);
        },
        onclick: (args) => {
          console.log(args);
        },
        name: "stock",
        type: "text",
      },

      // width : 15
    },
  ];

  const data = [
    {
      // title: {
      //   name: "This is title",
      imgSrc: "../assets/images/ecommerce/product-1.jpg",
      // },
      sku_id: "yellow_3",
      price: "100",
      sale_price: "99",
      stock: "89",
      status: "blocked",
    },
    {
      // title: {
      //   name: "This is title",
      imgSrc: "../assets/images/ecommerce/product-1.jpg",
      // },
      sku_id: "yellow_3",
      price: "100",
      sale_price: "99",
      stock: "89",
      status: "blocked",
    },
    {
      // title: {
      //   name: "This is title",
      imgSrc: "../assets/images/ecommerce/product-1.jpg",
      // },
      sku_id: "yellow_3",
      price: "100",
      sale_price: "99",
      stock: "89",
      status: "blocked",
    },
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
        console.log(args);
      },
    },
    // {
    //   title: "Delete",
    //   icon: <IconPack icon={"trash"} />,
    //   onclick: (args) => {
    //     console.log(args);
    //   },
    // },
  ];

  const HandleChangeFilter = async(filter) => {
    
    setVariantFilter(filter);
    await fetchVariant({ product_id: activeProduct, condition: filter })
    // console.log({ product_id: activeProduct, condition: filter });
  };

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
        <div className="d-flex mt-3 gap-2">
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
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <div className="card h-100">
            <div className="card-header p-5 ">
              <h4 className="mb-0">Product</h4>
            </div>
            <div className="card-body">
              {Products && Products.length != 0 ? (
                Products.map((item, i) => {
                  return (
                    <SingleProductList
                      key={i}
                      active={item.product_id == activeProduct}
                      data={item}
                      onClick={ChangeActiveProduct}
                    />
                  );
                })
              ) : (
                <p className="text-center fw-bold">No Product</p>
              )}
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
          <DataTable col={col} data={Variants} actions={actions} />
        </div>
      </div>
    </>
  );
};

export default ViewProduct;
