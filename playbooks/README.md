# IBM Sample Code

This repository contains a sample Playbook. It can be used as the starting point for ISAM
Orchestartion efforts. It uses Ansible ISAM Roles, which in turn uses "ibmsecurity" python
package.

## Requirements

Python v2.7.10 and above is required for this package.

The following Python Packages are required (including their dependencies):
1. ibmsecurity
2. ansible

ISAM Roles need to be installed and available.

Appliances need to have an ip address defined for their LMI. This may mean that appliances have had their initial setup
done with license acceptance.

If you have a Docker environment you may also download the isam-ansible docker image which takes care of all the pre-requisites, details please refer to  https://hub.docker.com/r/mludocker/isam-ansible/ .

## Get Started
Clone this repository to get started, like so:
`git clone https://github.com/ibm-security/isam-ansible-playbook-sample.git`

## Features

### Test Inventory
The playbook contains a static inventory file describing two appliances in a data center in Boulder. The appliance ip
addresses are used to identify them to avoid dependency on DNS or host entries. Passwords are stored in a "vault.yml" -
these would ideally be encrypted, but that step has been skipped to allow for demonstration purposes.

### Playbooks

#### Install Firmware
This playbook can be used as is to install firmware packages into appliances. It will work out--of-box. Use like so:

`ansible-playbook -i inventories/test install_firmware.yml -e "install_firmware_file=/home/python/isam_9.0.2.1_20170116-1957.pkg install_firmware_version=9.0.2.1 install_firmware_release_date=2017-01-16"`

#### Install Fixpack
This playbook can be used as is to install fixpacks into appliances. It will work out--of-box. Use like so:

`ansible-playbook -i inventories/test install_firmware.yml -e "install_fixpack_file='/home/python/9021_IF1.fixpack'"`

#### Execute PDAdmin commands
This playbook can be used as is to execute PDAdmin commands provided in a file against appliances. It will work out--of-box.

`ansible-playbook -i inventories/test pdadmin.yml -e "pdadmin_file='/home/python/test.pdadmin'"`

You may want to use the `--limit` command to restrict the execution of the PDAdmin commands against more than one appliance.
The playbook excludes appliances that are part of `restricted` group.

#### Compare
This playbook will take appliances provided in the current inventory and run compares against a "master" appliance. This
master can be in the same inventory or not. The playbook can be customized to limit the features compared. By default it
will try to compare all features found on the master appliance. Look at the default/main.yml of `execute_compare` role for
values that can be overridden. This will work out-of-box. Use like so:

`ansible-playbook -i inventories/test compare.yml --limit 192.168.198.145 -e "master_hostname=192.168.198.153"`

It will prompt for the password for `admin` account of the master appliance.

#### Change Passwords
Appliances come with certain userids that may need to be changed from default. These are:
admin - root user to login to appliance
cn=root,SecAuthority=Default - root user for Embedded LDAP
easuser - BA User (created when mga or federation modules are activated)
sec_master - Assigned when web runtime (policy server) is configured

This playbook provides guidance on how these passwords can be changed. This can be done either one time or ever so often
as dictated by corporate policy.

#### Revert
In case there is a need to revert appliances back to an original state - in the absence of snapshots or the snapshot cannot
be used because of a mis-match of firmware levels - then use this playbook to deactivate the activated modules. Other
configuration to base features may still need to be undone. Use like so:

`ansible-playbook -i inventories/test revert.yml`

#### Site
This is the standard playbook to be used to build out an environment. Use this as a template to describe and build
your environment.

`ansible-playbook -i inventories/test site.yml`

# License

The contents of this repository are open-source under the Apache 2.0 licence.

```
Copyright 2017 International Business Machines

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

Ansible is a trademark of Red Hat, Inc.
