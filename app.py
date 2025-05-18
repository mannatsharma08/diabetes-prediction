import joblib
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


try:
    model = joblib.load("diabetes_model.pkl")  
except FileNotFoundError as e:
    print(f"Error loading model: {e}")
    exit(1)  

@app.route("/", methods=["GET"])
def home():
    return "API is running!"




@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    try:
        features = [
            float(data["Pregnancies"]),
            float(data["Glucose"]),
            float(data["BloodPressure"]),
            float(data["SkinThickness"]),
            float(data["Insulin"]),
            float(data["BMI"]),
            float(data["DiabetesPedigreeFunction"]),
            float(data["Age"])
        ]

        features = np.array([features])
        prediction = model.predict(features)[0]

        return jsonify({
            "prediction": int(prediction),
            "result": "Diabetic" if prediction == 1 else "Non Diabetic"
        })

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)




  