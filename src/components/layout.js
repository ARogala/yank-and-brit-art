import React from 'react';
import { StaticQuery, Link, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import icon from '../img/logoSmall.png';
import etsy from '../img/etsy.png';

import logoSmall from '../img/logoSmall.jpg';
import logoLarge from '../img/logoLarge.png';

import '../styles/main.scss';

function toggleNav() {
	const toggleNav = document.getElementById('navi-toggle').checked;
	//console.log(toggleNav);
	if(toggleNav === false) {
		document.getElementById('navi-toggle').checked = true;
	}
	else {
		document.getElementById('navi-toggle').checked = false;
	}
}

export default ({children}) => (
	<StaticQuery
		query={graphql`
			query {
				site {
					siteMetadata {
						title
						description
						metaDescription
					}
				}
			}
		`}
		render={data => (
			<div>

				<Helmet>
					<html lang="en" />
					<meta charSet="utf-8" />
					<title>{`${data.site.siteMetadata.title} - ${data.site.siteMetadata.description}`}</title>
					<meta name="description" content={data.site.siteMetadata.metaDescription} />
					<meta name="theme-color" content="#d1aff5"/>

		  			<link rel="shortcut icon" href={icon} />
		  			<link href="https://fonts.googleapis.com/css?family=Petit+Formal+Script" rel="stylesheet" />
		  			<link href="https://fonts.googleapis.com/css?family=IBM+Plex+Serif:400,600" rel="stylesheet" />
				</Helmet>
				<nav className="nav">
					<Link to="/" tabIndex="-1"><img className="nav__imgLink" src={logoSmall} alt="logo" /></Link>
					<input type="checkbox" className="nav__checkbox" id="navi-toggle" />
					<label htmlFor="navi-toggle" className="nav__button" aria-haspopup="true" role="button" tabIndex="0" aria-label="navigation menu" onKeyPress={()=>toggleNav()}>
						<span className="nav__icon">&nbsp;</span>
					</label>
					<ul className="nav__list">
						<div className="nav__item-container">
							<li className="nav__item-1"><Link to="/"          className="nav__link">Home</Link></li>
							<li className="nav__item-2"><Link to="/blog"          className="nav__link">Blog</Link></li>
							<li className="nav__item-3"><Link to="/gallery"          className="nav__link">Gallery</Link></li>
							<li className="nav__item-4"><Link to="/about/"    className="nav__link">About Me</Link></li>
						</div>
					</ul>
				</nav>
				<header className="header">
					<div className="header__imgBoxSmall">
						<img src={logoSmall} alt="logo" />
					</div>
					<div className="header__titleBox">
						<div>
							<h1 className="header__title-1">{data.site.siteMetadata.title}</h1>
							<h2 className="header__title-2">{data.site.siteMetadata.description}</h2>
						</div>
					</div>
					<div className="header__imgBox">
						<img src={logoLarge} alt="logo" />
					</div>
				</header>

				<div className="container">
					<main className="main" role="main">
						{children}
					</main>

					<footer className="footer">
						<div className="footer__icons">
							<span>Find me on:</span>
							<a href="https://www.etsy.com/shop/yankandbritart"><img src={etsy} alt="etsy" /></a>
						</div>
					</footer>
				</div>

			</div>
		)}
	/>
);