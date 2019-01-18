import React from 'react';
import { graphql } from 'gatsby';
import Gallery from 'react-photo-gallery';
import Layout from '../components/layout';

import p1 from '../img/gallery/gallery1.jpg';
import p2 from '../img/gallery/gallery2.jpg';
import p3 from '../img/gallery/gallery3.jpg';
import p4 from '../img/gallery/gallery4.jpg';

const Photos = [
	{
		src: p1,
		width: 1,
		height: 2
	},
	{
		src: p2,
		width: 1,
		height: 1
	},
	{
		src: p3,
		width: 1,
		height: 1
	},
	{
		src: p4,
		width: 1,
		height: 1
	}
];

class GalleryComponent extends React.Component {
	render() {
		console.log(this.props.data);
		return(
			<Layout>
				<Gallery photos={Photos} />
			</Layout>
		);
	}
}

export default GalleryComponent;

export const query = graphql`
	query {
		allFile(filter: { extension: { eq: "jpg" }, relativeDirectory: {eq: "img/gallery"} }) {
			edges {
				node {
					relativePath
				}
			}
		}
	}
`