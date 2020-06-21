import logging.config
import sys
from ansible.module_utils.basic import AnsibleModule
import datetime

from ansible_collections.ibm.isam.plugins.module_utils.isam import ISAMUtil

logger = logging.getLogger(sys.argv[0])


def main():
    module = AnsibleModule(
        argument_spec=dict(
            log=dict(required=False, default='INFO', choices=['DEBUG', 'INFO', 'ERROR', 'CRITICAL']),
            isamuser=dict(required=False),
            isampwd=dict(required=True, no_log=True),
            isamdomain=dict(required=False, default='Default'),
            commands=dict(required=True, type='list')
        ),
        supports_check_mode=False
    )

    module.debug('Started isam admin module')

    # Process all Arguments
    isamuser = module.params['isamuser']
    isampwd = module.params['isampwd']
    isamdomain = module.params['isamdomain']
    commands = module.params['commands']

    isam_util = ISAMUtil(module)

    # Execute isam admin commands (pdadmin)
    startd = datetime.datetime.now()

    ret_obj = isam_util.connection.call_isam_admin(isamdomain, isamuser, isampwd, commands)

    endd = datetime.datetime.now()
    delta = endd - startd

    ret_obj['stdout'] = isam_util.strlog.getvalue()
    ret_obj['stdout_lines'] = isam_util.strlog.getvalue().split('\n')
    ret_obj['start'] = str(startd)
    ret_obj['end'] = str(endd)
    ret_obj['delta'] = str(delta)
    ret_obj['cmd'] = "pdadmin execution using Domain: {}, User: {} and Commands: {}".format(isamdomain, isamuser,
                                                                                            commands)

    module.exit_json(**ret_obj)


if __name__ == '__main__':
    main()
