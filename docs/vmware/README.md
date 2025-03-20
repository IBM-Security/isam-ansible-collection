# VMWARE

These are example playbooks for tasks at the vmware hypervisor layer.

## isam_install.yml

```yaml
- name: Reboot new vmware server with ISAM iso file
  hosts: all
  vars_prompt:
    - name: vcenter_username
      prompt: "Enter AD Userid to login to Vcenter"
      private: false
    - name: vcenter_password
      prompt: "Enter AD Password to login to Vcenter"
      private: true
  tasks:
    - name: Attach ISAM ISO and Reboot
      community.vmware.vmware_guest:
        cdrom:
          type: "iso"
          # Need to parametrize the iso file name
          iso_path: "[{{ vcenter_datastore }}] ISAM_905/isam_9.0.5.0_20180606-2319.iso"
        hostname: "{{ vcenter_hostname }}"
        name: "{{ inventory_hostname.partition('.')[0] }}"
        username: "{{ vcenter_username }}"
        password: "{{ vcenter_password }}"
        validate_certs: false
```

## server_facts.yml

```yaml
---
- name: Get details of server from VCenter
  hosts: all
  vars_prompt:
    - name: vcenter_username
      prompt: Enter AD Userid to login to Vcenter
      private: false
    - name: vcenter_password
      prompt: Enter AD Password to login to Vcenter
      private: true
  tasks:
    - name: Gather all registered virtual machines
      community.vmware.vmware_vm_info:
        hostname: "{{ vcenter_hostname }}"
        username: "{{ vcenter_username }}"
        password: "{{ vcenter_password }}"
        validate_certs: false
      delegate_to: localhost
      register: vmfacts

    - name: VMWare debug virtual machines
      ansible.builtin.debug:
        var: vmfacts.virtual_machines
```

## server_operation.yml

```yaml
---
- name: Execute an operation reboot/stop/start on server in VCenter
  hosts: all
  vars:
    server_operation: rebootguest
  vars_prompt:
    - name: vcenter_username
      prompt: Enter AD Userid to login to Vcenter
      private: false
    - name: vcenter_password
      prompt: Enter AD Password to login to Vcenter
      private: true
  tasks:
    - name: Reboot VM Guest Machine
      community.vmware.vmware_guest:
        state: "{{ server_operation }}"
        hostname: "{{ vcenter_hostname }}"
        # VCenter name of server needs to be provided below - implementation specifc
        name: "{{ hostname.partition('.')[0] }}"
        username: "{{ vcenter_username }}"
        password: "{{ vcenter_password }}"
        validate_certs: false

```
