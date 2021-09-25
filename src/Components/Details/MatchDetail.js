import { useEffect, useState } from "react";
import styled from "styled-components";
import ItemDetail from "./ItemDetail";
import Participants from "./Participants";

const Container = styled.div`
  background-color: ${(props) => (props.isWin ? "#77DDF9" : "#FFA0A3")};
  border: 1px solid ${(props) => (props.isWin ? "#69C3DB" : "#D9898B")};
  border-radius: 5px;
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const MatchInfoContainer = styled.div`
  width: 400px;
`;

const MatchInfoItem = styled.div``;

const ChampContainer = styled.div`
  background-size: contain;
  width: 80px;
  height: 80px;
  position: relative;
  background-image: url(${(props) =>
    `https://ddragon.leagueoflegends.com/cdn/${process.env.REACT_APP_PATCH_VERSION}/img/champion/${props.champ}.png`});
`;

const ChampLevel = styled.div`
  font-weight: bold;
  position: absolute;
  color: white;
  bottom: 3px;
  right: 3px;
  text-align: center;
`;

const SpellContainer = styled.div``;

const SpellItem = styled.div`
  background-image: url(${(props) =>
    `https://ddragon.leagueoflegends.com/cdn/${process.env.REACT_APP_PATCH_VERSION}/img/champion/${props.spell}.png`});
`;

const KDAContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const KDAItem = styled.div`
  &:first-child {
    font-size: 20px;
  }
`;

const StatContainer = styled.div`
  text-align: center;
`;

const StatItem = styled.div`
  &:nth-child(2) {
    color: red;
  }
