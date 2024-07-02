"use client";
import { VideoType } from "@/types";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { parse, stringify } from "querystring";

/**
 * @param {string} url
 * @param {Object<string, string>} appendix
 * @return {string}
 */

interface VideoProps {
  data: VideoType;
}

const VideoComponent: React.FC<VideoProps> = ({ data }) => {
  function appendQueryString({ url, appendix }: { url: string; appendix: {} }) {
    if (typeof url !== "string") {
      return "";
    }

    const [urlWithoutHash = "", hash] = url.split("#");
    const [urlWithoutHashAndQueryString = "", queryString = ""] =
      urlWithoutHash.split("?");

    const mergedQueryString = stringify({
      ...parse(queryString),
      ...appendix,
    });

    let result = urlWithoutHashAndQueryString;

    if (mergedQueryString) result = `${result}?${mergedQueryString}`;
    if (hash) result = `${result}#${hash}`;

    return result;
  }

  const videoRef = useRef<HTMLDivElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [levels, setLevels] = useState<any>([]);
  const [selectedLevel, setSelectedLevel] = useState<number>(-1);
  useEffect(() => {
    const video = document.createElement("video");
    video.controls = true;
    video.style.width = "100%";
    video.style.height = "100%";

    // const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const targetUrl = data.programSchedule.liveProgram.playbackUrl;
    const SSAISourceQueryStringByAd = {
      "ads.chocomember_id": "",
      "ads.app_id": "062097f1b1f34e11e7f82aag22000aee",
      "ads.device": "desktop_web",
      "ads.os": "",
      "ads.version": "",
      "ads.product_type": "FAST",
      "ads.source": "LINE_TV",
      "ads.instance_id": "",
      "ads.session_id": "",
      "ads.ad_insertion_type": "SSAI",
    };

    const corsUrl = appendQueryString({
      url: targetUrl,
      appendix: SSAISourceQueryStringByAd,
    });

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(corsUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setLevels(hls.levels);
        video.play();
      });

      // // Set the quality level (example: set to highest quality level)
      // hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
      //   console.log(`Quality level switched to: ${data.level}`);
      // });

      // // Set a specific quality level, -1 for auto, 0 for the first level, 1 for the second, etc.
      // hls.nextLevel = -1; // Auto quality

      if (videoRef.current) {
        videoRef.current.appendChild(video);
      }

      return () => {
        hls.destroy();
        if (videoRef.current) {
          videoRef.current.removeChild(video);
        }
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = corsUrl;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });

      if (videoRef.current) {
        videoRef.current.appendChild(video);
      }

      return () => {
        if (videoRef.current) {
          videoRef.current.removeChild(video);
        }
      };
    } else {
      console.error("HLS is not supported in this browser");
    }
  }, [data]);

  const handleQualityChange = (event: any) => {
    const level = parseInt(event.target.value);
    setSelectedLevel(level);
    if (hlsRef.current) {
      hlsRef.current.nextLevel = level;
    }
  };

  console.log(data);
  return (
    <div className="w-full max-w-6xl p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden relative">
      <div
        ref={videoRef}
        id="player"
        className="aspect-video bg-linetv-grey-900"
      />
      {levels.length > 0 && (
        <div className="quality-control">
          <label htmlFor="quality">Quality: </label>
          <select
            id="quality"
            value={selectedLevel}
            onChange={handleQualityChange}
          >
            <option value="-1">Auto</option>
            {levels.map((level: any, index: number) => (
              <option key={index} value={index}>
                {level.height}p
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default VideoComponent;
