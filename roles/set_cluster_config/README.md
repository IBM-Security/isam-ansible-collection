Role Name
=========

Use this Role to configure cluster for an ISAM Appliance.

Requirements
------------
N/A

Role Variables
--------------

All variables to this role are optional. They will take default values if not specified.

Dependencies
------------
N/A

Example Playbook
----------------

Here is an example of how to use this role:

    - hosts: servers
      connection: local
      roles:
         - role: ibm.isam.set_cluster_config
           set_cluster_config_primary_master: '192.168.198.100'

License
-------

Apache

Author Information
------------------

IBM
