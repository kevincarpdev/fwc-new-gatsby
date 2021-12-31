import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { wpPost, CategoryTagInfo } from '../contracts/post';
import { decodeHtmlCharCodes, capitalizeFirstLetter } from '../utils';

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
				<div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
						{group.map(({ node }: { node: wpPost }) => {
							const categories: CategoryTagInfo[] = (node.categories && node.categories.length) > 0 ? node.categories.filter((category) => category.name !== 'Uncategorized') : new Array<CategoryTagInfo>();
							return (
								<div key={node.slug} className="card flex flex-col rounded-lg shadow-lg overflow-hidden">
									<div className="flex-shrink-0">
									{node.featuredImage && (
										<Link to={node.link} title={node.slug}>
											<GatsbyImage image={getImage(node.featuredImage.node.localFile)} alt={node.title} />
										</Link>
									)}
									</div>
									<div className="flex-1 bg-white p-6 pt-0 flex flex-col justify-between">
										<div className="flex-1">
										{categories && categories.length > 0 && categories.map((category, categoryIndex) => {
												return (
													<Link key={categoryIndex} to={`/category/${category.slug}`} className="inline-block" title={category.name}>
														<span
														className=
															"bg-gray-600 text-white inline-flex items-center px-3 py-0.5 rounded-full text-sm font-bold mb-1 mr-1 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
														>
														{capitalizeFirstLetter(category.name)}
														</span>
													</Link>
												);
											})}
											<Link to={node.link} className="block mt-2">
												<p className="text-xl font-semibold text-black-400 title">{node.title}</p>
												<div className="mt-3 text-base text-gray-500" dangerouslySetInnerHTML={{ __html: decodeHtmlCharCodes(node.excerpt) }}></div>
											</Link>
										</div>
										<div className="mt-6 flex items-center">
											<div className="flex-shrink-0">
											<Link to={node.link} title={node.slug}>
													<span className="sr-only">{capitalizeFirstLetter(node.author.name)}</span>
													<img className="h-10 w-10 rounded-full" src={node.author.node.avatar.url} alt="" />
												</Link>
											</div>
											<div className="ml-3">
												<p className="text-sm font-bold text-gray-900">
													<a href={node.author.node.uri} className="hover:underline">
														{capitalizeFirstLetter(node.author.node.name)}
													</a>
												</p>
												<div className="flex space-x-1 text-sm text-gray-500">
													<time dateTime={node.date}>{(node.modified && node.modified.length > 0) ? node.modified : node.date}</time>
												</div>
											</div>
										</div>
									</div>
								</div>
							);
						})}
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
