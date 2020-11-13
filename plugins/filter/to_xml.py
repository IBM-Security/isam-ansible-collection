#!/usr/bin/python
# ported sample from https://sourceforge.net/p/yaml/mailman/message/8986251/ to ansible

from __future__ import (absolute_import, division, print_function)
__metaclass__ = type

from ansible.module_utils._text import to_text

# Transform yaml list e.g. (authentication policy):
#       - name: Policy
#         attributes:
#           xmlns: urn:ibm:security:authentication:policy:1.0:schema
#           PolicyId: urn:ibm:security:authentication:asf:test_auth_policy_1
#         children:
#           - name: Step  
#             attributes:
#               type: Authenticator
#             children:
#               - name: Authenticator
#                 attributes:
#                   AuthenticatorId: urn:ibm:security:authentication:asf:mechanism:info_map
# to xml: 
#   <Policy xmlns=\"urn:ibm:security:authentication:policy:1.0:schema\" PolicyId=\"urn:ibm:security:authentication:asf:test_auth_policy_1\"><Step type=\"Authenticator\"><Authenticator AuthenticatorId=\"urn:ibm:security:authentication:asf:mechanism:info_map\"/></Step></Policy>
# or nice xml: 
# <Policy xmlns=\"urn:ibm:security:authentication:policy:1.0:schema\" PolicyId=\"urn:ibm:security:authentication:asf:test_auth_policy_1\">
#   <Step type=\"Authenticator\">
#     <Authenticator AuthenticatorId=\"urn:ibm:security:authentication:asf:mechanism:info_map\"/>
#   </Step>
# </Policy>



def convertYaml2XmlAux(inobj, out=[]):
    if isinstance(inobj, list):
        for obj in inobj:
            if isinstance(obj, dict) and 'name' in obj:
                out.append('<%s' % obj['name'])
                if 'attributes' in obj:
                    for key in obj['attributes']:
                        out.append(' %s="%s"' % (key, obj['attributes'][key]))
                if not ('children' in obj or 'text' in obj):
                    out.append('/>')
                else:
                    out.append('>')
                    if 'text' in obj:
                        out.append(obj['text'])
                    if 'children':
                        convertYaml2XmlAux(obj['children'], out)
                    out.append('</%s>' % obj['name'])
    else:
        # leave data unchanged, if not of type dict and still inital value
        if (out == []):
            out = inobj
    
    if isinstance(out, list):
        out = to_text("".join(out))
    
    return out

def convertYaml2NiceXmlAux(inobj, level=0, indent=2, out=[]):
    if isinstance(inobj, list):
        for obj in inobj:
            if isinstance(obj, dict) and 'name' in obj:
                addLevel(level=level, indent=indent, out=out)
                out.append('<%s' % obj['name'])
                if 'attributes' in obj:
                    for key in obj['attributes']:
                        out.append(' %s="%s"' % (key, obj['attributes'][key]))
                if not ('children' in obj or 'text' in obj):
                    out.append('/>\n')
                else:
                    if 'children' in obj:
                        out.append('>\n')
                    else:
                        out.append('>')
                    if 'text' in obj:
                        out.append(obj['text'])
                    if 'children':
                        convertYaml2NiceXmlAux(inobj=obj['children'], level=(level + 1), out=out)
                        addLevel(level=level, indent=indent, out=out)
                    out.append('</%s>\n' % obj['name'])
    else:
        # leave data unchanged, if not of type dict and still inital value
        if (out == []):
            out = inobj
    
    if isinstance(out, list):
        out = to_text("".join(out))
    
    return out

#
# Utility functions.
#
def addLevel(level, indent, out):
    for idx in range(level):
        out.append(' '*indent)

class FilterModule(object):
    def filters(self):
        return {
            'to_xml': convertYaml2XmlAux,
            'to_nice_xml': convertYaml2NiceXmlAux
        }
