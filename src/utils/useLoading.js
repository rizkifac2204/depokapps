import { useState } from "react";
import Skeleton from "@mui/material/Skeleton";

export default function useLoading(defaultValue) {
  const [loading, setLoading] = useState(defaultValue);
  function LoadingScreen() {
    if (loading)
      return (
        <Skeleton variant="rectangular" width="100%" sx={{ minHeight: 200 }} />
      );
  }
  return { loading, setLoading, LoadingScreen };
}
