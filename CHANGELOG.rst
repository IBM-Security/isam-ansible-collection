======================
Ibm.Isam Release Notes
======================

.. contents:: Topics

v1.1.0
======

Release Summary
---------------

| Release Date: 2024-02-27
| Faster idempotent role to set junctions (only faster when the junctions already exist)
| New parameters in set_admin_cfg
| Some minor changes.

Minor Changes
-------------

- ibm.isam.delete_junction - sync from isam-ansible-roles
- ibm.isam.set_admin_cfg - add 16 parameters
- ibm.isam.web.configure_reverseproxy_junctions - use new set_all() for junctions and junction_servers from the original role (using a variable)
- isam connection plugin - add module_name to errors

New Playbooks
-------------

- ibm.isam.web.configure_reverseproxy_junctions_setall.yml - Playbook for the new role

New Roles
---------

- ibm.isam.web.configure_reverseproxy_junctions_setall - Role to use the new set_all() for junctions and servers

v1.0.29
=======

Release Summary
---------------

Possible breaking change (remove the inventory_dir dependency) - this may require you to add a homedir variable !
A number of bugfixes, and a number of new roles.

Minor Changes
-------------

- ansible-lint - add a config file
- bootstrap_local - remove dynamic=true
- connectivity_check.yml - use container environment variable, since CONTAINER_NAME is not always there
- gen_report - reorganize role
- handlers - rename all occurrences of `common_handlers` to `ibm.isam.common_handlers` (use fqcn everywhere)
- ibm.isam.add_static_route - cleanup
- ibm.isam.base.first_steps - rewrite when statement, fix ansible.legacy.uri
- ibm.isam.common_handlers - add `start_config_wait_time` default parameter
- ibm.isam.install_license - remove default variable `install_license_file`
- ibm.isam.set_rsyslog_forwarder - add format attribute
- playbooks/aac/create_authentication_policies.yml - correct accessed role
- playbooks/web/import_keytab_files - use ibm.isam.web.upload_kerberos_keytab_files
- server_facts - new community.vmware.vmware_vm_info instead of vmware_vm_facts

Breaking Changes / Porting Guide
--------------------------------

- ibm.isam.aac.configure_fido2 - introduce homedir variable instead of relying on inventory_dir (set homedir variable)
- ibm.isam.aac.configure_mapping_rules - introduce homedir variable instead of relying on inventory_dir (set homedir variable)
- ibm.isam.aac.configure_policy_information_points - introduce homedir variable instead of relying on inventory_dir (set homedir variable)
- ibm.isam.aac.configure_runtime_template_root - introduce homedir variable instead of relying on inventory_dir (set homedir variable)
- ibm.isam.aac.export_runtime_template_root - introduce homedir variable instead of relying on inventory_dir (set homedir variable)
- ibm.isam.base.configure_certificate_databases - introduce homedir variable instead of relying on inventory_dir (set homedir variable)
- ibm.isam.base.configure_certificate_requests - introduce homedir variable instead of relying on inventory_dir (set homedir variable)
- ibm.isam.base.configure_personal_certificates - introduce homedir variable instead of relying on inventory_dir (set homedir variable)
- ibm.isam.base.configure_signer_certificates - introduce homedir variable instead of relying on inventory_dir (set homedir variable)
- ibm.isam.base.download_snapshots - introduce homedir variable instead of relying on inventory_dir (set homedir variable)
- ibm.isam.base.export_personal_certificates - introduce homedir variable instead of relying on inventory_dir (set homedir variable)
- ibm.isam.base.extract_certificates - introduce homedir variable instead of relying on inventory_dir (set homedir variable)
- ibm.isam.base.import_personal_certificates - introduce homedir variable instead of relying on inventory_dir (set homedir variable) (NO TEST)
- ibm.isam.base.import_signer_certificates - introduce homedir variable instead of relying on inventory_dir (set homedir variable)
- ibm.isam.base.install_fixpacks - introduce homedir variable instead of relying on inventory_dir (set homedir variable) (NO TEST)
- ibm.isam.base.upload_jmt_files - introduce homedir variable instead of relying on inventory_dir (set homedir variable)
- ibm.isam.base.upload_snapshot - introduce homedir variable instead of relying on inventory_dir (set homedir variable) (NO TEST)
- ibm.isam.base.upload_updates - introduce homedir variable instead of relying on inventory_dir (set homedir variable) (NO TEST)
- ibm.isam.web.configure_kerberos - introduce homedir variable instead of relying on inventory_dir (set homedir variable)
- ibm.isam.web.configure_management_root - introduce homedir variable instead of relying on inventory_dir (set homedir variable)
- ibm.isam.web.export_sso_keys - introduce homedir variable instead of relying on inventory_dir (set homedir variable)
- ibm.isam.web.import_certificate_mapping_files - introduce homedir variable instead of relying on inventory_dir (set homedir variable)
- ibm.isam.web.import_sso_keys - introduce homedir variable instead of relying on inventory_dir (set homedir variable)
- ibm.isam.web.update_jmt_files - introduce homedir variable instead of relying on inventory_dir (set homedir variable)
- ibm.isam.web.upload_dynurl_files - introduce homedir variable instead of relying on inventory_dir (set homedir variable)
- ibm.isam.web.upload_http_transformation_files - introduce homedir variable instead of relying on inventory_dir (set homedir variable)
- ibm.isam.web.upload_jmt_files - introduce homedir variable instead of relying on inventory_dir (set homedir variable)
- ibm.isam.web.upload_ltpa_files - introduce homedir variable instead of relying on inventory_dir (set homedir variable)
- ibm.isam.web.upload_management_root_files - introduce homedir variable instead of relying on inventory_dir (set homedir variable)
- remove inventory_dir variable from roles- the new homedir variable now defaults to inventory_dir, but if you rely on absolute paths in your inventory, you will have to update them (or set `homedir: ""`)

