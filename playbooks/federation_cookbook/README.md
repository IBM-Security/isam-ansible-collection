# Federation cookbook

**Warning** these playbooks are not up to date to the latest version of the federation cookbook.

There are four playbooks contained in the federation_cookbook directory:

1) fed_idp_part1.yml
2) fed_idp_part2.yml
3) optional, add playbook to add attributes
4) fed_sp_part1.yml
5) fed_sp_part2.yml

The playbooks are to be used in conjuction with ISAM Federation Cookbook.  The playbooks will implement the steps
instructed in the Federation Cookbook.  fed_idp_part1 and fed_idp_part2 will implement steps related to the Identity Provider server.
fed_sp_part1 and fed_sp_part2 will implement steps related to the Service Provider server.

part1 playbooks implement Chapters 4 to 8 and part2 playbooks implement Chapters 9 to 21.

If you would like to run all the chapters, then the sequence to run the playbooks is
fed_idp_part1 -> fed_sp_part1 -> fed_sp_part1 -> fed_sp_part2

## Requirements

You can supply variables through group_vars (in an inventory or in an adjacent directory), or through any way you think is useful.

Set the `providedFiles_dir` variable to point to the provided files from the Federation cookbook
https://www.ibm.com/support/pages/ibm-security-access-manager-federation-cookbook
eg. `providedFiles_dir: "/home/tbosmans/Documents/Doc/IBM/ISAM/Federation/federation-cookbook/providedfiles"`

Update the homedir variable to reflect the actual path in your environment.

Also provide the activation keys in a variable:

```yaml
activation_keys:
  - id: wga
    code: "key_wga"
  - id: mga
    code: "key_mga"
  - id: federation
    code: "key_federation"
```

## Known issues

To be able to certify this collection, we cannot have references to community collections.
So to finalize the setup, you can run this playbook AFTER fed_idp_part2.yml.

````yaml
- name: Federation Cookbook add attributes to test user
  hosts: all
  gather_facts: false
  vars:
    homedir: ""
    isam_validate_certs: false
  tasks:
    - name: 10.3 Add attributes to test user in ldap
      community.general.ldap_attrs:
        validate_certs: false
        dn: "{{ inventory.test_user_dn }}"
        attributes: "{{ inventory.ldap_attributes }}"
        state: exact
        server_uri: "{{ inventory.ldap_server_uri }}"
        bind_dn: "{{ inventory.ldap_bind_dn }}"
        bind_pw: "{{ inventory.ldap_bind_pw }}"
````
