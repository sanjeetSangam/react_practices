import Login from "./components/Login";
import Profile from "./components/Profile";
import "./App.css";
import UserContextProvider from "./context/UserContextProvider";

const App = () => {
	return (
		<UserContextProvider>
			<h1>MAIN WORKS</h1>

			<Login />
			<Profile />
		</UserContextProvider>
	);
};

export default App;
