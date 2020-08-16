import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { getBlogs } from "../../lib/api";

const BlogItem: React.FC<any> = props => {
	const { id, title , date } = props.items;
	return (
	  <div>
		<Link href="/blogs/[id]" as={`/blogs/${id}`}>
		  <div>
			<span>{ date }</span>
			<span>{ title }</span>
		  </div>
		</Link>
	  </div>
	)
  }

const Blogs: NextPage = (props: any) => {
	const {contents} = props;
	return (
		<>
			<div className="header">
				<span>記事一覧</span>
			</div>
			<div>
				{contents.map((item: any) => <BlogItem items={item} key={item.id}/>)}
			</div>
		</>
	)
}
export const getStaticProps = async () => {
	const { data } = await getBlogs();
	return { props: {contents: data.contents} }
}
export default Blogs