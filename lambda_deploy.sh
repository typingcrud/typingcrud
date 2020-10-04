#!/bin/bash

zip_filename="lambda_zip_tmp"
functions=("typing_DELETE" "typing_GET" "typing_PATCH" "typing_POST" "typing_public_GET" "typing_user_DELETE" "typing_user_GET" "typing_user_PATCH" "typing_user_POST" "typingcrud_cognito_POST")

cd Lambda

if [ $# -ne 0 ]; then
  if [ "$1" = "-n" ]; then
    functions=("$2")
  else
    echo "invalid argument"
    exit 1
  fi
fi

for f in ${functions[@]}
do
  func_name="$f"

  cd $func_name

  echo "Zipping..."
  zip -rq $zip_filename.zip *

  echo "Uploading..."
  AWS_PROFILE=default aws lambda update-function-code  \
   --function-name $func_name  \
   --zip-file fileb://$zip_filename.zip

  echo "Cleaning..."
  rm $zip_filename.zip
  
  echo "Finished!"
  cd ..
done

exit 0;
