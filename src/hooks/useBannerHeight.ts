import { useRef, useState } from "react";

export const useBannerHeight = <E extends HTMLElement>() => {
   const bannerRef = useRef<E>(null);
   const [bannerHeight, setBannerHeight] = useState<number | undefined>();

   return [bannerRef, bannerHeight, setBannerHeight] as const;
};
