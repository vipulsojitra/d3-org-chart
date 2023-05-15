import React, { useState, useRef, useLayoutEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { OrgChart } from "d3-org-chart";
import CustomNodeContent from "./customNodeContent";
import CustomExpandButton from "./customExpandButton";
import EmployeeDetailsCard from "./employeeDetailsCard";

const OrganizationalChart = (props) => {
    const d3Container = useRef(null);
    const [cardShow, setCardShow] = useState(false);
    const [employeeId, setEmployeeId] = useState("");

    const handleShow = () => setCardShow(true);
    const handleClose = () => setCardShow(false);

    const chart = new OrgChart();
    useLayoutEffect(() => {
        const toggleDetailsCard = (nodeId) => {
            handleShow();
            setEmployeeId(nodeId);
        };
        if (props.data && d3Container.current) {
            chart
                .container(d3Container.current)
                .data(props.data)
                .nodeWidth((d) => 300)
                .nodeHeight((d) => 140)
                .compactMarginBetween((d) => 80)
                .onNodeClick((d) => {
                    toggleDetailsCard(d);
                })
                .buttonContent((node, state) => {
                    return ReactDOMServer.renderToStaticMarkup(
                        <CustomExpandButton {...node.node} />
                        );
                    })
                    .nodeContent((d) => {
                        return ReactDOMServer.renderToStaticMarkup(
                            <CustomNodeContent {...d} />
                    );
                })
                .render();
            }
            console.log(OrgChart);
        }, [props, props.data]);
        var index = 0;

    return (
        <div className="org-chart" ref={d3Container}>
            {cardShow && (
                <EmployeeDetailsCard
                    employees={props.data}
                    employee={props.data.find((employee) => employee.id === employeeId)}
                    handleClose={handleClose}
                />
            )}
        </div>
    );
};

export default OrganizationalChart;
