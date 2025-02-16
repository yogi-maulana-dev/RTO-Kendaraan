import React, { useState, useEffect } from "react";
import { getData, insertData } from "./api";

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getData();
    setUsers(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await insertData(name, email);
    if (response.success) {
      fetchUsers();
      setName("");
      setEmail("");
    }
  };

  return (
    <div>
      <h2>Data Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Tambah</button>
      </form>
    </div>
  );
};

export default App;
