import React, { useEffect, useState } from "react";

const useFetch = ({ url, method, body }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: body,
      })
        .then((res) => res.json())
        .then((data) => setData(data));
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
