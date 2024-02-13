import { useEffect, useState } from "react";
import apiClient, { ReqMethod } from "../services/api-client";

interface Response<T> {
  count: number;
  results: T[];
}

const useData = <T>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    apiClient(endpoint, ReqMethod.GET, controller.signal)
      .then((res) => {
        if (!res.ok) console.log("Response status: ", res.status, res);

        if (res.status !== 200) {
          setError("Error loading games");
          throw new Error(JSON.stringify(res.status));
        }
        return res.json();
      })
      .then((data: Response<T>) => {
        // console.log(data);
        setData(data.results);
        setLoading(false);
        setError("");
      })
      .catch((er) => {
        console.log(er);
        setError("Error loading games");
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { data, error, isLoading };
};

export default useData;
