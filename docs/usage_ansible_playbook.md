# Using ansible-playbook

## 1) Create a virtual environment (recommended)

Create a virtual environment (for instance, using python 3.11)

    python3.11 -m venv ~/venvdev

Activate virtual environment

    source ~/venvdev/bin/activate

Make sure you have ansible available in the virtual environment

## 2) Install the following packages (use the latest available version)

- ibmsecurity (`pip install ibmsecurity`)
- Note: Multiple dependent packages will install when you execute 'pip install'
        of the above packages.

## 3) Install collection using ansible galaxy:

Example command to install:

    ansible-galaxy collection install ibm.isam

Example command to upgrade to the latest version:

    ansible-galaxy collection install ibm.isam --force

## 4) Local install if firewall issues occurs

Python packages can be downloaded from pypi.org as tar.gz files and copied to server for installation.

Link to download ibmsecurity package:

     https://pypi.org/project/ibmsecurity/#files

Example command to install package:

     pip3 install <tar.gz downloaded>

Ansible collection can also be downloaded as a file and installed:

Link to download ibm.isam:  https://galaxy.ansible.com/ibm/isam

Example command to install collection:

    ansible-galaxy collection install <tar.gz downloaded>

**Note:** you may need to download dependent python packages needed.

## 5) Prepare your inventory

You can

### 6) Miscellaneous
- Please note that roles, modules and sample playbooks get installed
  as part of the Collection install.
- If you are using a copy of roles, you may face issues if the collection
  does not have roles unique to your environment.
- Please submit a pull request on so we can merge your roles into
  the collection.

### 7) TLS Secure connections (v2.0.0 +)

Using ibmsecurity v2024.4.5+ enables secure TLS connections.
This collection starts using that in version 2.0.0.

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

You can override the standard setting (from ansible.cfg) using a variable `isam_validate_certs'.
So for instance, to do the initial setup of your appliance, you could use

    ansible-navigator run .... -e "isam_validate_certs=false"

#### Setting up your Ansible Execution Environment's python

When using an Ansible Execution Environment, the behaviour of the Python Requests module with TLS may become tricky.
Where the Python configuration in a virtual environment may use your certificates correctly, that is most likely not the case in a container.

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
