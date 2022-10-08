import axios from "axios";

export const API = axios.create({ baseURL: "https://takenotes-api.herokuapp.com" });