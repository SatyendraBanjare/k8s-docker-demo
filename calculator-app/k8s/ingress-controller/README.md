steps :
1. Install ingress nginx controller in the k8s-cluster by :
    ```
    helm upgrade --install ingress-nginx ingress-nginx \
    --repo https://kubernetes.github.io/ingress-nginx \
    --namespace ingress-nginx --create-namespace
    ```
2. Create service and config map resources in ingress-nginx namespace by :
    ```
    kubectl apply -f configMap.yaml
    kubectl apply -f ingress-service.yaml
    ```
3. Expose TCP ports via ingress like this : https://kubernetes.github.io/ingress-nginx/user-guide/exposing-tcp-udp-services/
4. Create DNS configurations manually by editing `/etc/hosts` like this :
    ```
    127.0.0.1       local-kafka
    127.0.0.1       demo-input-service
    127.0.0.1       demo-output-service
    ```
