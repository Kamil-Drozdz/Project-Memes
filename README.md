<h4>
    <a href="https://memy.vercel.app/">View Demo</a>
  <span> · </span>
    <a href="https://github.com/Kamil-Drozdz/Project-Memes/issues">Report Bug</a>
  <span> · </span>
    <a href="https://github.com/Kamil-Drozdz/Project-Memes/issues">Request Feature</a>
  </h4>
</div>

<br />

<!-- Table of Contents -->
# :notebook_with_decorative_cover: Table of Contents

- [About the Project](#star2-about-the-project)
  * [Video](#camera-screenshots)
- [Contact](#handshake-contact)


  

<!-- About the Project -->
## :star2: About the Project
Fullstack application with PHP on the backend and  React and TailwindCSS on the frontend. Meme aggregate with infinity scroll, liking, commenting, dynamically adding images with canvas, and sorting on the database level. Written using best programming practices, like gitflow, reviews, resolving conflicts, etc  - we are transitioning from Create React App (CRA) to Vite. Furthermore, we're also evolving from JavaScript to TypeScript, ensuring enhanced type safety and code quality, in addition, the context api has been changed to a more scalable redux.

<!-- Screenshots -->
### :camera: Video
https://github.com/Kamil-Drozdz/Project-Memes/assets/108432936/99456642-9ed9-45d2-8a80-8a8f0586daf2
<!-- Contact -->
## :handshake: Contact

<h3 align="left">Connect with me:</h3>
<p align="left">
 <a href="https://kamildrozdz.pl" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/kaggle.svg" alt="kamildrozdz.pl" height="30" width="40" /></a>
<a href="https://linkedin.com/in/kamil-dróżdż-919595198/" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="kamil-dróżdż-919595198/" height="30" width="40" /></a>
</p>

Projects Link: [Other projects](https://github.com/Kamil-Drozdz?tab=repositories)

Manual update project in production environment (`memy.kamildrozdz.pl`):

```shell
cd ~/docker/meme-frontend \
  && git fetch && git pull \
  && docker stop memefrontend \
  && docker rm memefrontend \
  && docker build -t memefrontend:1.0.0 --target app-prod . \
  && docker run --name memefrontend --restart unless-stopped -itd --network rutilities_net memefrontend:1.0.0
```
