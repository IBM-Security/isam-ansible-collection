
set_ldap_user_attr
=========

Set LDAP user attribute

Requirements
------------

python-ldap module is installed on the build system.

Role Variables
--------------

The variables for this role can be passed via role directly, or inventory file, or playbook vars/main.yml.

Required variables are:

**ldap_bind_dn**: Binding DN, for example "cn=root,secAuthority=default"

**ldap_server_uri**: LDAP server URI, for example, "ldaps://192.168.42.101:636/"

**ldap_state**: LDAP attribute target state, valid options are:
```
  present: all given values will be added if they are missing
  absent: all given values will be removed if present.
  exact: the set of values will be forced to exactly those provided and no others.
```

**ldap_user_attributes**: This is a JSON object which contains 'dn' string and a JSON array 'attributes'. For example:
```
    - dn: "uid=testuser,dc=iswga"
      attributes:
       mail: "testuser@mailinator.com"
       displayName: Test User
```

Note that the syntax is updated to match the `community.general.ldap_attrs` module.

**ldap_validate_certs**: Enable / disable certificate validation (default: true)

Dependencies
------------

This role depends on the Ansible module community.general.ldap_attrs

Example Playbook
----------------

```
---
- name: modify LDAP user attributes
  hosts: localhost
  connection: local
  tasks:
    - name: Set attributes
      import_role:
        name: ibm.isam.set_ldap_user_attr
      vars:
        ldap_validate_certs: false
        ldap_bind_dn: "cn=root,secAuthority=default"
        ldap_bind_pw: "passw0rd"
        ldap_server_uri: "ldaps://192.168.42.101:636/"
        ldap_state: "exact"
        ldap_user_attributes:
          - dn: "uid=testuser,dc=iswga"
            attributes:
              mail: "testuser@mailinator.com"
              displayName: "Test User"
```



License
-------

Apache

Author Information
------------------

IBM