Deprecated Features
-------------------

- ibm.isam.first_steps - use ibm.isam.base.first_steps instead.  Will be removed in a future version.

Removed Features (previously deprecated)
----------------------------------------

- playbooks/ldap_query.yml - no corresponding role

Bugfixes
--------

- base.add_interfaces - remove non-breaking-space character
- base.configure_interfaces - remove non-breaking-space character
- ibm.isam.aac.configure_runtime_template_root - ERROR! 'notify' is not a valid attribute for a TaskInclude
- ibm.isam.web.configure_management_root - ERROR! 'notify' is not a valid attribute for a TaskInclude (main.yml include_tasks: include_delete_management_root_contents.yml
- ibm.isam.web.configure_reverseproxy_instances - problem in label with `if` (https://github.com/IBM-Security/isam-ansible-collection/issues/176)

Known Issues
------------

- ibm.isam.aac.configure_fido2 - molecule import test fails because there is no metadata file to import
- ibm.isam.base.configure_certificate_databases - importing a db using a zip file fails

New Playbooks
-------------

- ibm.isam.base_site - Base configuration for appliances
- ibm.isam.connectivity_check - Check connectivity and variables.  You can run this using ansible-navigator or using ansible-playbook.

New Roles
---------

- ibm.isam.base.delete_application_logs - role to delete application logs
- ibm.isam.base.execute_cli - role to execute cli commands
- ibm.isam.base.set_management_authorization - enable management authorization
- ibm.isam.base.set_management_ssl_cert - new role to set the management ssl certificate
- ibm.isam.config_snmp_monitoring_v3 - Role to configure v3 snmp monitoring
- ibm.isam.get_memory_statistics - role to generate memory statistics

v1.0.28
=======

Release Summary
---------------

Bugfixes and an attempt at improving the quality (passing ansible-test sanity)

Deprecated Features
-------------------

- include action - is deprecated in favor of ``include_tasks``, ``import_tasks`` and ``import_playbook`` (https://github.com/ansible/ansible/pull/71262).

Bugfixes
--------

- isam.py - add inventory_hostname
- roles/aac/configure_runtime_template_root/tasks/include_sync_runtime_template_root.yml - incorrect merging of list

v1.0.27
=======

Bugfixes
--------

- plugins_connection_isam - added self._sub_plugin in _init_ to fix noneType error.

v1.0.26
=======

Minor Changes
-------------

- redis_configuration - role and playbook to configure Redis on WebSEAL.

v1.0.25
=======

Minor Changes
-------------

- configure_fido2 - new role and playbook

v1.0.24
=======

Bugfixes
--------

- yamllint - removed too many spaces before colon from files roles/add_oauth_definition/tasks/main.yml:27:23, roles/add_sysaccount_user/tasks/main.yml:10:15, roles/fed/create_federation_partners/tasks/main.yml:36:19

v1.0.23
=======

Minor Changes
-------------

- changelog - added new section for changelog as requested by the Red Hat team
