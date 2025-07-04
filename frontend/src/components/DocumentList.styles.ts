import styled, { css } from "styled-components";

export const ResponsiveTable = css`
  @media (max-width: 600px) {
    table, thead, tbody, th, td, tr {
      display: block;
      width: 100%;
    }
    thead {
      display: none;
    }
    tr {
      margin-bottom: 1rem;
      border-bottom: 2px solid #eee;
    }
    td {
      text-align: right;
      padding-left: 50%;
      position: relative;
      min-height: 40px;
      box-sizing: border-box;
    }
    td:before {
      position: absolute;
      left: 0;
      top: 0;
      width: 50%;
      padding-left: 0.75rem;
      white-space: nowrap;
      font-weight: bold;
      text-align: center;
      content: attr(data-label);
    }
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  ${ResponsiveTable}
`;

export const Th = styled.th`
  background-color: #f2f2f2;
  padding: 0.75rem;
  text-align: center !important;
  border-bottom: 2px solid #ccc;
`;

export const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
  vertical-align: middle;
  text-align: center; 
`;

export const Tr = styled.tr`
  &:hover {
    background-color: #f9f9f9;
  }
`;