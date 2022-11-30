import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Skeleton from "@mui/material/Skeleton";

export default function useFetch(
  url,
  typeValue = [],
  option = {},
  dependencies = []
) {
  const [data, setData] = useState(typeValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    setData(typeValue);
    if (!url) return;
    setLoading(true);
    const controller = new AbortController();
    axios
      .get(url, { ...option, signal: controller.signal })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError(error);
        toast.error(err?.response?.data ?? "Terjadi Kesalahan");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url]);

  const refetch = (newUrl) => {
    setData(typeValue);
    if (!newUrl) return;
    setLoading(true);
    const controller = new AbortController();
    axios
      .get(newUrl, { ...option, signal: controller.signal })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(newUrl);
        setError(error);
        toast.error(err?.response?.data ?? "Terjadi Kesalahan");
      })
      .finally(() => setLoading(false));
  };

  function LoadingScreen() {
    if (loading)
      return (
        <Skeleton variant="rectangular" width="100%" sx={{ minHeight: 200 }} />
      );
  }

  return { data, setData, error, loading, LoadingScreen, refetch };
}
