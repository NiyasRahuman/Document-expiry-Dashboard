import React from "react";
import axios from "axios";
import { FaWhatsapp } from "react-icons/fa";
import { Document } from "../interfaces/Document";
import { Table, Td, Tr } from "./DocumentList.styles";
import { styled } from "styled-components";

const getRowColor = (expiryDate: string) => {
  const today = new Date();
  const exp = new Date(expiryDate);
  const diff = (exp.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  if (diff < 0) return "#ffdddd";
  if (diff <= 7) return "#fff4cc";
  return "white";
};

function highlight(text: string | undefined | null, search: string) {
  if (!text) return "";
  if (!search) return text;
  const regex = new RegExp(`(${search})`, "gi");
  return text.split(regex).map((part, i) =>
    part.toLowerCase() === search.toLowerCase() ? (
      <span key={i} style={{ background: "yellow" }}>{part}</span>
    ) : (
      part
    )
  );
}

interface Props {
  documents: Document[];
  onDelete: (id: number) => void;
  search: string;
}

const Th = styled.th`
  background-color: #f2f2f2;
  padding: 0.75rem;
  text-align: center;
  border-bottom: 2px solid #ccc;
`;

const DocumentList: React.FC<Props> = ({ documents, onDelete, search }) => {
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      await axios.delete(`http://localhost:5133/api/documents/${id}`);
      onDelete(id);
    }
  };
  
  const filteredDocuments = documents.filter(doc =>
    [doc.name, doc.owner, doc.expiryDate, doc.reminder, doc.mobile]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Documents</h2>
      <Table>
        <thead>
          <Tr>
            <Th>S.No</Th>
            <Th>Document</Th>
            <Th>Owner</Th>
            <Th>Expiry Date</Th>
            <Th>Days Left</Th>
            <Th>Reminder</Th>
            <Th>Mobile</Th>
            <Th>Actions</Th>
          </Tr>
        </thead>
        <tbody>
          {filteredDocuments.map((doc, i) => (
            <Tr key={doc.id} style={{ backgroundColor: getRowColor(doc.expiryDate) }}>
              <Td>{i + 1}</Td>
              <Td>{highlight(doc.name, search)}</Td>
              <Td>{highlight(doc.owner, search)}</Td>
              <Td>{highlight(new Date(doc.expiryDate).toLocaleDateString(), search)}</Td>
              <Td>
                {Math.ceil(
                  (new Date(doc.expiryDate).getTime() - Date.now()) /
                  (1000 * 60 * 60 * 24)
                )}
              </Td>
              <Td>
                {(() => {
                  const daysLeft = Math.ceil(
                    (new Date(doc.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                  );
                  const reminderDays = Number(doc.reminder) || 0;
                  const remindIn = daysLeft - reminderDays;
                  let label = "";
                  if (remindIn > 0) label = `in ${remindIn} days`;
                  else if (remindIn === 0) label = "today";
                  else label = "passed";
                  return highlight(label, search);
                })()}
              </Td>
              <Td>
                {highlight(doc.mobile, search)}
                <FaWhatsapp style={{ color: "#25D366", marginLeft: "8px" }} />
              </Td>
              <Td>
                <button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(doc.id)}
                >
                  Delete
                </button>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DocumentList;