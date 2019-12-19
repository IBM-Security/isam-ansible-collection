#!/usr/bin/python

import logging
import logging.config
import sys
import importlib
from ansible.module_utils.basic import AnsibleModule
from io import StringIO
import datetime

from ibmsecurity.appliance.isamappliance import ISAMAppliance
from ibmsecurity.appliance.isamappliance_adminproxy import ISAMApplianceAdminProxy
from ibmsecurity.user.applianceuser import ApplianceUser

from ansible.module_utils.connection import Connection, ConnectionError


logger = logging.getLogger(sys.argv[0])
try:
    basestring
except NameError:
    basestring = (str, bytes)


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


if __name__ == '__main__':
    main()

