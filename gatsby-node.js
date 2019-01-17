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
					}
				`
			).then(result => {
				if(result.errors) {
					console.log(result.errors);
					reject(result.errors);
				}

				// Create blog posts pages.
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

				/* Create techblog pages
				create enough pages to fit all posts (10posts / 2 postsPerPage) for 5 pages
				limit the graphql query to postsPerPage
				Skip the graphql query to the posts on that given page
				*/
				// const postsPerPage = 10;
    //     		const numPages = Math.ceil(posts.length / postsPerPage);
				// Array.from({length: numPages }).forEach((_, index) => {
				// 	createPage({
				// 		path: index === 0 ? `/techblog` : `/techblog/${index + 1}`,
				// 		component: path.resolve('./src/templates/blog-list.js'),
				// 		context: {
				// 			limit: postsPerPage,
				// 			skip: index*postsPerPage,
				// 			numPages,
				// 			currentPage: index + 1
				// 		}
				// 	});
				// });
			})
		);
	});
}