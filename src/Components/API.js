import axios from "axios";

const summonerInstance = axios.create({
  baseURL: "https://api.makta.cc/api/v1/summoners/",
});

const champInstance = axios.create({
  baseURL: `https://ddragon.leagueoflegends.com/cdn/${process.env.REACT_APP_PATCH_VERSION}/data/ko_KR/champion.json`,
});

export const SummonerAPI = {
  summoner: (id) => summonerInstance.get(`${id}`),
};

export const ChampAPI = {
  champ: () => champInstance.get(),
};
