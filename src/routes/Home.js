import { useState } from "react";
import { SummonerAPI } from "Components/API";

const Home = () => {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const {
        data: { response },
      } = await SummonerAPI.summoner(id);

      setData(response);

      if (!data) {
        throw new Error("정보를 불러오는데 실패했습니다.");
      }

      console.log(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    getData();
    setId("");
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setId(value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          value={id}
          placeholder="닉네임을 입력하세요."
        />
        <input type="submit" value="검색" />
      </form>
      {loading ? (
        "Loading..."
      ) : (
        <>
          {data ? (
            <>
              닉네임 : {data.name}, 레벨 : {data.summonerLevel}
            </>
          ) : null}
        </>
      )}
    </>
  );
};

export default Home;
