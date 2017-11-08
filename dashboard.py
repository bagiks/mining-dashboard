from flask import Flask, send_file, jsonify, request
import requests
from flask_pymongo import PyMongo
import datetime

from rq import Queue
from rq.job import Job
from worker import conn

app = Flask(__name__)


q = Queue(connection=conn)



# connect to another MongoDB database on the same host
app.config['MONGO_DBNAME'] = 'dashboard'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/dashboard'

mongo = PyMongo(app, config_prefix='MONGO')





@app.route('/addUser', methods=[ 'GET', 'POST'])
def add_user():
    if request.method == 'POST':
        mongo.db.user.insert({"user": request.args.get('user')})
        return jsonify({'user': request.args.get('user')})

@app.route('/getUsers', methods=[ 'GET'])
def get_all_users():
    users = get_users_db()
    return jsonify(users)


def get_users_db():
    users = []
    for user in mongo.db.user.find({}):
        user.pop('_id')
        users.append(user)
    return users


def test_redis():
    print("rediswork")


@app.route('/')
def hello_world():
    # job = q.enqueue_call(
    #     func=test_redis,args=(), result_ttl=5000
    # )
    # print(job.get_id())

    return send_file("templates/index.html")

@app.route('/upload', methods=[ 'GET'])
def upload_file():
    reload_one_user('1DHeNm1zZVpWj4DkYeQNaPCaEKqe1qPCK6')

    mongo_workers = []
    for w in mongo.db.worker.find():
        w.pop('_id')
        mongo_workers.append(w)
    return jsonify(sorted(mongo_workers, key=lambda x: x['name']))


def reload_one_user(address):
    params = {
        "method": 'stats.provider.workers',
        "addr": address,
        "algo": 1
    }
    url = "https://api.nicehash.com/api"
    response = requests.get(url, params)
    raws_workers = response.json()['result']['workers']
    workers = []
    for w in raws_workers:
        workers.append({
            "name": w[0],
            "a_speed": w[1],
            'time_connected': w[2],
            'enabled_xnsub': w[3],
            'difficult': w[4],
            'location': w[5],
            'unknown': w[6],
            'updated_at': int(datetime.datetime.now().timestamp() * 1000)  # .strftime('%Y-%m-%d %H:%M:%S')
        })
        mongo.db.worker.find_one_and_replace({"name": w[0]}, workers[-1], return_document=True)
        # mongo.db.worker.insert(workers[-1])


def reload_data():
    users = get_users_db()
    for u in users:
        reload_one_user(u['address'])


if __name__ == '__main__':
    app.run()
