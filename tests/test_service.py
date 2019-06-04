from flask import json

def check_result(r):
    return r == b'{"result":"Rock"}\n' or \
        r == b'{"result":"Scissors"}\n' or \
        r == b'{"result":"Paper"}\n' or \
        r == b'{"result":"Spock"}\n' or \
        r == b'{"result":"Lizard"}\n'

def test_api_throw_1(client):
    response = client.get('/api/hand/throw')
    assert check_result(response.data)

def test_api_throw_2(client):
    response = client.get('/api/hand/throw')
    assert check_result(response.data)

def test_api_throw_3(client):
    response = client.get('/api/hand/throw')
    assert check_result(response.data)

def test_api_throw_4(client):
    response = client.get('/api/hand/throw')
    assert check_result(response.data)

def test_api_throw_5(client):
    response = client.get('/api/hand/throw')
    assert check_result(response.data)

def test_api_throw_6(client):
    response = client.get('/api/hand/throw')
    assert check_result(response.data)

def test_api_throw_7(client):
    response = client.get('/api/hand/throw')
    assert check_result(response.data)

def test_api_judge_1(client):
    response = client.post('/api/hand/judge',
        data=json.dumps({'hand1': 'Rock', 'hand2': 'Scissors'}),
        content_type='application/json')
    assert response.data == b'{"result":"Player1"}\n'

def test_api_judge_2(client):
    response = client.post('/api/hand/judge',
        data=json.dumps({'hand1': 'Rock', 'hand2': 'Rock'}),
        content_type='application/json')
    assert response.data == b'{"result":"Draw"}\n'

def test_api_judge_3(client):
    response = client.post('/api/hand/judge',
        data=json.dumps({'hand1': 'Paper', 'hand2': 'Scissors'}),
        content_type='application/json')
    assert response.data == b'{"result":"Player2"}\n'

def test_api_judge_4(client):
    response = client.post('/api/hand/judge',
        data=json.dumps({'hand1': 'Nothing', 'hand2': 'Scissors'}),
        content_type='application/json')
    assert response.data == b'{"result":"Player2"}\n'

def test_api_judge_5(client):
    response = client.post('/api/hand/judge',
        data=json.dumps({'hand11': 'Rock', 'hand2': 'Scissors'}),
        content_type='application/json')
    assert response.data == b'Invalid input'

def test_api_judge_6(client):
    response = client.post('/api/hand/judge',
        data=json.dumps({'hand1': 'Spock', 'hand2': 'Scissors'}),
        content_type='application/json')
    assert response.data == b'{"result":"Player1"}\n'

def test_api_judge_7(client):
    response = client.post('/api/hand/judge',
        data=json.dumps({'hand1': 'Lizard', 'hand2': 'Rock'}),
        content_type='application/json')
    assert response.data == b'{"result":"Player2"}\n'

def test_api_judge_8(client):
    response = client.post('/api/hand/judge',
        data=json.dumps({'hand1': 'Spock', 'hand2': 'Paper'}),
        content_type='application/json')
    assert response.data == b'{"result":"Player2"}\n'

def test_api_judge_9(client):
    response = client.post('/api/hand/judge',
        data=json.dumps({'hand1': 'Scissors', 'hand2': 'Lizard'}),
        content_type='application/json')
    assert response.data == b'{"result":"Player1"}\n'
