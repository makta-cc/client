import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
	${reset};

	@font-face{
		font-family:'Nanum Gothic Coding', monospace;
		src: url('https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding:wght@400;700&display=swap');
	}

	a{
		text-decoration:none;
		color:inherit;
	}

	*{
		box-sizing:border-box;
		font-family:'Nanum Gothic Coding', monospace;
	}

	#root{
		padding:10px 20px 0 20px;
	}
	
	body{
		background-color:#F5F5F5;
	}

	b{
		font-weight:600;
	}
`;

export default GlobalStyles;
