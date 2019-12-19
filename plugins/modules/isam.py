#!/usr/bin/python

import logging
import logging.config
import sys
import importlib
from ansible.module_utils.basic import AnsibleModule
from io import StringIO
import datetime

from ansible_collections.ibm.isam.plugins.module_utils.isam import ISAMUtil
from ibmsecurity.appliance.ibmappliance import IBMError

logger = logging.getLogger(sys.argv[0])
try:
    basestring
except NameError:
    basestring = (str, bytes)


def main():
    module = AnsibleModule(
        argument_spec=dict(
            log=dict(required=False, default='INFO', choices=['DEBUG', 'INFO', 'ERROR', 'CRITICAL']),
            appliance=dict(required=True),
            lmi_port=dict(required=False, default=443, type='int'),
            action=dict(required=True),
            force=dict(required=False, default=False, type='bool'),
            username=dict(required=False),
            password=dict(required=True, no_log=True),
            isamapi=dict(required=False, type='dict'),
            adminProxyProtocol=dict(required=False, default='https', choices=['http','https']),
            adminProxyHostname=dict(required=False),
            adminProxyPort=dict(required=False, default=443, type='int'),
            adminProxyApplianceShortName=dict(required=False, default=False, type='bool'),
            omitAdminProxy=dict(required=False, default=False, type='bool')
        ),
        supports_check_mode=True
    )

    module.debug('Started isam module')

    # Process all Arguments
    force = module.params['force']
    action = module.params['action']

    isam_util = ISAMUtil(module)

    # Create options string to pass to action method
    ## NOTE: self.isam_server is inherited from the connection plugin
    options = 'isamAppliance=self.isam_server, force=' + str(force)
    if module.check_mode is True:
        options = options + ', check_mode=True'
    if isinstance(module.params['isamapi'], dict):
        for key, value in module.params['isamapi'].items():
            if isinstance(value, basestring):
                options = options + ', ' + key + '="' + value + '"'
            else:
                options = options + ', ' + key + '=' + str(value)
    module.debug('Option to be passed to action: ' + options)

    # Dynamically process the action to be invoked
    # Simple check to restrict calls to just "isam" ones for safety
    if action.startswith('ibmsecurity.isam.'):
#       try:

        startd = datetime.datetime.now()

        # Execute requested 'action'
        ret_obj = isam_util.connection.call_isam_action(action, options)

        endd = datetime.datetime.now()
        delta = endd - startd

        ret_obj['stdout'] = isam_util.strlog.getvalue()
        ret_obj['stdout_lines'] = isam_util.strlog.getvalue().split('\n')
        ret_obj['start'] = str(startd)
        ret_obj['end'] = str(endd)
        ret_obj['delta'] = str(delta)
        ret_obj['cmd'] = action + "(" + options + ")"

        module.exit_json(**ret_obj)

    else:
        module.fail_json(name=action, msg='Error> invalid action specified, needs to be isam!',
                         log=isam_util.strlog.getvalue())


if __name__ == '__main__':
    main()
