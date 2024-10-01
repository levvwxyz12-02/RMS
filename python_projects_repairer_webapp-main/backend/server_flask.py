from flask import Flask, request, jsonify
from sql_connector import get_sql_connection
import json

import model_dao
import parts_dao
import repairedunit_dao

app = Flask(__name__)

# Initialize the MySQL connection
connection = get_sql_connection()

@app.route('/getModel', methods=['GET'])
def get_model():
    response = model_dao.get_all_models(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/getParts', methods=['GET'])
def get_parts():
    response = parts_dao.get_all_parts(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/insertPart', methods=['POST'])
def insert_parts():
    request_payload = json.loads(request.form['data'])
    part_id = parts_dao.insert_new_part(connection, request_payload)
    response = jsonify({
        'part_id': part_id
    })

@app.route('/getAllRepairedUnits', methods=['GET'])
def get_all_unit():
    response = repairedunit_dao.get_all_repaired_unit(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/insertRepairedUnit', methods=['POST'])
def insert_repairedunit():
    request_payload = json.loads(request.form['data'])
    unit_id = repairedunit_dao.insert_unit(connection, request_payload)
    response = jsonify({
        'unit_id': unit_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/deletePart', methods=['POST'])
def delete_part():
    return_id = parts_dao.delete_part(connection, request.form ['part_id'])
    response = jsonify({
        'part_id': return_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Repair Management System")
    app.run(port=5000,debug=True)