import { SummonerAPI } from "Components/API";
import { useEffect } from "react";

const Summoner = () => {
  useEffect(() => {
    const searchSummoner = async () => {
      const result = await SummonerAPI.summoner();

      console.log(result);
    };

    searchSummoner();
  }, []);

  return <h1>Summoner</h1>;
};

export default Summoner;
