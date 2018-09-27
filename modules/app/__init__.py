# Python imports
import os
import json
import datetime
# PIP imports
from bson.objectid import ObjectId
from flask import Flask
from flask_pymongo import PyMongo
# Local imports
#from app.controllers import *

class JSONEncoder(json.JSONEncoder):

    def default(self, o):
        """
        :Extend the json-encoder class to support `ObjectId` & `datetime`
        data types used to store `_id` & `time-stamp` as a group in MongoDB.
        All the responses need to be converted into json string, to enable the cross-platform
        data interpretation.  We convert the `ObjectId` & `datetime` to a `string`.
        :param o: calling to the object
        :return: in string format.
        """
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, datetime.datetime):
            return str(o)
        return json.JSONEncoder.default(self, o)

from sentry_sdk import configure_scope
with configure_scope() as scope:
    scope.user = {"email": "mattd429@gmail.com"}

from raven.contrib.flask import Sentry
sentry = Sentry(dsn='https://191dbfc870984eba879f4f2ed9717902@sentry.io/1289031')

def create_app(test_config=None):
    """
    :create_app Application factory function which creates another object
    i.e. blog, username, and comment.
    :param test_config: can be passed to the factory, will use this in testing.
    this will seperate itself from any deployment values you have in 'config.py'
    :return Flask app and it will simple teardown and initialize the db.
    ===========================================================================
    :instance_relative_config tells the app that configuration files are relative to
    the instance folder. This is located outside the app package and can hold local
    data that shouldn't be committed to version control, such as configuration secrets
    and database files.
    :from_mapping() set defaults that the app will use.
    :from_pyfile() overrides the values in the config from a Python file, an example
    would be deploying would set the SECRET_KEY to a real one.
    """
    app = Flask(__name__, instance_relative_config=True)
    sentry.init_app(app)

    ''' Add mongo url to flask config, this allows flask_pymongo to make the connection. 
        The mongo object returns can be used in all the routes
    '''
    #app.config['MONGO_URI'] = os.environ.get('DB')
    #mongo = PyMongo(app)

    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    from . import db
    db.init_app(app)

    ''' modify the default json-encoder with our customer json class extender. '''
    app.json_encoder = JSONEncoder

    return app

