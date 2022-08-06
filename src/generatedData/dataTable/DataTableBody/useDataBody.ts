import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
const useDataBody = (updateData: () => void) => {
  const { ref: lastItemRef, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  useEffect(() => {
    if (inView) {
      updateData();
    }
  }, [inView]);
  return {
    lastItemRef,
    inView,
  };
};
export default useDataBody;
