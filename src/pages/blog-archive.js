import React from 'react';

import { Link, graphql } from 'gatsby';

import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

import groupBy from '../groupBy.js';
import Layout from '../components/layout';

class BlogArchive extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	filterText: ''
	    };
  	}

  	handleFilterTextChange(filterText) {
    	this.setState({filterText: filterText});
  	}

	render() {
		let posts = this.props.data.allMarkdownRemark.edges;
		let filterText = this.state.filterText;

		//console.log(posts);
		//add groupCategory so blog posts can be sorted, grouped, and displayed
		//by category - subCategory
		// posts.map(({node}, index) => {
		// 	return posts[index].groupCategory = node.frontmatter.category + ' - ' + node.frontmatter.subCategory;
		// });

		//add category to edges so nodes(blog posts) can be filtered, sorted, and grouped by category
		posts.map(({node}, index) => {
			return posts[index].category = node.frontmatter.category;
		});
		//add subCategory to edges so nodes(blog posts) can be filtered by subCategory
		posts.map(({node}, index) => {
			return posts[index].subCategory = node.frontmatter.subCategory;
		});
		//add title to edges so nodes(blog posts) can be filtered by title
		posts.map(({node}, index) => {
			return posts[index].title = node.frontmatter.title;
		});

		//now filter posts on filter text then group and build DOM

		//remove all spaces g is a global modifier (in other words replace all spaces with '')
		filterText = filterText.replace(/ /g, '');
		//console.log(filterText);

		/* 	Filter logic
			escapeRegExp escapes special characters
			Regular expressions are patterns used to match character combinations in strings

			so pattern will be a regexp with special char and case 'i' ignored
			then filter the posts array useing test() to search for a match
			between the regular expression and a specified string ignoring case and
			special char.
			finally sort the filtered list by category
		*/

		const pattern = new RegExp(escapeRegExp(filterText), 'i');

		let filteredPosts = posts.filter((post) => pattern.test((post.title + post.category + post.subCategory).replace(/ /g,'')));
		filteredPosts.sort(sortBy('subCategory'));
		//console.log(filteredPosts);

		const groupedPosts = groupBy(filteredPosts, 'category');
		//console.log(groupedPosts);
		const allCategories = Object.keys(groupedPosts);
		// console.log(allCategories);

		/*
		for each post category if the number of posts is greater than 1
		build the DOM
		*/
		const dropDownUL = [];
		for(let i = 0; i < allCategories.length; i++ ) {
			if(groupedPosts[allCategories[i]].length > 1) {
				//build the dropDownUL
				dropDownUL.push(
					<li key={i} className="postlist__dropdown-li">
						<span className="postlist__category">{allCategories[i]}:</span>
						<ul aria-label="submenu" className="postlist__dropdown-ul">
							{groupedPosts[allCategories[i]].map((post) => {
								//console.log(post.node);
								return (
									<li key={post.node.id}>
										<Link to={post.node.fields.slug} className="blogLink">
											{post.node.frontmatter.title}
										</Link>
									</li>
								);
							})}
						</ul>
					</li>
				);
			}
		}
		//build the DOM for the categories with one post
		const singlePost = [];
		for(let i = 0; i < allCategories.length; i++) {
			if(groupedPosts[allCategories[i]].length === 1) {
				//console.log(groupedPosts[allCategories[i]][0]);
				singlePost.push(
					<li key={groupedPosts[allCategories[i]][0].node.id} className="postlist__single-li">
						<Link to={groupedPosts[allCategories[i]][0].node.fields.slug} className="blogLink">
							{groupedPosts[allCategories[i]][0].node.frontmatter.category + ' - ' + groupedPosts[allCategories[i]][0].node.frontmatter.title}
						</Link>
					</li>
				);
			}
		}

		return (
			<Layout>
				<div className="archive">
					<div className="search">
						<h1 className="search__title">Art Blog Archives</h1>
						<h2 className="search__title">Total Posts: {this.props.data.allMarkdownRemark.totalCount}</h2>
						<label className="search__label" htmlFor="filterPosts">Filter Posts:</label>
						<input
							type="text"
							className="search__input"
							id="filterPosts"
							placeholder="Search Posts..."
							value={this.state.filterText}
							onChange={(e) => this.handleFilterTextChange(e.target.value)}
						/>
					</div>

					<ul className="postlist">
						{dropDownUL}
						<span className="postlist__title">Post Categories with Single Posts:</span>
						{singlePost}
					</ul>

					<Link to="/blog" className="paginationLink">Back To Blog</Link>
				</div>
			</Layout>
		);
	}
}

export default BlogArchive;

//each node has a unique id
export const query = graphql`
	query {
		allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC } filter: { frontmatter: { category: {ne: null}}}) {
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
					fields {
						slug
					}
				}
			}
		}
	}
`