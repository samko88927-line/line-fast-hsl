import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/fast/channels`;

const getVideo = async (id: string): Promise<any> => {
  const res = await fetch(`${URL}/${id}/info`);

  return res.json();
};

export default getVideo;
