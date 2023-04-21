======================
Ibm.Isam Release Notes
======================

.. contents:: Topics


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
