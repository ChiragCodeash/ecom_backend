import React, { useContext, useEffect, useState } from "react";
import {
  ProductCategoryContext,
  ProductContext,
} from "../../context/CreateContext";
import { useNavigate } from "react-router-dom";
import CustomeModal from "../common/CustomeModal";

const SelectCategory = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { GetCategory, ProductCategory } = useContext(ProductCategoryContext);
  const { createProduct } = useContext(ProductContext);
  useEffect(() => {
    GetCategory();
  }, []);
  const handleClose = () => {
    setShow(false);
  };
  const SelectCategory = (pc_id) => {
    navigate(`/createproduct?category=${pc_id}`);
    // setShow(true);
    // createProduct(pc_id);
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12">
            {/* Page header */}
            <div className="mb-5">
              <h3 className="mb-0 ">Select product category</h3>
            </div>
          </div>
        </div>
        <div>
          <div className="row">
            <div className="col-lg-12 col-12">
              <div className="card mb-4">
                <div className="card-body">
                  {ProductCategory &&
                    ProductCategory.map((category, i) => {
                      return (
                        <button
                          key={i}
                          className="btn btn-primary-soft ms-2"
                          onClick={() => {
                            SelectCategory(category.pc_id);
                          }}
                        >
                          {category.category_name}
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomeModal title={"Add Product"} handleClose={handleClose} show={show}>
        <div className="mb-4">
          <div className="card-body">
            <div>
              {/* input */}
              <div className="mb-3">
                <label className="form-label">Product Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Product Title"
                  name="product_title"
                />
              </div>
              {/* input */}
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label className="form-label">Sale Price</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="₹ ___"
                    name="sale_price"
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">SKU ID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter SKU ID"
                    name="sku_id"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CustomeModal>
    </>
  );
};

export default SelectCategory;
