# openssl

Todo: make this into a prepare step, and don't put the generated files in git

    openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout test_certificate_privatekey.pem -out test_certificate_private.crt -subj "/C=US/O=IBM/OU=TEL/CN=192.168.1.11"

export to pkcs12

    openssl pkcs12 -export -out test_certificate.p12 -inkey test_certificate_privatekey.pem -in test_certificate_private.crt
