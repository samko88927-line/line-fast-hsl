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
const VideoComponentHLS: React.FC<VideoProps> = ({ data }) => {
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
  const [fragmentData, setFragmentData] = useState<string[]>([]);
  useEffect(() => {
    const video = document.createElement("video");
    video.controls = true;
    video.style.width = "100%";
    video.style.height = "100%";
    if (data.programSchedule?.liveProgram?.playbackUrl == undefined) {
      return;
    }

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

    console.log("Playback URL with query string:", corsUrl);

    if (Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;
      hls.loadSource(corsUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        setLevels(hls.levels);
        console.log("Available quality levels:", hls.levels);
        video.play();
      });
      const limitLog = 250;
      hls.on(Hls.Events.FRAG_LOADED, (event, data) => {
        setFragmentData((prev) => {
          const newData = [...prev, `Fragment loaded: ${data.frag.url}`];
          return newData.length > limitLog ? newData.slice(-limitLog) : newData;
        });
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
        console.log("Quality level switched to:", data.level);
      });

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

      video.addEventListener("canplay", () => {
        console.log("Video can play");
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

  useEffect(() => {
    const fragmentLogDiv = document.getElementById("fragment-log");
    if (fragmentLogDiv) {
      fragmentLogDiv.scrollTop = 0; // 維持在最上面
    }
  }, [fragmentData]);

  const handleQualityChange = (event: any) => {
    const level = parseInt(event.target.value);
    setSelectedLevel(level);
    if (hlsRef.current) {
      hlsRef.current.nextLevel = level;
    }
  };
  const highlightTsExtension = (text: string) => {
    // Use a regular expression to find the .ts extension and wrap it with a span
    return text.replace(
      /(index_\d+_\d+\.ts)/g,
      '<span class="text-yellow-500">$1</span>'
    );
  };

  return (
    <div className="w-full  p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden relative  max-w-[664px]">
      <div className="relative">
        <div className="absolute left-4 top-4 text-2xl bg-black px-4 py-1 rounded-sm bg-opacity-60">
          HLS.js套件
        </div>
        <div
          ref={videoRef}
          id="player"
          className="aspect-video bg-linetv-grey-900 rounded-lg overflow-hidden "
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
        className="h-80  overflow-y-scroll p-4 px-8 mt-4 border rounded-lg "
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

export default VideoComponentHLS;
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
