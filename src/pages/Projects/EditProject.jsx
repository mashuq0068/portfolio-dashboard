import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "@/config/axiosConfig";
import SectionHeader from "@/components/ui/section-header";
import useLoadingStore from "@/store/loadingStore";
import { BiPlus } from "react-icons/bi";

const initialState = {
  name: "",
  image: "",
  description: "",
  shortDescription: "",
  liveLink: "",
  frontendRepo: "",
  backendRepo: "",
  technologies: [{ image: "", name: "" }],
};

const EditProject = () => {
  const { id } = useParams();
  const { setLoading } = useLoadingStore();
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    // Fetch the project data by id
    const fetchProject = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/projects/${id}`);
        const data = res?.data?.data;
        setFormData({
          name: data.name,
          image: data.image,
          description: data.description,
          shortDescription: data.shortDescription,
          liveLink: data.liveLink,
          frontendRepo: data.frontendRepo,
          backendRepo: data.backendRepo,
          technologies: data.technologies,
        });
      } catch (error) {
        toast.error(error.message || "Failed to fetch project data");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, setLoading]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle technologies input change
  const handleTechnologyChange = (index, e) => {
    const { name, value } = e.target;
    const newTechnologies = formData.technologies.map((tech, i) =>
      i === index ? { ...tech, [name]: value } : tech
    );
    setFormData((prevState) => ({
      ...prevState,
      technologies: newTechnologies,
    }));
  };

  // Add new technology field
  const addTechnology = () => {
    setFormData((prevState) => ({
      ...prevState,
      technologies: [...prevState.technologies, { image: "", name: "" }],
    }));
  };

  // Remove technology field
  const removeTechnology = (index) => {
    const newTechnologies = formData.technologies.filter((_, i) => i !== index);
    setFormData((prevState) => ({
      ...prevState,
      technologies: newTechnologies,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.put(`/projects/${id}`, formData);
      toast.success("Project Updated Successfully");
    } catch (error) {
      toast.error(error.message || "Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <SectionHeader title={"Edit Project"} />
      <div className="wrapper">
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
          {/* Technologies */}
          <div>
            <div className="w-full pt-6 mb-6">
              <div className="flex justify-between items-end gap-3 flex-wrap">
                <h2 className="text-base flex justify-between flex-col font-medium mb-2">
                  Technologies
                </h2>
                <button
                  type="button"
                  onClick={addTechnology}
                  className="flex items-center mb-2 text-primary hover:text-primary-dark"
                >
                  <BiPlus className="mr-1" /> Add Technology
                </button>
              </div>
              <div className="h-[2px] bg-gray-200">
                <div className="h-[2px] bg-primary w-[120px]"></div>
              </div>
            </div>
            {formData.technologies.length > 0 ? (
              <div>
                {formData.technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-4"
                  >
                    <input
                      type="text"
                      name="image"
                      value={tech.image}
                      onChange={(e) => handleTechnologyChange(index, e)}
                      placeholder="Enter Technology Image URL"
                      className="form-input w-full md:w-1/4"
                    />
                    <input
                      type="text"
                      name="name"
                      value={tech.name}
                      onChange={(e) => handleTechnologyChange(index, e)}
                      placeholder="Enter Technology Name"
                      className="form-input w-full md:w-1/4"
                    />
                    <button
                      type="button"
                      onClick={() => removeTechnology(index)}
                      className="text-red-500 md:w-auto self-end md:self-center"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 font-medium py-8">
                No Technologies Added
              </div>
            )}
          </div>
          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" className="btn-primary">
              Update Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProject;
