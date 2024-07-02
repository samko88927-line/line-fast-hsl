import getBillboard from "@/actions/get-billboard";
import React from "react";

const Server = async () => {
  const billboardId = "e1c4aa9b-321e-45e5-ac94-9bfc6f699dfd";
  const billboard = await getBillboard(billboardId); //Billboard Id
  console.log("billboard", billboard);
  return <div>server</div>;
};

export default Server;
