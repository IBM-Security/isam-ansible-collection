# configure_reverseproxy_junctions

Role to configure junctions, with a number of options.

The latest change includes the option to use set_all().

## EXAMPLES

    ansible-playbook -i [...] ibm.isam.web.configure_reverseproxy_junctions.yml // create and add all inventory defined junctions
    // create, add all inventory defined junctions and delete all junction servers or junctions that are missing from inventory
    ansible-playbook -i [...] ibm.isam.web.configure_reverseproxy_junctions.yml -e delete_junction_server=True -e delete_junctions=True
    // create and add inventory defined junctions for instance default only
    ansible-playbook -i [...] ibm.isam.web.configure_reverseproxy_junctions.yml -e inst_name=default
    ansible-playbook -i [...] ibm.isam.web.configure_reverseproxy_junctions.yml -e junction_point=/jct1 // do all tasks only if junction equals /jct1
    // if junction_point renamed in inventory to /jct2, then this command can reconfigure that junction server under the new name
    ansible-playbook -i [...] ibm.isam.web.configure_reverseproxy_junctions.yml -e junction_point=/jct2 -e delete_junction_server=True -e delete_junctions=True
    ansible-playbook -i [...] ibm.isam.web.configure_reverseproxy_junctions.yml -e junction_point=/jct1 -e force=True // re-configure junction /jct1
    ansible-playbook -i [...] ibm.isam.web.configure_reverseproxy_junctions.yml -e control_setall_junctions=True # Use the faster mode

