# IBM Verify Access API Roles

This repository contains Ansible Custom Modules and Roles for automating ISAM Appliance tasks. Custom Modules provide the
interface to python idempotent functions in ibmsecurity package. Handlers are coded into the roles to ensure changes are
committed (deployed) and relevant processes restarted.

## Requirements

Python v3.11 and above is required for this package.

The following Python Packages are required (including their dependencies):
1. ibmsecurity
2. ansible

Appliances need to have an ip address defined for their LMI. This may mean that appliances have had their initial setup
done with license acceptance.
