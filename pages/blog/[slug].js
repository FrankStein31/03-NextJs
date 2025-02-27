import { useRouter } from 'next/router';

const BlogPost = () => {
    const router = useRouter();
    const { slug } = router.query;
    
    return (
        <div>
            <h1>Blog Post: {slug}</h1>
            <p>Ini adalah blog post dengan slug {slug}.</p>
        </div>
    );
};

export default BlogPost;