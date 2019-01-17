module.exports = {
	siteMetadata: {
		title: 'Yank and Brit Art',
		description: 'Acrylic Paintings and Home Decor',
		metaDescription: 'Art Blog and Gallery of Katie Rogala',
	},
	plugins: [
		'gatsby-plugin-sharp',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'src',
				path: `${__dirname}/src/`,
			},
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 1000,
							linkImagesToOriginal: false,
							quality: 100,
						},
					},
				],
			},
		},
		`gatsby-plugin-sass`,
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-netlify-cms`
	],
}