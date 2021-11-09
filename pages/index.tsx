import Link from "next/link";
import { GetStaticProps } from "next";

const Index = () => {
	return <div></div>;
};

export const getStaticProps: GetStaticProps = async () => {
	return {
		redirect: {
			permanent: false,
			destination: "/login",
		},
	};
};

export default Index;
