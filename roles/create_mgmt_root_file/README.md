# Role Name

Use this Role to add a file to the management root on the ISAM Appliance.

## Requirements
N/A

## Role Variables

The following variables are required:
* create_mgmt_root_file_instance_id
* create_mgmt_root_file_id
* create_mgmt_root_file_name
* create_mgmt_root_file_contents

## Dependencies
N/A

## Example Playbook

Here is an example on how to use this role:

    - name: Add testpage to junction root
      hosts: restricted_nodes
      connection: local
      roles:
        - common_handlers
        - role: ibm.isam.create_mgmt_root_file
          create_mgmt_root_file_instance_id: "rp-demo"
          create_mgmt_root_file_id: 'junction-root'
          create_mgmt_root_file_name: 'test.html'
          create_mgmt_root_file_contents: "{{ lookup('file', '/ansible/playbooks/isam-test-playbook/inventories/test/group_vars/restricted_nodes/junction-root/test.html') | replace('\n', '') }}"

Replacing newlines is required otherwise an EOL exception is thrown and playbook execution will fail.

## License

Apache

## Author Information

Dries Eestermans (dries.eestermans@is4u.be)
