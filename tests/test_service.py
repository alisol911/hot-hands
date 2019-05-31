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
