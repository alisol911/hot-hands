from flask import json

def check_result(r):
    return r == b'{"result":"Rock"}\n' or r == b'{"result":"Scissors"}\n' or r == b'{"result":"Paper"}\n'

def test_api_throw_1(client):
    response = client.get('/api/throw')
    assert check_result(response.data)

def test_api_throw_2(client):
    response = client.get('/api/throw')
    assert check_result(response.data)

def test_api_throw_3(client):
    response = client.get('/api/throw')
    assert check_result(response.data)

def test_api_throw_4(client):
    response = client.get('/api/throw')
    assert check_result(response.data)

def test_api_throw_5(client):
    response = client.get('/api/throw')
    assert check_result(response.data)

def test_api_throw_6(client):
    response = client.get('/api/throw')
    assert check_result(response.data)

def test_api_throw_7(client):
    response = client.get('/api/throw')
    assert check_result(response.data)

def test_api_judge_1(client):
    response = client.post('/api/judge',
        data=json.dumps({'hand1': 'Rock', 'hand2': 'Scissors'}),
        content_type='application/json')
    assert response.data == b'{"result":"Player1"}\n'

def test_api_judge_2(client):
    response = client.post('/api/judge',
        data=json.dumps({'hand1': 'Rock', 'hand2': 'Rock'}),
        content_type='application/json')
    assert response.data == b'{"result":"Draw"}\n'

def test_api_judge_3(client):
    response = client.post('/api/judge',
        data=json.dumps({'hand1': 'Paper', 'hand2': 'Scissors'}),
        content_type='application/json')
    assert response.data == b'{"result":"Player2"}\n'

def test_api_judge_4(client):
    response = client.post('/api/judge',
        data=json.dumps({'hand1': 'Nothing', 'hand2': 'Scissors'}),
        content_type='application/json')
    assert response.data == b'{"result":"Player2"}\n'

def test_api_judge_5(client):
    response = client.post('/api/judge',
        data=json.dumps({'hand11': 'Rock', 'hand2': 'Scissors'}),
        content_type='application/json')
    assert response.data == b'Invalid input'

def test_api_judge_6(client):
    response = client.post('/api/judge',
        data={})
    assert response.data == b'Invalid input'
