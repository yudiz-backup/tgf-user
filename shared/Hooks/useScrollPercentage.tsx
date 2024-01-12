import { logEvent } from "firebase/analytics";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { analytics } from "../components/firebaseConfig/config";

export const useScrollPercentage = () => {
  const [scrollState, setScrollState] = useState({
    percentage: 0,
    hasSet: {
      "25": false,
      "50": false,
      "75": false,
      "100": false,
    },
  });

  const pathname = usePathname();
  useEffect(() => {
    if (scrollState.percentage) {
      logEvent(analytics, 'scroll_depth', {
          // page: pathname,
          scroll_depth: `${scrollState.percentage}%`+ " " + pathname
        });
    }
  }, [scrollState.percentage]);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight - windowHeight;
    const currentScrollPercentage = (scrollTop / scrollHeight) * 100;

    setScrollState((prevScrollState) => {
      if (currentScrollPercentage >= 100 && !prevScrollState.hasSet["100"]) {
        return {
          percentage: 100,
          hasSet: { ...prevScrollState.hasSet, "100": true },
        };
      } else if (
        currentScrollPercentage > 75 &&
        currentScrollPercentage < 100 &&
        !prevScrollState.hasSet["75"]
      ) {
        return {
          percentage: 75,
          hasSet: { ...prevScrollState.hasSet, "75": true },
        };
      } else if (
        currentScrollPercentage > 50 &&
        currentScrollPercentage <= 75 &&
        !prevScrollState.hasSet["50"]
      ) {
        return {
          percentage: 50,
          hasSet: { ...prevScrollState.hasSet, "50": true },
        };
      } else if (
        currentScrollPercentage > 25 &&
        currentScrollPercentage <= 50 &&
        !prevScrollState.hasSet["25"]
      ) {
        return {
          percentage: 25,
          hasSet: { ...prevScrollState.hasSet, "25": true },
        };
      }

      // If no conditions are met, return the unchanged state
      return prevScrollState;
    });
  };

  useEffect(() => {
    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty

  return { scrollPercentage: scrollState.percentage };
};
