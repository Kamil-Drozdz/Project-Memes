# meme-frontend

Manual update project in production environment (`memy.kamildrozdz.pl`):

```shell
cd ~/docker/meme-frontend \
  && git fetch && git pull \
  && docker stop memefrontend \
  && docker rm memefrontend \
  && docker build -t memefrontend:1.0.0 --target app-prod . \
  && docker run --name memefrontend --restart unless-stopped -itd --network rutilities_net memefrontend:1.0.0
```
