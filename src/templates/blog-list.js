import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';

import blogImg from '../img/blogPostImage.jpg';

class BlogList extends React.Component {
	render() {
		const posts = this.props.data.allMarkdownRemark.edges;
		const { currentPage, numPages } = this.props.pageContext;
		const isFirst = currentPage === 1;
    	const isLast = currentPage === numPages;
    	const prevPage = currentPage - 1 === 1 ? '/blog' : `/blog/${(currentPage - 1).toString()}`;
    	const nextPage = `/blog/${(currentPage + 1).toString()}`;
		return (
			<Layout>
				<div className="blog">
					<h1 className="blog__title">Art Blog</h1>
					<p>Welcome to my blog and thanks for visiting!</p>
					<h2 className="blog__recent">Recent Posts:</h2>
					{posts.map(({node}) => (
						<div key={node.id} className="blog__post">
							<div className="blog__imgbox">
								<img src={blogImg} alt="" />
							</div>
							<div>
								<Link to={node.fields.slug} className="blogLink">{node.frontmatter.title}</Link><br/>
								<span>Category: {node.frontmatter.category}</span><br/>
								<span>SubCategory: {node.frontmatter.subCategory}</span><br/>
								<span>{node.frontmatter.date}</span><br/>
								<p>Excerpt: {node.excerpt}</p>
							</div>
						</div>
					))}

					<Link to='/blog-archive' className="paginationLink">Blog Archive</Link>
					<div className="linkbox">
						<div>
							{
								!isFirst &&
								<Link to={prevPage} rel="prev" className="paginationLink">Previous Page</Link>
							}
						</div>
						<div>
							{
								!isLast &&
								<Link to={nextPage} rel="next" className="paginationLink">Next Page</Link>
							}
						</div>
					</div>
				</div>
			</Layout>
		);
	}
}

export default BlogList;

export const blogListQuery = graphql`
	query blogListQuery($skip: Int!, $limit: Int!) {
		allMarkdownRemark(
			sort: { fields: [frontmatter___date], order: DESC }
			filter: { frontmatter: { category: {ne: null}}}
			limit: $limit
			skip: $skip
		) {
			totalCount
			edges {
				node {
					id
					frontmatter {
						title
						date(formatString: "DD MMMM, YYYY")
						author
						category
						subCategory
					}
					excerpt(pruneLength: 70)
					fields {
						slug
					}
				}
			}
		}
	}
`