import React, { useState } from "react";
import { ProductContext } from "../CreateContext";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import $ from "jquery";

const ProductState = ({ children }) => {
  const url = `${import.meta.env.VITE_APP_SERVER_URL}/product`;
  const navigate = useNavigate();
  const [varientObj, setVariantObj] = useState();
  const [CreateProductData, setCreateProductData] = useState({
    pc_id: "",
    product_title: "",
    product_desc: "",
    ideal_for: "",
    pack_of: "",
  });
  const [varient, setVarient] = useState({
    size_id: "",
    color_id: "",
  });

  const handleVarientForm = (e) => {
    // console.log(e.target.value)
    $(e.target).removeClass("error-input");
    setVarient({ ...varient, [e.target.name]: e.target.value });
  };

  //   Create A Product
  const createProduct = async (data) => {
    try {
      const response = await fetch(`${url}/createproduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.status) {
        navigate(`addproduct/createvariant?product_id=${result.product_id}`);
        toast.success("Changed saved", {
          position: toast.POSITION.TOP_RIGHT,
        });
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

  // Get All Varient
  const getAllVariant = async (product_id , color_id) => {
    try {
      const response = await fetch(
        `${url}/getallvarient`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify({product_id , color_id}),
        }
      );
      const result = await response.json();
      if (result.status) {
        setVariantObj(result.data);
        // navigate(`/addproduct/createvariant?variant_id=${result.data[result.data.length - 1].variant_id}&product_id=${product_id}`)
        navigate(`/addproduct/createvariant?product_id=${product_id}`)
        return result.data
      }else{
        setVariantObj()
        navigate(`/addproduct/createvariant?product_id=${product_id}`)
      }
    } catch (error) {
      console.log("Error fetching data:", error.message);
      toast.error("Internal server error", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // Create A Variant
  const createVariant = async (data, category) => {
    try {
      const response = await fetch(`${url}/createvarient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      // console.log("🚀 ~ createVariant ~ result:", result);
      if (result.status) {
        navigate(
          // `/addproduct/createvariant?variant_id=${result.variant_id}&product_id=${data.product_id}`
          `/addproduct/createvariant?product_id=${data.product_id}`
        );
        getAllVariant(data.product_id);
        toast.success("New varinat added", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(result.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Update Product
  const updateProduct = async (data) => {
    try {
      const response = await fetch(`${url}/updateproduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.status) {
        navigate(`addproduct/createvariant?product_id=${data.product_id}`);
        toast.success("Change saved", {
          position: toast.POSITION.TOP_RIGHT,
        });
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

  // Get Singal Product
  const getSingalProduct = async (id) => {
    try {
      const response = await fetch(`${url}/getsingalproduct?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      const result = await response.json();
      if (result.status) {
        // const { pc_id, product_title, product_desc, pack_of, ideal_for } =
        //   result.data;
        // setCreateProductData({
        //   pc_id,
        //   product_title,
        //   product_desc,
        //   pack_of,
        //   ideal_for,
        // });
        return result.data;
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

  const deleteVariant = async (variant_id, product_id) => {
    try {
      const response = await fetch(`${url}/deleteVariant`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ variant_id }),
      });
      const result = await response.json();
      if (result.status) {
        toast.success(result.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        getAllVariant(product_id);
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

  const DefaultObj = {
    createProduct,
    CreateProductData,
    setCreateProductData,
    createVariant,
    varientObj,
    setVariantObj,
    getAllVariant,
    updateProduct,
    getSingalProduct,
    deleteVariant,
    Variant: { varient, setVarient, handleVarientForm },
  };
  return (
    <ProductContext.Provider value={DefaultObj}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductState;
