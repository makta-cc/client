import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid black;
  background-color: ${(props) => (props.win ? "#77DDF9" : "#FFA0A3")};
  border: 1px solid ${(props) => (props.win ? "#69C3DB" : "#D9898B")};
`;

const MatchDetail = ({ id, match }) => {
  const [index, setIndex] = useState(0);

  const date = new Date(match.info.gameCreation);

  useEffect(() => {
    match.info.participants?.forEach((p, i) => {
      if (p.summonerName === id) {
        setIndex(i);
      }
    });

    console.log(match.info.participants[index]);
  });

  return (
    <Container win={match.info.participants[index].win}>
      {date.getFullYear()}년 {date.getMonth() + 1}월 {date.getDate()}일 /&nbsp;
      {date.getHours()}시 {date.getMinutes()}분
      <br />
    </Container>
  );
};

export default MatchDetail;
