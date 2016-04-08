build /----------------------
sudo docker build -t paw .

run /----------------
sudo docker run paw
sudo docker run -i -t --rm paw /bin/bash
sudo docker run -p 3003:3003 -d paw

--------------------------

sudo docker ps -> list docker continers
sudo docker stop 8ddb93a48ac4 -> stop container
sudo docker exec -it 8ddb93a48ac4 /bin/bash -> access container




Edit the /etc/default/docker file:

$ echo 'DOCKER_OPTS="-b=bridge0"' >> /etc/default/docker

Then restart the Docker server.

$ sudo service docker start
