# Ansible Collection - ibm.isam

Documentation for the collection.

This is still a work in progress. README files in this collection were copied
from roles repository and need to be edited.

Support for ISAMProxy will be added in due course of time.

Requirements:
  * ibmsecurity 2020-05-01-1 or higher
  * Ansible 2.9 or higher
  * Python v3.6 or higher

## Using ansible-playbook
Instructions for installing ibm.isam:
  * Recommended: Create a python virtual environment and activate it before executing
            subsequent steps.
### 1) Install the following packages (use the latest available version)
- ansible (`pip install ansible`)
- ibmsecurity (`pip install ibmsecurity`)
- Note: Multiple dependent packages will install when you execute 'pip install'
        of the above packages.

### 2) Install collection using ansible galaxy:
- Example command to install:
  `ansible-galaxy collection install ibm.isam`
- Example command to upgrade to the latest version:
  `ansible-galaxy collection install ibm.isam --force`

### 3) Local install if firewall issues occurs

Python packages can be downloaded from pypi.org as tar.gz files and copied to server for installation.

* Link to download ibmsecurity package:
     https://pypi.org/project/ibmsecurity/#files
* Example command to install package:
     pip3 install <tar.gz downloaded>

Ansible collection can also be downloaded as a file and installed:

* Link to download ibm.isam:
     https://galaxy.ansible.com/ibm/isam
* Example command to install collection:
     ansible-galaxy collection install <tar.gz downloaded>
* Note: you may need to download dependent python packages needed.

### 4) Update existing playbooks to work with collection:

- Remove "connection: local"
- Rename all roles referenced inside playbooks to begin with ibm.isam.
- Remove all references to start_config role.  start_config role does not
  exist within the collection.

### 5) Inventory file change:

- Use the following variables to allow for ISAM connections:
    * ansible_collection
    * ansible_isam_username
    * ansible_isam_password
    * ansible_isam_port
    * ansible_host -> this can be set to match inventory_hostname (necessary for recent versions of Ansible)
- The variables do not need to be in an inventory file.  You can define
  these variables any way you prefer. Including embedding them in playbooks
  and using vault variables
- Example inventory file:

```ini
[primary]

192.168.198.100

[primary:vars]
ansible_host=192.168.198.100
ansible_connection="ibm.isam.isam"
ansible_isam_username="admin@local"
ansible_isam_password="admin"
ansible_isam_port="443"
```

### 6) Miscellaneous
- Please note that roles, modules and sample playbooks get installed
  as part of the Collection install.
- If you are using a copy of roles, you may face issues if the collection
  does not have roles unique to your environment.
- Please submit a pull request on so we can merge your roles into
  the collection.

### 7) TLS Secure connections

Using ibmsecurity v2024.4.5+ enables secure TLS connections.

```ini
[isam]
validate_certs = True
verify_ca_path = /<path_to_pem>/isamAppliance.pem
```

You can retrieve the certificate of the LMI and store it to use as `verify_ca_path`

    openssl s_client -connect ${HOSTNAME}:${PORT} </dev/null 2>/dev/null | openssl x509 -outform pem > isamAppliance.pem

The best solution is to get a signed certificate from a Certificate Authority that is trusted within your organization's default ca settings.
In that case, simply setting validate_certs to True is sufficient.

```ini
[isam]
validate_certs = True
```

#### Setting up your Ansible Execution Environment's python

When using an Ansible Execution Environment, the behaviour of the Python Requests module with TLS may become tricky.

You can check what CA bundle Python will use by default.

```bash
Python 3.9.18 (main, Sep 22 2023, 17:58:34)
>>> import certifi
>>> certifi.where()
'/home/tbosmans/venv/lib64/python3.9/site-packages/certifi/cacert.pem'
```

The default path will probably point to a keystore within site-packages.
The problem with that truststore, is that is likely not updated with any trusts you need to add (eg. certificates from you private Certificate Authority)

So you then have a couple of options:

- replace that cacert.pem in your Execution environment with a trust store that contains your certificates
- configure `verify_ca_path` in ansible.cfg (through ansible-builder or in ansible.cfg in your project directory)
- configure an environment variable during build (`REQUESTS_CA_BUNDLE`) that points to the container's system ca bundle.  This is the recommended approach.

