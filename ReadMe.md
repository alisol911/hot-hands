## Initial
### Run environment
* Ubuntu 19.04
* Python 3.7.3
* Visual Studio Code 1.34.0
* Heroku

### Prepare
$ sudo snap install heroku --classic
$ pip install Flask

$ heroku login

### test backend
```
$ cd server
$ FLASK_APP=hello.py flask run
```


### Heroku tips
create app
$ heroku create hot-hands --buildpack heroku/python
add build pack
$ heroku buildpacks:add --index 1 heroku/nodejs --app=hot-hands
