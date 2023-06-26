from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import requests

app = Flask(__name__)
CORS(app)

@app.route('/api/detect-disease', methods=['POST'])
def detect_disease():
    symptoms = request.json.get('symptoms')

    disease=['Fungal infection', 'Allergy', 'GERD', 'Chronic cholestasis',
       'Drug Reaction', 'Peptic ulcer diseae', 'AIDS', 'Diabetes ',
       'Gastroenteritis', 'Bronchial Asthma', 'Hypertension ', 'Migraine',
       'Cervical spondylosis', 'Paralysis (brain hemorrhage)', 'Jaundice',
       'Malaria', 'Chicken pox', 'Dengue', 'Typhoid', 'hepatitis A',
       'Hepatitis B', 'Hepatitis C', 'Hepatitis D', 'Hepatitis E',
       'Alcoholic hepatitis', 'Tuberculosis', 'Common Cold', 'Pneumonia',
       'Dimorphic hemmorhoids(piles)', 'Heart attack', 'Varicose veins',
       'Hypothyroidism', 'Hyperthyroidism', 'Hypoglycemia',
       'Osteoarthristis', 'Arthritis',
       '(vertigo) Paroymsal  Positional Vertigo', 'Acne',
       'Urinary tract infection', 'Psoriasis', 'Impetigo']
    
    l1=['back_pain','constipation','abdominal_pain','diarrhoea','mild_fever','yellow_urine',
    'yellowing_of_eyes','acute_liver_failure','fluid_overload','swelling_of_stomach',
    'swelled_lymph_nodes','malaise','blurred_and_distorted_vision','phlegm','throat_irritation',
    'redness_of_eyes','sinus_pressure','runny_nose','congestion','chest_pain','weakness_in_limbs',
    'fast_heart_rate','pain_during_bowel_movements','pain_in_anal_region','bloody_stool',
    'irritation_in_anus','neck_pain','dizziness','cramps','bruising','obesity','swollen_legs',
    'swollen_blood_vessels','puffy_face_and_eyes','enlarged_thyroid','brittle_nails',
    'swollen_extremeties','excessive_hunger','extra_marital_contacts','drying_and_tingling_lips',
    'slurred_speech','knee_pain','hip_joint_pain','muscle_weakness','stiff_neck','swelling_joints',
    'movement_stiffness','spinning_movements','loss_of_balance','unsteadiness',
    'weakness_of_one_body_side','loss_of_smell','bladder_discomfort','foul_smell_of urine',
    'continuous_feel_of_urine','passage_of_gases','internal_itching','toxic_look_(typhos)',
    'depression','irritability','muscle_pain','altered_sensorium','red_spots_over_body','belly_pain',
    'abnormal_menstruation','dischromic _patches','watering_from_eyes','increased_appetite','polyuria','family_history','mucoid_sputum',
    'rusty_sputum','lack_of_concentration','visual_disturbances','receiving_blood_transfusion',
    'receiving_unsterile_injections','coma','stomach_bleeding','distention_of_abdomen',
    'history_of_alcohol_consumption','fluid_overload','blood_in_sputum','prominent_veins_on_calf',
    'palpitations','painful_walking','pus_filled_pimples','blackheads','scurring','skin_peeling',
    'silver_like_dusting','small_dents_in_nails','inflammatory_nails','blister','red_sore_around_nose',
    'yellow_crust_ooze']

    model = pickle.load(open("model.pkl", "rb"))
    print("Model loaded")
    symptoms_data = pd.DataFrame(0, index=[0], columns=l1)

    for symptom in symptoms:
        if symptom in symptoms_data.columns:
            symptoms_data[symptom] = 1

    predicted_index = model.predict(symptoms_data)[0]
    predicted_disease = model.classes_[predicted_index]
    print(disease[predicted_disease])
    # disease = model.predict(symptoms)

    # predicted_disease = str(predicted_disease)
    return jsonify({'disease': disease[predicted_disease]})

@app.route('/api/hospitals', methods=['GET'])
def fetch_nearby_hospitals():
    disease = request.args.get('disease')
    latitude = request.args.get('location[latitude]')
    longitude = request.args.get('location[longitude]')

    # Make a request to the Google Maps API to fetch nearby hospitals
    url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
    params = {
        'location': f'{latitude},{longitude}',
        'radius': 10000,  # Search radius in meters
        'keyword': disease,
        'type': 'hospital',
        'key': 'AIzaSyBIt8uyKO6y5yW_7p5nxaiFvF7kDtXskrY'  # Replace with your Google Maps API key
    }
    response = requests.get(url, params=params)
    data = response.json()

    hospitals = data.get('results', [])
    return jsonify(hospitals)

if __name__ == '__main__':
    app.run(port = 5000)
