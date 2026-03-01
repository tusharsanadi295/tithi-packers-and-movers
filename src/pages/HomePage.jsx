import { useEffect, useState } from "react";
import BlogSection from "./BlogSection";

export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoadingBlogs(false);
      })
      .catch(() => setLoadingBlogs(false));
  }, []);

  return (
    <>
      {/* other home sections */}

      {!loadingBlogs && <BlogSection blogs={blogs} />}

      {/* other sections */}
    </>
  );
}
