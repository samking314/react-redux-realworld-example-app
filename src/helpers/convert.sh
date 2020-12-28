#!/bin/bash
input="./src/constants/actionTypes.js"
output="./src/actions.index.js"
while read -r line || [[ -n "$line" ]]
do
  var1=$(echo $line | cut -f2 -d\')
  var2=$(echo "${var1//_}")
  var3=$(echo "$var2" | tr '[:upper:]' '[:lower:]')
done < "$input"