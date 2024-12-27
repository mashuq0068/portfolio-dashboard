import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

const EditSkill = () => {
  const { id } = useParams();
  const { setLoading } = useLoadingStore();
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    // Fetch the skill data by id
    const fetchSkill = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/skills/${id}`);
        const data = response?.data?.data
        setFormData({
          imageUrl: data.image,
          name: data.name,
          description: data.description,
          level: data.level,
        });
      } catch (error) {
        toast.error(error.message || "Failed to fetch skill data");
      } finally {
        setLoading(false);
      }
    };

    fetchSkill();
  }, [id, setLoading]);

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
      await axiosInstance.put(`/skills/${id}`, data);
      toast.success("Skill Updated Successfully");
    } catch (error) {
      toast.error(error.message || "Failed to update skill");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <SectionHeader title={"Edit Skill"} />
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
            Update Skill
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default EditSkill;
