import React from "react";

type Props = {
    children: React.ReactNode;
};

const ContentWrapper = (props: Props) => {
    return (
        <div style={{ padding: "24px" }}>
            <div style={{ maxWidth: "1488px", margin: "0 auto" }}>{props.children}</div>
        </div>
    );
};

export default ContentWrapper;
