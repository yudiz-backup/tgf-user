"use client";
import React, { useMemo } from "react";
import { Container, Ratio } from "react-bootstrap";

import styles from "./style.module.scss";
import { HowToPlayDataInterface } from "@/shared/ts/interfaces/home.interface";
import YouTube from "react-youtube";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../firebaseConfig/config";
// import { logEvent } from 'firebase/analytics'
// import { analytics } from '../../firebaseConfig/config'

interface VideoSectionProps {
  videoList?: HowToPlayDataInterface["aVideoTutorial"];
}

export default function VideoSection({ videoList }: VideoSectionProps) {
  const sortedVideoList = useMemo(
    () => videoList?.sort((a, b) => Number(a.nPriority) - Number(b.nPriority)),
    [videoList]
  );
  // function logVideoEvent(eventName:any, eventData:any) {
  //   logEvent(analytics,eventName, eventData);
  // }

  // Function to log video start event
  // const logVideoStart = (videoUrl:string) => {
  //   console.log(videoUrl)
  //   logVideoEvent('video_start', {
  //     // video_title: videoTitle,
  //     video_url: videoUrl,
  //     // video_provider: videoProvider,
  //     page: "How To Play"
  //   });
  // };
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      playsinline: 1,
      // autoplay: 1,
      // controls: 0,
      disablekb: 1,
      mute: 1,
      loop: 0,
      rel: 0,
      // fs: 0,
      // iv_load_policy: 3
    },
  };

  function extractVideoIdFromUrl(url: string) {
    try {
      const urlObject = new URL(url);
      const videoId =
        urlObject.searchParams.get("v") || urlObject.pathname.split("/").pop();
      return videoId;
    } catch (error) {
      console.error("Invalid URL:", error);
      return null;
    }
  }

  return (
    <div className={`${styles.videoSection} common-section`}>
      <Container>
        {sortedVideoList?.map((video) => {
          const videoId = extractVideoIdFromUrl(video.sPath) || "";
          return (
            <Ratio
              key={video.sPath}
              className={styles.video}
              aspectRatio="21x9"
            >
              {/* <iframe
              id="player" ref={(el) => (playerRefs.current[video.sPath] = el)}
             src={video.sPath} allow='autoplay; encrypted-media' 
             
            // onLoad={() => logVideoStart(video.sPath)}
           ></iframe> */}
              {/* <div id="player" /> */}
              {/* <iframe id='player' width="560" height="315" src="https://www.youtube.com/embed/m6X4P1o0l-E?si=9GY-3WPsonH2S4UO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
              <YouTube
                videoId={videoId}
                opts={opts}
                onPlay={() =>
                  logEvent(analytics, "video_start", {
                    video_url: video.sPath,
                  })
                }
                onEnd={() => {
                  logEvent(analytics, "video_complete", {
                    video_link: video.sPath,
                  });
                }}
              />
            </Ratio>
          );
        })}
      </Container>
    </div>
  );
}
