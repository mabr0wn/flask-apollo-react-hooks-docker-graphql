# Python imports
import os
import sys
# Flask
from flask import jsonify, make_response, send_from_directory
from flask_graphql import GraphQLView
from flask_cors import CORS
# Local
from modules import logger
from modules.app import create_app
from modules.app.database import db_session, init_db
from modules.app.schema import Schema

app = create_app()
app.debug = True

default_query = '''
{
    allUsers {
        edges {
            node {
                id,
                username,
                blog {
                    id,
                    title,
                    body
                },
                role {
                    id,
                    name
                }
            }
        }
    }
}
'''.strip()


"""
:ROOT_PATH : Set root path
:PUBLIC_PATH : Always for joining react public index.html to ROOT_PATH
"""
ROOT_PATH = os.path.dirname(os.path.realpath(__file__))
os.environ.update({'ROOT_PATH': ROOT_PATH})
PUBLIC_PATH = os.path.join(ROOT_PATH, 'modules', 'client', 'public')

''' Set the view for Graphiql '''
view_func = GraphQLView.as_view(
    'graphql', schema=Schema, graphiql=True)

""" logger object to output info and debug information """
LOG = logger.get_root_logger(os.environ.get(
    'ROOT_LOGGER', 'root'), filename=os.path.join(ROOT_PATH, 'output.log'))

PORT = os.environ.get('PORT')

app.add_url_rule('/graphql', view_func=view_func)

""" Sets routes for Flask """
@app.errorhandler(404)
def not_found(error):
    """ error handler """
    LOG.error(error)
    return make_response(jsonify({'error': 'Not Found'}), 404)

@app.route('/')
def index():
    """ serve index.html """
    return send_from_directory(PUBLIC_PATH, 'index.html')

@app.route('/login')
def login():
    """ serve index.html """
    return send_from_directory(PUBLIC_PATH, 'index.html')

@app.route('/<path:path>')
def static_proxy(path):
    """
    static folder serve
    :param path: to load all static files in `public`
    :return: the directory `public` with filename i.e. 404.html
    """
    file_name = path.split('/')[-1]
    dir_name = os.path.join(PUBLIC_PATH, '/'.join(path.split('/')[:-1]))
    return send_from_directory(dir_name, file_name)

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

if __name__ == "__main__":
    CORS(app, resources={r'/graphql': {'origins': '*'}})
    LOG.info('running environment: {}'.format(os.environ.get('ENV')))
    app.config['DEBUG'] = os.environ.get('ENV') == 'development'
    app.run(host='0.0.0.0', port=int(PORT))