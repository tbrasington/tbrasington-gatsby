// re work of remark images to suit my needs
// to handle custom component assets

const select = require(`unist-util-select`)
const path = require(`path`)
const isRelativeUrl = require(`is-relative-url`)
const _ = require(`lodash`)
const { sizes } = require(`gatsby-plugin-sharp`)
const Promise = require(`bluebird`)
const cheerio = require(`cheerio`)
const slash = require(`slash`)

module.exports = (
  { files, markdownNode, markdownAST, pathPrefix, getNode, reporter },
  pluginOptions
) => {
  const defaults = {
    maxWidth: 650,
    pathPrefix,
  }

  const options = _.defaults(pluginOptions, defaults)
  let customAssetNodes = select(markdownAST, `[value*="asset"]`)
  let galleryAssetNodes = select(markdownAST, `[value*="gallerycontent"]`)

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
// console.log('imageNodeimageNodeimageNodeimageNode\n\n');
// console.log(files)

// console.log('=========imageNodeimageNodeimageNodeimageNode-------\n\n');


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

   
  const generateGalleryNodes = async function(node, resolve) {

    let str = node.value;
    const re = /gallerycontent='(.*?)'/g
    let found = str.match(re);
    console.log('generate gallery nodes \n\n ')
    if(found) {
      
     const pattern = /'(.*?)'/g
     let galleryContentRemoved = found[0].match(pattern);
     let stringData ='['+ galleryContentRemoved[0].replace(/'/g,'') +']' ;


      let data = JSON.parse(stringData)
 
      console.log('start data set\n\n ')
      console.log(data)

      const parentNode = getNode(markdownNode.parent)
      const abspath = path.dirname(parentNode.dir).split('src')

      console.log('parentNode '+parentNode)
   console.log('abspath '+abspath)

Promise.all(
      _.each(data, (item)=>{

        new Promise(async (resolve, reject) => {
        console.log(item)
        let imagePath = slash(path.resolve(abspath[0] + 'static'+item.src));

        const imageNode = _.find(files, file => {
          if (file && file.absolutePath) { 
            return file.absolutePath === imagePath
          }
        });
        console.log(imageNode);

        let responsiveSizesResult =await sizes({
          file: imageNode,
          args: options,
          reporter,
        })

        console.log(responsiveSizesResult);
        return resolve(responsiveSizesResult);
      })
      })    
      )
      
        


   // console.log(found[1])
      console.log('end data set \n\n')
      return node.value
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
    ),

    galleryAssetNodes.map(
      node =>
        new Promise(async (resolve, reject) => {
    
          console.log('\nWe have gallery nodes\n\n')
          const rawHTML = await generateGalleryNodes(node, resolve)
          node.type = `html`
          node.value = rawHTML;

          return resolve(node);
        }
      )
    )
  )
}