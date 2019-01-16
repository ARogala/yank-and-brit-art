import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

const About = ({data}) => {
	const content = data.allMarkdownRemark.edges[0].node;
	return (
		<Layout>
			<h2>About Me</h2>
			<div dangerouslySetInnerHTML={{ __html: content.html }}></div>
		</Layout>
	);
};

export default About;

export const query = graphql`
	query {
		allMarkdownRemark(filter: {frontmatter: {title: {eq:"About Me"}}}) {
			edges {
				node {
					html
				}
			}
		}
	}
`