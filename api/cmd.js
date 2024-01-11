import { API_SERVER } from "@env";
import { useContext } from "react";
import { AppContext } from "../App";
const { user, supplier } = useContext(AppContext);

// export const getItems = async () => {
//   const query = await fetch(`${API_SERVER}/offers`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       sup: supplier.name,
//     }),
//   });
//   return await query.json();
// };

export const query = async (path, data) => {
  // console.log(`${API_SERVER}/${path}`, data)
  const query = await fetch(`${API_SERVER}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  });
  const response = await query.json();
  console.log("🚀 ~ query ~ response:", response);
  return response;
};
