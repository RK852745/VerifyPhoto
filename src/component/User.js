// User.js

export const users = [
    { id: 1, name: 'Rahul', email: 'Rahul@example.com', phone: '1234567890', password: '7890' },
    { id: 2, name: 'Sumit', email: 'Sumit@example.com', phone: '9876543210', password: '3210' },
    { id: 3, name: 'Ravi', email: 'Ravi@example.com', phone: '1112223333', password: '3333' },
    { id: 4, name: 'Suraj', email: 'Suraj@example.com', phone: '4445556666', password: '6666' },
    { id: 5, name: 'Neeraj', email: 'Neeraj@example.com', phone: '7778889999', password: '9999' },
  ];
  
  const User = () => {
    return (
      <div>
        <h2>User Details</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default User;
  