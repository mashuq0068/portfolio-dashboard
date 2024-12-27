import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "@/config/axiosConfig";
import SectionHeader from "@/components/ui/section-header";
import JoditEditor from "jodit-react";

const initialState = {
  image: "",
  title: "",
  description:""
};

const CreateBlog = () => {
  const [formData, setFormData] = useState(initialState);
  const [editorContent, setEditorContent] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      description: editorContent,
    };
    console.log(data);

    try {
      await axiosInstance.post("/blogs", data);
      toast.success("Blog Created Successfully");
      // Reset the form
      setFormData({ ...initialState });
      setEditorContent("");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };
  const config = {
    height: 500, // Set the desired height in pixels
    // other Jodit options
  };
  const handleEditorChange = useCallback((content) => {
    setEditorContent(content);
  }, []);

  return (
    <div className="mb-8">
      <SectionHeader title={"Create New Blog"} />
     <div className=" wrapper">
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
            Create Blog
          </button>
        </div>
      </form>
     </div>
    </div>
  );
};

export default CreateBlog;
