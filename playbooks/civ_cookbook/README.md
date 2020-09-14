# Ansible Collection - Playbooks for "ISAM as a CIV client cookbook"

Documentation for the usage of the playbooks when following the cookbook titled "Access Manager as a Verify Client"

Chapter 1: Introduction to high level architecture and components.  There is no playbook for this chapter.
Chapter 2: Getting started to test machine sign in.  There is no playbook for this chapter.
Chapter 3: Configure Cloud Identity - configuration steps taking place on Cloud Identity.  There is no playbook for this chapter.
Chapter 4: Create test user in Access Manager.  The associated playbook for this chapter is civ_client_cookbook_4_1.yml.
           In the variable file, update the value for test_user_pdadmin_commands to your actual tenant id.
Chapter 5: Follow the manual steps to connect to IBM Cloud Identity.  
           Section 5.1, the associated playbook is civ_client_cookbook_5_1.yml.
           Section 5.2, the associated playbook is civ_client_cookbook_5_2.yml.  In the variable file civ_client_cookbook_vars.yml, 
           fill in the value for inventory_dir with the location of ci_authentication_rule.js.  The ci_authentication_rule.js
           file is created by exporting the CI_Authentication_Rule from ISAM and modifying the line 
           var jitEnrollment = false as instructed in the cookbook.
Chapter 6: Follow the cookbook's manual steps to test the Cloud Identity Verify Integration.
Chapter 7: Follow the cookbook's manual steps on Authentication Factor Self Care.
Chapter 8: Section 8.1, the associated playbook is civ_client_cookbook_8_1.yml
           Section 8.2, the associated playbook is civ_client_cookbook_8_2.yml
           Section 8.3, follow the manual steps to create context-based authorization policy
           Section 8.4, the associated playbook is civ_client_cookbook_8_4.yml
           Section 8.5, if you are on Docker deployment, follow the manual steps to publish the snapshot.
           Section 8.6, follow the manual steps to test scenarios.
Chapter 9: Section 9.1, the associated playbook is civ_client_cookbook_9_1.yml. The ci_common.js file is created by
           exporting the CI_Common mapping rule from ISAM and modify it by adding mappedUsername += "@yourtenantid.ice.ibmcloud.com"
           as instructed in the cookbook. Updated the value "@yourtenantid.ice.ibmcloud.com" to your actual tenant id.  
           The associated playbook is civ_client_cookbook_9_1.yml will complete 9.1.1 and 9.1.2.  For subsection 9.1.3, 
           if you are using a docker deployment, follow the manual step to publish the snapshot.
           Section 9.2, the associated playbook is civ_client_cookbook_9_2.yml. The ci_common_9_2_2.js is created by adding 
           an additional mappedUsername += "@yourtenantid.ice.ibmcloud.com" to the ci_common.js file as instructed in 
           the cookbook.  Update the value to your actual tenant id. The associated playbook is civ_client_cookbook_9_2.yml
           will complete 9.2.1 and 9.2.2.  For subsection 9.2.3, if you are using a docker deployment, follow the manual
           step to publish the snapshot.
