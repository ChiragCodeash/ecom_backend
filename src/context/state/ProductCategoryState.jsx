import React, { useState } from "react";
import { ProductCategoryContext } from "../CreateContext";
import { toast } from "react-toastify";

const ProductCategoryState = ({ children }) => {
  const url = `${import.meta.env.VITE_APP_SERVER_URL}/category`;
  const [ProductCategory, setProductCategory] = useState();
  const [categoryObj, setCategoryObj] = useState();
  const [customeObjData, setCustomeObjData] = useState();

  // Array to Object Convert Function
  function arrayToObject(array) {
    const resultObject = {};
    const customeKeyArr = array.category_field.map((key, i) => {
      return key.name;
    });
    for (let i = 0; i < customeKeyArr.length; i += 1) {
      const key = customeKeyArr[i];
      const value = [];
      resultObject[key] = value;
    }
    return resultObject;
  }

  const GetCategory = async () => {
    try {
      const response = await fetch(`${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.status) {
        setProductCategory(result.data);
      } else {
        toast.error(result.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log("Error fetching data:", error.message);
      toast.error("Internal server error", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  
  const GetSingalCategory = async (id) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.status) {
        if (result.data) {
          const customeKeyobje = arrayToObject(result.data);
          setCustomeObjData({ ...customeKeyobje });
          setCategoryObj(result.data);
        }
      } else {
        // toast.error(result.message, {
        //   position: toast.POSITION.TOP_RIGHT,
        // });
      }
    } catch (error) {
      console.log("Error fetching data:", error.message);
      // toast.error("Internal server error", {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    }
  };
  const DefaultObj = {
    GetCategory,
    ProductCategory,
    categoryObj,
    setCategoryObj,
    GetSingalCategory,
    customeObjData,
    setCustomeObjData,
  };
  return (
    <ProductCategoryContext.Provider value={DefaultObj}>
      {children}
    </ProductCategoryContext.Provider>
  );
};

export default ProductCategoryState;
