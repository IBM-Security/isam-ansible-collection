
bootstrap_local
=========

Bootstrap an ISAM virtual appliance on a local Linux/OS X system to be used with VMWare Workstation or VMWare Fusion.

It is useful for demo or proof of concept on the local machine, but not for production deployment into VMWare ESX infrastructure.

It will create a new VM if it does not exist, and create a baseline snapshot. If an existing VM with the same name is running, it does nothing. If an existing VM with the same name exists but not running, it will start the VM.

Requirements
------------

VMWare Fusion for Mac OS X or VMWare workstation for Linux must be installed.

Role Variables
--------------

The variables for this role can be passed via role directly, or inventory file, or playbook vars/main.yml.

Required variables are:

**bootstrap_local_vm_hostname**: vm hostname
**bootstrap_local_vm_mgmt_ip**: vm M1 interface IP address
**bootstrap_local_vm_netmask**: vm network mask
**bootstrap_local_vm_default_gw**: vm network default gateway
**bootstrap_local_vm_path_root**: root path of the VM images

**bootstrap_local_appliance_iso**: ISO image path of the ISAM appliance

Optional variables (with default values):

**bootstrap_local_vm_cpu_count**: 2
**bootstrap_local_vm_ram_size**: 4096
**bootstrap_local_vm_hdd_size**: 50
**bootstrap_local_vm_nic_count**: 3

Dependencies
------------

None

Example Playbook
----------------

A sample playbook *test.yml* has been placed under *tests/* subdirectory.

    - hosts: servers
      roles:
         - { role: ibm.isam.bootstrap_local, bootstrap_local_vm_hostname: isamdemo, bootstrap_local_vm_mgmt_ip: 192.168.42.101, bootstrap_local_vm_netmask: 255.255.255.0, bootstrap_local_vm_default_gw: 192.168.42.1 }

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
