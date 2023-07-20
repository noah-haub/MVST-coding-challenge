import React from "react";
import Head from "next/head";
import styled from "styled-components";

import ContentWrapper from "@/components/ContentWrapper";
import ErrorBox from "@/components/ErrorBox";
import { useUser } from "@/functions/github.functions";
import { brandColors, getErrorMessage } from "@/utils/helpers";
import RepoTable from "@/components/RepoTable";

type Props = {};

const Headline = styled.h2`
    color: ${brandColors.black};
    font-size: 1.5rem;
    font-weight: 900;
`;

const Caption = styled.p`
    color: ${brandColors.captionBlack};
    font-size: 0.95rem;
    font-weight: 400;
`;

function repos(props: Props) {
    const { user, errorUser, isLoadingUser } = useUser();

    const isLoading = isLoadingUser;
    const error = getErrorMessage([errorUser]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <ErrorBox errorMessage={error} />;

    return (
        <>
            <Head>
                <title>Repos - GiddyHub</title>
                <meta name="description" content="The user's repos page." />
            </Head>
            <ContentWrapper>
                <div style={{ marginBottom: "48px" }}>
                    <Headline style={{ marginBottom: "12px" }}>Repos</Headline>
                    {/* <Caption>Here you can see and search through all of your repositories.</Caption> */}
                </div>

                <RepoTable repos={user.repositories} />
            </ContentWrapper>
        </>
    );
}

export default repos;
