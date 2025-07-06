import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  CloseButton,
  Form,
  Input,
  Select,
  CountryCodeSelect,
  PhoneGroup,
  PhoneInput,
  Button
} from "./DocumentForm.styles";

interface Document {
  id: number;
  name: string;
  owner: string;
  expiryDate: string;
  mobile: string;
  reminder: number;
}

interface Props {
  onAdd: () => void;
  search: string;
  setSearch: (s: string) => void;
  editingDoc: Document | null;
  setEditingDoc: (doc: Document | null) => void;
}

const DocumentForm: React.FC<Props> = ({
  onAdd,
  search,
  setSearch,
  editingDoc,
  setEditingDoc
}) => {
  const [showForm, setShowForm] = useState(false);
  const [docType, setDocType] = useState("");
  const [customDoc, setCustomDoc] = useState("");
  const [owner, setOwner] = useState("");
  const [expiry, setExpiry] = useState("");
  const [mobile, setMobile] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [reminder, setReminder] = useState("30");

  useEffect(() => {
    if (editingDoc) {
      setShowForm(true);

      const isStandard = ["Passport", "Visa", "Marksheets", "PAN", "Certificates"];
      if (isStandard.includes(editingDoc.name)) {
        setDocType(editingDoc.name);
        setCustomDoc("");
      } else {
        setDocType("Other");
        setCustomDoc(editingDoc.name);
      }

      setOwner(editingDoc.owner);
      setExpiry(editingDoc.expiryDate.slice(0, 10));

      const match = editingDoc.mobile.match(/^(\+\d{1,4})(\d{6,})$/);
      if (match) {
        setCountryCode(match[1]);
        setMobile(match[2]);
      } else {
        setCountryCode("+91");
        setMobile(editingDoc.mobile);
      }

      setReminder(String(editingDoc.reminder));
    }
  }, [editingDoc]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const documentName = docType === "Other" ? customDoc : docType;
    const payload = {
      name: documentName,
      owner,
      expiryDate: expiry,
      mobile: countryCode + mobile,
      reminder: parseInt(reminder),
    };

    try {
      if (editingDoc) {
        await axios.put(`http://localhost:5133/api/documents/${editingDoc.id}`, {
          ...payload,
          id: editingDoc.id
        });
      } else {
        await axios.post("http://localhost:5133/api/documents", payload);
      }

      resetForm();
      onAdd();
    } catch (err) {
      console.error("❌ Submit error:", err);
      alert("Error submitting. See console for details.");
    }
  };

  const resetForm = () => {
    setDocType("");
    setCustomDoc("");
    setOwner("");
    setExpiry("");
    setMobile("");
    setReminder("30");
    setShowForm(false);
    setEditingDoc(null);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, marginRight: "10px" }}
        />
        <Button type="button" onClick={() => setShowForm(true)}>
          Add Document
        </Button>
      </div>

      {showForm && (
        <ModalBackdrop>
          <ModalContent>
            <ModalHeader>
              <h2>{editingDoc ? "Edit Document" : "Add Document"}</h2>
              <CloseButton onClick={resetForm}>✖</CloseButton>
            </ModalHeader>

            <Form onSubmit={handleSubmit}>
              <Select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                required
              >
                <option value="">Select Document</option>
                <option value="Passport">Passport</option>
                <option value="Visa">Visa</option>
                <option value="Marksheets">Marksheets</option>
                <option value="PAN">PAN</option>
                <option value="Certificates">Certificates</option>
                <option value="Other">Other</option>
              </Select>

              {docType === "Other" && (
                <Input
                  placeholder="Enter custom document name"
                  value={customDoc}
                  onChange={(e) => setCustomDoc(e.target.value)}
                  required
                />
              )}

              <Input
                placeholder="Owner"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                required
              />

              <Input
                type="date"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                required
              />

              <PhoneGroup>
                <CountryCodeSelect
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+971">🇦🇪 +971</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+61">🇦🇺 +61</option>
                </CountryCodeSelect>
                <PhoneInput
                  type="tel"
                  placeholder="Mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </PhoneGroup>

              <Select
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
              >
                <option value="30">Reminder: 30 days before</option>
                <option value="7">Reminder: 7 days before</option>
                <option value="1">Reminder: 1 day before</option>
              </Select>

              <Button type="submit">
                {editingDoc ? "Update" : "Submit"} Document
              </Button>
            </Form>
          </ModalContent>
        </ModalBackdrop>
      )}
    </>
  );
};

export default DocumentForm;
