import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "@/config/axiosConfig";
import SectionHeader from "@/components/ui/section-header";
import useLoadingStore from "@/store/loadingStore";

const initialState = {
  name: "",
  image: "",
  description: "",
  shortDescription: "",
  liveLink: "",
  frontendRepo: "",
  backendRepo: "",
};

const CreateProject = () => {
  const { setLoading } = useLoadingStore();
  const [formData, setFormData] = useState(initialState);

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
    setLoading(true);

    try {
      await axiosInstance.post("/projects", formData);
      toast.success("Project Created Successfully");
      // Reset the form
      setFormData({ ...initialState });
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <SectionHeader title={"Create New Project"} />
     <div className=" wrapper">
     <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Project Name"
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

        {/* Description */}
        <div>
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Project Description"
            className="form-input"
          />
        </div>

        {/* Short Description */}
        <div>
          <label className="form-label">Short Description</label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Enter Short Description"
            className="form-input"
          />
        </div>

        {/* Live Link */}
        <div>
          <label className="form-label">Live Link</label>
          <input
            type="text"
            name="liveLink"
            value={formData.liveLink}
            onChange={handleChange}
            placeholder="Enter Live Link"
            className="form-input"
          />
        </div>

        {/* Frontend Repository */}
        <div>
          <label className="form-label">Frontend Repository</label>
          <input
            type="text"
            name="frontendRepo"
            value={formData.frontendRepo}
            onChange={handleChange}
            placeholder="Enter Frontend Repository URL"
            className="form-input"
          />
        </div>

        {/* Backend Repository */}
        <div>
          <label className="form-label">Backend Repository (optional)</label>
          <input
            type="text"
            name="backendRepo"
            value={formData.backendRepo}
            onChange={handleChange}
            placeholder="Enter Backend Repository URL"
            className="form-input"
          />
        </div>

      

        {/* Submit Button */}
        <div>
          <button type="submit" className="btn-primary">
            Create Project
          </button>
        </div>
      </form>
     </div>
    </div>
  );
};

export default CreateProject;
