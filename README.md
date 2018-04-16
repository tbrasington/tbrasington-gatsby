Based off https://github.com/AustinGreen/gatsby-starter-netlify-cms

### cmds

```
$ npm run develop
```
To test the CMS locally, you'll need run a production build of the site:
```
$ npm run build
$ npm run serve
```
 

 Currently using this fork to resovle relative paths with gatsby-remark-images and netlifycms https://github.com/netlify/netlify-cms/issues/325#issuecomment-350791947
 https://github.com/fk/netlify-cms/commit/2ebbed8e86b17dce4fa8a9dfd8822275d73361d1 


 ## Custom components



<full-bleed-image  comptype="image" asset="/img/nyc-project-concepts.png"  inset caption="Early concept art"></full-bleed-image>

<full-bleed-image  comptype="image" asset="/img/nyc-project-concepts.png" ></full-bleed-image>

<full-bleed-image comptype="image" asset="/img/pressure-p.jpg" inset></full-bleed-image>

<full-bleed-video comptype="video" videosrc="/img/nyc.mp4" inset caption="video art"></full-bleed-video>

{src:"\/img/bby-v3-concept1.jpg", span: 8}, {src:"/img/bby-v3-concept2.jpg", span: 6},{src:"/img/bby-v3-concept3.jpg", span: 2},{src:"/img/bby-v3-concept4.jpg", span: 2}