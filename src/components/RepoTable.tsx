import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Repository } from "@/utils/@types";
import { brandColors, getDatesBetweenDates } from "@/utils/helpers";
import moment, { Moment } from "moment";

import { FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";
import Link from "next/link";

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import ReactECharts from "echarts-for-react";
import ErrorBox from "./ErrorBox";

type Props = {
    repos: Repository[];
};

const Table = styled.table`
    width: 100%;
    //    border-collapse: collapse;
    border-collapse: separate;
    border-spacing: 0 24px;

    & > thead > tr > th {
        &:nth-child(1) {
            text-align: left;

            width: 60%;

            opacity: 0;
        }

        text-align: center;

        color: ${brandColors.captionBlack};
        font-size: 1rem;
        font-weight: 400;

        &:last-child {
            padding-right: 24px;

            opacity: 0;
        }
    }

    & > tbody > tr {
        background-color: ${brandColors.gray};
    }

    & > tbody > tr > td {
        &:nth-child(1) {
            text-align: left;

            width: 60%;

            color: ${brandColors.black};
            font-size: 1rem;
            font-weight: 600;
        }

        text-align: center;

        color: ${brandColors.black};
        font-size: 1rem;
        font-weight: 400;

        // Padding for table row
        padding-top: 24px;
        padding-bottom: 24px;

        &:first-child {
            padding-left: 24px;

            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
        }

        &:last-child {
            padding-right: 24px;

            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
        }
    }
`;

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

function RepoTable(props: Props) {
    const uiBreakpoint = 900;

    const [screenWidth, setScreenWidth] = useState<number>(0);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Last Updated</th>
                        {screenWidth > uiBreakpoint && <th>Activity</th>}
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {props.repos.map((repo, index) => {
                        const seriesStartDate = moment().subtract(29, "days");
                        const seriesEndDate = moment();

                        const seriesDateArray: Moment[] = getDatesBetweenDates(seriesStartDate, seriesEndDate, 1);

                        const deploymentActivity: number[] = [];

                        seriesDateArray.forEach((seriesDate) => {
                            const deploymentsForThisDay = repo.deyployments.filter((deployment) => moment(deployment.createdAt).format("YYYY-MM-DD") === seriesDate.format("YYYY-MM-DD")).length;

                            const pullRequestsForThisDay = repo.pullRequests.filter((pullRequest) => moment(pullRequest.createdAt).format("YYYY-MM-DD") === seriesDate.format("YYYY-MM-DD")).length;

                            deploymentActivity.push(deploymentsForThisDay + pullRequestsForThisDay);
                        });

                        return (
                            <tr key={index} data-test="repo-table-row">
                                <td>
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                        {screenWidth > uiBreakpoint && <FaGithub size={25} color={brandColors.black} />}
                                        <p>{repo.name}</p>
                                    </div>
                                </td>

                                <td>{Number(repo.diskUsageInKiloBytes / 1000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}MB</td>
                                <td>{moment(repo.updatedAt).format("MMM Do YYYY")}</td>
                                {screenWidth > uiBreakpoint && (
                                    <td>
                                        <div data-tooltip-id="activity-chart" style={{ width: "180px", height: "30px", margin: "0 auto" }}>
                                            <ReactECharts
                                                style={{ width: "100%", height: "100%" }}
                                                option={{
                                                    title: { show: false },
                                                    grid: {
                                                        show: false,
                                                        left: 0,
                                                        top: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                    },
                                                    xAxis: {
                                                        type: "category",
                                                        show: false,
                                                    },
                                                    yAxis: {
                                                        type: "value",
                                                        show: false,
                                                    },
                                                    series: [
                                                        {
                                                            data: deploymentActivity,
                                                            type: "line",
                                                            smooth: false,
                                                            lineStyle: {
                                                                color: brandColors.purple,
                                                                width: 2,
                                                                type: "solid",
                                                            },
                                                            areaStyle: {
                                                                opacity: 0.7,
                                                                color: {
                                                                    type: "linear",
                                                                    x: 0,
                                                                    y: 0,
                                                                    x2: 0,
                                                                    y2: 1,
                                                                    colorStops: [
                                                                        {
                                                                            offset: 0,
                                                                            color: brandColors.purple, // color at 0%
                                                                        },
                                                                        {
                                                                            offset: 1,
                                                                            color: brandColors.lightPurple, // color at 100%
                                                                        },
                                                                    ],
                                                                },
                                                            },
                                                            showSymbol: false,
                                                        },
                                                    ],
                                                }}
                                            />
                                        </div>
                                        <Tooltip id="activity-chart" place="bottom" content="Past 30 days of activity" />
                                    </td>
                                )}

                                <td>
                                    <Link data-tooltip-id="external-github-link" href={repo.githubUrl} target="_blank">
                                        <FaArrowUpRightFromSquare size={16} color={brandColors.black} />
                                    </Link>
                                    <Tooltip id="external-github-link" place="bottom" content="View on GitHub" />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            {props.repos.length <= 0 && (
                <div style={{ width: "100%", textAlign: "center" }}>
                    <Headline style={{ marginBottom: "12px" }}>Oops...</Headline>
                    <Caption>
                        No repos have been found.{" "}
                        <a href="https://docs.github.com/en/get-started/quickstart/create-a-repo" target="_blank" style={{ color: brandColors.purple, textDecoration: "underline" }}>
                            Create one
                        </a>{" "}
                        or try searching for something else.
                    </Caption>
                </div>
            )}
        </div>
    );
}

export default RepoTable;
