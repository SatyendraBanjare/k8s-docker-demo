- direct-approach : Non Automated k8s template files which can be deployed in the k8s cluster
- ingress-controller : To setup ingress controller in the k8s cluster
- Kafka : To setup kafka in the cluster
- storage : local disk storage, to be used by calculator service
- Helm-charts-calculator-app : Helm charts for the calculator app

Steps :
=======

Create in this order :
1. namespaces : `calculator` & `kafka-cluster` & `ingress-nginx`
2. Deploy ingress-controller & edit local DNS configurations (Read ingress-controller/README.md)
3. Deploy Kafka (Read Kafka/README.md)
4. Deploy Calculator app via helm charts or direct approach

Test :
======
Send info to input service :
```
curl -H 'Content-Type: application/json' \
      -d '{ "op":"mul","num1":"10", "num2": 10}' \
      -X POST \
      http://demo-input-service:9000/input/
```

see output from output service :
```
curl http://demo-output-service:9001
```