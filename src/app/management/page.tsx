"use client";

import { UUID } from "crypto";
import React, { useEffect, useState } from "react";

type User = {
  id: UUID;
  email: string;
  username: string;
};

function ManagementPage() {
  const [users, setUsers] = useState<User[]>([]);

  const [newUserName, setNewUserName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/user`);
      const data = await res.json();
      setUsers(data);
    };
    fetchData();
  }, []);

  const handleAddUser = async () => {
    if (!newUserName) {
      alert("유저 이름을 입력하세요.");
      return;
    }
    if (!newEmail) {
      alert("유저 이메일을 입력하세요.");
      return;
    }
    if (!newUserPassword && newUserPassword.length >= 6) {
      alert("유저 비밀번호를 6자리 이상 입력하세요.");
      return;
    }

    try {
      await fetch("/api/user/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: newUserName,
          id: newEmail,
          password: newUserPassword,
        }),
      });

      const res = await fetch(`/api/user`);
      const data = await res.json();
      setUsers(data);
    } catch (e: unknown) {
      if (e instanceof Error) {
        alert(`${e.message} 계정 추가에 실패하였습니다`);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setNewUserName("");
      setNewEmail("");
      setNewUserPassword("");
    }
  };

  const handleDeleteUser = async (id: string) => {
    // api 연결
    try {
      await fetch("/api/user/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id, // 삭제할 유저의 ID
        }),
      });
      const res = await fetch(`/api/user`);
      const data = await res.json();
      setUsers(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangePassword = async (id: string, username: string) => {
    const newPassword = prompt("새 비밀번호를 입력하세요:");
    // api 연결
    try {
      const response = await fetch("/api/user/changePassword", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          password: newPassword,
        }),
      });
      // 응답이 200 OK일 때만 alert 실행
      if (response.ok) {
        if (newPassword) {
          alert(`${username}의 비밀번호를 '${newPassword}'로 변경했습니다.`);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">계정 관리</h1>

      {/* 사용자 추가 폼 */}
      <div className="mb-8 space-y-2">
        <input
          type="text"
          placeholder="이름"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          className="border px-3 py-2 mr-2 rounded"
        />
        <input
          type="text"
          placeholder="이메일"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="border px-3 py-2 mr-2 rounded"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={newUserPassword}
          onChange={(e) => setNewUserPassword(e.target.value)}
          className="border px-3 py-2 mr-2 rounded"
        />

        <button
          onClick={handleAddUser}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          계정 추가
        </button>
      </div>

      {/* 사용자 목록 테이블 */}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-3">유저 이름</th>
            <th className="border p-3">유저 아이디</th>
            <th className="border p-3">비밀번호 수정</th>
            <th className="border p-3">삭제</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleChangePassword(user.id, user.username)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  비밀번호 수정
                </button>
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManagementPage;
