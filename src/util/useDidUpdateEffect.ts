import { useEffect, useRef } from "react";

export default function useDidUpdateEffect(func: any, inputs: any) {
  const isMountingRef = useRef<boolean>(false);

  useEffect(() => {
    isMountingRef.current = true;
  }, []);

  useEffect(() => {
    if (!isMountingRef.current) {
      return func();
    } else {
      isMountingRef.current = false;
    }
  }, inputs);
}