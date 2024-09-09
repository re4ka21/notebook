import React, { useState, useEffect } from "react";

const MultipleInputs = () => {
  const [inputs, setInputs] = useState(() => {
    const savedInputs = localStorage.getItem("inputs");
    return savedInputs ? JSON.parse(savedInputs) : ["", "", "", "", "", "", ""];
  });

  const [crossedOut, setCrossedOut] = useState(() => {
    const savedCrossedOut = localStorage.getItem("crossedOut");
    return savedCrossedOut
      ? JSON.parse(savedCrossedOut)
      : Array(inputs.length).fill(false);
  });

  useEffect(() => {
    localStorage.setItem("crossedOut", JSON.stringify(crossedOut));
  }, [crossedOut]);

  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);
    localStorage.setItem("inputs", JSON.stringify(newInputs));
  };

  const handleCrossOut = (index) => {
    const newCrossedOut = [...crossedOut];
    newCrossedOut[index] = !newCrossedOut[index];
    setCrossedOut(newCrossedOut);
  };

  const clearAll = () => {
    setInputs(["", "", "", "", "", "", ""]);
    setCrossedOut(Array(inputs.length).fill(false));
    localStorage.removeItem("inputs");
    localStorage.removeItem("crossedOut");
  };

  return (
    <div className="all">
      <div className="label">
        {inputs.map((inputValue, index) => (
          <div key={index}>
            <label className="label">
              {index + 1}.{" "}
              <input
                maxLength={24}
                className="input"
                type="text"
                value={inputValue}
                onChange={(event) => handleInputChange(index, event)}
                style={{
                  textDecoration: crossedOut[index] ? "line-through" : "none",
                }}
              />
            </label>
            <button onClick={() => handleCrossOut(index)} className="riska">
              {crossedOut[index] ? "No Complete" : "Complete"}
            </button>
          </div>
        ))}
        <button onClick={clearAll} className="button">
          Clear All
        </button>
      </div>
    </div>
  );
};

export default MultipleInputs;
