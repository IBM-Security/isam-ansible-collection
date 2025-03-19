# Setting LDAP Attributes

To set ldap attributes, you can use `community.general.ldap_attrs`

## Requirements

python-ldap module is installed on the build system.

## Variables

Required variables are:

**ldap_bind_dn**: Binding DN, for example "cn=root,secAuthority=default"

**ldap_server_uri**: LDAP server URI, for example, `ldaps://192.168.42.101:636/`

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

**ldap_validate_certs**: Enable / disable certificate validation (default: true)

## Example Playbook set ldap attributes


```
---
- name: modify LDAP user attributes
  hosts: localhost
  connection: local
  tasks:
    - name: Modify user LDAP attributes
      community.general.ldap_attrs:
        validate_certs: "{{ ldap_validate_certs }}"
        dn: "{{ item.dn }}"
        attributes: "{{ item.attributes }}"
        state: "{{ ldap_state }}"
        server_uri: "{{ ldap_server_uri }}"
        bind_dn: "{{ ldap_bind_dn }}"
        bind_pw: "{{ ldap_bind_pw }}"
      loop: "{{ ldap_user_attributes }}"
```
