// src/BMICalculator.js
import React, { useState } from "react";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [bmi, setBMI] = useState(null);
  const [bmiCategory, setBMICategory] = useState("");
  const [weightToLose, setWeightToLose] = useState(0);

  const calculateBMI = () => {
    const heightInMeters = parseInt(feet) * 0.3048 + parseInt(inches) * 0.0254;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBMI(bmiValue.toFixed(2));

    // Determine BMI category
    if (bmiValue < 18.5) {
      setBMICategory("Underweight");
      setWeightToLose(0); // No weight loss recommendation for underweight
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setBMICategory("Normal weight");
      setWeightToLose(0); // No weight loss recommendation for normal weight
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setBMICategory("Overweight");
      // Calculate weight to lose to reach BMI of 24.9 (upper range of normal weight)
      const idealWeight = 24.9 * (heightInMeters * heightInMeters);
      const weightDifference = weight - idealWeight;
      setWeightToLose(weightDifference.toFixed(2));
    } else {
      setBMICategory("Obesity");
      // Calculate weight to lose to reach BMI of 29.9 (upper range of overweight)
      const idealWeight = 29.9 * (heightInMeters * heightInMeters);
      const weightDifference = weight - idealWeight;
      setWeightToLose(weightDifference.toFixed(2));
    }
  };

  return (
    <div className="bmi-calculator">
      <h2>BMI Calculator</h2>
      <div>
        <label>Weight (kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div>
        <label>Height (ft/in):</label>
        <input
          type="number"
          value={feet}
          onChange={(e) => setFeet(e.target.value)}
          placeholder="Feet"
        />
        <input
          type="number"
          value={inches}
          onChange={(e) => setInches(e.target.value)}
          placeholder="Inches"
        />
      </div>
      <button onClick={calculateBMI}>Calculate BMI</button>
      {bmi && (
        <div className="result">
          <h3>Your BMI:</h3>
          <p>{bmi}</p>
          <h3>Category:</h3>
          <p>{bmiCategory}</p>
          {bmiCategory === "Overweight" || bmiCategory === "Obesity" ? (
            <div>
              <h3>Weight to Lose:</h3>
              <p>{weightToLose} kg</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
