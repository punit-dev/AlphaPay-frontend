import axios from "axios";
import { useEffect, useState } from "react";

const useSearchUser = (searchVal) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastValue, setLastValue] = useState("");

  const callSearchApi = async (value, signal) => {
    try {
      setError(null);
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/search?query=${value}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          signal,
        },
      );
      setSearchResults(res.data.results);
    } catch (err) {
      if (err.name === "CanceledError") return;
      setError(err.response?.data?.message || "Not Found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchVal.length <= 3 || searchVal === lastValue) {
      setSearchResults([]);
      return;
    }

    const controller = new AbortController();

    const delayDebounceFn = setTimeout(() => {
      setLastValue(searchVal);
      callSearchApi(searchVal, controller.signal);
    }, 500);

    return () => {
      clearTimeout(delayDebounceFn);
      controller.abort();
    };
  }, [searchVal]);

  return { searchResults, loading, error };
};

export default useSearchUser;
