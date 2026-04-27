# Contributing

Review the following guidelines for submitting questions, issues, or changes to this repository.
One of the most impactful changes would be examples and documentation.

## Coding Style

In general, coding guidelines are specific to the language used.

### Ansible

Please run `ansible-lint` and fix any issues found.

## Issues and Questions

If you encounter an issue, have a question or want to suggest an enhancement, you are welcome to submit a [request](/issues).
Before that, please search for similar issues. It's possible somebody has encountered this issue already.

## Pull Requests

If you want to contribute to the repository, here's a quick guide:

1. Fork the repository
2. Develop and test your code changes:
    * Follow the coding style as documented above.
    * Please add one or more tests to validate your changes.
3. Make sure everything builds/tests cleanly.
4. Commit your changes. Add a descriptive prefix to commits. The list allowed is as below:
   - `feat` for features
   - `fix` for bug fixes
   - `revert` for reversing a change
   - `docs` for documentation and examples
   - `style` for formatting and other related changes
   - `refactor` is self-explanatory
   - `test` for test case changes
   - `build` for build changes
   - `autogen` for any auto-generated code or documentation
   - `security` for any security fixes and enhancements
   - `ci` for changes to continuous integration
   - `chore` is self-explanatory
5. Push to your fork and submit a pull request to the `main` branch. Include the tests executed in the pull request.

### License header in source files

Each source file must include a license header for the Apache
Software License 2.0. Using the SPDX format is the simplest approach.
e.g.

```
/*
Copyright IBM Corp. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0
*/
```

### Sign your work

In accordance to the approach used by the Linux® Kernel [community](https://elinux.org/Developer_Certificate_Of_Origin) and described in the [Developer's Certificate of Origin 1.1 (DCO)](https://github.com/hyperledger/fabric/blob/master/docs/source/DCO1.1.txt),
we request that each contributor signs off their change by adding a `Signed-off-by` line to each commit message.

Here is an example Signed-off-by line, which indicates that the submitter accepts the DCO:

```
Signed-off-by: John Doe <john.doe@example.com>
```

You can include this automatically when you commit a change to your
local git repository using the following command:

```
git commit -s
```

## Additional Resources

* [General GitHub documentation](https://help.github.com/)
* [GitHub pull request documentation](https://help.github.com/send-pull-requests/)
