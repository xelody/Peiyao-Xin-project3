import React from 'react';

function PasswordList({ passwords }) {
  return (
    <div>
      {passwords.map((password, index) => (
        <div key={index}>
          <div>{password.url}</div>
          <div>{password.lastUpdated}</div>
          <div>{password.password}</div>
          <button>Delete</button>
          <button>Update</button>
        </div>
      ))}
    </div>
  );
}

export default PasswordList;