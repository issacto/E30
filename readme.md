

Backend
docker build -t issactototototo/musicrec-backend .
docker run --rm -p 5000:5000 issactototototo/musicrec-backend
docker build -t issactototototo/musicrec-frontend .
docker run --rm -p 3000:3000 issactototototo/musicrec-frontend


ibmcloud cs workers --cluster ca2kmoed0mj7n9l7jn2g


kubectl describe service bb-entrypoint | grep NodePort


Google Cloud Build, Registry, Run


GraphQL, NextJS, Kubernetes