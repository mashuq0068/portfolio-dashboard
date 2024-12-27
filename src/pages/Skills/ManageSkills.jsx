import { useState, useEffect } from "react";
import axiosInstance from "@/config/axiosConfig";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import SectionHeader from "@/components/ui/section-header";
import useLoadingStore from "@/store/loadingStore";
import PlaceHolder from "@/utility/PlaceHolder";
import toast from "react-hot-toast";
import { BiPlus } from "react-icons/bi";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const { setLoading } = useLoadingStore();
  const [queryParams, setQueryParams] = useState({
    page: 0,
    size: 10,
    name: "",
  });

  useEffect(() => {
    getAllSkills();
  }, [queryParams]);

  // Fetch skills data
  const getAllSkills = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/skills`);
      console.log(res);
      setSkills(res?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };



  // Handle delete skill
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/skills/${id}`);
      toast.success("Skill Deleted Successfully");
      getAllSkills();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    setQueryParams({ ...queryParams, name: searchTerm });
  };

  return (
    <div className="mb-8">
      <SectionHeader title={"Manage Skills"} />

      <div className="wrapper">
        <div className="w-full mb-6">
          <div className="flex justify-between items-end gap-3 flex-wrap">
            <h2 className="text-base font-medium mb-2">All Skills List</h2>
            <Link to="/skill/create-skill" className="btn-primary mb-3 text-[14px]">
              <BiPlus className="mr-2 text-lg" />
              New Skill
            </Link>
          </div>
          <div className="h-[2px] bg-gray-200">
            <div className="h-[2px] bg-primary w-[120px]"></div>
          </div>
        </div>

        <div className="flex mb-5 md:space-x-6 md:space-y-0 space-y-3 flex-wrap">
          <form onSubmit={handleSearchSubmit}>
            <div className="flex py-2 items-center space-x-2 bg-[#EBF5FF] px-4 rounded-full flex-shrink-0 w-full sm:w-auto mb-5 sm:mb-0">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                name="search"
                placeholder="Search"
                className="bg-transparent outline-none text-gray-600 w-full"
              />
            </div>
          </form>
        </div>

        {/* Table to display skills */}
        <div>
          <div className="table-responsive">
            <table className="table min-w-full">
              <thead>
                <tr className="text-left text-black border-b">
                  <th className="py-2">Skill</th>
                  <th>Description</th>
                  <th>Level</th>
                  <th>User Action</th>
                </tr>
              </thead>
              <tbody>
                {skills?.length > 0 ? (
                  skills.map((skill, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="py-4">
                        {
                          <p className="flex gap-3 items-center">
                            <img className="w-8 h-8 rounded-lg object-contain" src={skill.image} alt="" />
                            <span>{skill.name}</span>
                          </p>
                        
                        }
                        </td>
                      <td>{skill?.description || "----"}</td>
                      <td>{skill?.level || "----"}</td>
                      <td className="flex space-x-2">
                        {/* Edit Button */}
                        <Link
                          to={`/edit-skill/${skill?._id}`}
                          className="btn-outline border border-green-500 rounded-lg text-black hover:text-white hover:bg-green-500 transition duration-300"
                        >
                          <CiEdit size={18} />
                        </Link>

                        {/* Delete Button */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="btn-outline border border-red-400 rounded-lg text-red-400 hover:text-white hover:bg-red-400 transition duration-300">
                              <RiDeleteBinLine size={18} />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your data.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="btn-primary bg-gray-200 text-black hover:text-black hover:bg-gray-300">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(skill?._id)}
                                className="btn-primary bg-red-500 hover:bg-red-600"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-8 text-center">
                      <PlaceHolder />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default ManageSkills;
