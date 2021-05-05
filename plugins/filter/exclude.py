from __future__ import (absolute_import, division, print_function)
__metaclass__ = type


def exclude(a, b):
    temp = a.copy()
    if isinstance(a, dict):
        temp.pop(b, None)
    return temp


class FilterModule(object):
    def filters(self):
        return {
            'exclude': exclude
        }
