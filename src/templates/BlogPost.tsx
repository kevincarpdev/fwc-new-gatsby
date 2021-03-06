import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import TagCloud from '../components/TagCloud';
import { wpPost, CategoryTagInfo } from '../contracts/post';
import { CommentEdges } from '../contracts/comment';
import { decodeHtmlCharCodes, capitalizeFirstLetter } from '../utils';
const moment = require('moment');
import { GrNext, GrPrevious } from "react-icons/gr";
import '../styles/blog.scss';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Cta from "../components/Ui/Cta"

export interface Props {
	data: {
		wpPost: wpPost;
		allCommentsYaml: CommentEdges;
	};
	pageContext: {
		previous: {
			slug: string;
		}
		next: {
			slug: string;
		}
	};
	location: Location;
}

export const BlogPostPage = (props: Props) => {
	const categories: CategoryTagInfo[] = (props.data.wpPost.categories && props.data.wpPost.categories.length) > 0 ? props.data.wpPost.categories.filter((category) => category.name !== 'Uncategorized') : new Array<CategoryTagInfo>();
	const tags: CategoryTagInfo[] = (props.data.wpPost.tags && props.data.wpPost.tags.length) > 0 ? props.data.wpPost.tags : new Array<CategoryTagInfo>();

	return (
		<Layout location={props.location}>
			<SEO title={props.data.wpPost.title} description={props.data.wpPost.excerpt} />
			<div className="container container--l">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
					<div id="primary" className="content-area with-sidebar col-span-1 lg:col-span-8">
						<article className="post relative px-4 sm:px-6 lg:px-8">
							<div className="text-lg">
								<h1 className="mb-4">
									<span className="block text-base text-center text-blue-600 font-semibold tracking-wide uppercase">
										Article
									</span>
									<span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
										{decodeHtmlCharCodes(props.data.wpPost.title)}
									</span>
								</h1>
								<div className="my-2">
									{props.data.wpPost.featuredImage && 
										<GatsbyImage className="rounded-lg shadow-lg object-cover object-center" image={getImage(props.data.wpPost.featuredImage.node.localFile)} alt={props.data.wpPost.title} />
									}
								</div>
							</div>
							<div className="post-content mt-6 prose prose-blue prose-lg text-gray-500 mx-auto" dangerouslySetInnerHTML={{ __html: decodeHtmlCharCodes(props.data.wpPost.content) }} />
						</article>
					</div>
					<div className="sidebar col-span-1 lg:col-span-4 top-0 b-0 lg:sticky lg:h-screen" id="secondary">
						<blockquote className="relative bg-white rounded-lg m-0">
							<TagCloud/>
							<div className="categories-container tags-container post-meta-container pt-4 pb-6 px-8 lg:px-0">
								{categories && categories.length > 0 && categories.map((category, categoryIndex) => {
									return (
										<Link to={`/category/${category.slug}`} title={category.name} key={categoryIndex} className="bg-gray-600 text-white inline-flex items-center px-3 py-0.5 rounded-full text-sm font-bold mb-1 mr-1 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
											{capitalizeFirstLetter(category.name)}
										</Link>
									);
								})}
								{tags && tags.length > 0 && tags.map((tag, tagIndex) => {
									return (
										<Link to={`/tag/${tag.slug}`} title={tag.name} key={tagIndex} className="bg-gray-600 text-white inline-flex items-center px-3 py-0.5 rounded-full text-sm font-bold mb-1 mr-1 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
											{capitalizeFirstLetter(tag.name)}
										</Link>
									);
								})}			
							</div>
							<div className="rounded-t-lg pt-4 pb-6 px-8 lg:px-0">
								<h3 className="text-xl text-center text-gray-800 text-bold">Author</h3>
								<div className="relative text-md text-gray-500 font-medium mt-4">
									<svg
										className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-gray-200"
										fill="currentColor"
										viewBox="0 0 32 32"
										aria-hidden="true"
									>
										<path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
									</svg>
									<p className="relative text-sm text-italic leading-relaxed px-8 py-4 text-center">
										{props.data.wpPost.author.node.description}
									</p>
								</div>
							</div>
							<cite className="relative flex items-center justify-center justify-items-center bg-gray-600 rounded-b-lg not-italic pt-6 pb-3 shadow-lg">
								<Link to="" className="absolute rounded-full border-2 border-white hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 sm:absolute top-0 transform -translate-y-1/2 transition-all">
									<img className="h-10 w-10 rounded-full" src={props.data.wpPost.author.node.avatar.url} alt={props.data.wpPost.author.node.name} />
								</Link>
								<span className="relative text-blue-300 font-semibold leading-7 mt-1">
									<p className="text-white font-semibold inline text-xl">{props.data.wpPost.author.node.name}</p>
								</span>
							</cite>
						</blockquote>
					</div>				
				</div>
			</div>
			<div className="navigation-links">
				{props.pageContext.next && props.pageContext.next.slug && (
					<Link to={`/${props.pageContext.next.categories.nodes[0].slug}/${moment(props.pageContext.next.date).format('YYYY')}/${moment(props.pageContext.next.date).format('MM')}/${props.pageContext.next.slug}.html`} title={props.pageContext.next.slug} className="bg-gray-600 text-white inline-flex items-center px-2 py-2 text-sm font-bold">
						<GrPrevious/> Prev <span className="text-white hidden sm:inline-flex">&nbsp;Article</span>
					</Link>
				)}
				{props.pageContext.previous && props.pageContext.previous.slug && (
					<Link to={`/${props.pageContext.previous.categories.nodes[0].slug}/${moment(props.pageContext.previous.date).format('YYYY')}/${moment(props.pageContext.previous.date).format('MM')}/${props.pageContext.previous.slug}.html`} title={props.pageContext.previous.slug} className="bg-gray-600 text-white inline-flex items-center px-3 py-0.5 text-sm font-bold">
						Next <span className="text-white hidden sm:inline-flex">&nbsp;Article</span><GrNext/>
					</Link>
				)}
			</div>
			<Cta
                headline="Ready to solve your woes?"
                description="Contact Us. The first hour is free."
            />
		</Layout>
		
	);
};

export default BlogPostPage;

export const query = graphql`
	query($id: String!) {
		wpPost(id: {eq: $id}) {
			id
			content
			slug
			title
			excerpt
			date(formatString: "MMMM DD, YYYY")
			modified(formatString: "MMMM DD, YYYY")
			author {
				node {
					avatar {
						url
					}
					id
					name
					uri
					slug
					description
				}
			}
			featuredImage {
				node {
					localFile {
						childImageSharp {
							gatsbyImageData (
								width: 800
								placeholder: BLURRED
								formats: [AUTO, WEBP, AVIF]
							  )
						}
					}
				}
			}
			categories {
				nodes {
				id
				count
				name
				slug
				}
			}
			tags {
				nodes {
				id
				count
				name
				slug
				}
			}
		}
	}
`
