import { useState } from "react";
import "../css/TextToImageAnimation.css";

const TextToImageAnimation = ({ text, imageUrl, title }) => {
	const [showImage, setShowImage] = useState(false);

	return (
		<div
			className="container"
		>
      <span className="tooltiptext">Click</span>
			{!showImage && (
				<div className="text" onClick={() => setShowImage(true)}>
					{text}
				</div>
			)}
			{showImage && (
				<img
					src={imageUrl}
					alt="Converted from text"
					className="image"
					onLoad={() => setShowImage(true)}
					onError={() => setShowImage(false)}
					onClick={() => setShowImage(false)}
				/>
			)}
		</div>
	);
};

export default TextToImageAnimation;
