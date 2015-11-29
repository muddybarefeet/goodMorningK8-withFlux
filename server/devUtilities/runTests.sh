#!/bin/bash
#run in bash mode . runTests.sh 

#call the terminal command from this file to run the clear db file

#delete exisiting
cat ~/Documents/programming/htmlCss/websites/gMK8Flux/server/devUtilities/cleardb.sql | psql -d gmk8

#read out the file and pipe it through the database(which computes it and then (>> means append the results to the bd.log file)
cat ~/Documents/programming/htmlCss/websites/gMK8Flux/server/devUtilities/schema.sql | psql -d gmk8

mocha ~/Documents/programming/htmlCss/websites/gMK8Flux/server/services/db/__tests/server_tests.js
