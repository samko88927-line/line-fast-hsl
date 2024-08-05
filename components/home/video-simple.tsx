"use client";
import { VideoType } from "@/types";
import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "@videojs/http-streaming"; // Ensure HLS support
import "video.js/dist/video-js.css";
import { parse, stringify } from "querystring";
import axios from "axios";
import Player from "video.js/dist/types/player";
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

interface VideoProps {
  data: VideoType;
}

const VideoComponent: React.FC<VideoProps> = ({ data }) => {
  const videoRef = useRef(null);
  const playerRef = useRef<any>(null);
  const [playbackUrl, setPlaybackUrl] = useState("");
  const [fragmentData, setFragmentData] = useState<string[]>([]);
  const limitLog = 250; // Limit for fragment logs
  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(
          "https://cheetahmen.chocotv.com.tw/v1/fast/channels/60/info"
        );
        const targetUrl = response.data.programSchedule.liveProgram.playbackUrl;
        const corsUrl = appendQueryString({
          url: targetUrl,
          appendix: SSAISourceQueryStringByAd,
        });
        setPlaybackUrl(corsUrl);
      } catch (error) {
        console.error("Error fetching video data", error);
      }
    };

    fetchVideoData();
  }, []);

  useEffect(() => {
    if (playbackUrl && videoRef.current) {
      if (playerRef.current) {
        playerRef.current.src({
          src: playbackUrl,
          type: "application/x-mpegURL",
        });
        playerRef.current.play();
      } else {
        playerRef.current = videojs(videoRef.current, {
          controls: true,
          autoplay: true,
          preload: "auto",
          html5: {
            vhs: {
              smoothQualityChange: true,
            },
          },
          sources: [
            {
              src: playbackUrl,
              type: "application/x-mpegURL",
            },
          ],
        });
        // Listen for fragment loading events
        playerRef.current.on("loadedmetadata", () => {
          const tracks = playerRef.current.textTracks();
          let segmentMetadataTrack;

          for (let i = 0; i < tracks.length; i++) {
            if (tracks[i].label === "segment-metadata") {
              segmentMetadataTrack = tracks[i];
              break;
            }
          }

          if (segmentMetadataTrack) {
            segmentMetadataTrack.on("cuechange", () => {
              const activeCue = segmentMetadataTrack.activeCues[0];
              if (activeCue) {
                const fragmentUri = activeCue.value.uri;

                setFragmentData((prev) => {
                  const newData = [...prev, ` ${fragmentUri}`];
                  return newData.length > limitLog
                    ? newData.slice(-limitLog)
                    : newData;
                });
              }
            });
          }
        });
      }

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
          playerRef.current = null;
        }
      };
    }
  }, [playbackUrl]);

  useEffect(() => {
    const fragmentLogDiv = document.getElementById("fragment-log");
    if (fragmentLogDiv) {
      fragmentLogDiv.scrollTop = 0; // 維持在最上面
    }
  }, [fragmentData]);
  const highlightTsExtension = (text: string) => {
    // Use a regular expression to find the .ts extension and wrap it with a span
return text.replace(
  /(index_\d+_\d+\.ts)/g,
  '<span class="text-yellow-500">$1</span>'
);
  };
  return (
    <div className="w-full  relative  p-4 sm:p-6 lg:p-8  max-w-[664px]">
      <div data-vjs-player>
        <div className="absolute left-4 top-4 text-2xl bg-black px-4 py-1 rounded-sm bg-opacity-60">
          Video.js 第8版
        </div>
        <video
          ref={videoRef}
          width={600}
          className="video-js vjs-big-play-centered  aspect-video bg-linetv-grey-900 rounded-lg overflow-hidden "
        />
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => downloadCSV(fragmentData)}
          className="mt-4 p-2 px-4 bg-green-500 text-white rounded"
        >
          下載 Fragment Log 為 CSV
        </button>
        <div className="">Log 紀錄上限250筆</div>
      </div>
      <div
        id="fragment-log"
        className="h-80 overflow-auto p-4 px-8 mt-4 border rounded-lg "
      >
        {fragmentData.length > 0 && (
          <div className="mb-2 ">
            <div className="flex justify-between">
              <h3 className=" font-medium">前三筆資料</h3>
              <div className="">紀錄資料總數 {fragmentData.length} 筆</div>
            </div>
            {fragmentData
              .slice(-3)
              .reverse()
              .map((fragment, index) => (
                <div
                  key={`top-${index}`}
                  className="max-w-[400px] overflow-auto break-words"
                >
                  <div className="font-thin text-gray-50 text-sm">
                    Fragment loaded:
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: highlightTsExtension(fragment),
                    }}
                  />
                </div>
              ))}
          </div>
        )}
        <hr className="mb-2" />
        {fragmentData
          .slice(0, -3)
          .reverse()
          .map((fragment, index) => (
            <div
              className="max-w-[400px] overflow-auto break-words"
              key={index}
            >
              <div className="font-thin text-gray-50 text-sm">
                Fragment loaded:
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: highlightTsExtension(fragment),
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default VideoComponent;

{
  /* {levels.length > 0 && (
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
      )} */
}

function convertToCSV(data: any) {
  const csvRows = [];
  const headers = ["Fragment Log"];
  csvRows.push(headers.join(","));
  for (const row of data) {
    csvRows.push(row);
  }
  return csvRows.join("\n");
}

function downloadCSV(data: any) {
  const csvData = convertToCSV(data);
  const blob = new Blob([csvData], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", "fragment_log.csv");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function appendQueryString({
  url,
  appendix,
}: {
  url: string;
  appendix: {};
}) {
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
