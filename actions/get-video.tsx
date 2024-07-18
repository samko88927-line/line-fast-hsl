import { Product } from "@/types";
const videoIdWeekend = "42";
const videoIdWeekday = "60";
const NEXT_PUBLIC_API_URL_PRO = "https://api.linetv.tw/v1";
const NEXT_PUBLIC_API_URL = "https://cheetahmen.chocotv.com.tw/v1";

const getBaseUrlAndVideoId = () => {
  const now = new Date();
  const day = now.getUTCDay(); // 獲取當前星期幾，0 是星期日，6 是星期六
  if (day >= 5 && day <= 0) {
    // 星期五至星期日
    return {
      baseUrl: NEXT_PUBLIC_API_URL_PRO,
      videoId: videoIdWeekend,
    };
  } else {
    // 其餘時間
    return {
      baseUrl: NEXT_PUBLIC_API_URL,
      videoId: videoIdWeekday,
    };
  }
};
// const URL = `${NEXT_PUBLIC_API_URL}/fast/channels`;
const getVideo = async (): Promise<any> => {
  const { baseUrl, videoId } = getBaseUrlAndVideoId();
  const res = await fetch(`${baseUrl}/fast/channels/${videoId}/info`);

  return res.json();
};

export default getVideo;
