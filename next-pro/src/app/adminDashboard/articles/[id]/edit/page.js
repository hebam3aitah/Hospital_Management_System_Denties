'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';

export default function EditArticlePage() {
  const router = useRouter();
  const { id } = useParams();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    axios.get(`/api/admin/articles/${id}`)
      .then((res) => {
        const article = res.data.data;
        setFormData({
          ...article,
          tags: Array.isArray(article.tags) ? article.tags : [],
        });
      })
      .catch(() => {
        setError('Failed to load article data.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagsChange = (e) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    setFormData({ ...formData, tags: tagsArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const updatedData = {
        ...formData,
        tags: Array.isArray(formData.tags) ? formData.tags : [],
      };

      await axios.put(`/api/admin/articles/${id}`, updatedData);
      router.push('/adminDashboard/articles');
    } catch (err) {
      console.error(err);
      setError('An error occurred while saving changes');
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-[#415A80]">Loading article data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg max-w-3xl mx-auto mt-6">
        <p className="text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="pb-5 border-b border-[#D7E2E9] mb-5">
        <h1 className="text-2xl font-bold text-[#415A80]">Edit Article</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-[#415A80] mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border border-[#D7E2E9] p-2 rounded-md bg-[#E5E7E9] focus:ring-[#A5D4DC] focus:border-[#A5D4DC] focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-[#415A80] mb-1">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-[#D7E2E9] p-2 rounded-md bg-[#E5E7E9] focus:ring-[#A5D4DC] focus:border-[#A5D4DC] focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-[#415A80] mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags.join(', ')}
              onChange={handleTagsChange}
              className="w-full border border-[#D7E2E9] p-2 rounded-md bg-[#E5E7E9] focus:ring-[#A5D4DC] focus:border-[#A5D4DC] focus:outline-none"
              placeholder="e.g.: health, nutrition, wellness"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-[#415A80] mb-1">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={10}
              required
              className="w-full border border-[#D7E2E9] p-2 rounded-md bg-[#E5E7E9] focus:ring-[#A5D4DC] focus:border-[#A5D4DC] focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-[#415A80] mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-[#D7E2E9] p-2 rounded-md bg-[#E5E7E9] focus:ring-[#A5D4DC] focus:border-[#A5D4DC] focus:outline-none"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="pt-4 border-t border-[#D7E2E9] mt-6">
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#415A80] text-white px-4 py-2 rounded-md hover:bg-[#A5D4DC] transition-colors focus:outline-none focus:ring-2 focus:ring-[#A5D4DC] focus:ring-offset-2"
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}