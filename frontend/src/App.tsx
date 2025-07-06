import React, { useState, useEffect } from "react";
import DocumentForm from "./components/DocumentForm";
import DocumentList from "./components/DocumentList";
import axios from "axios";
import { Document } from "./interfaces/Document";

const App: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [search, setSearch] = useState("");
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);

  const fetchDocuments = async () => {
    try {
      const res = await axios.get<Document[]>("http://localhost:5133/api/documents");
      setDocuments(res.data);
    } catch (err) {
      console.error("Failed to fetch documents", err);
    }
  };

  const handleDelete = (id: number) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        >
          <h1
            className="text-3xl font-bold text-blue-700"
            style={{ margin: 0, whiteSpace: "nowrap" }}
          >
            📁 Document Expiry Dashboard
          </h1>
          <DocumentForm
            onAdd={fetchDocuments}
            search={search}
            setSearch={setSearch}
            editingDoc={editingDoc}
            setEditingDoc={setEditingDoc}
          />
        </div>
      </div>

      <DocumentList
        documents={documents}
        onDelete={handleDelete}
        search={search}
        setEditingDoc={setEditingDoc}
      />
    </div>
  );
};

export default App;
