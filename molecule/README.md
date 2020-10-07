Scenario Names
=========

The Scenarios can be used in conjunction with the ISAM Federation Cookbook. 

Scenarios containing idp refers to steps to be done to a identity provider server.  Scenarios 
containing sp refers to steps to be done to a service provider server.

fed_idp_part1 will run through chapters 4 through 8 and configure the identity provider server.
fed_idp_part2 will run through chapters 9 through 21 and configure the identity provider server.
fed_sp_part1 will run through chapters 4 through 8 and configure the service provider server.
fed_sp_part2 will run through chapters 9 through 21 and configure the service provider server.

Scenarios with ch# corresponds to individual chapters from the cookbook. 

If you would like to run all the chapters, then the sequence to run the playbooks is 
fed_idp_part1 -> fed_sp_part1 -> fed_sp_part1 -> fed_sp_part2

Requirements
------------

Update the homedir variable to reflect the actual path in your environment.

In the fed_cookbook_idp_vars.yml and fed_cookbook_sp_vars.yml file, update the code for the activation keys.
