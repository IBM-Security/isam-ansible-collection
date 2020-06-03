Role Name
=========

Use this Role to Set One or More Runtime Tuning Parameters on the ISAM Appliance.

Requirements
------------
N/A

Role Variables
--------------

Provide the option key and value for the runtime tuning parameters to set
```
  runtime_tuning_parameters:
    - runtime_tuning_parameter_option: "Option 1"
      runtime_tuning_parameter_value: "Value 1"
    - runtime_tuning_parameter_option: "Option 2"
      runtime_tuning_parameter_value: "Value 2"
```

The role automatically takes a snapshot before setting runtime tuning parameters, override as needed:
`set_runtime_tuning_parameter_comment: "Automated Snapshot Before Setting Runtime Tuning Parameters"`

Dependencies
------------
N/A

Example Playbook
----------------

Here is an example of how to use this role:

    - hosts: servers
      connection: local
      roles:
         - role: ibm.isam.set_runtime_tuning_parameter
           runtime_tuning_parameters:
             - runtime_tuning_parameter_option: "Option 1"
               runtime_tuning_parameter_value: "Value 1"
             - runtime_tuning_parameter_option: "Option 2"
               runtime_tuning_parameter_value: "Value 1"

License
-------

Apache

Author Information
------------------

Ryan Dunn (rdunn1121@gmail.com)
