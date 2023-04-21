# Ansible Collection - ibm.isam

Documentation for the collection.

This is still a work in progress. README files in this collection were copied
from roles repository and need to be edited.

Support for ISAMProxy will be added in due course of time.

Requirements:
  * ibmsecurity 2020-05-01-1 or higher
  * Ansible 2.9 or higher
  * Python v3.6 or higher (Python 2 may work)

Instructions for installing ibm.isam:
  * Optional: Create a python virtual environment and activate it before executing
            subsequent steps.
  1) Install the following packages (use the latest available version):
        - Ansible
        - ibmsecurity
        - Note: Multiple dependent packages will install when you execute 'pip install'
          of the above packages.

  2) Install collection using ansible galaxy:
        - Example command to install:
          ansible-galaxy collection install ibm.isam
        - Example command to upgrade to the latest version:
          ansible-galaxy collection install ibm.isam --force

  3) Local install if firewall issues occurs
        - Python packages can be downloaded from pypi.org as tar.gz files and copied
          to server for installation.
            * Link to download ibmsecurity package:
              https://pypi.org/project/ibmsecurity/#files
            * Example command to install package:
              pip3 install <tar.gz downloaded>
        - Ansible collection can also be downloaded as a file and installed:
            * Link to download ibm.isam:
              https://galaxy.ansible.com/ibm/isam
            * Example command to install collection:
              ansible-galaxy collection install <tar.gz downloaded>
            * Note: you may need to download dependent python packages needed.

  4) Update existing playbooks to work with collection:
        - Remove "connection: local"
        - Rename all roles referenced inside playbooks to begin with ibm.isam.
        - Remove all references to start_config role.  start_config role does not
          exist within the collection.

  5) Inventory file change:
        - Use the following variables to allow for ISAM connections:
            * ansible_collection
            * ansible_isam_username
            * ansible_isam_password
            * ansible_isam_port
        - The variables do not need to be in an inventory file.  You can define
          these variables any way you prefer. Including embedding them in playbooks
          and using vault variables
        - Example inventory file:

            [primary]

            192.168.198.100

            [primary:vars]

            ansible_connection="ibm.isam.isam"
            ansible_isam_username="admin@local"
            ansible_isam_password="admin"
            ansible_isam_port="443"

  6) Miscellaneous
        - Please note that roles, modules and sample playbooks get installed
          as part of the Collection install.
        - If you are using a copy of roles, you may face issues if the collection
          does not have roles unique to your environment.
        - Please submit a pull request on so we can merge your roles into
          the collection.
