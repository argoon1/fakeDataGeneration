import React, { useEffect } from "react";
import { useIntersectionObserver } from "react-intersection-observer-hook";
// ...

function useGeneratedData() {
  const [ref, { entry, rootRef }] = useIntersectionObserver();
  const isVisible = entry && entry.isIntersecting;

  useEffect(() => {
    console.log(`The component is ${isVisible ? "visible" : "not visible"}.`);
  }, [isVisible]);

  return {
    ref,
    rootRef,
  };
}
// <ScrollableContainer
//       // We use `rootRef` callback to set our root node.
//       ref={rootRef}
//     >
//       <SomeComponentToTrack ref={ref} />
//     </ScrollableContainer>
export default useGeneratedData;
