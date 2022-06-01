import { useEffect, useState } from "react";
import LoadingMask from "./LoadingMask";
import Home from "./Home";

const Container = () => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => setLoading(false), 5000);

  return loading ? (
    <div>
      <LoadingMask />
    </div>
  ) : (
    <div>
      <Home />
    </div>
  );
};

export default Container;
