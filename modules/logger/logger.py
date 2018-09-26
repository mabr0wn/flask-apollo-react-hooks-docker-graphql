""" wrapper aroung logging module """
import os
import logging


def get_root_logger(logger_name, filename=None):
    """
    :param logger_name: Return a logger with a specified name,
    name is `None`, return a logger which is the root logger
    of the heirarchy. i.e. `foo.bar.baz`
    :param filename: the current output file with logger information
    :return: logger name
    """
    logger = logging.getLogger(logger_name)
    debug = os.environ.get('ENV', 'development') == 'development'
    logger.setLevel(logging.DEBUG if debug else logging.INFO)

    """
    :logging.Formatter() creates a new class instance, the instance 
    is initialized with a format string for the message as a whole,
    as well as for date/time portion of the message.
    :`(asctime)` tuple coverts date/time to a string
    :`logging.StreamHanlder()` handles the output of logging messages
    sys.stdout --  If stream is specified, the instance will use it for logging output; otherwise, sys.stderr will be used
    """
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