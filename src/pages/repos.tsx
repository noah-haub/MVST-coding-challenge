import { axiosApi } from "@/utils/axios";
import Head from "next/head";
import React from "react";

type Props = {};

function repos(props: Props) {
    return (
        <>
            <Head>
                <title>Repos - GiddyHub</title>
                <meta name="description" content="The user's repos page." />
            </Head>
            <div>
                <p>Repos</p>
            </div>
        </>
    );
}

export default repos;
