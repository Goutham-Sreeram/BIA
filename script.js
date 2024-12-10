document.addEventListener("DOMContentLoaded", function () {
    // Example inputs (replace these with actual user inputs)
    const weight = 70; // in kg
    const height = 1.75; // in meters
    const impedance = 500; // electrical impedance
    const age = 30; // in years
    const gender = 'M'; // 'M' or 'F'
  
    // Calculate values
    const bmi = calculateBMI(weight, height);
    const bodyFatPercentage = gender === 'M' 
      ? calculateBodyFatPercentageMale(weight, impedance) 
      : calculateBodyFatPercentageFemale(weight, impedance);
    const ffm = calculateFFM(weight, bodyFatPercentage);
    const tbw = calculateTBW(weight, height, impedance, gender);
    const bmr = calculateBMR(weight, height, age, gender);
  
    // Populate the dashboard
    document.getElementById('bmiValue').textContent = bmi.toFixed(2);
    document.getElementById('fatPercentage').textContent = `${bodyFatPercentage.toFixed(2)}%`;
    document.getElementById('ffmValue').textContent = `${ffm.toFixed(2)} kg`;
    document.getElementById('tbwValue').textContent = `${tbw.toFixed(2)} kg`;
    document.getElementById('bmrValue').textContent = `${bmr.toFixed(2)} kcal/day`;
  });
  
  // Functions
  function calculateBMI(weight, height) {
    return weight / (height * height);
  }
  
  function calculateBodyFatPercentageMale(weight, impedance) {
    const bfMass = -10.463 + (0.671 * weight) - (0.184385 * impedance);
    return (bfMass / weight) * 100;
  }
  
  function calculateBodyFatPercentageFemale(weight, impedance) {
    const bfMass = -9.411 + (0.518 * weight) - (0.206987 * impedance);
    return (bfMass / weight) * 100;
  }
  
  function calculateFFM(weight, bodyFatPercentage) {
    return weight * (1 - (bodyFatPercentage / 100));
  }
  
  function calculateTBW(weight, height, impedance, gender) {
    const factor = gender === 'M' ? 0.155 : 0.245;
    return (2.447 - (0.09156 * impedance) + (0.1074 * height)) * weight * factor;
  }
  
  function calculateBMR(weight, height, age, gender) {
    if (gender === 'M') {
      return (10 * weight) + (6.25 * height * 100) - (5 * age) + 5;
    } else {
      return (10 * weight) + (6.25 * height * 100) - (5 * age) - 161;
    }
  }
  