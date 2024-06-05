import {useState, useEffect} from 'react';
import '../css/ScrollDownIndicator.css'; // Import the CSS file you created

const ScrollDownIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    let timeoutId = null;

    const handleScroll = () => {
      // If there's a timer, cancel it to start fresh
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Immediately hide the component on scroll
      setIsVisible(false);

      // Set a timeout to show the component after 150 milliseconds of inactivity
      timeoutId = setTimeout(() => {
        setIsVisible(true);
      }, 150);
    };

    // Add the event listener
    window.addEventListener('scroll', handleScroll);

    return () => {
      // Remove event listener on component unmount
      window.removeEventListener('scroll', handleScroll);
      // Clear the timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);
  const scrollToContent = () => {
    // Smooth scroll by a certain amount, or to a specific element
    window.scrollBy({
      top: window.innerHeight, // Adjust this value if you want to scroll a different amount
      behavior: 'smooth',
    });
  };

  return (
    <div className="scroll-down-indicator" onClick={scrollToContent} style={{ display: isVisible ? 'block' : 'none' }}></div>
  );
};

export default ScrollDownIndicator;
