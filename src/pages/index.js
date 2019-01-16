import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

const Home = ({data}) => {
	const content = data.allMarkdownRemark.edges[0].node;
	return (

		<Layout>
			<div className="home" dangerouslySetInnerHTML={{ __html: content.html }}></div>
		</Layout>
	);
};

export default Home;

export const query = graphql`
	query {
		allMarkdownRemark(filter: {frontmatter: {title: {eq:"Home"}}}) {
			edges {
				node {
					html
				}
			}
		}
	}
`
