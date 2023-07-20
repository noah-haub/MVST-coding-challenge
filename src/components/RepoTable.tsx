import React from "react";
import styled from "styled-components";

import { Repository } from "@/utils/@types";
import { brandColors } from "@/utils/helpers";
import moment from "moment";

import { FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";
import Link from "next/link";

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import ReactECharts from "echarts-for-react";

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

function RepoTable(props: Props) {
    return (
        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Last Updated</th>
                    <th>Activity</th>
                    <th>Link</th>
                </tr>
            </thead>
            <tbody>
                {props.repos.map((repo, index) => {
                    return (
                        <tr key={index}>
                            <td>
                                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                    <FaGithub size={25} color={brandColors.black} />
                                    {repo.name}
                                </div>
                            </td>

                            <td>{Number(repo.diskUsageInKiloBytes / 1000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}MB</td>
                            <td>{moment(repo.updatedAt).format("MMM Do YYYY")}</td>
                            <td>
                                <div style={{ width: "180px", height: "30px", margin: "0 auto" }}>
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
                                                data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                                                show: false,
                                            },
                                            yAxis: {
                                                type: "value",
                                                show: false,
                                            },
                                            series: [
                                                {
                                                    data: [20, 30, 40, 30, 40, 20, 50],
                                                    type: "line",
                                                    smooth: true,
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
                            </td>
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
    );
}

export default RepoTable;
