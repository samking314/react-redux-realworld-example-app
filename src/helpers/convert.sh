#!/bin/bash
input="./src/constants/actionTypes.js"
output="./src/actions.index.js"
while read -r line || [[ -n "$line" ]]
do
  var1=$(echo $line | cut -f2 -d\')
  echo "$var1,"
  var2=$(echo "${var1//_}")
  var3=$(echo "$var2" | tr '[:upper:]' '[:lower:]')
  echo "export const $var3 = createAction($var1);" >> output
done < "$input"