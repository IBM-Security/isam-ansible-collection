```yaml
config:
  - datatype: Integer
    key: ISAM.Audit.syslogclient.MAX_QUEUE_SIZE
    sensitive: false
    validValues: []
    value: "1000"
  - datatype: Integer
    key: ISAM.Audit.syslogclient.QUEUE_FULL_TIMEOUT
    sensitive: false
    validValues: []
    value: "-1"
  - datatype: String
    key: ISAM.Audit.syslogclient.TRANSPORT
    sensitive: false
    validValues: []
    value: TRANSPORT_UDP
  - datatype: Hostname
    key: ISAM.Audit.syslogclient.SERVER_HOST
    sensitive: false
    validValues: []
    value: 127.0.0.1
  - datatype: Integer
    key: ISAM.Audit.syslogclient.SERVER_PORT
    sensitive: false
    validValues: []
    value: "514"
  - datatype: Boolean
    key: ISAM.Audit.syslogclient.CLIENT_CERT_AUTH_REQUIRED
    sensitive: false
    validValues: []
    value: "false"
  - datatype: Integer
    key: ISAM.Audit.syslogclient.NUM_SENDER_THREADS
    sensitive: false
    validValues: []
    value: "1"
  - datatype: Integer
    key: ISAM.Audit.syslogclient.NUM_RETRY
    sensitive: false
    validValues: []
    value: "2"
  - datatype: Boolean
    key: ISAM.Audit.syslogclient.FAILOVER_TO_DISK
    sensitive: false
    validValues: []
    value: "false"
  - datatype: String
    key: ISAM.Audit.syslogclient.CLIENT_AUTH_KEY
    sensitive: false
    validValues: []
    value: _
  - datatype: String
    key: ISAM.Audit.syslogclient.SSL_TRUST_STORE
    sensitive: false
    validValues: []
    value: ""
  - datatype: String
    key: ISAM.Audit.syslogclient.TAG
    sensitive: false
    validValues: []
    value: ""
enabled: false
id: "1"
type: Syslog
useJSONFormat: false
verbose: false

```
