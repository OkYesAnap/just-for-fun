import React from "react";
import styled from "styled-components";
import BuildMdContentV2 from "./BuildMdContentV2";

const TableContainer = styled.div`
    & table {
        width: 100%;
        border-collapse: collapse;
        font-family: 'Arial', sans-serif;
        background-color: #000;
        border: 2px solid #e0e0e0;
        margin: 20px 0 20px 0;
    }

    & thead {
    }

    & th {
        padding: 12px 15px;
        text-align: left;
        font-weight: 600;
        font-size: 16px;
        border-bottom: 2px solid #e0e0e0;
        border-left: 1px solid #e0e0e0;
    }

    & tbody {
    }

    & td {
        padding: 12px 15px;
        border-bottom: 1px solid #e0e0e0;
        border-left: 1px solid #e0e0e0;
        font-size: 13px;
    }

    & tr:hover {
        background-color: #292929;
    }

`;

const MarkdownTable: React.FC<{ mdItem: string }> = ({mdItem}) => {
    const tableLines = mdItem.split("\n")
    tableLines.splice(1, 1);
    const formTable = tableLines.map((line) => line.split("|").slice(1, -1));
    const header = formTable.splice(0, 1).flat();
    return (
        <TableContainer>
            <table>
                <thead>
                <tr>
                    {header.map((item, index) => (<th key={index}><BuildMdContentV2 text={item.trim()}/></th>))}
                </tr>
                </thead>
                <tbody>
                {formTable.map((line, x) => (<tr key={x}>
                    {line.map((item, y) => (<td key={`x-${x}_y-${y}`}><BuildMdContentV2 text={item.trim()}/></td>))}
                </tr>))}
                </tbody>
            </table>
        </TableContainer>
    )
};

export default MarkdownTable