#### Generate a self signed certificate (development)

Prepare a 'san.cnf' file.
You could add multiple IP.x addresses in it if you want.
You can also use DNS.x hostnames instead.

```ini
[req]
default_bits  = 2048
distinguished_name = req_distinguished_name
req_extensions = req_ext
x509_extensions = v3_req
prompt = no
[req_distinguished_name]
countryName = US
stateOrProvinceName = N/A
localityName = N/A
organizationName = Self-signed certificate
commonName = ISVA_LMI
[req_ext]
subjectAltName = @alt_names
[v3_req]
subjectAltName = @alt_names
[alt_names]
IP.1 = 192.168.42.2
IP.2 = 192.168.42.3
```

Using openssl, you can then generate a certificate and public key, and convert it to pkcs12 format .

```bash
# generate key & cert
openssl req -x509 -nodes -days 1730 -newkey rsa:2048 -keyout isamlmi_key.pem -out isamlmi_cert.pem -config san.cnf

# extract public key
openssl x509 -pubkey -noout -in isamlmi_cert.pem > isamAppliance.pem

# turn into a pkcs12
openssl pkcs12 -export -in isamlmi_cert.pem -inkey isamlmi_key.pem -out isamlmi.p12 -passout pass:<some password>
```

You can now use the `isamlmi.p12` certificate as your management ssl certificate (for instance , by using Ansible)

```bash
ansible-playbook ibm.isam.base.configure_management_ssl.yml -e update_management_ssl_cert_cert="$(pwd)/files/isamlmi.p12" -e update_management_ssl_cert_pwd=<password> -i <your inventory>
```


## Using execution environments (ansible-navigator and/or AAP)

To use the ibm.isam collection with execution environments, you may need to create a custom Execution Environment first.
However, the collection now includes a playbook that you can use to check if it works in your case with a standard Execution Environment.

**Warning** This is not a complete documentation on how to configure Ansible Automation Platform!

### 1) Install ansible-navigator
The idea is that you can use ansible-navigator to run the exact same execution environment as would be used on the Ansible Automation Platform.

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
#    cmdline: --extra-vars comment=snapshot
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
#    image: yourcustom-ee:latest
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
  - ibm.isam
```

So in AAP, the collection will be installed automatically, for ansible-navigator (or ansible-playbook, for that matter), you need to install the collection manually:

    ansible-galaxy collection install -r collections/requirements.yml -p ./collections --force

The command installs the collection adjacent to your playbooks.

### 3) Use inventory

You can use the same inventory you used before.

You can define 1 or more default inventories in the `ansible-navigator.yml` file (`ansible.inventory.entries`),
or you can pass the inventory on the command line (-i or --inventory, the same as for ansible-playbook)

### 4) Run it using ansible-navigator

The playbook in the collection `connectivity_check.yml` will try to install the ibmsecurity python package in the standard Execution Environment.
So if you defined your default inventory upfront, you can just run this from with your playbook directory:

    ansible-navigator run ibm.isam.connectivity_check.yml

You can pass arguments, for instance a different inventory:

    ansible-navigator run ibm.isam.connectivity_check.yml -i inventory/test

If this fails with errors indication that the `ibmsecurity` module is missing, you must build a custom Execution Environment.

### 5) Prepare a custom execution environment

You can build a custom execution environment, that contains the python prerequisites for the ibm.isam collection.

You may also need to add custom CA trusts to the execution environment (eg. from your private Certificate Authority),
and you likely want to set the `REQUESTS_CA_BUNDLE` environment variable.

### 6) Run it on Ansible Automation Platform

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

### 7) Next steps

#### Vaults
To use ansible vaults with ansible-navigator, there's a couple of options.
Take a look at the documentation here : <https://ansible-navigator.readthedocs.io/faq/#how-can-i-use-a-vault-password-with-ansible-navigator>

#### Miscellaneous
The playbooks in the collection can be used as examples to create your own specific deployments of IBM Verify Access using Ansible !
