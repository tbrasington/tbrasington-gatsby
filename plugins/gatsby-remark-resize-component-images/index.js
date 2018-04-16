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
 // let galleryAssetNodes = select(markdownAST, `[value*="gallerycontent"]`)

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
        const srcArray =`  sizeData = "${encodeURIComponent(JSON.stringify(responsiveSizesResult))}" `;
        const tagSplit = node.value.split(">");
        const newTag = tagSplit[0] + srcArray + ">";
        // console.log(('newTag\n\n'));
        // console.log((newTag));
         
        return newTag;

    } else {
      return resolve();
    }
  }


  // const generateGalleryNodes = async function(node, resolve) {

  //   let str = node.value;
  //   const re = /gallerycontent='(.*?)'/g
  //   let found = str.match(re);
  //   console.log('gallery node\n')
  //   console.log(node)
  //   console.log(getNode(node))
  //   console.log('end gallery node\n')
  //   if(found) {

  //    const pattern = /'(.*?)'/g
  //    let galleryContentRemoved = found[0].match(pattern);
  //    let stringData ='['+ galleryContentRemoved[0].replace(/'/g,'') +']' ;
  //    let data = JSON.parse(stringData);
  //    const parentNode = getNode(markdownNode.parent);
  //    const abspath = path.dirname(parentNode.dir).split('src');
  //    console.log('start data set\n\n ')
 
  //     //let promise = new Promise(function (resolve, reject) {
  //      let responsiveDataSet=[];
  //      return Promise.all(
  //        data.map(
  //         (item,index)=> {
  //           responsiveDataSet[index]={};
  //           responsiveDataSet[index] = item;

  //           return new Promise(async (resolve, reject) => {
  //             responsiveDataSet[index].sizeData = await responsiveSet(abspath,item,resolve)
  //             return resolve(`<gallery-grid-item sizeData = "${encodeURIComponent(JSON.stringify(responsiveDataSet[index].sizeData))}"></gallery-grid-item>` );
  //           })
  //          })
  //       ).then(function(galleryTags) {
  //         console.log("done");

  //         // let newTag = `<gallery-grid>${galleryTags.map((item)=>{return item} )}`//</gallery-grid>
  //          let newTag = "<gallery-grid>"//</gallery-grid>
  //           return newTag;
  //       });

  //   } else {
  //     return resolve();
  //   }
  // }


  
  // const responsiveSet = async function(abspath, item,resolve) {
  //   console.log('am i even been called')
  //   let imagePath = slash(path.resolve(abspath[0] + 'static'+item.src));

  //   const imageNode = _.find(files, file => {
  //     if (file && file.absolutePath) { 
  //       return file.absolutePath === imagePath
  //     }
  //   });

  //   let responsiveSizesResult =await sizes({
  //     file: imageNode,
  //     args: options,
  //     reporter,
  //   });

  //   if (!responsiveSizesResult) {
  //     return resolve()
  //   }
  //   // console.log('size results \n\n')
  //   // console.log(responsiveSizesResult)
  //   return responsiveSizesResult;
  // }

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
    // ,

    // galleryAssetNodes.map(
    //   node =>
    //     new Promise(async (resolve, reject) => {
    
    //       console.log('\nWe have gallery nodes\n\n')
    //       const rawHTML = await generateGalleryNodes(node, resolve)

    //       console.log(node)
    //       node.type = `html`
    //       node.value = rawHTML;
    //       return resolve(node);
    //     }
    //   )
    // )
  )
}