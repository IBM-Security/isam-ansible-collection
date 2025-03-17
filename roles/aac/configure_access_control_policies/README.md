# configure_access_control_policies

## json formatting

To provide json formatted policies, you can simply use yaml in the configuration like below:

````yaml
access_control_policies:
  - name: New_Policy
    attributesrequired: false
    description: "New Policy Description"
    dialect: "urn:oasis:names:tc:xacml:2.0:policy:schema:os"
    formatting: json
    policy:
      PolicyTag: urn:ibm:security:isam:8.0:xacml:2.0:config-policy
      PolicyName: New_Policy
      PolicySet:
        Policy:
          - RuleCombiningAlgId: urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:first-applicable
            Rule:
              Condition:
                Apply:
                  - FunctionId: urn:oasis:names:tc:xacml:1.0:function:and
                    Apply:
                      - FunctionId: urn:oasis:names:tc:xacml:1.0:function:any-of-any
                        Function:
                          FunctionId: urn:oasis:names:tc:xacml:1.0:function:integer-equal
                        Apply:
                          - FunctionId: urn:oasis:names:tc:xacml:1.0:function:integer-bag
                            AttributeValue:
                              DataType: http://www.w3.org/2001/XMLSchema#integer
                              content: 2
                        SubjectAttributeDesignator:
                          - AttributeId: urn:ibm:security:subject:authenticationLevel
                            MustBePresent: false
                            DataType: http://www.w3.org/2001/XMLSchema#integer
              RuleId: urn:ibm:security:rule:0
              Effect: Permit
            PolicyId: urn:ibm:security:rule-container:0
        PolicyCombiningAlgId: urn:oasis:names:tc:xacml:1.0:policy-combining-algorithm:deny-overrides
        Description: New Policy Description
````

## xml formatting

in the xml formatting it is trickier to get the policy in a correct xml format

````yaml
access_control_policies:
  - name: test_access_policy
    attributesrequired: false
    description: ""
    dialect: "urn:oasis:names:tc:xacml:2.0:policy:schema:os"
    formatting: xml
    predefined: False
    policy: '<PolicySet xmlns=\"urn:oasis:names:tc:xacml:2.0:policy:schema:os\" PolicySetId=\"urn:ibm:security:config-policy\" PolicyCombiningAlgId=\"urn:oasis:names:tc:xacml:1.0:policy-combining-algorithm:first-applicable\">
             <Description></Description>
             <PolicySet xmlns="urn:oasis:names:tc:xacml:2.0:policy:schema:os" xmlns:xacml-context="urn:oasis:names:tc:xacml:2.0:context:schema:os" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:oasis:names:tc:xacml:2.0:policy:schema:os http://docs.oasis-open.org/xacml/access_control-xacml-2.0-policy-schema-os.xsd" PolicySetId="urn:ibm:security:config-policy" PolicyCombiningAlgId="urn:oasis:names:tc:xacml:1.0:policy-combining-algorithm:deny-overrides"><Description/><Target/><Policy PolicyId="urn:ibm:security:rule-container:0" RuleCombiningAlgId="urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:first-applicable"><Target/><Rule RuleId="urn:ibm:security:rule:0" Effect="Permit"/></Policy></PolicySet>'
````
