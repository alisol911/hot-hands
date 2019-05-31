## Initial

### Run environment
- Ubuntu 19.04
- Python 3.7.3
- Visual Studio Code 1.34.0
- Heroku
- Yarn
- NPM

### Prepare Heroku
$ sudo snap install heroku --classic
$ heroku login

Install Javascript dependencies:

```
yarn install
```

Setup python environment and install dependencies:

```
virtualenv -ppython3 venv

source venv/bin/activate

pip install -r requirements.txt
```

### test backend
```
$ cd server
```

### Heroku tips
create app
$ heroku create hot-hands --buildpack heroku/python

add build pack
$ heroku buildpacks:add --index 1 heroku/nodejs --app=hot-hands

add heroku repository
$ heroku git:remote -a hot-hands

force build without change
$ git commit --amend -C HEAD
$ git push heroku -f

