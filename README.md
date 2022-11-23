# fractal-challenge

NPM install.

node index.js to initiate mqtt client.

Publish messages to challenge's given list of child topics.

Parent topic will receive a '1' upon all child topics having a last status of '1', a '0' every time else.
