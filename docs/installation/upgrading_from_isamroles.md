# ISAM Ansible Roles

If you are still using the isam Ansible roles (https://github.com/IBM-Security/isam-ansible-roles), it is time to migrate to the ibm.isam Ansible Collection.
The roles are deprecated.

## Update existing playbooks to work with collection:

- Remove "connection: local"
- Rename all roles referenced inside playbooks to begin with ibm.isam (FQCN)
- Remove all references to `start_config` role.  The `start_config` role does not
  exist within the collection.

## Inventory file change:

- Use the following variables to allow for ISAM connections:
    * ansible_connection
    * ansible_isam_username
    * ansible_isam_password
    * ansible_isam_port
    * ansible_host -> this can be set to match inventory_hostname (necessary for recent versions of Ansible)

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
