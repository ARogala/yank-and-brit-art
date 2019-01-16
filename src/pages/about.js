import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

const About = ({data}) => {
	const content = data.allMarkdownRemark.edges[0].node;
	return (
		<Layout>
			<div className="about" dangerouslySetInnerHTML={{ __html: content.html }}></div>
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