`;

const MatchDetail = ({ id, match }) => {
  const [summonerIndex, setSummonerIndex] = useState(0);
  const [teamIndex, setTeamIndex] = useState(0);
  const [isWin, setIsWin] = useState();
  const [cs, setCs] = useState(0);
  const [summonerInfo, setSummonerInfo] = useState({});
  const [items, setItems] = useState([]);

  const creation = new Date(match.info.gameCreation);
  const duration = new Date(match.info.gameDuration);

  const {
    info: { participants },
  } = match;

  const findSummoner = () => {
    console.log(match);
    let summonerInfo = {};
    participants.forEach((p, i) => {
      if (
        p.summonerName.toLowerCase().replace(" ", "") ===
        id.toLowerCase().replace(" ", "")
      ) {
        setSummonerIndex(i);
        setSummonerInfo(p);

        console.log(p);
        summonerInfo = p;
      }
    });
    return summonerInfo;
  };

  const findWinner = () => {
    const summonerInfo = findSummoner();

    if (summonerInfo) {
      const {
        teamId,
        item0,
        item1,
        item2,
        item3,
        item4,
        item5,
        item6,
        totalMinionsKilled,
        neutralMinionsKilled,
      } = summonerInfo;
      setTeamIndex(teamId === 100 ? 0 : 1);
      setIsWin(match.info.teams[teamIndex].win);

      console.log(summonerInfo);
      setCs(totalMinionsKilled + neutralMinionsKilled);

      const items = [item0, item1, item2, item6, item3, item4, item5];
      setItems(items);
    }
  };

  useEffect(() => {
    findWinner();
  }, []);

  return (
    <Container isWin={summonerInfo.win}>
      <MatchInfoContainer>
        <MatchInfoItem>
          {`${creation.getFullYear()}년 ${
            creation.getMonth() + 1
          }월 ${creation.getDate()}일 ${creation.getHours()}시 ${creation.getMinutes()}분`}
        </MatchInfoItem>
        <MatchInfoItem>{isWin ? "승리" : "패배"}</MatchInfoItem>
        <MatchInfoItem>{`${duration.getMinutes()}분 ${duration.getSeconds()}초`}</MatchInfoItem>
      </MatchInfoContainer>
      <ChampContainer champ={summonerInfo.championName}>
        <ChampLevel>{summonerInfo.champLevel}</ChampLevel>
      </ChampContainer>
      <KDAContainer>
        <KDAItem>
          {summonerInfo.kills}/{summonerInfo.deaths}/{summonerInfo.assists}
        </KDAItem>
        <KDAItem>
          {summonerInfo.deaths === 0 ? (
            <span style={{ fontWeight: 600 }}>Perfect</span>
          ) : (
            `${(
              (summonerInfo.kills + summonerInfo.assists) /
              summonerInfo.deaths
            ).toFixed(2)} 평점`
          )}
        </KDAItem>
      </KDAContainer>
      <StatContainer>
        <StatItem>
          {`${cs} (${(
            cs /
            (duration.getMinutes() + duration.getSeconds() / 60)
          ).toFixed(1)}) CS`}
        </StatItem>
        <StatItem>{`킬 관여 ${(
          ((summonerInfo.kills + summonerInfo.assists) /
            match.info.teams[teamIndex].objectives.champion.kills) *
          100
        ).toFixed(0)}%`}</StatItem>
        <StatItem>시야 점수 {summonerInfo.visionScore}</StatItem>
        <StatItem>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="12"
            viewBox="0 0 14 12"
          >
            <defs>
              <linearGradient
                id="prefix__a"
                x1="50%"
                x2="50%"
                y1="1.705%"
                y2="98.642%"
              >
                <stop offset="0%" stopColor="#FD8989" />
                <stop offset="100%" stopColor="#FB3F70" />
              </linearGradient>
            </defs>
            <path
              fill="url(#prefix__a)"
              fillRule="evenodd"
              d="M0 2.19L1.295 4.07.693 6.112l1.96.165.633 2.307 1.897-1.45.566.435.098-1.62v-.002s-.602-.117-1.24-.685l-.004-.002-.001-.003c-.595-.533-1.219-1.46-1.408-3.066H0zm10.805 0c-.189 1.607-.813 2.534-1.408 3.067v.003l-.006.002c-.636.568-1.239.685-1.239.685v.001l.099 1.621.565-.436 1.9 1.45.631-2.306 1.96-.165-.602-2.043L14 2.19h-3.195zM6.282 5.437L5.755 12h2.49l-.526-6.564H6.282zm1.829-1.64l.898-.852L7 0 4.991 2.944l.898.851h2.222zm.04 1.349H5.8l-.525-1.058h3.448L8.15 5.145z"
            />
          </svg>
          {summonerInfo.visionWardsBoughtInGame}&nbsp;
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="12"
            viewBox="0 0 14 12"
          >
            <defs>
              <linearGradient
                id="prefix__a"
                x1="50%"
                x2="50%"
                y1="1.705%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FFB93B" />
                <stop offset="100%" stopColor="#FF8929" />
              </linearGradient>
            </defs>
            <path
              fill="url(#prefix__a)"
              fillRule="evenodd"
              d="M0 2.19L1.295 4.07.693 6.112l1.96.165.633 2.307 1.897-1.45.566.435.098-1.62v-.002s-.602-.117-1.24-.685l-.004-.002-.001-.003c-.595-.533-1.219-1.46-1.408-3.066H0zm10.805 0c-.189 1.607-.813 2.534-1.408 3.067v.003l-.006.002c-.636.568-1.239.685-1.239.685v.001l.099 1.621.565-.436 1.9 1.45.631-2.306 1.96-.165-.602-2.043L14 2.19h-3.195zM6.282 5.437L5.755 12h2.49l-.526-6.564H6.282zm1.829-1.64l.898-.852L7 0 4.991 2.944l.898.851h2.222zm.04 1.349H5.8l-.525-1.058h3.448L8.15 5.145z"
            />
          </svg>
          {summonerInfo.wardsPlaced}&nbsp;
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="12"
            viewBox="0 0 14 12"
          >
            <g fill="none" fillRule="evenodd">
              <path
                fill="#646464"
                d="M6.282 5.436H7.72L8.245 12h-2.49l.527-6.564zm1.868-.291H5.802l-.526-1.058h3.448L8.15 5.145zM0 2.19h3.194c.19 1.606.813 2.533 1.408 3.066v.003l.006.002c.637.568 1.239.685 1.239.685v.001L5.749 7.57l-.566-.436-1.897 1.45-.633-2.306-1.96-.165.602-2.043L0 2.19zm10.805 0H14l-1.295 1.878.602 2.043-1.96.165-.632 2.307-1.899-1.45-.565.435-.099-1.62v-.002s.603-.117 1.24-.685l.005-.002v-.003c.595-.533 1.22-1.46 1.408-3.066z"
              />
              <g fill="#ED6767" fillRule="nonzero">
                <path
                  d="M5.5 8.5C7.433 8.5 9 6.933 9 5S7.433 1.5 5.5 1.5 2 3.067 2 5s1.567 3.5 3.5 3.5zm0 1.5c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5z"
                  transform="translate(1.5 1)"
                />
                <path
                  d="M2.53 8.956L1.47 7.895 7.895 1.47 8.956 2.53z"
                  transform="translate(1.5 1)"
                />
              </g>
              <path
                fill="#646464"
                d="M8.111 3.795L9.009 2.944 7 0 4.991 2.944 5.889 3.795z"
              />
            </g>
          </svg>
          {summonerInfo.wardsKilled}
        </StatItem>
      </StatContainer>
      <ItemDetail items={items} />
      <Participants participants={participants} />
    </Container>
  );
};

export default MatchDetail;
