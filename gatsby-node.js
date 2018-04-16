const path = require(`path`)
const _ = require("lodash");
const webpackLodashPlugin = require("lodash-webpack-plugin");
const { createFilePath } = require(`gatsby-source-filesystem`)


exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {

    const { createNodeField } = boundActionCreators    
    // const tagPages = new Set();
    // const categoryPages = new Set();
    // const writingPage = new Set();
    // const  writingIndex = new Set();
    // const genericPages = new Set();
    if (node.internal.type === `MarkdownRemark`) {

        if(node.frontmatter.templateKey==="blog-post") {
            // writingPage.add(node);
            const slug = createFilePath({ node, getNode, basePath: `pages` })
            createNodeField({
                node,
                name: `slug`,
                value: (node.frontmatter.path ?  node.frontmatter.path  : `/blog/${slug}`),
            });
        }

        if(node.frontmatter.templateKey==="blog-page") {
            // writingPage.add(node);
            const slug = createFilePath({ node, getNode, basePath: `pages` })
            createNodeField({
                node,
                name: `slug`,
                value: (node.frontmatter.path ? node.frontmatter.path : slug),
            });
        }
 
    }
}

exports.createPages = ({  graphql, boundActionCreators }) => {
    const { createPage } = boundActionCreators
 
    return new Promise((resolve, reject) => {
      graphql(`
      {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___templateKey] }, limit: 1000) {

          edges {
            node {
            frontmatter { 
                title
                tags
                templateKey
            }
              fields {
                slug
              }
            }
          }
        }
      }      
      `).then(result => {
       
        if (result.errors) {
            result.errors.forEach(e => console.error(e.toString()));
            return Promise.reject(result.errors);
         }

       // do we have tags 
        const entriesSet = new Set();
        const tagSet = new Set();
        const categorySet = new Set();
        const dataSet = result.data.allMarkdownRemark.edges;
        
        dataSet.map(({ node },index) => {

            if(node.frontmatter.templateKey==='blog-post') {

                entriesSet.add(node);
                
                if (node.frontmatter.tags) {
                    node.frontmatter.tags.forEach(tag => {
                    tagSet.add(tag);
                    });
                }

            }
            if(node.frontmatter.contentType==='blog-page') {
                createPage({
                    path: node.fields.slug,
                    component: path.resolve(`src/templates/blog.js`),
                    context: {
                        // Data passed to context is available in page queries as GraphQL variables.
                        slug: node.fields.slug,
                    },
                });
            }
           
        });
        

        const entriesList = Array.from(entriesSet);

        entriesList.forEach((entry,index) => {
           
            const prev = index === 0 ? null : entriesList[index - 1];
            const next = index === entriesList.length - 1 ? null : entriesList[index + 1];
 
            createPage({
                path: entry.fields.slug,
                component: path.resolve(`src/templates/post.js`),
                context: {
                    slug: entry.fields.slug,
                    next,
                    prev
                }
            });
        });

        const tagList = Array.from(tagSet);

        tagList.forEach(tag => {
            const tagSlug  = `/tags/${_.camelCase(tag)}/`;
            createPage({
                path: tagSlug,
                component: path.resolve(`src/templates/tags.js`),
                context: {
                    tag
                }
            });
        });

        //
        resolve()
      })
    });
  }

  exports.modifyWebpackConfig = ({ config, stage }) => {
    if (stage === "build-javascript") {
      config.plugin("Lodash", webpackLodashPlugin, null);
    }
  };