from flask import Flask, send_file, jsonify, request
import requests
from flask_pymongo import PyMongo
import datetime
app = Flask(__name__)



# connect to another MongoDB database on the same host
app.config['MONGO_DBNAME'] = 'dashboard'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/dashboard'

mongo = PyMongo(app, config_prefix='MONGO')



@app.route('/')
def hello_world():
    return send_file("templates/index.html")

@app.route('/upload', methods=[ 'GET'])
def upload_file():
    params =  {
                "method": 'stats.provider.workers',
                "addr": '1DHeNm1zZVpWj4DkYeQNaPCaEKqe1qPCK6',
                "algo": 1
            }
    url = "https://api.nicehash.com/api"
    response = requests.get(url, params)
    raws_workers = response.json()['result']['workers']
    workers = []
    for w in raws_workers:
        workers.append({
            "name": w[0],
            "a_speed": w[1]['a'],
            'time_connected': w[2],
            'enabled_xnsub': w[3],
            'difficult': w[4],
            'location': w[5],
            'unknown': w[6],
            'updated_at': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        })
        mongo.db.worker.find_one_and_replace({"name": w[0]}, workers[-1], return_document=True)
        # mongo.db.worker.insert(workers[-1])

    mongo_workers = []
    for w in mongo.db.worker.find():
        w.pop('_id')
        mongo_workers.append(w)
    return jsonify(sorted(mongo_workers, key=lambda x: x['name']))

if __name__ == '__main__':
    app.run()
