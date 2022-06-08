## Instructions
* change localhost:5000 in 
* docker build -t issactototototo/musicrec-backend . && docker push issactototototo/musicrec-backend
* docker run --rm -p 5000:5000 issactototototo/musicrec-backend 
* docker build -t issactototototo/musicrec-frontend . && docker push issactototototo/musicrec-frontend
* docker run --rm -p 3000:3000 issactototototo/musicrec-frontend 
* kubectl apply -f frontend
* kubectl apply -f backend

## Check IP
* ibmcloud cs workers --cluster ca2kmoed0mj7n9l7jn2g
<!-- http://150.238.134.105:30001 -->
* kubectl describe service bb-entrypoint | grep NodePort