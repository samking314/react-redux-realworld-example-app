#!/bin/bash

input="./../constants/actionTypes.js"
output="./../actions/index.js"

# read action types and convert them into actions
while read -r line || [[ -n "$line" ]]
do
  var1=$(echo $line | cut -f2 -d\')
  var2=$(echo "${var1//_}")
  var3=$(echo "$var2" | tr '[:upper:]' '[:lower:]')
done < "$input"