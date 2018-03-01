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
  const customAssetNodes = select(markdownAST, `[value*="asset"]`)
 
  //console.log(customAssetNodes)

  const generateImagesAndUpdateNode = async function(node, resolve) {

      var str = node.value;
      var re = /\asset="(.*?)\"/;
      var found = str.match(re);
      if(found) {
        const parentNode = getNode(markdownNode.parent)
        const abspath = path.dirname(parentNode.dir).split('src')

        const imagePath = slash(path.resolve(abspath[0] + 'static'+found[1]));

        const imageNode = _.find(files, file => {
          if (file && file.absolutePath) { 
            return file.absolutePath === imagePath
          }
        });

        let responsiveSizesResult = await sizes({
          file: imageNode,
          args: options,
          reporter,
        });
    
        if (!responsiveSizesResult) {
          return resolve()
        }
        
        const srcSet = responsiveSizesResult.srcSet;
        const srcArray =` assetSizes="${srcSet}" sizeData = "${encodeURIComponent(JSON.stringify(responsiveSizesResult))}" `;
        const tagSplit = node.value.split(">");
        const newTag = tagSplit[0] + srcArray + ">";
         
        return newTag;

    } else {
      return resolve();
    }
  }

  return Promise.all(
    // Simple because there is no nesting in markdown
    customAssetNodes.map(
      node =>
        new Promise(async (resolve, reject) => {

          const rawHTML = await generateImagesAndUpdateNode(node, resolve)
          node.type = `html`
          node.value = rawHTML;

          return resolve(node);
        }
      )
    )
  )
}