import { NextPage } from "next";
import { BlogContent, getBlogs, getBlogBy } from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";

const BlogItemPage: NextPage<BlogContent> = (props) => {
	const {title, date, content} = props
	return (
		<>
			<section>
				<h2>{title}</h2>
				<p>{date}</p>
				<div>{content}</div>
			</section>
		</>
	)
}

export const getStaticPaths = async () => {
	const {data} = await getBlogs()
	const paths = data.contents.map(item => `/blogs/${item.id}`)
	return {
		paths,
		fallback: true
	}
}

export const getStaticProps = async ({params}: any) => {
	const {id} = params
	const {data} = await getBlogBy(id)
	return {props: {...data}}
}

export default BlogItemPage