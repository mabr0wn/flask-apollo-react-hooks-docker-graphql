""" index file for REST APIs using Flask """
import os
import sys

from flask import jsonify, make_response, send_from_directory

""" Join Root path with `flaskr` path using """
ROOT_PATH = os.path.dirname(os.path.realpath(__file__))
os.environ.update({'ROOT_PATH': ROOT_PATH})
sys.path.append(os.path.join(ROOT_PATH, 'modules'))

from modules import logger
from app import app

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
    app.config['DEBUG'] = os.environ.get('ENV') == 'development' # allow debug in dev
    app.run(host='127.0.0.1', port=int(PORT))