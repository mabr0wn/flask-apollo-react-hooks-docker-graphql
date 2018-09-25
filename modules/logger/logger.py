""" wrapper aroung logging module """
import os
import logging


def get_root_logger(logger_name, filename=None):
    """
    :param logger_name: Return a logger with a specified name,
    name is `None`, return a logger which is the root logger
    of the heirarchy. i.e. `foo.bar.baz`
    :param filename:
    :return:
    """
    logger = logging.getLogger(logger_name)
    debug = os.environ.get('ENV', 'development') == 'development'
    logger.setLevel(logging.DEBUG if debug else logging.INFO)