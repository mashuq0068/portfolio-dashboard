import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "@/config/axiosConfig";
import SectionHeader from "@/components/ui/section-header";
import useLoadingStore from "@/store/loadingStore";

const initialState = {
  imageUrl: "",
  name: "",
  description: "",
  level: "",
};

const CreateSkill = () => {
  const { setLoading } = useLoadingStore();
  const [formData, setFormData] = useState(initialState);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      image: formData.imageUrl,
      name: formData.name,
      description: formData.description,
      level: formData.level,
    };

    try {
      await axiosInstance.post("/skills", data);
      toast.success("Skill Created Successfully");
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
      <SectionHeader title={"Create New Skill"} />
    <div className=" wrapper">
    <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image URL */}
        <div>
          <label className="form-label">Image URL</label>
          <input
            type="text"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            placeholder="Enter Image URL"
            className="form-input"
          />
        </div>

        {/* Name */}
        <div>
          <label className="form-label">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter Skill Name"
            className="form-input"
          />
        </div>

        {/* Description */}
        <div>
          <label className="form-label">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter Skill Description"
            className="form-input"
          />
        </div>

        {/* Level */}
        <div>
          <label className="form-label">Level</label>
          <input
            type="text"
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
            placeholder="Enter Skill Level"
            className="form-input"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit" className="btn-primary">
            Create Skill
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default CreateSkill;
