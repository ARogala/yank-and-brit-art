import React from 'react';
import Gallery from 'react-photo-gallery';
import Layout from '../components/layout';

import p1 from '../img/uploads/gallery1.jpg';
import p2 from '../img/uploads/gallery2.jpg';
import p3 from '../img/uploads/gallery3.jpg';
import p4 from '../img/uploads/gallery4.jpg';

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
		return(
			<Layout>
				<Gallery photos={Photos} />
			</Layout>
		);
	}
}

export default GalleryComponent;