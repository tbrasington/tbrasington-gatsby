// re work of remark images to suit my needs
// mainly removing the wrapper tags

const select = require(`unist-util-select`)
const path = require(`path`)
const isRelativeUrl = require(`is-relative-url`)
const _ = require(`lodash`)
const { sizes } = require(`gatsby-plugin-sharp`)
const Promise = require(`bluebird`)
const cheerio = require(`cheerio`)
const slash = require(`slash`)

// If the image is relative (not hosted elsewhere)
// 1. Find the image file
// 2. Find the image's size
// 3. Filter out any responsive image sizes that are greater than the image's width
// 4. Create the responsive images.
// 5. Set the html w/ aspect ratio helper.
module.exports = (
  { files, markdownNode, markdownAST, pathPrefix, getNode, reporter },
  pluginOptions
) => {
  const defaults = {
    maxWidth: 650,
    pathPrefix,
  }


  const options = _.defaults(pluginOptions, defaults)

  // This will only work for markdown syntax image tags
  const markdownImageNodes = select(markdownAST, `image`)

  // This will also allow the use of html image tags
  const rawHtmlNodes = select(markdownAST, `html`)

  // Takes a node and generates the needed images and then returns
  // the needed HTML replacement for the image
  const generateImagesAndUpdateNode = async function(node, resolve) {
    // Check if this markdownNode has a File parent. This plugin
    // won't work if the image isn't hosted locally.
    const parentNode = getNode(markdownNode.parent)
    let imagePath
    if (parentNode && parentNode.dir) {
     if( path.isAbsolute(node.url) ) {
      const abspath = path.dirname(parentNode.dir).split('src')
     imagePath = slash(path.resolve(abspath[0] + 'static'+node.url))
      //imagePath =   slash(path.join(abspath+ 'static', node.url))
     // console.log('imagePath ' + imagePath)
     }
     else {
      imagePath = slash(path.join(parentNode.dir, node.url))

     }
   
    } else {
      return null
    }

    const imageNode = _.find(files, file => {
      if (file && file.absolutePath) { 
        return file.absolutePath === imagePath
      }
     // return null
    })

    //console.log(imageNode)
    if (!imageNode || !imageNode.absolutePath) {
    //  console.log('resolving ' + imagePath)
      return resolve()
    }

    let responsiveSizesResult = await sizes({
      file: imageNode,
      args: options,
      reporter,
    })

    if (!responsiveSizesResult) {
      return resolve()
    }

    // Calculate the paddingBottom %
    const ratio = `${1 / responsiveSizesResult.aspectRatio * 100}%`

    const originalImg = responsiveSizesResult.originalImg
    const fallbackSrc = responsiveSizesResult.src
    const srcSet = responsiveSizesResult.srcSet
    const presentationWidth = responsiveSizesResult.presentationWidth

    // Generate default alt tag
    const srcSplit = node.url.split(`/`)
    const fileName = srcSplit[srcSplit.length - 1]
    const fileNameNoExt = fileName.replace(/\.[^/.]+$/, ``)
    const defaultAlt = fileNameNoExt.replace(/[^A-Z0-9]/gi, ` `)

    // TODO
    // Fade in images on load.
    // https://www.perpetual-beta.org/weblog/silky-smooth-image-loading.html

    // Construct new image node w/ aspect ratio placeholder
    let rawHTML = `
  <div
    class="gatsby-resp-image-wrapper"
   
  > 
      <img
        class="gatsby-resp-image-image"
        
        alt="${node.alt ? node.alt : defaultAlt}"
        title="${node.title ? node.title : ``}"
        src="${fallbackSrc}"
        srcset="${srcSet}"
        sizes="${responsiveSizesResult.sizes}"
      />
    </div> 
  `


    return rawHTML
  }

  return Promise.all(
    // Simple because there is no nesting in markdown
    markdownImageNodes.map(
      node =>
        new Promise(async (resolve, reject) => {
          const fileType = node.url.slice(-3)

          // Ignore gifs as we can't process them,
          // svgs as they are already responsive by definition
          if (
           
            fileType !== `gif` &&
            fileType !== `svg`
          ) {
            const rawHTML = await generateImagesAndUpdateNode(node, resolve)

            if (rawHTML) {
              // Replace the image node with an inline HTML node.
              node.type = `html`
              node.value = rawHTML
            }
            return resolve(node)
          } else {
            // Image isn't relative so there's nothing for us to do.
            return resolve()
          }
        })
    )
  ).then(markdownImageNodes =>
    // HTML image node stuff
    Promise.all(
      // Complex because HTML nodes can contain multiple images
      rawHtmlNodes.map(
        node =>
          new Promise(async (resolve, reject) => {
            if (!node.value) {
              return resolve()
            }

            const $ = cheerio.load(node.value)
            if ($(`img`).length === 0) {
              // No img tags
              return resolve()
            }

            let imageRefs = []
            $(`img`).each(function() {
              imageRefs.push($(this))
            })

            for (let thisImg of imageRefs) {
              // Get the details we need.
              let formattedImgTag = {}
              formattedImgTag.url = thisImg.attr(`src`)
              formattedImgTag.title = thisImg.attr(`title`)
              formattedImgTag.alt = thisImg.attr(`alt`)

              if (!formattedImgTag.url) {
                return resolve()
              }

              const fileType = formattedImgTag.url.slice(-3)

              // Ignore gifs as we can't process them,
              // svgs as they are already responsive by definition
              if (
                fileType !== `gif` &&
                fileType !== `svg`
              ) {
                const rawHTML = await generateImagesAndUpdateNode(
                  formattedImgTag,
                  resolve
                )

                if (rawHTML) {
                  // Replace the image string
                  thisImg.replaceWith(rawHTML)
                } else {
                  return resolve()
                }
              }
            }

            // Replace the image node with an inline HTML node.
            node.type = `html`
            node.value = $(`body`).html() // fix for cheerio v1

            return resolve(node)
          })
      )
    ).then(htmlImageNodes =>
      markdownImageNodes.concat(htmlImageNodes).filter(node => !!node)
    )
  )
}