# Using execution environments (ansible-navigator and/or AAP) with the ibm.isam collection

To use the ibm.isam collection with execution environments, you may want to create a custom Execution Environment first.
However, the collection now includes a playbook that you can use to check if it works in your case with a standard Execution Environment.

**Warning** This is not a complete documentation on how to configure Ansible Automation Platform!

### 1) Install ansible-navigator

The idea is that you can use ansible-navigator to run the exact same execution environment as would be used on the Ansible Automation Platform.
You may want to install this into a virtual environment.

```bash
pip install ansible-navigator
```

### 2) Prepare a `playbook` directory.

Create a new playbook directory.

Create the following directories:
- collections
- group_vars
- host_vars

Although not required, you likely want to have an `ansible-navigator.yml` file, with the default configuration for ansible-navigator.

Below is an example:
```yaml
---
ansible-navigator:
  ansible:
    config:
      help: false
      path: ./ansible.cfg
    inventory:
      entries:
        - "inventories/isam"
  ansible-runner:
    artifact-dir: ./logs/ansible-artifacts
    rotate-artifacts-count: 10
    timeout: 3600
  color:
    enable: true
    osc4: false
  app: run
  execution-environment:
    container-engine: podman
    enabled: true
    environment-variables:
      pass: []
    pull:
      policy: tag
  logging:
    file: ./logs/ansible-navigator.log
    level: critical
  mode: stdout
  playbook-artifact:
    enable: true
    replay: ./logs/REPLAY_{playbook_name}.json
    save-as: ./logs/ARTIFACT_{playbook_name}-{time_stamp}.json
  time-zone: Europe/Brussels
```

Note that the `mode` is set to stdout, so you will see output similar to `ansible-playbook`'s output.

### 3) Install the ibm.isam collection

For the collection to be available in the Execution environment for ansible-navigator, the simplest way is to install it in the collections directory adjacent your playbooks.
For the collection to be available in Ansible Automation Platform (or Ansible Tower), you need to create a `requirements.yml` in the collections directory.

collections/requirements.yml:
```yaml
---
collections:
  - name: ibm.isam
```

So in AAP, the collection will be installed automatically, for ansible-navigator (or ansible-playbook, for that matter), you need to install the collection manually:

    ansible-galaxy collection install -r collections/requirements.yml -p ./collections --force

The command installs the collection adjacent to your playbooks.

### 4) Use inventory

You can define 1 or more default inventories in the `ansible-navigator.yml` file (`ansible.inventory.entries`),
or you can pass the inventory on the command line (-i or --inventory, the same as for ansible-playbook)

### 5) Run it using ansible-navigator

The playbook in the collection `connectivity_check.yml` will try to install the ibmsecurity python package in the standard Execution Environment.
So if you defined your default inventory upfront, you can just run this from with your playbook directory:

    ansible-navigator run ibm.isam.connectivity_check.yml

You can pass arguments, for instance a different inventory:

    ansible-navigator run ibm.isam.connectivity_check.yml -i inventory/test

If this fails with errors indication that the `ibmsecurity` module is missing, you must build a custom Execution Environment.

**note**: you may need to configure pip in your virtual environment to point to a local code repository in enterprise environments.

### 6) Prepare a custom execution environment

You can build a custom execution environment, that contains the python prerequisites for the ibm.isam collection.

You may also need to add custom CA trusts to the execution environment (eg. from your private Certificate Authority),
and you likely want to set the `REQUESTS_CA_BUNDLE` environment variable.

**note** : adding that environment variable effectively enables TLS verification in some cases, which may not (yet) be the expected behaviour.

Alternatively, you can override the cacert.pem that comes with the `certifi` package in your execution environment.

### 7) Run it on Ansible Automation Platform

In Ansible Automation Platform, you need to define the custom execution environment you prepared earlier.

In the Project, you can then reference that Execution Environment.

It is not (yet) possible at the moment to define a Job template to run playbooks from collections directly,
so you need to create a small playbook that references the collection's playbook:

your_playbook.yml:
```yaml
- name: use playbook from collection
  import_playbook: ibm.isam.connectivity_check.yml
```

Then reference that playbook in your Job template, and run it.

### 8) Next steps

#### Vaults

To use ansible vaults with ansible-navigator, there's a couple of options.

However, a couple of tips:

- do not use fully encrypted vault files in your inventory
- use encrypted strings for encrypted values in your inventory
- while it is possible to put encrypted vault files in your playbook directory, I do not recommend this approach when working with playbooks from a collection (ie. calling import_playbook with the FQCN name or the playbook in the collection)

Take a look at the documentation here : <https://ansible-navigator.readthedocs.io/faq/#how-can-i-use-a-vault-password-with-ansible-navigator>

#### Miscellaneous

The playbooks in the collection can be used as examples to create your own specific deployments of IBM Verify Access using Ansible !
