# Role ibm.isam.base.install_fixpacks

Role to install multiple fixpacks

````yaml
fix_packs:
  - file: upt_liberty_metrics.fixpack
````

There's a playbook you can call

````bash
ansible-playbook ibm.isam.base.install_fixpacks.yml -i inventories/isam/
````
