import { useContext } from "react";
import { AppContext } from "../App";
import {API_SERVER, API_SERVER2} from "@env"
const { user, supplier } = useContext(AppContext);

export const query = async (path, data) => {
  const q = await fetch(`${API_SERVER}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  });
  const response = await q.json();
  return response;
};
