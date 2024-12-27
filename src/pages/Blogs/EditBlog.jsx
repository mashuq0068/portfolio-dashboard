import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "@/config/axiosConfig";
import SectionHeader from "@/components/ui/section-header";
import JoditEditor from "jodit-react";

const initialState = {
  image: "",
  title: "",
  description: "",
};

const EditBlog = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState(initialState);
  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    // Fetch the blog data by id
    const fetchBlog = async () => {
      try {
        const res = await axiosInstance.get(`/blogs/${id}`);
        const data = res?.data?.data;
        setFormData({
          image: data.image,
          title: data.title,
        });
        setEditorContent(data.description);
      } catch (error) {
        toast.error(error.message || "Failed to fetch blog data");
      }
    };

    fetchBlog();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleEditorChange = useCallback((content) => {
    setEditorContent(content);
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      description: editorContent,
    };
  
    try {
      await axiosInstance.put(`/blogs/${id}`, data);
      toast.success("Blog Updated Successfully");
    } catch (error) {
      toast.error(error.message || "Failed to update blog");
    }
  };
  const config = {
    height: 500, // Set the desired height in pixels
    // other Jodit options
  };


  return (
    <div className="mb-8">
      <SectionHeader title={"Edit Blog"} />
      <div className="wrapper">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter Blog Title"
              className="form-input"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="form-label">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter Image URL"
              className="form-input"
            />
          </div>

          {/* Description (Text Editor) */}
          <div>
            <label className="form-label">Description</label>
            <JoditEditor
            config={config}
              value={editorContent}
              onChange={handleEditorChange}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" className="btn-primary">
              Update Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
