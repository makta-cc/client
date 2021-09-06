import styled from "styled-components";

const Container = styled.div`
  margin-top: 20px;
  display: flex;
`;

const Profile = styled.div`
  display: flex;
  position: relative;
  width: 130px;
  margin-right: 10px;
  justify-content: center;
`;

const ProfileImage = styled.div`
  width: 130px;
  height: 130px;
  background: url(${(props) =>
    `https://ddragon.leagueoflegends.com/cdn/11.16.1/img/profileicon/${props.profileIconId}.png`});
  background-size: contain;
  border-radius: 5px;
`;

const Level = styled.div`
  font-weight: 600;
  position: absolute;
  bottom: -5px;
  text-align: center;
  background-color: white;
`;

const Nickname = styled.div`
  font-size: 24px;
`;

const AccountDetail = ({ account }) => {
  return (
    <Container>
      <Profile>
        <ProfileImage profileIconId={account.profileIconId} />
        <Level>{account.summonerLevel}</Level>
      </Profile>
      <Nickname>{account.name}</Nickname>
    </Container>
  );
};

export default AccountDetail;
