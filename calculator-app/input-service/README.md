curl -H 'Content-Type: application/json' \
      -d '{ "op":"add","num1":"10", "num2": 10}' \
      -X POST \
      http://localhost:4000/input/


curl -H 'Content-Type: application/json' \
      -d '{ "op":"mul","num1":"10", "num2": 10}' \
      -X POST \
      http://demo-input-service:9000/input/

