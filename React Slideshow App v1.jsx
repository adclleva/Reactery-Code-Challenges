/*
Slideshow App:
- Takes slides array prop with each slide as: { title (STRING), text (STRING) }.
- Initially, render the first slide.
- Buttons:
  - "Next": Shows next slide, disabled if current slide is the last.
  - "Prev": Shows previous slide, disabled if current slide is the first.
  - "Restart": Returns to the first slide, disabled if current slide is the first.
- Minimum one slide in slides array.
- Data-testid attributes:
  - "button-restart", "button-prev", "button-next" for respective buttons.
  - Slide title: "title", Slide text: "text".
Note: Don't alter provided data-testid attributes.
*/

import React, { useState } from "react";

function Slides({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleRestart = () => {
    setCurrentSlide(0);
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((slide) => slide - 1);
    }
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((slide) => slide + 1);
    }
  };

  return (
    <div>
      <div id="navigation" className="text-center">
        <button
          data-testid="button-restart"
          className="small outlined"
          disabled={currentSlide === 0}
          onClick={handleRestart}
        >
          Restart
        </button>
        <button data-testid="button-prev" className="small" disabled={currentSlide === 0} onClick={handlePrev}>
          Prev
        </button>
        <button
          data-testid="button-next"
          className="small"
          disabled={currentSlide === slides.length - 1}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
      <div id="slide" className="card text-center">
        <h1 data-testid="title">{slides[currentSlide]?.title}</h1>
        <p data-testid="text">{slides[currentSlide]?.text}</p>
      </div>
    </div>
  );
}

export default Slides;
