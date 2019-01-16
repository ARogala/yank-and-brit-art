const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
	const { createNodeField } = actions;
	if (node.internal.type === `MarkdownRemark`) {
		const slug = createFilePath({ node, getNode, basePath: `src` });
		console.log('slug: ', slug);
		createNodeField({
			node,
			name: 'slug',
			value: slug
		});
	}
}
