Scenario Names
=========

The Scenarios can be used in conjunction with the ISAM Federation Cookbook.

Scenarios containing idp refers to steps to be done to a identity provider server.  Scenarios
containing sp refers to steps to be done to a service provider server.

fed_idp_part1 will run through chapters 4 through 8 and configure the identity provider server.
fed_idp_part2 will run through chapters 9 through 21 and configure the identity provider server.
fed_sp_part1 will run through chapters 4 through 8 and configure the service provider server.
fed_sp_part2 will run through chapters 9 through 21 and configure the service provider server.

Scenarios with ch# corresponds to individual chapters from the cookbook.

If you would like to run all the chapters, then the sequence to run the playbooks is
fed_idp_part1 -> fed_sp_part1 -> fed_sp_part1 -> fed_sp_part2

The goal for the `web` scenario is to be able to test all reverse proxy related playbooks/roles, but it's a work in progress.

Requirements
------------

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

# Molecule

## Bootstrap machines

molecule -c ~/ansible/isam_ansible_inventories/molecule/molecule_idp.yml converge --scenario-name fed_idp_bootstrap
molecule -c ~/ansible/isam_ansible_inventories/molecule/molecule_idp.yml converge --scenario-name fed_sp_bootstrap

## Run the scenarios

molecule -c ~/ansible/isam_ansible_inventories/molecule_fed_cookbook/molecule_idp.yml converge --scenario-name fed_idp_part1
molecule -c ~/ansible/isam_ansible_inventories/molecule_fed_cookbook/molecule_sp.yml converge --scenario-name fed_sp_part1
molecule -c ~/ansible/isam_ansible_inventories/molecule_fed_cookbook/molecule_idp.yml converge --scenario-name fed_idp_part2
molecule -c ~/ansible/isam_ansible_inventories/molecule_fed_cookbook/molecule_sp.yml converge --scenario-name fed_sp_part2

### molecule_idp

The important one is the `platforms`.

Also, in the group_vars/all/vars.yml, the `homedir`, `providedFiles_dir` and `activation_keys` variables are set.

```yaml
# molecule inventory
dependency:
  name: galaxy
  options:
    ignore-certs: True
driver:
  name: default
lint: |
  set -e
  yamllint -c /home/tbosmans/ansible/isam_ansible_inventories/molecule/.yamllint .
  ansible-lint
platforms:
  - name: 192.168.42.101
    managed: false
provisioner:
  name: ansible
  options:
    vvv: True
  inventory:
    links:
      host_vars: "/home/tbosmans/ansible/isam_ansible_inventories/molecule_fed_cookbook/host_vars"
      group_vars: "/home/tbosmans/ansible/isam_ansible_inventories/molecule_fed_cookbook/group_vars"
  groups:
    - idp
verifier:
  name: ansible
```

### molecule_sp

The important thing is the `platforms`

```yaml
dependency:
  name: galaxy
  options:
    ignore-certs: True
driver:
  name: default
lint: |
  set -e
  yamllint -c /home/tbosmans/ansible/isam_ansible_inventories/molecule/.yamllint .
  ansible-lint
platforms:
  - name: 192.168.42.101
    managed: false
provisioner:
  name: ansible
  options:
    vvv: True
  inventory:
    links:
      host_vars: "/home/tbosmans/ansible/isam_ansible_inventories/molecule_fed_cookbook/host_vars"
      group_vars: "/home/tbosmans/ansible/isam_ansible_inventories/molecule_fed_cookbook/group_vars"
  groups:
    - sp
verifier:
  name: ansible
```
