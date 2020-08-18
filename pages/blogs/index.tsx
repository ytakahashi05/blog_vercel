import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { getBlogs } from "../../lib/api";
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
			<div className="header" style={{fontSize: "2em", padding: "10px"}}>
				<span>記事一覧dayo</span>
			</div>
			<BlogTable contents={contents} />
		</>
	)
}

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});
  
const BlogTable = ({contents}: any) => {
	const classes = useStyles();
	const StyledTableCell = withStyles((theme: Theme) =>
		createStyles({
			head: {
			backgroundColor: theme.palette.common.black,
			color: theme.palette.common.white,
			},
			body: {
			fontSize: 14,
			},
		}),
		)(TableCell);
		
	return (
		<TableContainer component={Paper} style={{width: "70%", }}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<StyledTableCell>日時</StyledTableCell>
						<StyledTableCell>タイトル</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{contents.map((content: any) => (
						<TableRow key={content.id}>
							<TableCell>{content.date.split("T")[0]}</TableCell>
							<Link href="/blogs/[id]" as={`/blogs/${content.id}`}>
								<TableCell style={{cursor: "pointer"}}>
									<a>{content.title}</a>
								</TableCell>
							</Link>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
export const getStaticProps = async () => {
	const { data } = await getBlogs();
	return { props: {contents: data.contents} }
}
export default Blogs