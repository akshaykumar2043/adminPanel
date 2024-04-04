import { useEffect, useState } from "react"
import { useAuth } from "../store/auth";
import {Link} from "react-router-dom";
export const AdminUsers = () => {

    const { authorizationToken } = useAuth();
    const [users, setUsers] = useState([]);
    const getAllUserData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/users", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();
            setUsers(data);
            console.log(`users${data}`);
        } catch (error) {
            console.log(error)
        }
    }


    // delete the user on delete button
    // 
    const deleteUser = async (id) => {
        try {
          const response = await fetch(`http://localhost:5000/api/users/delete/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: authorizationToken,
            },
          });
    
          if (!response.ok) {
            throw new Error(`Failed to delete user: ${response.status} ${response.statusText}`);
          }
    
          // Update the user list after successful deletion
          const updatedUsers = users.filter((user) => user.id !== id);
          setUsers(updatedUsers);
          console.log(`Users after delete: ${JSON.stringify(updatedUsers)}`);
        } catch (error) {
          console.log(error);
        }
        
      };

    useEffect(() => {
        getAllUserData();
    }, []);
    return (
        <>
            <section className="admin-users-section">
                <div className="container">
                    <h1>Admin Users Data</h1>
                </div>
                <div className="container admin-users">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((curUser, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{curUser.username}</td>
                                        <td>{curUser.email}</td>
                                        <td>{curUser.phone}</td>
                                        <td><Link to={`/admin/users/${curUser.id}/edit`}>Edit</Link></td>
                                        <td>
                                            <button className="btn secondary-btn"
                                         onClick={() => deleteUser(curUser.id)}>Delete</button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                </div>
            </section>
        </>
    );
};