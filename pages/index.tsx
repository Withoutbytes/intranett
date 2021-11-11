import Link from "next/link";
import { GetServerSideProps } from "next";

const Index = () => {
    return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        redirect: {
            permanent: false,
            destination: "/login",
        },
    };
};

export default Index;
