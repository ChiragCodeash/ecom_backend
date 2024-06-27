import $ from "jquery";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GlobalContext, ProductContext } from "../CreateContext";

const ProductState = ({ children }) => {
  const { loading, setLoading } = useContext(GlobalContext);
  const url = `${import.meta.env.VITE_APP_SERVER_URL}/product`;
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location)
  // const [isChanges, setIsChanges] = useState(false);
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
    // setIsChanges(true)
  };

  //   Create A Product
  const createProduct = async (data) => {
    setLoading({ ...loading, CREATE_PRODUCT: true });
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
        navigate(`addproduct/createvariant?product_id=${result.product_id}`, {
          replace: true,
        });
        toast.success("Changed saved");
      } else {
        toast.error(result.message, {
          //position: toast.POSITION.TOP_RIGHT,
        });
      }
      setLoading({ ...loading, CREATE_PRODUCT: false });
    } catch (error) {
      console.log("Error fetching data:", error.message);
      toast.error("Internal server error", {
        //position: toast.POSITION.TOP_RIGHT,
      });
      setLoading({ ...loading, CREATE_PRODUCT: false });
    }
  };

  // Create A Variant
  const createVariant = async (data, category) => {
    setLoading({ ...loading, CREATE_VARIANT: true });
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
      if (result.status) {
        navigate(`/addproduct/createvariant?product_id=${data.product_id}`, {
          replace: true,
        });

        toast.success("New varinat added");
        setLoading({ ...loading, CREATE_VARIANT: false });
        return true;
      } else {
        toast.error(result.message);

        setLoading({ ...loading, CREATE_VARIANT: false });
        return false;
      }
    } catch (error) {
      console.log(error);
      setLoading({ ...loading, CREATE_VARIANT: false });
      return false;

    }
  };

  // Update Product
  const updateProduct = async (data) => {
    setLoading({ ...loading, CREATE_PRODUCT: true });
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
      setLoading({ ...loading, CREATE_PRODUCT: false });
      return result;
    } catch (error) {
      console.log("Error fetching data:", error.message);
      toast.error("Internal server error", {
        //position: toast.POSITION.TOP_RIGHT,
      });
      setLoading({ ...loading, CREATE_PRODUCT: false });
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
        // toast.error(result.message);
        navigate("/viewproduct");
      }
    } catch (error) {
      console.log("Error fetching data:", error.message);
      toast.error("Internal server error", {
        //position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // Delete Variant
  const deleteVariant = async (variant_id) => {
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
          //position: toast.POSITION.TOP_RIGHT,
        });
        // getAllVariant(product_id);
        return true;
      } else {
        toast.error(result.message, {
          //position: toast.POSITION.TOP_RIGHT,
        });
        return false;
      }
    } catch (error) {
      console.log("Error fetching data:", error.message);
      toast.error("Internal server error", {
        //position: toast.POSITION.TOP_RIGHT,
      });
      return false;
    }
  };

  // Delete Product
  const deleteProduct = async (product_id) => {
    try {
      const response = await fetch(`${url}/deleteproduct`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ product_id }),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error fetching data:", error.message);
      toast.error("Internal server error");
      return false;
    }
  };

  const updateVariant = async (data) => {
    try {
      const response = await fetch(`${url}/updatevariant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error fetching data:", error.message);
      toast.error("Internal server error", {
        //position: toast.POSITION.TOP_RIGHT,
      });
      return false;
    }
  };

  const checkVariant = async (product_id) => {
    try {
      const response = await fetch(`${url}/checkvariant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ product_id }),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error fetching data:", error.message);
      toast.error("Internal server error", {
        //position: toast.POSITION.TOP_RIGHT,
      });
      return false;
    }
  };
  // Get All Varient
  const getAllVariant = async (product_id, color_id) => {
    setLoading({ ...loading, GET_ADD_VARIANT: true });
    try {
      const response = await fetch(`${url}/getallvarient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ product_id, color_id }),
      });
      const result = await response.json();
      if (result.status) {
        setVariantObj(result.data);
        // navigate(`/addproduct/createvariant?variant_id=${result.data[result.data.length - 1].variant_id}&product_id=${product_id}`)
        // navigate(`/addproduct/createvariant?product_id=${product_id}`);
        navigate(`${location.pathname}?product_id=${product_id}`);
        setLoading({ ...loading, GET_ADD_VARIANT: false })
        return result.data;
      } else {
        setVariantObj();
        // navigate(`/addproduct/createvariant?product_id=${product_id}`);
        navigate(`/viewproduct`);
        setLoading({ ...loading, GET_ADD_VARIANT: false })
      }
    } catch (error) {
      console.log("Error fetching data:", error.message);
      toast.error("Internal server error");
      setLoading({ ...loading, GET_ADD_VARIANT: false })
    }
  };

  const getProduct = async (data) => {
    setLoading({ ...loading, GET_PRODUCT: true });
    try {
      const response = await fetch(`${url}/getproduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      setLoading({ ...loading, GET_PRODUCT: false });
      return result;
    } catch (error) {
      console.log("Error fetching data:", error.message);
      toast.error("Internal server error");
      setLoading({ ...loading, GET_PRODUCT: false });
      return false;
    }
  };

  const getVariant = async (data) => {
    setLoading({ ...loading, GET_VARIANT: true });
    try {
      const response = await fetch(`${url}/getvariant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      setLoading({ ...loading, GET_VARIANT: false, GET_PRODUCT: false });
      return result;
    } catch (error) {
      console.log("Error fetching data:", error.message);
      toast.error("Internal server error");
      setLoading({ ...loading, GET_VARIANT: false , GET_PRODUCT: false  });
      return false;
    }
  };

  const DefaultObj = {
    createProduct,
    CreateProductData,
    setCreateProductData,
    createVariant,
    varientObj,
    setVariantObj,
    updateProduct,
    getSingalProduct,
    deleteVariant,
    updateVariant,
    checkVariant,
    getProduct,
    getVariant,
    getAllVariant,
    deleteProduct,
    Variant: { varient, setVarient, handleVarientForm },
  };
  return (
    <ProductContext.Provider value={DefaultObj}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductState;
