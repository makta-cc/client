import axios from "axios";

const krInstance = axios.create({
  baseURL: "http://localhost:3500",
});

export const SummonerAPI = {
  summoner: (id) => krInstance.get(`/?id=${id}`),
};
