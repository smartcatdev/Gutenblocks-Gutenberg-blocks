#!/bin/bash

zip -r release.zip . -x "*scripts*" -x "*node_modules*" -x "*wordpress*" -x "*webpack.*.js" -x ".*" -x "*.lock" -x "*package.json"