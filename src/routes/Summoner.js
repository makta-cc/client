import { useEffect, useState } from "react";
import { useParams } from "react-router";
import InputForm from "Components/InputForm";
import { SummonerAPI } from "Components/API";
import AccountDetail from "Components/Details/AccountDetail";
import RankDetail from "Components/Details/RankDetail";
import MatchDetail from "Components/Details/MatchDetail";

const Summoner = () => {
  const { id } = useParams();
  const [summoner, setSummoner] = useState(null);
  const [account, setAccount] = useState(null);
  const [rank, setRank] = useState(null);
  const [matchs, setMatch] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setSummoner(null);
        setAccount(null);
        setRank(null);
        setMatch(null);

        console.log(id);

        const {
          data: { summoner, match },
        } = await SummonerAPI.summoner(id);

        setSummoner(summoner);
        setMatch(match);

        setAccount({
          name: id,
          profileIconId: summoner.profileIconId,
          summonerLevel: summoner.summonerLevel,
        });

        console.log(match);
        const rank = [
          { queueType: "RANKED_SOLO_5x5", isRank: false },
          { queueType: "RANKED_FLEX_SR", isRank: false },
        ];

        summoner.rank.forEach((r) => {
          if (r.queueType === "RANKED_SOLO_5x5") {
            rank[0] = { ...r, isRank: true };
          } else if (r.queueType === "RANKED_FLEX_SR") {
            rank[1] = { ...r, isRank: true };
          }
        });

        setRank(rank);

        if (!summoner) {
          throw new Error("정보를 불러오는데 실패했습니다.");
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id, setLoading, setSummoner]);

  return (
    <>
      <InputForm />
      <div>
        {loading ? "loading..." : null}
        {account && <AccountDetail account={account} />}
        {rank && rank.map((r, i) => <RankDetail rank={r} key={i} />)}
        {matchs && <MatchDetail match={matchs[0]} id={id} />}
      </div>
    </>
  );
};

export default Summoner;

/*
{matchs &&
          matchs.map((match, i) => <MatchDetail match={match} key={i} />)}
*/
