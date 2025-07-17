# Ansible Collection - ibm.isam

Documentation for installing and using this collection.

[![Ansible Lint](https://github.com/IBM-Security/isam-ansible-collection/actions/workflows/ansible_lint.yml/badge.svg)](https://github.com/IBM-Security/isam-ansible-collection/actions/workflows/ansible_lint.yml)

## Description

The ibm.isam collection provides Ansible modules, plugins and roles to configure IBM Verify Identity Access (formerly IBM Security Verify Access) appliances or containers.
It depends on the [ibmsecurity](https://github.com/IBM-Security/ibmsecurity) Python package .

The playbooks in the collection can be used as examples to create your own specific deployments of IBM Verify Identity Access using Ansible !

## Requirements

- ibmsecurity 2024.4.5 or higher (`pip install ibmsecurity`)
- Ansible 2.15 or higher
- Python v3.7 or higher

## Installation

Before using this collection, you need to install it with the Ansible Galaxy command-line tool:

```
ansible-galaxy collection install ibm.isam
```

You can also include it in a requirements.yml file and install it with ansible-galaxy collection install -r requirements.yml, using the format:

```yaml
collections:
  - name: ibm.isam
```

Note that if you install any collections from Ansible Galaxy, they will not be upgraded automatically when you upgrade the Ansible package.
To upgrade the collection to the latest available version, run the following command:

```
ansible-galaxy collection install ibm.isam --upgrade
```

You can also install a specific version of the collection, for example, if you need to downgrade when something is broken in the latest version (please report an issue in this repository). Use the following syntax to install version 1.0.0:

```
ansible-galaxy collection install ibm.isam:==2.7.0
```

See [using Ansible collections](https://docs.ansible.com/ansible/devel/user_guide/collections_using.html) for more details.

### Required variables for the collection

Use the following variables to allow for ISAM connections:
 * ansible_connection: ibm.isam.isam
 * ansible_isam_username
 * ansible_isam_password
 * ansible_isam_port
 * ansible_host -> this can be set to match inventory_hostname (necessary for recent versions of Ansible).

Example inventory file:

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

### TLS

Using ibmsecurity v2024.4.5+ enables secure TLS connections between Ansible and the appliance's LMI (Management interface).
This collection starts using that code in version 2.0.0.

The best solution is to get a signed certificate from a Certificate Authority that is trusted within your organization's default ca settings.
In that case, simply setting `validate_certs` to `True` is sufficient.

ansible.cfg:

```ini
[isam]
validate_certs = True
```

You can also supply a specific CA:

ansible.cfg:
```ini
[isam]
validate_certs = True
verify_ca_path = /<path_to_pem>/isamAppliance.pem
```

You can retrieve the certificate of the LMI and store it to use as `verify_ca_path`

    openssl s_client -connect ${HOSTNAME}:${PORT} </dev/null 2>/dev/null | openssl x509 -outform pem > isamAppliance.pem

You can override the standard setting (from ansible.cfg) using a variable `isam_validate_certs'.
So for instance, to do the initial setup of your appliance, you could use

    ansible-navigator run .... -e "isam_validate_certs=false"

To use the ibm.isam collection with execution environments, you may want to create a custom Execution Environment that includes the dependencies.
However, the collection now includes a playbook that you can use to check if it works in your case with a standard Execution Environment ([connectivity_check.yml](playbooks/connectivity_check.yml))

## Use Cases

### Complete configuration

The [base_site.yml](https://github.com/IBM-Security/isam-ansible-collection/blob/master/playbooks/base_site.yml) playbook provides an example for basic appliance configuration.

### Cluster configuration

The [site.yml](https://github.com/IBM-Security/isam-ansible-collection/blob/master/playbooks/site.yml) playbook provides an example for a clustered IVIA setup.

## Testing

The collection is tested against IVIA appliances v11.0.0 and v10.0.8.

## Support

As Red Hat Ansible Certified Content, this collection is entitled
to support through the Ansible Automation Platform (AAP) using the
**Create issue** button on the top right corner.
If a support case cannot be opened with Red Hat and the collection
has been obtained either from Galaxy or GitHub, issues can be alternatively be reported
by opening an issue [Issues](https://github.com/IBM-Security/isam-ansible-collection/issues) in the `isam-ansible-collection` Github repository.

## Release Notes and Roadmap

[Changelog](https://github.com/IBM-Security/isam-ansible-collection/blob/master/CHANGELOG.rst)


## Related Information



## License Information

[LICENCE](https://github.com/IBM-Security/isam-ansible-collection/blob/master/LICENSE)
