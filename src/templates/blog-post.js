import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';

class BlogPost extends React.Component {
	render() {
		console.log(this.props);
		const post = this.props.data.markdownRemark;
		const { previous, next } = this.props.pageContext;
		return (
			<Layout>
				<div className="blogpostContainer">
					<h1>{post.frontmatter.title}</h1>
					<span>{post.frontmatter.date}</span>
					<div dangerouslySetInnerHTML={{ __html: post.html }}></div>
				</div>

				<div className="linkbox">
					<div>
						{ previous &&
						<Link to={previous.fields.slug} className="paginationLink" rel="prev">
							Previous Post
						</Link>
						}
					</div>
					<div>
						<Link to="/blog" className="paginationLink">Back To Blog</Link>
					</div>
					<div>
						{ next &&
						<Link to={next.fields.slug} className="paginationLink" rel="next">
							Next Post
						</Link>
						}
					</div>
				</div>
			</Layout>
		);
	}
}

export default BlogPost;

export const query = graphql`
	query($slug: String!) {
		markdownRemark(fields: {slug: {eq: $slug}}) {
			html
			frontmatter {
				title
				date(formatString: "MMMM DD, YYYY")
				author
			}
		}
	}
`