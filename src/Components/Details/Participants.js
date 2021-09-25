import { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;
`;

const BlueTeam = styled.div`
  display: flex;
  flex-direction: column;
`;

const PurpleTeam = styled.div`
  display: flex;
  flex-direction: column;
`;

const ParticipantItem = styled.div`
  &:not(:first-child) {
    margin-top: 2px;
  }
  display: flex;
  font-size: 14px;
  align-items: center;
`;

const ChampImg = styled.div`
  background-size: contain;
  width: 20px;
  height: 20px;
  display: inline-block;
  border-radius: 3px;
  margin-right: 3px;
  background-image: url(${(props) =>
    `https://ddragon.leagueoflegends.com/cdn/${process.env.REACT_APP_PATCH_VERSION}/img/champion/${props.champ}.png`});
`;

const Participants = ({ participants }) => {
  const [blueTeam, setBlueTeam] = useState([]);
  const [purpleTeam, setPurpleTeam] = useState([]);

  const assignTeam = () => {
    const blueTeam = [];
    const purpleTeam = [];

    participants.forEach((p, i) => {
      if (i < participants.length / 2) {
        blueTeam.push(p);
      } else {
        purpleTeam.push(p);
      }
    });

    setBlueTeam(blueTeam);
    setPurpleTeam(purpleTeam);
  };

  useEffect(() => {
    assignTeam();
  }, []);

  return (
    <Container>
      <BlueTeam>
        {blueTeam.map((p, i) => (
          <ParticipantItem key={i}>
            <ChampImg champ={p.championName} />
            {p.summonerName}
          </ParticipantItem>
        ))}
      </BlueTeam>
      <PurpleTeam>
        {purpleTeam.map((p, i) => (
          <ParticipantItem key={i}>
            <ChampImg champ={p.championName} />
            {p.summonerName}
          </ParticipantItem>
        ))}
      </PurpleTeam>
    </Container>
  );
};

export default Participants;
