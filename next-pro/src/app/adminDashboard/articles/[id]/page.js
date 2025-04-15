
// ✅ app/adminDashboard/articles/[id]/page.js (عرض التفاصيل)
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function ArticleDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios.get(`/api/admin/articles/${id}`).then((res) => {
      setArticle(res.data.data);
    });
  }, [id]);

  if (!article) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-white rounded shadow max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-4">Category: {article.category}</p>
      <p className="mb-6">Status: {article.status}</p>
      <div className="prose" dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  );
}
