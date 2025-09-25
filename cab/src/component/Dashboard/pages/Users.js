import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Spinner,
  Alert,
  Table,
  Container,
  Image,
  Button,
  Form,
} from "react-bootstrap";
import { SortAlphaDown, SortAlphaUp } from "react-bootstrap-icons";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort users by username
  const sortedUsers = filteredUsers.sort((a, b) => {
    return sortOrder === "asc"
      ? a.username.localeCompare(b.username)
      : b.username.localeCompare(a.username);
  });

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center blue">Users List</h2>

      {/* Search and Sort Controls */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Form.Group className="w-50">
          <Form.Control
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form.Group>
        <Button
          className="btncolor"
          variant="outline-primary"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          {sortOrder === "asc" ? <SortAlphaDown /> : <SortAlphaUp />} Sort by
          Name
        </Button>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Loading users...</p>
        </div>
      )}

      {/* Error Message */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Users Table */}
      {!loading && !error && (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="thead-light">
            <tr>
              <th className="blue fs-6">Username</th>
              <th className="fs-6 blue">Email</th>
              <th className="fs-6 blue">Contact no</th>
              <th className="fs-6 blue">Registered On</th> {/* New Column */}
            </tr>
          </thead>
          <tbody>
            {sortedUsers.length > 0 ? (
              sortedUsers.map((user) => (
                <tr key={user._id}>
                  <td className="text-center d-flex align-items-center">
                    <Image
                      src={
                        user.profilePic
                          ? `http://localhost:5000/uploads/${user.profilePic}`
                          : "https://via.placeholder.com/50"
                      }
                      alt="Profile"
                      roundedCircle
                      width="35"
                      height="35"
                      className="border me-2"
                    />
                    <span>{user.username}</span>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone || "N/A"}</td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>{" "}
                  {/* Format Date */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Users;
