# Introduction

The purpose of this repo is the stub for the performance environment mocking the following end points:
POST /v1/drivers/retrieve
POST /v1/authenticate

#Purpose
This should be used to replicate the current behaviour of the DVLA service for performance testing and in the future for functional testing.

#Use
Using these endpoints, it should allow the stub to retrieve any given eligibility details for a DLN, the authenticate POST is there to return 200.

# Installation

1. Install azure-functions-core-tools using homebrew

`brew tap azure/functions`

`brew install azure-functions-core-tools@4`

Note before installing make sure nvm is version 7 or greater to ensure peer dependencies install

Check by running `nvm --version` and update with `npm install -g npm@7.9.0`

2. Install:

`npm i`

# Build, Run and Test

Build:

`npm run build`

Run:

`npm run func:start`

#Testing
To run unit tests:

`npm run test`
