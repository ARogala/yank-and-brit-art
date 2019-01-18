import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';


class GalleryComponent extends React.Component {
	buildImages() {
		const images = this.props.data.allFile.edges;
		const imgDOM = images.map((img,index)=>{
			return(
				<Img className="gallery__img" key={index} fluid={img.node.childImageSharp.fluid} />
			);

		});
		return imgDOM;
	}
	render() {
		const imgDOM = this.buildImages();
		const { currentPage, numGalleryPages } = this.props.pageContext;
		const isFirst = currentPage === 1;
    	const isLast = currentPage === numGalleryPages;
    	const prevPage = currentPage - 1 === 1 ? '/gallery' : `/gallery/${(currentPage - 1).toString()}`;
    	const nextPage = `/gallery/${(currentPage + 1).toString()}`;
		return(
			<Layout>
				<div className="gallery">
					{imgDOM}
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

export default GalleryComponent;

export const galleryPics = graphql`
	query galleryPics($skip: Int!, $limit: Int!) {
		allFile(
			filter: { extension: { eq: "jpg" }, relativeDirectory: {eq: "img/gallery"} }
			sort: {fields: [name], order:ASC}
			limit: $limit
			skip: $skip
		) {
			edges {
				node {
					childImageSharp {
						fluid(maxWidth: 1000, quality: 100) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		}
	}
`