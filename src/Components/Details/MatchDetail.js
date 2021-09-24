import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => (props.isWin ? "#77DDF9" : "#FFA0A3")};
  border: 1px solid ${(props) => (props.isWin ? "#69C3DB" : "#D9898B")};
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChampContainer = styled.div`
  background-image: url(${(props) =>
    `https://ddragon.leagueoflegends.com/cdn/${process.env.REACT_APP_PATCH_VERSION}/img/champion/${props.champ}.png`});
  background-size: contain;
  width: 80px;
  height: 80px;
  position: relative;
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

const MatchDetail = ({ id, match }) => {
  const [summonerIndex, setSummonerIndex] = useState(0);
  const [teamIndex, setTeamIndex] = useState(0);
  const [isWin, setIsWin] = useState();
  const [summonerInfo, setSummonerInfo] = useState({});

  const date = new Date(match.info.gameCreation);
  const {
    info: { participants },
  } = match;

  const findSummoner = () => {
    participants.forEach((p, i) => {
      if (p.summonerName.toLowerCase() === id.toLowerCase()) {
        setSummonerIndex(i);
        setSummonerInfo(p);

        console.log(p);
      }
    });
  };

  const findWinner = () => {
    findSummoner();

    const { teamId } = summonerInfo;
    setTeamIndex(teamId === 100 ? 0 : 1);
    setIsWin(match.info.teams[teamIndex].win);
  };

  useEffect(() => {
    findWinner();
  });

  return (
    <Container isWin={summonerInfo.win}>
      {date.getFullYear()}년 {date.getMonth() + 1}월 {date.getDate()}일 /&nbsp;
      {date.getHours()}시 {date.getMinutes()}분
      <br />
      {isWin ? "승리" : "패배"}
      <ChampContainer champ="Tryndamere">
        <ChampLevel>{summonerInfo.champLevel}</ChampLevel>
      </ChampContainer>
      <KDAContainer>
        <KDAItem>
          {summonerInfo.kills}/{summonerInfo.deaths}/{summonerInfo.assists}
        </KDAItem>
        <KDAItem>
          {((summonerInfo.kills + summonerInfo.assists) * 10) /
            summonerInfo.deaths /
            10}
          &nbsp;평점
        </KDAItem>
      </KDAContainer>
      {summonerInfo.totalMinionsKilled + summonerInfo.neutralMinionsKilled}
    </Container>
  );
};

export default MatchDetail;
