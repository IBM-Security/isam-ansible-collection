Playbook Name
=========

There are four playbooks contained in the federation_cookbook directory:
1) fed_idp_part1.yml
2) fed_idp_part2.yml
3) fed_sp_part1.yml
4) fed_sp_part2.yml

The playbooks are to be used in conjuction with ISAM Federation Cookbook.  The playbooks will implement the steps
instructed in the Federation Cookbook.  fed_idp_part1 and fed_idp_part2 will implement steps related to the Identity Provider server.
fed_sp_part1 and fed_sp_part2 will implement steps related to the Service Provider server.

part1 playbooks implement Chapters 4 to 8 and part2 playbooks implement Chapters 9 to 21.

If you would like to run all the chapters, then the sequence to run the playbooks is 
fed_idp_part1 -> fed_sp_part1 -> fed_sp_part1 -> fed_sp_part2

Requirements
------------

Update the homedir variable to reflect the actual path in your environment.

In the fed_cookbook_idp_vars.yml and fed_cookbook_sp_vars.yml file, update the code for the activation keys.
