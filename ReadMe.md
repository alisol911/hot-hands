## Hot Hands
A simple web-based [Paper-Rock-Scissors](https://en.wikipedia.org/wiki/Rock%E2%80%93paper%E2%80%93scissors) game 

### Development environment
- Ubuntu 19.04
- Python 3.7.3
- NodeJs 10.16.0
- GIT 2.20.1
- Visual Studio Code 1.34.0
- Chromium Web Browser 74.0.3729.169

### Deployment environment
- Heroku

### Setup development environment
- Setup Javascript dependencies
```
$ npm install
```

- Setup python environment and install dependencies
```
$ sudo apt install python3-venv
$ python3 -m venv venv
$ source venv/bin/activate
$ pip install -e .
$ pip install '.[test]'
```

- Run server
```
$ npm run build:dist
$ heroku local web
```
open browser http://localhost:5000

- Run server in debug mode
```
$ source venv/bin/activate
$ export FLASK_APP=server
$ export FLASK_ENV=development
$ flask run
$ npm start
```
open browser http://localhost:9090

- Run client tests
```
$ npm test
```

- Run server tests in debug mode
```
$ python -m pytest tests
```

- Run server tests
```
$ pip install -e .
$ pytest
$ coverage run -m pytest
$ coverage report
$ coverage html  # open htmlcov/index.html in a browser
```

### Heroku tips

prepare environment
```
$ sudo snap install heroku --classic
$ heroku login
```

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
$ git push heroku master
```

force build without change
```
$ git commit --amend -C HEAD
$ git push heroku -f
```