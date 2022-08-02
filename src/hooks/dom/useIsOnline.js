import { useState, useEffect } from "react";
import useWindowRef from "./useWindowRef";
import useCallbackRef from "../useCallbackRef";

/**
 * Hook returning whether the user's computer or device is online or offline.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/Online_and_offline_events
 * @return {boolean} True if online, false if offline.
 */
export default function useIsOnline() {
  const windowRef = useWindowRef();
  const [isOnline, setIsOnline] = useState(
    () => windowRef.current?.navigator?.onLine
  );

  const onlineCallbackRef = useCallbackRef(() => {
    setIsOnline(true);
  });
  const offlineCallbackRef = useCallbackRef(() => {
    setIsOnline(false);
  });
  useEffect(() => {
    const onlineCallback = () => onlineCallbackRef.current();
    const offlineCallback = () => offlineCallbackRef.current();
    const w = windowRef.current;
    w.addEventListener("online", onlineCallback);
    w.addEventListener("offline", offlineCallback);

    return () => {
      w.removeEventListener("online", onlineCallback);
      w.removeEventListener("offline", offlineCallback);
    };
  }, [windowRef, onlineCallbackRef, offlineCallbackRef]);

  return isOnline;
}
