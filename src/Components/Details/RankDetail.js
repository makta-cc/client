import styled from "styled-components";

const Container = styled.div`
  display: flex;
  background-color: white;
  padding: 10px;
  margin: 10px 0 10px 0;
  border: 1px solid #bfbfbf;
  width: 300px;
`;

const RankImage = styled.img`
  width: 100px;
`;

const RankInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;
  width: 150px;
  justify-content: center;
  margin-left: 10px;
  line-height: 18px;
`;

const RankItem = styled.span`
  color: rgba(0, 0, 0, 0.5);
  font-size: 13px;
`;

const RankTier = styled.span`
  color: ${(props) => props.color};
  font-weight: 600;
  font-size: 20px;
`;

const RankDetail = ({ rank }) => {
  return (
    <Container>
      <RankImage
        src={`/assets/ranked-emblems/Emblem_${
          rank.tier ? rank.tier : "Unranked"
        }.png`}
        alt="tier"
      />
      <RankInfo>
        <RankItem>
          {rank.queueType === "RANKED_SOLO_5x5" ? "솔로랭크" : "자유 5:5랭크"}
        </RankItem>
        {rank.tier ? (
          <RankTier color="#C197D2">
            {rank.tier === "CHALLENGER" || rank.tier === "GRANDMASTER"
              ? `${rank.tier}`
              : `${rank.tier} ${rank.rank}`}
          </RankTier>
        ) : (
          <RankTier color="#BFBFBF">Unranked</RankTier>
        )}
        {rank.leaguePoints ? (
          <RankItem>
            {rank.leaguePoints}LP / {rank.wins}승 {rank.losses}패
          </RankItem>
        ) : null}
        {rank.wins ? (
          <RankItem>
            승률 : {Math.round((rank.wins / (rank.wins + rank.losses)) * 100)}%
          </RankItem>
        ) : null}
      </RankInfo>
    </Container>
  );
};

export default RankDetail;
