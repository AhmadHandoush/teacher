import { useState } from "react";

const useBaseUrl = () => {
  const [baseUrl, setBaseUrl] = useState("http://192.168.0.103:8000");

  return baseUrl;
};

export default useBaseUrl;
