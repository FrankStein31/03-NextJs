import React from 'react';
import Link from 'next/link';

const UserList = ({ users }) => {
    return (
        <div>
        <h1>Daftar Pengguna</h1>
        <ul>
            {users.map((user) => (
                <li key={user.id}>
                    <Link href={`/users/${user.id}`}>
                        {user.name} - {user.email}
                    </Link>
                </li>
            ))}
        </ul>
        </div>
    );
};

export async function getStaticProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();
    
    return {
        props: {
        users,
        },
    };
}

export default UserList;