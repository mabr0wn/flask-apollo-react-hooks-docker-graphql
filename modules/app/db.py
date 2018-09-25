import sqlite3

import click
from flask import current_app, g
from flask.cli import with_appcontext

def get_db():
    """
    :g is a special object that is unique for each request. It is used
    to store data that might be accessible to multiple functions during
    a request.  The connection is stored and reused instead of creating
    a new connection if `get_db()` is called a second time in the same
    request.
    :current_app a proxy to the Flask application handling the current request,
    it's useful to access the app without needing to import i.e. schema.sql
    :return: g.db
    """
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db

def close_db(e=None):
    """
    close_db() checks if the connection was created by checking if `g.db` was set
    if
    :param e:
    :return:
    """
    db = g.pop('db', None)

    if db is not None:
        db.close()

def init_db():
    """

    :return:
    """
    db = get_db()

    with current_app.open_resource('schema.sql') as f:
        db.executescript(f.read().decode('utf8'))

@click.command('init-db')
@with_appcontext
def init_db_command():
    """Clear the existing data and create new tables"""
    init_db()
    click.echo('Initialized the database.')

# register the app
def init_app(app):
    """

    :param app:
    :return:
    """
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)