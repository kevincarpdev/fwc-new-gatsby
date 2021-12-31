import React from 'react';
import { Link, useStaticQuery, graphql } from "gatsby"
import { StaticImage, GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { wpPost, CategoryTagInfo } from '../contracts/post';
import { decodeHtmlCharCodes, capitalizeFirstLetter } from '../utils';
import PostCards from "../components/Posts/cards";

import '../styles/blog.scss';
import { GrNext, GrPrevious } from 'react-icons/gr';
import Blog from '../images/blog.jpg';
export interface Props {
	pageContext: {
		group: { node: wpPost }[];
		index: number;
		pageCount: number;
	};
	location: Location;
}


export const BlogPostsPage = (props: Props) => {
	// const { index, pageCount } = props.pathContext;
	const { group, index, pageCount } = props.pageContext;
	const previousUrl = index - 1 === 1 ? '' : (index - 1).toString();
	const nextUrl = (index + 1).toString();
	const { site } = useStaticQuery(graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
		allWpTag {
			edges {
				node {
					count
					name
				}
			}
		}
      }
	`);

	return (
		<Layout location={props.location}>
			<SEO title={`${site.siteMetadata.title} | ${site.siteMetadata.description}`} description={site.siteMetadata.description} />
			<div className="relative bg-blue-800">
				<div className="absolute inset-0">
					<img
					className="w-full h-full object-cover"
					src={Blog}
					alt=""
					/>
					<div className="absolute inset-0 bg-blue-800" style={{ mixBlendMode: 'multiply' }} aria-hidden="true" />
				</div>
				<div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
					<h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">The Blog</h1>
					<p className="mt-6 text-xl text-blue-100 max-w-3xl">
						Stay up-to-date with what we are up to. The latest from the Netsuite &amp; E-Commerce world.
					</p>
				</div>
			</div>
			<div className="relative max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
				<div id="primary" className="content-area with-sidebar col-span-1 md:col-span-12">
					<div className="posts mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-2 lg:max-w-none xl:grid-cols-3">
						<PostCards posts={group} />
					</div>
				</div>
			</div>
			<div className="navigation-links">
				{index > 1 && (
					<div className="previous-link">
						<Link to={`/blog/${previousUrl}`} title={`/blog/${previousUrl}`} className="bg-gray-600 text-white inline-flex items-center px-2 py-2 text-sm font-bold">
						<GrPrevious/> Prev
						</Link>
					</div>
				)}
				{index <= (pageCount - 1) && (
					<div className="next-link">
						<Link to={`/blog/${nextUrl}`} title={`/blog/${nextUrl}`} className="bg-gray-600 text-white inline-flex items-center px-2 py-2 text-sm font-bold">
							Next <GrNext/>
						</Link>
					</div>
				)}
			</div>
		</Layout>
	);
};

export default BlogPostsPage;
