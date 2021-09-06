import axios from "axios";

const krInstance = axios.create({
  baseURL: "http://localhost:3330/api/v1/summoners/",
});

export const SummonerAPI = {
  summoner: (id) => krInstance.get(`${id}`),
};
