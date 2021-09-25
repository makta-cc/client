import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2px;
`;

const Item = styled.div`
  background-color: #ebc8fa;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  background-size: contain;
  background-image: url(${(props) =>
    `https://ddragon.leagueoflegends.com/cdn/${process.env.REACT_APP_PATCH_VERSION}/img/item/${props.item}.png`});
`;

const ItemDetail = ({ items }) => {
  return (
    <Container>
      {items.map((item, index) => (
        <Item item={item} key={index} />
      ))}
    </Container>
  );
};

export default ItemDetail;
