import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Slider from 'react-slick';

import owl from '../img/gallery/20180330_104638.jpg';
import bird from '../img/gallery/20180330_104818.jpg';
import nest from '../img/gallery/IMG_20180310_211635_190.jpg';
import constellation from '../img/gallery/IMG_20180623_101132_752.jpg';
import firework from '../img/gallery/20180705_181750.jpg';

function Arrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
}

class Home extends React.Component {
	render() {
		let settings = {
			dots: false,
			arrows: true,
			lazyLoad: true,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			speed: 1000,
			autoplaySpeed: 5000,
			cssEase: "linear",
			nextArrow: <Arrow />,
			prevArrow: <Arrow />

		};
		const content = this.props.data.allMarkdownRemark.edges[0].node;
		return(
			<Layout>
				<div className="home">
					<div dangerouslySetInnerHTML={{ __html: content.html }}></div>
					<div className="home__slider">
						<Slider {...settings}>
							<div><img className="home__slider-img" src={owl} alt="owl" /></div>
							<div><img className="home__slider-img" src={bird} alt="bird" /></div>
							<div><img className="home__slider-img" src={nest} alt="nest" /></div>
							<div><img className="home__slider-img" src={constellation} alt="constellation" /></div>
							<div><img className="home__slider-img" src={firework} alt="firework" /></div>
						</Slider>
					</div>
				</div>
			</Layout>
		);
	}
}

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
