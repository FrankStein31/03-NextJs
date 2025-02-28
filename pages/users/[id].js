import React from 'react';
import { useRouter } from 'next/router';

const UserDetail = ({ user }) => {
    const router = useRouter();
    
    if (router.isFallback) {
        return <div>Loading...</div>;
    }
    
    return (
        <div>
        <h1>Detail Pengguna</h1>
        <div>
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Website: {user.website}</p>
            <h3>Alamat</h3>
            <p>
                {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
            </p>
            <h3>Perusahaan</h3>
            <p>{user.company.name}</p>
            <p>{user.company.catchPhrase}</p>
        </div>
            <button onClick={() => router.back()}>Kembali</button>
        </div>
    );
};

export async function getStaticPaths() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();
    
    const paths = users.slice(0, 3).map((user) => ({
        params: { id: user.id.toString() },
    }));
    
    return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
    const user = await res.json();
    
    return {
        props: {
        user,
        },
    };
}

export default UserDetail;