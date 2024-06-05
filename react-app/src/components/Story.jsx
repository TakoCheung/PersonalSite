import { useState } from "react";
import WordByWordAnimation from "./WordByWordAnimation";
import "../css/Story.css";

function Story() {
	const [isMute, setIsMute] = useState(false);
	const text =
		"In the heart of the tech world, where innovation and efficiency drive progress, there lived a software engineer named Tako Cheung. Tako, with his deep passion for automation and optimization, embarked on a journey through the challenging landscape of the tech industry, armed with a blend of technical prowess and visionary zeal.";

	const handleMuteUnmute = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsMute(!isMute);
		handleSpeak(text);
	};

	const handleSpeak = (text) => {
		// console.log(isMute, text);
		if (!window.speechSynthesis) {
			// alert('Your browser does not support speech synthesis.');
			return;
		}
		if (!isMute) {
			const utterance = new SpeechSynthesisUtterance(text);
			window.speechSynthesis.speak(utterance);
		}else{
			window.speechSynthesis.cancel();
		}
	};

	return (
		<div className="App-header">
			<WordByWordAnimation
				text={text}
				animationDuration={0.5} // Duration of the animation for each word
				delayBetweenWords={0.2} // Delay between each word's animation
			/>
			<div className="center-con">
				<div className="round" onClick={handleMuteUnmute}>
					<div className={`speaker ${isMute ? "" : "on"}`}>
						<div id="mute" className="mute"></div>
						<span></span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Story;
