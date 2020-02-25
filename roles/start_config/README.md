
start_config
=========

***** IMPORTANT - this role is redundant, kept here just to avoid breaking playbook that might still reference it ******
==================================================================================================================

This role contains the ISAM Ansible module files under the *library* subdirectory, and notification handlers that can be used by all other roles. Always reference this role before other ISAM Ansible roles.


Requirements
------------

An ISAM appliance needs to be bootstrapped with LMI interface up and running.

Role Variables
--------------

The variables for this role can be passed via role directly, or inventory file, or playbook vars/main.yml.


Required variables must be provided:


Variables with default values set, define them only if you want to change the default values:

**log_level**: one of DEBUG, INFO, ERROR, FATAL, default is INFO
**force**: true or false, default is false
**FIPS_cfg**: FIPS configuration in JSON object, default is {fipsEnabled:true/false, tlsv10Enabled:false, tlsv11Enabled:true}
**lmi_session_timeout**: LMI session timeout, default is 720 seconds
**start_config_wait_time**: Wait time for ISAM appliance to restart, default is 600 seconds.

Dependencies
------------

None


Example Playbook
----------------

A sample playbook *test.yml* has been placed under *tests/* subdirectory.

    - hosts: servers
      roles:

After verifying the other variables set in *host_vars/localhost.yml*,  you may run it with ansible-playbook directly:

```
ansible-playbook -i inventory test.yml
```

License
-------

Apache


Author Information
------------------

IBM
