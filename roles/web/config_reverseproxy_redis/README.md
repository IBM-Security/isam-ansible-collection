---
# Redis configuration in WebSEAL

This role performs the Redis configuration tasks in WebSEAL.

To enable Redis as distributed session solution, you also need to set `dsess-enabled` and `dsess-server-type` in the session stanza.
  

    [session] 
    dsess-enabled = yes
    dsess-server-type = redis