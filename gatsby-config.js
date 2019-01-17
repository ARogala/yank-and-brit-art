module.exports = {
	siteMetadata: {
		title: 'Yank And Brit Art',
		description: 'Acrylic Paintings and Home Decor',
		metaDescription: 'Art Blog and Gallery of Katie Rogala',
	},
	plugins: [
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'src',
				path: `${__dirname}/src/`,
			},
		},
		`gatsby-transformer-remark`,
		`gatsby-plugin-sass`,
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-netlify-cms`
	],
}