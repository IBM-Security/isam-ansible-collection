from __future__ import (absolute_import, division, print_function)
from ansible.errors import AnsibleFilterError
from ansible.module_utils.common.text.converters import to_native
__metaclass__ = type


def rename_key(a, **kw):
    """take incoming dictionary and rename keys to new names"""
    try:
        for k_old, k_new in kw.items():
            print(f"Renaming {k_old} to {k_new}")
            if k_old in a:
                if k_new in a:
                    print("Key exists, skip renaming.  Delete old key")
                    a.pop(k_old)
                else:
                    a[k_new] = a.pop(k_old)
    except Exception as e:
        raise AnsibleFilterError("rename_key - %s" % to_native(e), orig_exc=e)
    return a


class FilterModule(object):
    def filters(self):
        return {
            'rename_key': rename_key
        }
