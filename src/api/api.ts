// src/api.ts
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export async function fetchSolution(payload: Record<string, any>) {
    console.log(payload)
  const response = await axios.post(`${API_BASE_URL}/solve`, payload);
  return response.data.data.lift_coefficient;
}