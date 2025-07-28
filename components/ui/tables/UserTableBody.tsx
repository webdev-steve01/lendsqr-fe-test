// components/table/UserTableBody.tsx
"use client";
import React from "react";

interface Props {
  users: User[];
}

function UserTableBody({ users }: Props) {
  return (
    <tbody>
      {users.map((user) => (
        <tr key={user.user_id}>
          <td className="table-cell">{user.organization}</td>
          <td className="table-cell">{user.fullname}</td>
          <td className="table-cell">{user.email}</td>
          <td className="table-cell">+{user.phone}</td>
          <td className="table-cell">{user.date_joined}</td>
          <td className="table-cell">
            <span className={`status-badge ${user.status}`}>{user.status}</span>
          </td>
          <td className="table-cell">⋮</td>
        </tr>
      ))}
    </tbody>
  );
}

export default UserTableBody;
