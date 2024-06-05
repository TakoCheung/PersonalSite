import "./css/App.css";
import About from "./components/About";
import Story from "./components/Story";
import ScrollDownIndicator from "./components/ScrollDownIndicator";

function App() {
	return (
		<div className="App">
			<About />
			<Story />
			<ScrollDownIndicator />
		</div>
	);
}

export default App;
