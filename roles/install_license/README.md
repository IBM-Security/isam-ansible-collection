Role Name
=========

Use this Role to Install the Product Support License with the ISAM Appliance.

Requirements
------------

It requires a valid license support file which can be obtained from IBM
Security Systems License Key Center at https://ibmss.flexnetoperations.com

Role Variables
--------------

Provide valid license support file location:
install_license_file: '/tmp/666666_88888888_4444'

The role automatically takes a snapshot before installing the support license file, override as needed:
`install_license_comment: "Automated Snapshot Before Installing Product Support License"`

Dependencies
------------
N/A

Example Playbook
----------------

Here is an example of how to use this role:

    - hosts: servers
      connection: local
      roles:
         - role: ibm.isam.install_license
           install_license_file: '/tmp/666666_88888888_4444'

License
-------

Apache

Author Information
------------------

IFC
