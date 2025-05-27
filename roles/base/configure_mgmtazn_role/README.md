# Configure mgmtazn role

This role creates a management authorization role and configures it.

I updated the code to allow all configuration in 1 go (2022.06.08 or something)

```
management_authorization_roles:
  - name: some_role_1
    groups:
      - name: existinggroup
        type: local
    users:
      - name: admin1
        type: local
    features:
      - name: "wpm_policy_administration"
        access: "w"
    role_action: add
```

The construct needs to match the json format of the management authorization api.
Below is a sample

```
        {
            "users": null,
            "groups": null,
            "features": [
                {
                    "name": "events.page_title",
                    "access": "w"
                },
                {
                    "name": "webseal_manage_log_files",
                    "access": "w"
                },
                {
                    "name": "webseal_application_logs",
                    "access": "w"
                },
                {
                    "name": "audit_configuration_menu",
                    "access": "w"
                },
                {
                    "name": "mobile_runtime_tracing_menu",
                    "access": "w"
                },
                {
                    "name": "memory_graph",
                    "access": "w"
                },
                {
                    "name": "cpu_graph",
                    "access": "w"
                },
                {
                    "name": "storage_graph",
                    "access": "w"
                },
                {
                    "name": "application_interfaces_statistics",
                    "access": "w"
                },
                {
                    "name": "webseal_menu_reverse_proxy_traffic",
                    "access": "w"
                },
                {
                    "name": "webseal_menu_reverse_proxy_throughput",
                    "access": "w"
                },
                {
                    "name": "webseal_common_components",
                    "access": "w"
                },
                {
                    "name": "webseal_instances",
                    "access": "w"
                },
                {
                    "name": "authz_instances",
                    "access": "w"
                },
                {
                    "name": "dsc_admin",
                    "access": "w"
                },
                {
                    "name": "wpm_policy_administration",
                    "access": "w"
                },
                {
                    "name": "webseal_menu_dynamic_url",
                    "access": "w"
                },
                {
                    "name": "webseal_menu_jmt",
                    "access": "w"
                },
                {
                    "name": "webseal_menu_um_cdas",
                    "access": "w"
                },
                {
                    "name": "webseal_menu_unm_cdas",
                    "access": "w"
                },
                {
                    "name": "webseal_menu_pwd_strength",
                    "access": "w"
                },
                {
                    "name": "webseal_menu_forms_based_sso",
                    "access": "w"
                },
                {
                    "name": "webseal_menu_http_tran",
                    "access": "w"
                },
                {
                    "name": "webseal_kerberos_config",
                    "access": "w"
                },
                {
                    "name": "rsa_config",
                    "access": "w"
                },
                {
                    "name": "webseal_isam_key",
                    "access": "w"
                },
                {
                    "name": "webseal_menu_ltpa_key_files",
                    "access": "w"
                },
                {
                    "name": "mobile_access_control_menu",
                    "access": "w"
                },
                {
                    "name": "mobile_authentication_menu",
                    "access": "w"
                },
                {
                    "name": "mobile_risk_profiles_menu",
                    "access": "w"
                },
                {
                    "name": "mobile_attributes_menu",
                    "access": "w"
                },
                {
                    "name": "mobile_obligations_menu",
                    "access": "w"
                },
                {
                    "name": "mobile_api_protection_menu",
                    "access": "w"
                },
                {
                    "name": "mobile_pip_menu",
                    "access": "w"
                },
                {
                    "name": "mobile_extensions_menu",
                    "access": "w"
                },
                {
                    "name": "mobile_devices_menu",
                    "access": "w"
                },
                {
                    "name": "runtime_database_menu",
                    "access": "w"
                },
                {
                    "name": "mobile_advanced_config",
                    "access": "w"
                },
                {
                    "name": "webseal_user_registry",
                    "access": "w"
                },
                {
                    "name": "mobile_runtime_parameters_menu",
                    "access": "w"
                },
                {
                    "name": "mga_template_files",
                    "access": "w"
                },
                {
                    "name": "mga_mapping_rules",
                    "access": "w"
                },
                {
                    "name": "mga_access_policies",
                    "access": "w"
                },
                {
                    "name": "alias_settings_menu",
                    "access": "w"
                },
                {
                    "name": "mobile_server_connections_menu",
                    "access": "w"
                },
                {
                    "name": "tfim_federations",
                    "access": "w"
                },
                {
                    "name": "tfim_sts",
                    "access": "w"
                },
                {
                    "name": "manage_attribute_source",
                    "access": "w"
                },
                {
                    "name": "alias_service",
                    "access": "w"
                },
                {
                    "name": "grants",
                    "access": "w"
                },
                {
                    "name": "manage_partner_templates",
                    "access": "w"
                },
                {
                    "name": "geolocation_data_menu",
                    "access": "w"
                },
                {
                    "name": "network_configuration",
                    "access": "r"
                },
                {
                    "name": "felb",
                    "access": "r"
                },
                {
                    "name": "hosts_file",
                    "access": "r"
                },
                {
                    "name": "webseal_packet_tracing",
                    "access": "w"
                },
                {
                    "name": "cluster_configuration",
                    "access": "r"
                },
                {
                    "name": "applog_lang",
                    "access": "w"
                },
                {
                    "name": "webseal_kdb",
                    "access": "w"
                },
                {
                    "name": "webseal_file_downloads",
                    "access": "r"
                },
                {
                    "name": "apollo",
                    "access": "w"
                },
                {
                    "name": "scim_configuration",
                    "access": "w"
                },
                {
                    "name": "rsyslog_forwarder",
                    "access": "w"
                },
                {
                    "name": "push_notification_registration",
                    "access": "w"
                },
                {
                    "name": "mga_mmfa_config",
                    "access": "w"
                },
                {
                    "name": "mga_point_of_contact",
                    "access": "w"
                },
                {
                    "name": "trial",
                    "access": "w"
                }
            ],
            "name": "Security Administrator"
        },

```
