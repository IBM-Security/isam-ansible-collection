======================
Ibm.Isam Release Notes
======================

.. contents:: Topics

v3.4.0
======

Release Summary
---------------

Build related changes, some fixes A couple of new roles, and some deprecated roles

Minor Changes
-------------

- README updates
- config_reverseproxy_mmfa - change the way the api is called
- galaxy.yml - add build_ignore
- galaxy.yml - remove all molecule folders from galaxy build.  Drastically reduce size of collection.

Deprecated Features
-------------------

- import_personal_cert - does not work anyway. use `base.configure_personal_certificates` instead
- set_rsyslog_forwarder - use base.configure_rsyslog_forwarder
- set_rsyslog_forwarder_sources - use base.configure_rsyslog_forwarder

Security Fixes
--------------

- base.configure_personal_certificates - shows password in ansible logs
- base.import_personal_certificates - shows password in ansible logs

Bugfixes
--------

- base.import_personal_certificates - fix role , add password
- base.externalize_hvdb - add passwords for hvdb and configdb (#216)
- common_handlers - actually perform a check for LMI
- molecule - remove p12 certificates out of collection (#218)
- set_cluster_config - add passwords for hvdb and configdb (#216)

New Roles
---------

- ibm.isam.base.configure_rsyslog_forwarder - Add role to configure rsyslog forwarder
- ibm.isam.base.get_cluster_identifier - Register and show cluster identifier (debugging purposes)
- ibm.isam.web.get_reverseproxy_instances - Get a list of all instances

v3.3.0
======

Release Summary
---------------

A couple of new roles and fixes

Minor Changes
-------------

- aac.configure_access_control_policy_attachments - add policyType (type) attribute
- base.configure_audit - add use_json and components
- base.install_firmware - remove deprecated get_md5 (Gourav1308)
- update molecule tests for fido2
- web.configure_management_root - remove some when statements

New Roles
---------

- ibm.isam.aac.configure_authentication_policies_json - Role to configure authentication policies using json format
- ibm.isam.aac.get_fido2_relyingparty_configid - Get the fido2 relying party config id based on name (helper for configuring authentication mechanisms)
- ibm.isam.base.configure_mgmtazn_role - Add role to configure management authorization

v3.1.0
======

Release Summary
---------------

Add new features to support IVIA 11/ISVA 10.0.9

Minor Changes
-------------

- add galaxy-importer.cfg configuration file
- ibm.isam.base.activate_modules - add meta/argument_specs
- ibm.isam.base.configure_advanced_tuning_parameters - add meta/argument_specs instead of `help`
- ibm.isam.base.configure_runtime_tunings - add meta/argument_specs instead of `help`
- remove test file tests/_ansible_lint.yml
- update tests for personal certificates

Breaking Changes / Porting Guide
--------------------------------

- base/configure_container_container - rename `isam_containers` to `base_ivia_containers`

Deprecated Features
-------------------

- ibm.isam.base.add_bonding_interfaces - only applicable to hardware appliances and these are out of support
- ibm.isam.set_admin_cfg - use ibm.isam.base.configure_admin_cfg instead. This role will no longer be updated

Known Issues
------------

- aac/configure_mmfa - not fully idempotent
- aac/configure_mmfa_pushnotifications - not fully idempotent

New Playbooks
-------------

- ibm.isam.aac/configure_mmfa.yml - Playbook to configure mmfa and push notifications

New Roles
---------

- ibm.isam.ibm.isam.aac.configure_mmfa_pushnotifications - Configure push notification registrations
- ibm.isam.ibm.isam.base.configure_admin_cfg - Configure LMI admin settings - new parameter for v11
- ibm.isam.ibm.isam.base.configure_container_repo - Configure container repositories

v3.0.2
======

Release Summary
---------------

No functional changes

Minor Changes
-------------

- roles/README.md is required

v3.0.1
======

Release Summary
---------------

Small updates related to automation hub publishing

Minor Changes
-------------

- federation/fed_idp_part2.yml - removed community.general usage
- roles/README.md - removed
- update README.md - link format

v3.0.0
======

Release Summary
---------------

Refactoring for red hat automation hub certification

Minor Changes
-------------

- meta/execution-environment.yml - information to build a custom execution environment
- playbooks - refactored roles to tasks
- playbooks/aac - refactored roles to tasks
- playbooks/base - refactored roles to tasks
- playbooks/fed - refactored roles to tasks
- playbooks/web - refactored roles to tasks
- refactor - removed dependency on community.general
- update readme

Deprecated Features
-------------------

- set_ldap_user_attr - cannot use community.general in certified collections

Removed Features (previously deprecated)
----------------------------------------

- set_ldap_user_attr - cannot use community.general in certified collections
- vmware/isam_install.yml - cannot use community.vmware in certified collection (documented in docs/vmware/README.md)
- vmware/server_facts.yml - cannot use community.vmware in certified collection (documented in docs/vmware/README.md)
- vmware/server_operation.yml - cannot use community.vmware in certified collection (documented in docs/vmware/README.md)

New Plugins
-----------

Lookup
~~~~~~

- ibm.isam.filetree - Copy from community.general.filetree

New Playbooks
-------------

- ibm.isam.get_container_metadata.yml - Get the metadata config for a container

v2.6.0
======

Release Summary
---------------

New roles for AAC
Rewrite federation cookbook (first draft)
Remove old ldap_attr module

Minor Changes
-------------

- bootstrap_local - refactoring of variables
- config_reverseproxy_federation - just pass federation_name, not id
- configure_access_control_policies - rename attributesRequired to attributesrequired (if necessary)
- federation_cookbook.fed_idp_part1.yml - update
- federation_cookbook.fed_idp_part2.yml - update
- federation_cookbook.fed_sp_part1.yml - update
- federation_cookbook.fed_sp_part2.yml - update
- filter/rename_key.py - moved a very chatty print statement
- molecule - update tests for federation cookbook

Breaking Changes / Porting Guide
--------------------------------

- set_ldap_user_attr - switch to community.general.ldap_attrs

Deprecated Features
-------------------

- configure_instance_federations - does not work anyway
- ldap_attr.py - use community.general.ldap_attrs instead

Removed Features (previously deprecated)
----------------------------------------

- ldap_attr.py - switch to community.general.ldap_attrs - this broke with python3

Known Issues
------------

- federation_cookbook playbooks are not up to date with latest IBM Federation Cookbook

New Roles
---------

- ibm.isam.ibm.isam.aac.configure_mmfa - Configure mmfa in AAC
- ibm.isam.ibm.isam.aac.configure_risk_profiles - Configure AAC risk profiles

v2.5.0
======

Release Summary
---------------

Minor changes and bugfixes

Minor Changes
-------------

- vmware.isam_install.yml - lint truthy
- vmware.server_facts.yml - lint tasks should be named

Bugfixes
--------

- change_passwords.yml - modify removed role to new role
- ibm.isam.web.configure_management_root - default and simplify when statements
- roles - homedir -> ((homedir == '') | ternary('', homedir + '/'))
- set_user_registry_user_pw.yml - modify removed role to new role

v2.4.0
======

Release Summary
---------------

Fixes and new roles for new features in 10.0.7

Minor Changes
-------------

- aac.authenticate_access_control_policy - FQCN for isam module
- aac.delete_access_control_policy_attachments - FQCN for isam module
- base.configure_advanced_tuning_parameters - default to 'set' action
- base.configure_interfaces - key order
- bootstrap_local - update this role to make it work again
- configure_personal_certificates - rename personal certificate (> 10.0.7)
- web.delete_admin_credential_apiac_policies - FQCN for isam module
- web.store_admin_credential_apiac_policies - FQCN for isam module

Deprecated Features
-------------------

- configure_personal_certificates - set personal certificate as default is no longer possible (> 10.0.3)
- set_audit_configuration - replaced with base.configure_audit, that is using new code
- set_ldap_root_pw - has no variables
- set_ldap_user_pw - missing variables

Removed Features (previously deprecated)
----------------------------------------

- authenticate_policy_attachments - use aac.authenticate_access_control_policy instead
- set_admin_pw - use ibm.isam.web.set_embedded_ldap_admin_pw instead
- set_ldap_root_pw - use ibm.isam.web.set_embedded_ldap_admin_pw instead
- set_ldap_user_pw - use ibm.isam.web.set_embedded_ldap_user instead

Bugfixes
--------

- configure_reverseproxy_junctions - include_create_junctions has a syntax error (#200)

v2.3.2
======

Release Summary
---------------

| Build related change

Minor Changes
-------------

- build - a readme file is required in the roles/ directory for uploading to Red Hat

v2.3.1
======

Minor Changes
-------------

- ansible-lint - meta-no-tags - rename tags in the meta section
- ansible-lint - no error on use of ignore-error

Breaking Changes / Porting Guide
--------------------------------

- bootstrap_local - ansible-lint rename variables from `BS_` to `bootstrap_local_`

Deprecated Features
-------------------

- set_admin_pw - this role is not working anyway

Bugfixes
--------

- web.config_reverseproxy_redis - Correct role workings and create a test (#185)

v2.3.0
======

Release Summary
---------------

| Fixes related to AAC access control policies and mechanisms

Minor Changes
-------------

- aac.configure_access_control_attributes - rename uri to attributeURI if present (using the new rename_key filter plugin)
- aac.configure_access_control_policies - small updates
- base_site.yml - update to newer version of first_steps role
- fed.configure_sts_chains - linting issues
- gen_report - lint line length
- web.configure_kerberos - lint issues
- web.execute_pdadmin - lint line length
- web.import_certificate_mapping_files - remove invalid name for variable
- web.restart_reverseproxy_instances - lint line length

Deprecated Features
-------------------

- authenticate_policy_attachments - use aac.authenticate_access_control_policy instead

Removed Features (previously deprecated)
----------------------------------------

- first_steps - use ibm.isam.base.first_steps instead

Bugfixes
--------

- aac.configure_access_control_policy_attachments - fix role

New Plugins
-----------

Filter
~~~~~~

- ibm.isam.rename_key - Rename keys in a dictionary

v2.2.0
======

Release Summary
---------------

| Refactoring based on results from `ansible-lint`
| This is necessary to pass Red Hat's certification for collections.

Minor Changes
-------------

- multiple roles - remove homedir from defaults (is now in common_handlers)
- refactoring - comments
- refactoring - fqcn for ansible builtin modules
- refactoring - galaxy meta - multiple changes
- refactoring - increase ansible-lint profile to `moderate`
- refactoring - jinja spacing
- refactoring - plays must be named
- refactoring - tasks must be named
- refactoring - truthy values
- refactoring - update some of the molecule tests

Breaking Changes / Porting Guide
--------------------------------

- aac/configure_server_connections - remove class variable (schema[vars] violation).  Use a jinja filter instead
- aac/create_api_protection_definitions - remove name variable (schema[vars] violation).  Use a jinja filter instead
- base.install_update - rename reserved variable names (add prefix `update_`)
- base/install_update.yml - rename reserved variable names (name, type, version, release_date)
- web/upload_http_transformation_files - remove name variable (schema[vars] violation).  Use a jinja filter instead
- web/upload_ltpa_files - remove name variable (schema[vars] violation).  Use a jinja filter instead
- web/upload_management_root_files - rename name variable (schema[vars]) - name -> web_management_root_name

Deprecated Features
-------------------

- create_sysaccount.yml - playbook is a duplicate of create_sysaccounts.yml and will be removed in a future release

Bugfixes
--------

- removed or moved a number of role vars, since they have a very high precedence and can cause unexpected issues

v2.1.0
======

Release Summary
---------------

Role and playbook to enable the (Container) extensions
First role and playbook to configure a Container on the ISVA Container extension
(IAG or ISVAOP)
This requires ibmsecurity >= 2024.11.10.0

Minor Changes
-------------

- common_handlers - add homedir and root_playbook_dir shared default variables

v2.0.0
======

Release Summary
---------------

| Enable use of TLS for the LMI

Major Changes
-------------

- plugins/connection/isam.py - add verify ssl certificate.  This requires ibmsecurity version v2024.4.5+.

Minor Changes
-------------

- base/set_management_ssl_cert - remove default LOG value
- change versioning method to YYYY.MM.xx
- documentation updates
- documentation updates
- ibm.isam.base.install_fixpacks - fix

v1.1.1
======

Release Summary
---------------

Changes related to publishing the collection to red hat automation hub

Minor Changes
-------------

- add documentation to filter plugins - required to pass red hat verification
- configure_reverseproxy_junctions - lint issues meta
- configure_reverseproxy_junctions_setall - lint issues meta
- web/import_sso_keys - lint problem reserved name `name`, indentation, meta

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
