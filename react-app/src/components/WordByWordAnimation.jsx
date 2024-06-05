import React, { useEffect, useRef, useState } from "react";
import "../css/WordByWordAnimation.css";

const WordByWordAnimation = ({
	text,
	animationDuration = 0.5,
	delayBetweenWords = 0.2,
}) => {
	const [startAnimation, setStartAnimation] = useState(false);
	const containerRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setStartAnimation(true);
				} else {
					setStartAnimation(false);
				}
			},
			{
				rootMargin: "0px",
				threshold: 0.5,
			}
		);

		if (containerRef.current) {
			observer.observe(containerRef.current);
		}

		return () => {
			observer.disconnect();
		};
	}, []);
	const words = startAnimation ? (
		text.split(" ").map((word, index) => {
			const style = {
				animationName: "fadeInUp",
				animationFillMode: "forwards",
				animationDuration: `${animationDuration}s`,
				animationDelay: `${index * delayBetweenWords}s`,
			};
			return (
				<span key={index} className="word" style={style}>
					{word}&nbsp;
				</span>
			);
		})
	) : (
		<></>
	);

	return <p ref={containerRef}>{words}</p>;
};

export default WordByWordAnimation;