## INVENTORY

      # configure /tcp1 junction for instance default
      instances:
        - inst_name: default
          junctions:
            # necessary parameters
            - junction_point: "/jct1"
              junction_type: "tcp"
              servers:
                - server_hostname: "localhost"
                  server_port: 443
            # all parameters
            - junction_point: "/jct2"
              junction_type: "tcp"                                      # Type of junction. The value is one of: tcp, ssl, tcpproxy, sslproxy, mutual. Default port for -t tcp is 80. Default port for -t ssl is 443.
              transparent_path_junction: "yes"                          # Specifies whether a transparent path junction is created. Valid value is "yes" or "no". This parameter is not valid for virtual junctions.
              basic_auth_mode: filter                                   # Defines how the Reverse Proxy server passes client identity information in HTTP basic authentication (BA) headers to the back-end server. The value is one of: filter (default), ignore, supply, gso.
              remote_http_header:                                       # Controls the insertion of Security Verify Access specific client identity information in HTTP headers across the junction. The value is an array containing a combination of: iv-user, iv-user-l, iv-groups, iv-creds or all. Note: This is an array of elements.
                - iv_user
                - iv_creds
                - iv_user_l
              scripting_support: "yes"                                  # Supplies junction identification in a cookie to handle script-generated server-relative URLs.
              stateful_junction: "yes"
              junction_hard_limit: 80                                   # Defines the hard limit percentage for consumption of worker threads. Valid value is an integer from "0" to "100".
              junction_soft_limit: 60                                   # Defines the soft limit percentage for consumption of worker threads. Valid value is an integer from "0" to "100".
              tfim_sso: "yes"                                           # Enables IBM Security Federated Identity Manager single sign-on (SSO) for the junction. Valid value is "yes" or "no"
              mutual_auth: "no"                                         # Specifies whether to enforce mutual authentication between a front-end Reverse Proxy server and a back-end Reverse Proxy server over SSL. Valid value is "yes" or "no".
              insert_ltpa_cookies: "yes"                                # Controls whether LTPA cookies are passed to the junctioned Web server. Valid value is "yes" or "no".
              insert_session_cookies: "no"                              # Controls whether to send the session cookie to the junctioned Web server. Valid value is "yes" or "no".
              version_two_cookies: "yes"                                # Specifies whether LTPA version 2 cookies (LtpaToken2) are used. Valid value is "yes" or "no".
              ltpa_keyfile_password: "'{{ '{{' }} ltpa_pwd {{ '}}' }}'" # Password for the key file that is used to encrypt LTPA cookie data.
              ltpa_keyfile: "ltpafile.key"                              # Location of the key file that is used to encrypt the LTPA cookie data.
              request_encoding: "utf8_uri"                              # Specifies the encoding to use when the system generates HTTP headers for junctions. Possible values for encoding are: utf8_bin, utf8_uri, lcp_bin, and lcp_uri.
              enable_basic_auth: "no"                                   # Specifies whether to use BA header information to authenticate to back-end server. Valid value is "yes" or "no".
              key_label: "key1_certificate"                             # The key label for the client-side certificate that is used when the system authenticates to the junctioned Web server.
              gso_resource_group: "gsogroup1"                           # The name of the GSO resource or resource group.
              junction_cookie_javascript_block: "inhead"                # Controls the junction cookie JavaScript block. The value should be one of: trailer, inhead, onfocus, xhtml10. Use trailer to append the junction cookie JavaScript to HTML page returned from back-end server. Use inhead to insert the JavaScript block between tags for HTML 4.01 compliance. Use onfocus to use the onfocus event handler in the JavaScript to ensure the correct junction cookie is used in a multiple-junction/multiple-browser-window scenario. Use xhtml10 to insert a JavaScript block that is HTML 4.01 and XHTML 1.0 compliant.
              client_ip_http: "no"                                      # Specifies whether to insert the IP address of the incoming request into an HTTP header for transmission to the junctioned Web server. Valid value is "yes" or "no".
              authz_rules: "yes"                                        # Specifies whether to allow denied requests and failure reason information from authorization rules to be sent in the Boolean Rule header (AM_AZN_FAILURE) across the junction. Valid value is "yes" or "no".
              fsso_config_file: "fsso.file"                             # The name of the configuration file that is used for forms based single sign-on.
              username: "user1"                                         # The Reverse Proxy user name. Used to send BA header information to the back-end server.
              password: "'{{ '{{' }} user1_password {{ '}}' }}'"        # The Reverse Proxy password. Used to send BA header information to the back-end server.
              delegation_support: "yes"                                 # This option is valid only with junctions that were created with the type of ssl or sslproxy. Indicates single sign-on from a front-end Reverse Proxy server to a back-end Reverse Proxy server.
              http2_junction: "no"                                      # Specifies whether the junction supports the HTTP/2 protocol. By default, junctions do not support the HTTP/2 protocol. A valid value is "yes" or "no".
              http2_proxy: "no"                                         # Specifies whether the junction proxy support the HTTP/2 protocol. By default, junction proxies do not support the HTTP/2 protocol. A valid value is "yes" or "no".
              sni_name: "iexist.example.com"                            # The server name indicator (SNI) to send to TLS junction servers. By default, no SNI is sent. Any valid DNS name is permitted.
              description: "Test application point of contact"          # An optional description for this junction.
              servers:
                - server_hostname: "server1.example.com"                # The DNS host name or IP address of the target back-end server.
                  virtual_hostname: "idontexist.com:81"                 # Virtual host name that is used for the junctioned Web server. Optional: Add virtual host port [:port] to be used.
                  query_contents: /server2/cgi-bin/query                # Provides the Reverse Proxy with the correct name of the query_contents program file and where to find the file. By default, the Windows file is called query_contents.exe and the UNIX file is called query_contents.sh. By default, the Reverse Proxy looks for the file in the cgi_bin directory of the back-end Web server. Required for back-end Windows and UNIX Web servers.
                  https_port: 444                                       # HTTPS port of the back-end third-party server. Applicable when the junction type is ssl.
                  http_port: 81                                         # HTTP port of the back-end third-party server. Applicable when the junction type is tcp.
                  server_port: 443
                - server_hostname: "server2.example.com"
                  server_dn: "CN=server2.example.com"                   # Specifies the distinguished name of the junctioned Web server.
                  virtual_https_hostname: "idontexist.com:444"          # Virtual HTTPS host name that is used for the junctioned Web server. Optional: Add virtual host https port [:port] to be used.
                  case_sensitive_url: 'no'
                  windows_style_url: 'no'
                  vhost_label: "label2"                                 # Only applicable for virtual junctions. Causes a second virtual junction to share the protected object space with the initial virtual junction. This option is appropriate for junction pairs only (2 junctions with complementary protocols). The option does not support the association of more than 2 junctions.
                  server_uuid: server2_uuid                             # Specifies the UUID that will be used to identify the junctioned Web server. This field is used for stateful junctions.
                  proxy_hostname: proxy.ibm.com                         # The DNS host name or IP address of the proxy server. Applicable when the junction type is sslproxy.
                  proxy_port: 82                                        # The TCP port of the proxy server. Applicable when the junction type is tcpproxy.
                  sms_environment: vhostA.example.com                   # Only applicable for virtual junctions. Specifies the replica set that sessions on the virtual junction are managed under. The replica set also provides the ability to group or separate log in sessions among multiple virtual hosts. If this option is not used to specify the replica set, the virtual host junction is automatically assigned to a replica set matching its virtual host name. For example, if the virtual host name is vhostA.example.com, the replica set is named vhostA.example.com. The replica set used for the virtual host junction must be present in the [replica-sets] stanza of the Reverse Proxy configuration file. This option cannot be used in a non-DSC environment.
                  local_ip: "192.168.42.1"                              # Specifies the local IP address that the Reverse Proxy uses when the system communicates with the target back-end server. If this option is not provided, the Reverse Proxy uses the default address as determined by the operating system. If you supply an address for a particular junction, the Reverse Proxy is modified to bind to this local address for all communication with the junctioned server.
                  server_port: 443
