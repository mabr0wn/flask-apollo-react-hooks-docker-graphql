# FullStack: Flask + React + Docker + AWS
[Flask](http://flask.pocoo.org/) is a very powerful framework. You can build a vast variety of systems from a very basic web application to a large platform using flask. [React](https://reactjs.org) is a very popular, easy to use & very powerful front-end development JavaScript library. [Docker](https://www.docker.com/) is an open platform for developers and system administrators to build, ship, and run distributed applications, whether on laptops, data centre VMs, or the cloud. [AWS](https://aws.amazon.com/) Amazon Web Services (AWS) is a secure [cloud](https://aws.amazon.com/what-is-cloud-computing/) services platform, offering compute power, database storage, content delivery and other functionality to help businesses scale and grow. Explore how millions of [customers](https://aws.amazon.com/solutions/case-studies/) are currently leveraging AWS cloud [products](https://aws.amazon.com/products/) and [solutions](https://aws.amazon.com/solutions/) to build sophisticated applications with increased flexibility, scalability and reliability.

## IDE Setup

It's good practice to use a IDE that works with your current environment, below I set this project up using [PyCharm](https://www.jetbrains.com/pycharm/), but could easily use [VSCode](https://code.visualstudio.com/).  I chose this since we are using Python's Flask microframework as our backend.  You can choose anything that work's for you.

---

Below is the directory structure, you can follow this structure or create your own.

> **NOTE**: this is just an example of how to start your project structure, keep in mind this will change overtime.  Once this project is complete I will add the final stack image below and remove this note.

![alt text](https://i.imgur.com/Zr3ufcq.png)

- **instance** - This is located outside the app package and can hold local
    data that shouldn't be committed to version control, such as configuration secrets
    and database files.
- **app.py**: This is the entry point for the Flask web-server
- **venv**: This is to setup your virtual environment in Python, it seperates itself from the OS build.
- **requirements.txt**: Will install any Python Packages you will need for your app to run properly.
- **Dockerfile**: Dockerfile to build the docker containers.
- **docker-compose.yml & docker-compose.prod.yml**: Configuration for both development & production.
- **modules**: The directory that will contain all the modules, i.e. app, logger, etc.
- **app**: The main directory for the web server, where we build Flask.
- **dist**: Where React and other static files will serve.
- **logger**: Log errors and info into `output.log`.


Start by creating `__init__.py` in your "app" module.
> **NOTE**: This project will be setup with Sentry(error checking), define a factory function(which creates another object).  The project will have other configurations added in the final package, but here I will add the default layout below. 
```python
import os

from Flask import flask
from sentry_sdk import configured_scope
with configure_scope() as scope:
    scope.user = {"email": "youremail@email.com"}
    
""" use raven to import Sentry """
from raven.contrib.flask import Sentry
sentry = Sentry(dsn='YOUR_DSN_HERE')

def create_app():
    app = Flask(__name__)
    sentry.init_app(app)
    ...
    return app
```
`modules/app/__init__.py`

- This will create the app object of Flask.

**[Sentry](https://sentry.io/welcome/)** is Open-source error tracking that helps developers monitor and fix crashes in real time. Iterate continuously. Boost efficiency. Improve user experience.  When you sign up for Sentry you will be provided with a dsn(data source name).  please visit the link above for more details.

Next create your `app.py` which will execute the Flask server using REST APIs calls.

```python
import os
import sys

from flask import jsonify, make_response, send_from_directory

ROOT_PATH = os.path.dirname(os.path.realpath(__file__))
os.environ.update({'ROOT_PATH': ROOT_PATH})
sys.path.append(os.path.join(ROOT_PATH, 'modules'))

import logger
from app import app

""" logger object to output info and debug information """
LOG = logger.get_root_logger(os.environ.get(
    'ROOT_LOGGER', 'root'), filename=os.path.join(ROOT_PATH, 'output.log'))

PORT = os.environ.get('PORT')

@app.errorhandler(404)
def not_found(error):
    """ error handler """
    LOG.error(error)
    return make_response(jsonify({'error': 'Not Found'}), 404)

@app.route('/')
def index():
    """ serve index.html """
    return send_from_directory('dist', 'index.html')

@app.route('/<path:path>')
def static_proxy(path):
    """
    static folder serve
    :param path: to load all static files in `dist`
    :return: the directory `dist` with filename i.e. 404.html
    """
    file_name = path.split('/')[-1]
    dir_name = os.path.join('dist', '/'.join(path.split('/')[:-1]))
    return send_from_directory(dir_name, file_name)

if __name__ == "__main__":
    LOG.info('running environment: {}'.format(os.environ.get('ENV')))
    app.config['DEBUG'] = os.environ.get('ENV') == 'development'
    app.run(host='0.0.0.0', port=int(PORT))
```    

`ROOT_PATH` actually adds "modules" directory in sys, that way we can directly import every modules from that direcotry.  For **PORT** and **ENV** we will define those in our `docker-compose.yml` file. We have define 3 default routes, one for `index.html`, another for **error handling**, and one more to serve all static files in `dist` directory.

If you want to use logger for debugging, info, and warnings below is a basic setup of logger to and `output.log` file.

 - Add to `modules/logger/__init__.py`
 
`from . logger import *`

```python
import os
import logging


def get_root_logger(logger_name, filename=None):
    logger = logging.getLogger(logger_name)
    debug = os.environ.get('ENV', 'development') == 'development'
    logger.setLevel(logging.DEBUG if debug else logging.INFO)

    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s')

    ch = logging.StreamHandler()
    ch.setFormatter(formatter)
    logger.addHandler(ch)

    if filename:
        fh = logging.FileHandler(filename)
        fh.setFormatter(formatter)
        logger.addHandler(fh)

    return logger

def get_child_logger(root_logger, name):
    return logging.getLogger('.'.join([root_logger, name]))
```

This `logger.py` in the simpliest form will format a nice string format of your log message to your `output.log` file your will create in your root directory.

> **NOTE**: Please make sure to add all required packages to you `requirements.txt`

```
Flask
requests
raven[flask]
sentry-sdk==0.3.5
```

#### Setup Dockerfile:

```
FROM python:3.5
ADD . /app
WORKDIR /app
EXPOSE 4000
RUN pip install -r requirements.txt
ENTRYPOINT ["python","app.py"]
```

#### Setup docker-compose.yml

```
services:
 web:
  build: .
  ports:
   - "4000:4000"
  volumes:
   - .:/app
  environment:
   - ENV=development
   - PORT=4000
   - DB=mongodb://mongodb:27017/dev

networks:
 default:
  name: web
```

After that create some html files in your dist directory i.e. *react*.  Now your have a bare minimum application with flask server and docker deployment.  Run the following command below:

` $ docker-compose up --build`

Your output should look something like this:

![alt text](https://i.imgur.com/dlJwcc7.png)

Access [localhost](http://localhost:4000/) in your browser, and you will see the `index.html` loaded.
