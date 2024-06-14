import { TabPanel } from "@mui/lab";
import React, { useState } from "react";
import IconPack from "../common/IconPack";

const ListVariant = ({ value , variantData , SubmitVariantData }) => {
    // const [variantData, setVatiantData] = useState([]);
    // const [colorIds, setColorIds] = useState();
  
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
  return (
    <>
      <TabPanel value={value} className="p-1">
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
                        value={item.price}
                        // name={`product_price[${i}]`}
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
                        value={item.sale_price}
                        // name={`sale_price[${i}]`}
                        // onChange={handleVariantData}
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
                        value={item.sku_name}
                        // name={`sku_id[${i}]`}
                        // onChange={handleVariantData}
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
                        value={item.stock}
                        // name={`product_stock[${i}]`}
                        // onChange={handleVariantData}
                        onChange={(e) => {
                          handleVariantData(e, item.variant_id, i);
                        }}
                        onInput={(e) => handleOnInput(e)}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-danger-soft me-2"
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
        <div>
          <button className="btn btn-success-soft" onClick={SubmitVariantData}>Save</button>
        </div>
      </TabPanel>
    </>
  );
};

export default ListVariant;
