'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

export default function AddArticlePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    featuredImage: '',
    status: 'draft',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Validate required fields
    const validationErrors = {};
    if (!formData.title) validationErrors.title = 'Title is required';
    if (!formData.content) validationErrors.content = 'Content is required';
    if (!formData.category) validationErrors.category = 'Category is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Process tags into an array
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const payload = {
        ...formData,
        tags: tagsArray,
      };

      await axios.post('/api/admin/articles', payload);

      router.push('/adminDashboard/articles');
    } catch (error) {
      console.error('❌ Error creating article:', error);
      alert('An error occurred while creating the article');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="pb-5 border-b border-[#D7E2E9] mb-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#415A80]">Add New Article</h1>
        <Link href="/adminDashboard/articles" className="text-[#415A80] hover:text-[#A5D4DC] transition-colors">
          Back to Articles
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-[#415A80]">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full border p-2 rounded bg-[#E5E7E9] focus:ring-[#A5D4DC] focus:border-[#A5D4DC] ${errors.title ? 'border-red-500' : 'border-[#D7E2E9]'}`}
            />
            {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-[#415A80]">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full border p-2 rounded bg-[#E5E7E9] focus:ring-[#A5D4DC] focus:border-[#A5D4DC] ${errors.category ? 'border-red-500' : 'border-[#D7E2E9]'}`}
            >
              <option value="">Select a category</option>
              <option value="Dental Health">Dental Health</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Mental Health">Mental Health</option>
              <option value="Allergies">Allergies</option>
              <option value="Nutrition">Nutrition</option>
            </select>
            {errors.category && <p className="text-sm text-red-600">{errors.category}</p>}
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-[#415A80]">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              id="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full border border-[#D7E2E9] p-2 rounded bg-[#E5E7E9] focus:ring-[#A5D4DC] focus:border-[#A5D4DC]"
              placeholder="e.g.: health, nutrition, children"
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-[#415A80]">Content</label>
            <textarea
              id="content"
              name="content"
              rows={10}
              value={formData.content}
              onChange={handleChange}
              className={`w-full border p-2 rounded bg-[#E5E7E9] focus:ring-[#A5D4DC] focus:border-[#A5D4DC] ${errors.content ? 'border-red-500' : 'border-[#D7E2E9]'}`}
            />
            {errors.content && <p className="text-sm text-red-600">{errors.content}</p>}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-[#415A80]">Status</label>
            <div className="mt-2 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  checked={formData.status === 'draft'}
                  onChange={handleChange}
                  className="text-[#A5D4DC] focus:ring-[#A5D4DC]"
                />
                <span className="ml-2 text-[#415A80]">Draft</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="published"
                  checked={formData.status === 'published'}
                  onChange={handleChange}
                  className="text-[#A5D4DC] focus:ring-[#A5D4DC]"
                />
                <span className="ml-2 text-[#415A80]">Published</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#415A80] text-white px-4 py-2 rounded hover:bg-[#A5D4DC] transition-colors"
            >
              {isSubmitting ? 'Saving...' : 'Save Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}