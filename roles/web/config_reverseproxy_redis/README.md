---
# Redis configuration in WebSEAL

This role performs the Redis configuration tasks in WebSEAL.

By default, the reverse proxy will also be enabled with Redis as distributed session solution, (`dsess-enabled` and `dsess-server-type` are set in the session stanza).

    [session]
    dsess-enabled = yes
    dsess-server-type = redis

By setting the variable `dsess_enabled` to False, you can disable distributed sessions, however the role will still add the redis collections and servers to the WebSeal configuration.

The configuration parameters under the `redis` stanza are not processed in this role and are assigned their default values by the configuration wizard.

If you don't have a "redis_collections" object in the "instances" , the whole configuration is skipped anyway and there will be no changes to `dsess_enabled` !

The default collection will be set to the first collection that is configured (this is done automatically by the redis configuration wizard).

    [redis]
    # The name of the default collection of Redis servers to be used.
    default-collection-name = collection1
