Role Name
=========

Use this Role to configure DSC for an ISAM Docker.

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
         - role: ibm.isam.set_dsc_config
           set_dsc_config_worker_threads: 64
           set_dsc_config_max_session_lifetime: 3600
           set_dsc_config_client_grace: 600
           set_dsc_config_service_port: 443
           set_dsc_config_replication_port: 444
           set_dsc_config_servers:
             - ip: "isamdsc"
               service_port: 443
               replication_port: 444


License
-------

Apache

Author Information
------------------

IBM
