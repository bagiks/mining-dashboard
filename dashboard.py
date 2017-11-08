from flask import Flask, send_file, jsonify, request
import requests

app = Flask(__name__)


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
            'unknown': w[6]

        })
    return jsonify(workers)

if __name__ == '__main__':
    app.run()
