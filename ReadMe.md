## Hot Hands

### Run environment
- Ubuntu 19.04
- Python 3.7.3
- Visual Studio Code 1.34.0
- Heroku
- Yarn
- NPM

### Prepare Heroku

```
$ sudo snap install heroku --classic
$ heroku login
```

Setup Javascript dependencies:

```
$ yarn install
```

Setup python environment and install dependencies:

```
$ sudo apt install python3-venv
$ python3 -m venv venv
$ source venv/bin/activate
$ pip install -e .
$ pip install '.[test]'
$ pip install -r requirements.txt
```

Run locally

```
$ npm run build:dist
$ heroku local web
$ curl http://localhost:5000/api/throw
```

Debug server

```
$ export FLASK_APP=server
$ export FLASK_ENV=development
$ flask run

$ python -m pytest tests

```

Test
```
$ pip install -e .
$ pytest
$ coverage run -m pytest
$ coverage report
$ coverage html  # open htmlcov/index.html in a browser
```
### test backend
```
$ make test
```

### Heroku tips
create app
```
$ heroku create hot-hands --buildpack heroku/python
```
add build pack
```
$ heroku buildpacks:add --index 1 heroku/nodejs --app=hot-hands
```

add heroku to existing git repository
```
$ heroku git:remote -a hot-hands
```

force build without change
```
$ git commit --amend -C HEAD
$ git push heroku -f
```