import React from 'react';

import Layout from '../components/layout';

const Error404 = ({data}) => {
	return (
		<Layout>
			<div className="error404">
				<p>Sorry this page can not be found. Please try navigating to one of our other pages.</p>
			</div>
		</Layout>
	);
};

export default Error404;