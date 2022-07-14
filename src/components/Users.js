import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
  const users = useSelector((state) => state.users);
  return (
    <div>
      <h2>users</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Users;
