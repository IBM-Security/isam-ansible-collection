Role Name
=========

Use this Role to add Junctions to a Reverse Proxy in the ISAM Appliance.

Requirements
------------
N/A

Role Variables
--------------

Provide , at a minimum, the following variables. Others are optional:
add_junction_junction_point:
add_junction_junction_type:
add_junction_reverseproxy_id:
add_junction_server_hostname:
add_junction_server_port:

Dependencies
------------
N/A

Example Playbook
----------------

Here is an example of how to use this role:

    - hosts: servers
      connection: local
      roles:
         - role: ibm.isam.add_junction
           add_junction_junction_point: '/test'
           add_junction_junction_type: 'tcp'
           add_junction_reverseproxy_id: 'default'
           add_junction_server_hostname: 'localhost'
           add_junction_server_port: '80'

License
-------

Apache

Author Information
------------------

IBM
