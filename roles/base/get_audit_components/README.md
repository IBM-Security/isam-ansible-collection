# base.get_audit_components

# Usage

There's 3 options that can all be used at once.

## Return all groups

    base_audit_getall: true

## Set this to `runtime` or `management`, to enable getting components by type

    base_audit_type_id: runtime

## Set this to a group name, to get the component

    base_audit_group_name: Account Locked

## Return value


Depending on the enabled options, you get (max) 3 variables that contain a list of the components.

```yaml
base_audit_components_name.data
base_audit_components_type.data
base_audit_components_all.data
```


The returned components will then look something like this.
```yaml
[
        {
            "enabled": true,
            "group": "User Authentication",
            "id": "1",
            "type": "Runtime"
        },
        {
            "enabled": true,
            "group": "Data Encryption",
            "id": "2",
            "type": "Runtime"
        },
...
```

By using `-v` , you'll see debug output.
