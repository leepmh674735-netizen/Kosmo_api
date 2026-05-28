import { Like } from "react-router-dom";

function Header(){
	
	return(
		<>
		   <h1>Header</h1>
		   <link to="/notice/list">list</link>
		   <link to= "/member/login">Login</link>
		</>
	)
	
}

export default Header;