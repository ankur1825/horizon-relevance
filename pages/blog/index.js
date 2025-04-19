import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export async function getStaticProps() {
  const files = fs.readdirSync('posts');
  const posts = files.map(filename => {
    const markdown = fs.readFileSync(path.join('posts', filename), 'utf-8');
    const { data } = matter(markdown);
    return {
      slug: filename.replace('.md', ''),
      ...data
    };
  });

  return {
    props: {
      posts
    }
  };
}

export default function Blog({ posts }) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      {posts.map(post => (
        <div key={post.slug} className="mb-4">
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-2xl text-blue-600 font-semibold">{post.title}</h2>
          </Link>
          <p className="text-gray-600">{post.date}</p>
        </div>
      ))}
    </div>
  );
}