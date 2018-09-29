# Python imports
import os
import json
import datetime
# PIP imports
from flask import Flask
# Sentry
import sentry_sdk
from sentry_sdk import configure_scope
with configure_scope() as scope:
    scope.user = {"email": "mattd429@gmail.com"}
from raven.contrib.flask import Sentry
sentry = Sentry(dsn='https://191dbfc870984eba879f4f2ed9717902@sentry.io/1289031')
sentry_sdk.init(release="flask-react-docker@0.0.1")

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
    app.debug = True
    sentry.init_app(app)
    app.config.from_mapping(SECRET_KEY='dev')

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

    return app

