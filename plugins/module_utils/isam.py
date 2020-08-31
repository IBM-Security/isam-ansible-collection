#!/usr/bin/python

from __future__ import (absolute_import, division, print_function)
__metaclass__ = type
import logging
import logging.config
from io import StringIO

from ansible.module_utils.connection import Connection


class ISAMUtil(object):

    def __init__(self, module):
        # Setup logging for format, set log level and redirect to string
        self.strlog = StringIO()
        self.module = module
        self.connection = Connection(self.module._socket_path)

        DEFAULT_LOGGING = {
            'version': 1,
            'disable_existing_loggers': False,
            'formatters': {
                'standard': {
                    'format': '[%(asctime)s] [PID:%(process)d TID:%(thread)d] [%(levelname)s] [%(name)s] [%(funcName)s():%(lineno)s] %(message)s'
                },
            },
            'handlers': {
                'default': {
                    'level': self.module.params['log'],
                    'formatter': 'standard',
                    'class': 'logging.StreamHandler',
                    'stream': self.strlog
                },
            },
            'loggers': {
                '': {
                    'handlers': ['default'],
                    'level': self.module.params['log'],
                    'propagate': True
                },
                'requests.packages.urllib3.connectionpool': {
                    'handlers': ['default'],
                    'level': 'ERROR',
                    'propagate': True
                }
            }
        }
        logging.config.dictConfig(DEFAULT_LOGGING)
