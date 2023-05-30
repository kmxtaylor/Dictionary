import { useRef, useEffect } from 'react';

const useIsMountedRef = () => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);
  return isMounted;
};
export default useIsMountedRef;
export { useIsMountedRef };
