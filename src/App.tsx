import React, { useEffect, useState } from "react";
import "./App.css";
import { Office365OutlookService } from "./generated";
import type { ClientReceiveMessageStringEnums } from "./generated/models/Office365OutlookModel";

const App: React.FC = () => {
  const [mails, setMails] = useState<ClientReceiveMessageStringEnums[]>([]);
  const [selectedMail, setSelectedMail] = useState<ClientReceiveMessageStringEnums | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch emails on mount
  useEffect(() => {
    const fetchEmails = async () => {
      setLoading(true);
      try {
        // Fetch emails from Inbox
        const result = await Office365OutlookService.GetEmailsV2(
          "Inbox", // folderPath
          undefined, undefined, undefined, undefined, undefined, // filters
          undefined, undefined, false, false, undefined, true, undefined, 100 // includeAttachments, top 100
        );

        if (result.success && result.data) {
      // Access emails inside BatchResponse_ClientReceiveMessage
      // Usually it will be in result.value.value or result.value.Values
      const emails = (result.data as any).value || (result.data as any).Values || [];
      setMails(emails);
    } else {
      setMails([]);
    }
      } catch (error) {
        console.error("Failed to fetch emails:", error);
        setMails([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  return (
    <div className="mailAppFullScreen">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>📬 MailBox</h2>
        <ul>
          <li className="active">Inbox</li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="mainFull">
        <div className="headerFull">
          <input placeholder="🔍 Search mail..." />
        </div>

        <div className="splitView">
          {/* Email List */}
          <div className="mailList">
            {loading ? (
              <p>Loading emails...</p>
            ) : mails.length === 0 ? (
              <p>No emails found</p>
            ) : (
              mails.map((mail) => (
                <div
                  key={mail.Id}
                  className={`mailCard ${selectedMail?.Id === mail.Id ? "selected" : ""}`}
                  onClick={() => setSelectedMail(mail)}
                >
                  <strong>{mail.From}</strong>
                  <div>{mail.Subject}</div>
                  
                </div>
              ))
            )}
          </div>

          {/* Email Preview */}
          <div className="mailPreview">
            {selectedMail ? (
              <>
                <h3>{selectedMail.Subject}</h3>
                <p><strong>From:</strong> {selectedMail.From}</p>
                
                <hr />
                <p>{selectedMail.Body}</p>
              </>
            ) : (
              <p style={{ color: "#888" }}>Select an email to preview</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;