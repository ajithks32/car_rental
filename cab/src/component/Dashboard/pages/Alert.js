import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Alert.css";

const Alert = () => {
  const [users, setUsers] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/users");
        setUsers(response.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load users!");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Toggle individual email
  const toggleSelect = (email) => {
    setSelectedEmails((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
    );
  };

  // Toggle all emails
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(users.map((user) => user.email));
    }
    setSelectAll(!selectAll);
  };

  const sendEmails = async () => {
    try {
      await axios.post("http://localhost:5000/alerts/send", {
        emails: selectedEmails,
        message,
      });
      toast.success("Sent successfully! ✅");
      setMessage("");
      setSelectedEmails([]);
      setSelectAll(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to send emails ❌");
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="alert-container">
      <h4 className="mb-4 text-center blue">Alert Users</h4>

      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
        />
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={toggleSelectAll}
                checked={selectAll || selectedEmails.length === users.length}
              />{" "}
              Select All
            </th>
            <th>Email</th>
            <th>UserName</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => toggleSelect(user.email)}
                  checked={selectedEmails.includes(user.email)}
                />
              </td>
              <td>{user.email}</td>
              <td>{user.username}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="btn Tex-primary text-white mt-2"
        onClick={sendEmails}
        disabled={!selectedEmails.length || !message.trim()}
      >
        Send Email
      </button>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </div>
  );
};

export default Alert;
