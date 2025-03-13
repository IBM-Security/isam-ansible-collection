# Role ibm.isam.aac.configure_mmfa

Role to configure mmfa

```json
{
   "client_id":"<client_id>",
   "endpoints": {
     "details_url":"https://mySite.com:443/mga/sps/mmfa/user/mgmt/details",
     "enrollment_endpoint":"https://mySite.com:443/scim/Me",
     "hotp_shared_secret_endpoint":"https://mySite.com:443/mga/sps/mga/user/mgmt/otp/hotp",
     "totp_shared_secret_endpoint":"https://mySite.com:443/mga/sps/mga/user/mgmt/otp/totp",
     "qrlogin_endpoint":"https://mySite.com:443/mga/sps/apiauthsvc/policy/qrcode_response
     "token_endpoint":"https://mySite.com:443/mga/sps/oauth/oauth20/token",
     "authntrxn_endpoint":"https://mySite.com:443/scim/Me?attributes=urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Transaction:transactionsPending,urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Transaction:attributesPending",
     "mobile_endpoint_prefix":"https://mySite.com:443/mga"
   },
   "options":"ignoreSslCerts=true,bgColor=blue",
   "discovery_mechanisms":[
     "urn:ibm:security:authentication:asf:mechanism:mobile_user_approval:fingerprint",
     "urn:ibm:security:authentication:asf:mechanism:mobile_user_approval:user_presence"
   ]
}
```
