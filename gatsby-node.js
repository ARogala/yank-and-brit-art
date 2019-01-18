/*
step One generate the slug
add your new slugs directly onto the MarkdownRemark nodes
any data you add to nodes is available to query later with GraphQL.
So it’ll be easy to get the slug when it comes time to create the pages.
*/

const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
	const { createNodeField } = actions;
	if (node.internal.type === `MarkdownRemark`) {
		const slug = createFilePath({ node, getNode, basePath: `src` });
		createNodeField({
			node,
			name: 'slug',
			value: slug
		});
	}
}

/*
in step step Two we must
Query data with GraphQL
Map the query results to pages

*/
exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions;
	return new Promise((resolve, reject) => {
		resolve(
			graphql(
				`
					{
						posts: allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC } filter: { frontmatter: { category: {ne: null}}}) {
							edges {
								node {
									fields {
										slug
									}
									frontmatter {
										title
									}
								}
							}
						}
						galleryImgs: allFile(filter: { extension: { eq: "jpg" }, relativeDirectory: {eq: "img/gallery"} }) {
							edges {
								node {
									relativePath
								}
							}
						}
					}
				`
			).then(result => {
				if(result.errors) {
					console.log(result.errors);
					reject(result.errors);
				}

				// Create blog-posts pages.
				const posts = result.data.posts.edges;
				posts.forEach(({node}, index) => {
				const previous = index === posts.length - 1 ? null : posts[index + 1].node;
          		const next = index === 0 ? null : posts[index - 1].node;
					createPage({
						path: node.fields.slug,
						component: path.resolve('./src/templates/blog-post.js'),
						context: {
							// Data passed to context is available
	            			// in page queries as GraphQL variables.
	            			slug: node.fields.slug,
	            			previous,
	            			next
						}
					});
				});

				/* Create blog-list pages
				create enough pages to fit all posts (10posts / 2 postsPerPage) for 5 pages
				limit the graphql query to postsPerPage
				Skip the graphql query to the posts on that given page
				*/
				const postsPerPage = 10;
        		const numPages = Math.ceil(posts.length / postsPerPage);
				Array.from({length: numPages }).forEach((_, index) => {
					createPage({
						path: index === 0 ? `/blog` : `/blog/${index + 1}`,
						component: path.resolve('./src/templates/blog-list.js'),
						context: {
							limit: postsPerPage,
							skip: index*postsPerPage,
							numPages,
							currentPage: index + 1
						}
					});
				});

				// create gallery pages
				// note only use above query for the count of the number of
				// images in folder
				const galleryImgs = result.data.galleryImgs.edges;
				const picsPerPage = 10;
				const numGalleryPages = Math.ceil(galleryImgs.length / picsPerPage);
				Array.from({length: numGalleryPages }).forEach((_, index) => {
					createPage({
						path: index === 0 ? `/gallery` : `/gallery/${index + 1}`,
						component: path.resolve('./src/templates/gallery.js'),
						context: {
							limit: picsPerPage,
							skip: index*picsPerPage,
							numGalleryPages: numGalleryPages,
							currentPage: index + 1
						}
					});
				});
			})
		);
	});
}

/*
 	https://stackoverflow.com/questions/40528557/how-does-array-fromlength-5-v-k-k-work

	_ is a valid variable identifier

	Below is a clever trick to get forEach to run X number of times without actually useing
	an array.
	Array.from() method creates a new, shallow-copied Array instance from an array-like or iterable object.
	JavaScript uses ducktyping which basically means that Array.from() will not actully check
	if what it is passed is indeed an array object only that it has a property length "like an
	array has" and then creates a real array with length of X

	now just pass a dummyVar into forEach so it will run X times

*/

// Array.from({length: 4}).forEach((dummyVar, index) => {
// 	console.log(index);
// 	console.log(dummyVar);
// });