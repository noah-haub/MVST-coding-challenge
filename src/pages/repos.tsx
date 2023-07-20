import React, { useEffect, useState } from "react";
import Head from "next/head";
import styled from "styled-components";

import ContentWrapper from "@/components/ContentWrapper";
import ErrorBox from "@/components/ErrorBox";
import { searchRepos, useUser } from "@/functions/github.functions";
import { brandColors, getErrorMessage } from "@/utils/helpers";
import RepoTable from "@/components/RepoTable";
import { toast } from "react-hot-toast";
import { Repository } from "@/utils/@types";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import RepoTableSkeleton from "@/components/skeletons/RepoTableSkeleton";

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import RepoSkeleton from "@/components/skeletons/RepoSkeleton";

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

const TextField = styled.input`
    background-color: ${brandColors.gray};
    border-radius: 5px;
    border: none;
    padding: 12px;
    font-size: 1rem;
    width: 100%;

    color: ${brandColors.black};

    ::placeholder {
        color: ${brandColors.black}75;
    }

    &:focus {
        /* box-shadow: inset 0 0 0 1px ${brandColors.purple}; */

        outline: 1px solid ${brandColors.purple};
    }
`;

const SearchButton = styled.button`
    cursor: pointer;

    padding: 12px;
    font-size: 1rem;
    background-color: ${brandColors.purple};
    border: none;
    border-radius: 5px;

    color: ${brandColors.white};

    &:hover:enabled {
        background-color: ${brandColors.darkPurple};
        outline: 1px solid ${brandColors.purple};

        color: ${brandColors.white};
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

const CancelSearchButton = styled.button`
    cursor: pointer;

    padding: 12px;
    font-size: 1rem;
    background-color: ${brandColors.cancelColor};
    border: none;
    border-radius: 5px;

    color: ${brandColors.black};

    &:hover:enabled {
        background-color: ${brandColors.captionBlack};
        outline: 1px solid ${brandColors.cancelColor};

        color: ${brandColors.black};
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

function repos(props: Props) {
    const { user, errorUser, isLoadingUser } = useUser();

    const [repos, setRepos] = useState<Repository[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [loadingRepos, setLoadingRepos] = useState<boolean>(true);

    const isLoading = isLoadingUser;
    const error = getErrorMessage([errorUser]);

    function cancelSearch() {
        setRepos(user?.repositories ?? []);
        setSearchQuery("");
    }

    useEffect(() => {
        if (!isLoading && user) {
            setRepos(user.repositories);
            setLoadingRepos(false);
        }
    }, [isLoading]);

    if (isLoading) return <RepoSkeleton />;
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
                    <Caption>Here you can see and search through all of your repositories.</Caption>
                </div>

                <form
                    onSubmit={async (event) => {
                        event.preventDefault();

                        // Search repos
                        if (searchQuery === "") {
                            cancelSearch();
                        } else {
                            toast.loading("");
                            setLoadingRepos(true);
                            const result = await searchRepos(user.username, searchQuery);

                            if (result.error) {
                                toast.dismiss();
                                toast.error(result.error);

                                setLoadingRepos(false);
                            } else if (result.repos) {
                                toast.dismiss();
                                console.log(result.repos);

                                setRepos(result.repos);
                                setLoadingRepos(false);
                            }
                        }
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <TextField type="text" placeholder="Search..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />

                        <div>
                            <SearchButton data-tooltip-id="search-button" type="submit" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <FaMagnifyingGlass color={brandColors.white} />
                            </SearchButton>
                            <Tooltip id="search-button" place="bottom" content="Search" />
                        </div>

                        {repos !== user.repositories && (
                            <div>
                                <CancelSearchButton data-tooltip-id="cancel-search-button" onClick={() => cancelSearch()} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <FaXmark />
                                </CancelSearchButton>{" "}
                                <Tooltip id="cancel-search-button" place="bottom" content="Cancel Search" />
                            </div>
                        )}
                    </div>
                </form>

                <div>{loadingRepos ? <RepoTableSkeleton /> : <RepoTable repos={repos} />}</div>
            </ContentWrapper>
        </>
    );
}

export default repos;
