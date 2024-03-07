# -*- coding: utf-8 -*-
# Copyright (c) 2022 IBM
# GNU General Public License v3.0+ (see LICENSES/GPL-3.0-or-later.txt or https://www.gnu.org/licenses/gpl-3.0.txt)
# SPDX-License-Identifier: GPL-3.0-or-later
from __future__ import (absolute_import, division, print_function)
__metaclass__ = type

DOCUMENTATION = '''
---
module: isam
short_description: This module will make calls to connection
description: This module will make calls to connection
author: Ram Sreerangam (@ram-ibm)
options:
    log:
        description:
            - level for log setting
        type: str
        required: False
        default: INFO
        choices:
            - DEBUG
            - INFO
            - ERROR
            - CRITICAL
    force:
        description:
            - if force is True then a call to ISAM will always happen
        type: bool
        default: False
        required: False
    action:
        description:
            - name of the ibmsecurity call
        type: str
        required: True
    isamapi:
        description: parameters to pass to the ibmsecurity call
        type: dict
        required: False
'''

EXAMPLES = '''
- name: Configure access control attributes
  ibm.isam.isam:
    log:       "{{ log_level | default(omit) }}"
    force:     "{{ force | default(omit) }}"
    action: ibmsecurity.isam.aac.attributes.get
    isamapi: "{{ item }}"
  when: item is defined
  with_items: "{{ get_access_control_attributes }}"
  register: ret_obj
'''

import logging.config
import sys
from ansible.module_utils.basic import AnsibleModule
import datetime
from ansible.module_utils.six import string_types

from ansible_collections.ibm.isam.plugins.module_utils.isam import ISAMUtil

logger = logging.getLogger(sys.argv[0])


def main():
    module = AnsibleModule(
        argument_spec=dict(
            log=dict(required=False, default='INFO', choices=['DEBUG', 'INFO', 'ERROR', 'CRITICAL']),
            action=dict(required=True),
            force=dict(required=False, default=False, type='bool'),
            isamapi=dict(required=False, type='dict')
            # adminProxyProtocol=dict(required=False, default='https', choices=['http', 'https']),
            # adminProxyHostname=dict(required=False),
            # adminProxyPort=dict(required=False, default=443, type='int'),
            # adminProxyApplianceShortName=dict(required=False, default=False, type='bool'),
            # omitAdminProxy=dict(required=False, default=False, type='bool')
        ),
        supports_check_mode=True
    )

    module.debug('Started isam module')

    # Process all Arguments
    force = module.params['force']
    action = module.params['action']

    isam_util = ISAMUtil(module)

    # Create options string to pass to action method
    # NOTE: self.isam_server is inherited from the connection plugin
    options = 'isamAppliance=self.isam_server, force=' + str(force)
    if module.check_mode is True:
        options = options + ', check_mode=True'
    if isinstance(module.params['isamapi'], dict):
        for key, value in module.params['isamapi'].items():
            if isinstance(value, string_types):
                options = options + ', ' + key + '="' + value + '"'
            else:
                options = options + ', ' + key + '=' + str(value)
    else:
        module.debug('No isamapi dict object passed.')
    module.debug('Option to be passed to action: ' + options)

    # Dynamically process the action to be invoked
    # Simple check to restrict calls to just "isam" ones for safety
    if action.startswith('ibmsecurity.isam.'):
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
