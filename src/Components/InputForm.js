import React, { useState } from "react";
import { withRouter } from "react-router";

const InputForm = (props) => {
  const [id, setId] = useState("");
  const { history } = props;

  const handleSubmit = (e) => {
    e.preventDefault();

    history.push(`/summoner/${id}`);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setId(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleChange}
        value={id}
        placeholder="닉네임을 입력하세요."
      />
      <input type="submit" value="검색" />
    </form>
  );
};

/*
	라우터에 의해 호출된 컴포넌트가 아닐 때
	match, location, history 객체에 접근하기 위해 withRouter 사용
*/
export default withRouter(InputForm);
