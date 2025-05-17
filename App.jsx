




import React, { useState } from "react";
import axios from "axios";

import "./App.css";

const App = () => {
  const [form, setForm] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/predict", form);
      setResult(res.data.result);
    } catch (err) {
      console.error(err);
      setResult("Error predicting");
    }
  };

  return (
    <div className="app-container">
      {" "}
      <nav className="navbar">Diabetes Prediction</nav>
      <div className="main-content">
        <div className="form-container">
          <h2 className="title">Diabetes Predictor</h2>
          <div className="form-grid">
            {Object.keys(form).map((key) => (
              <div key={key} className="form-group">
                <label className="form-label">{key}</label>
                <input
                  type="number"
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            ))}
          </div>
          <button onClick={handleSubmit} className="submit-btn">
            Predict
          </button>
          {result && <div className="result">{result}</div>}
        </div>
      </div>
      <footer className="footer">
        <marquee>
          {" "}
          <p>&copy; 2025 Diabetes Prediction Project</p>
        </marquee>
      </footer>
    </div>
  );
};

export default App;
