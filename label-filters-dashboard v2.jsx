import React, { useState } from "react";
import styled from "styled-components";

const animalData = [
  { name: "Eagle", class: "Birds" },
  { name: "Penguin", class: "Birds" },
  // ... (remaining animals)
];

const LabelFilter = () => {
  const [selectedClasses, setSelectedClasses] = useState([]);

  const animalClasses = Array.from(new Set(animalData.map((animal) => animal.class)));

  const toggleClass = (animalClass) => {
    if (selectedClasses.includes(animalClass)) {
      setSelectedClasses(selectedClasses.filter((cls) => cls !== animalClass));
    } else {
      setSelectedClasses([...selectedClasses, animalClass]);
    }
  };

  const filteredAnimals = animalData.filter(
    (animal) => selectedClasses.length === 0 || selectedClasses.includes(animal.class)
  );

  return (
    <Wrapper>
      <div data-testid="labels-wrapper-id" className="label-container">
        {animalClasses.map((animalClass) => (
          <div
            data-testid="label-id"
            className={`label ${selectedClasses.includes(animalClass) ? "selected" : ""}`}
            key={animalClass}
            onClick={() => toggleClass(animalClass)}
          >
            {animalClass}
          </div>
        ))}
      </div>
      <div data-testid="tile-container-id" className="tile-container">
        {filteredAnimals.map((animal) => (
          <div data-testid="animal-tile-id" className="tile" key={animal.name}>
            {animal.name}
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default LabelFilter;

const Wrapper = styled.div`
  // ... (existing styles)

  .label.selected {
    background-color: #333;
    color: #fff;
  }
`;
