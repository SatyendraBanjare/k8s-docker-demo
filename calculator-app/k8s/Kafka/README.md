1. Setup the ingress-controller
2. edit the local directory path in volume.yaml
3. deploy all resources mentioned.

TIP :
===
check kafka message for a topic by :
```
kcat -C -b <Broker> -t <topic Name>

example :
kcat -C -b local-kafka:9092 -t test 
```
