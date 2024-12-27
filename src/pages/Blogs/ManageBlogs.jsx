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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { setLoading } = useLoadingStore();
  const [queryParams, setQueryParams] = useState({
    page: 0,
    size: 10,
    title: "",
  });

  useEffect(() => {
    getAllBlogs();
  }, [queryParams]);

  // Fetch blogs data
  const getAllBlogs = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/blogs`);
      setBlogs(res?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete blog
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/blogs/${id}`);
      toast.success("Blog Deleted Successfully");
      getAllBlogs();
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
    setQueryParams({ ...queryParams, title: searchTerm });
  };

  return (
    <div className="mb-8">
      <SectionHeader title={"Manage Blogs"} />

      <div className="wrapper">
        <div className="w-full mb-6">
          <div className="flex justify-between items-end gap-3 flex-wrap">
            <h2 className="text-base font-medium mb-2">All Blogs List</h2>
            <Link to="/blog/create-blog" className="btn-primary mb-3 text-[14px]">
              <BiPlus className="mr-2 text-lg" />
              New Blog
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

        {/* Table to display blogs */}
        <div>
          <div className="table-responsive">
            <table className="table min-w-full">
              <thead>
                <tr className="text-left text-black border-b">
                  <th className="py-2">Blog Title</th>
                  <th>Description</th>
                  <th>User Action</th>
                </tr>
              </thead>
              <tbody>
                {blogs?.length > 0 ? (
                  blogs.map((blog, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="py-4">{blog?.title}</td>
                      <td> <div dangerouslySetInnerHTML={{ __html: blog?.description.slice(0, 100) || "----", }} /> </td>
                      <td className="flex space-x-2">
                        {/* Edit Button */}
                        <Link
                          to={`/edit-blog/${blog?._id}`}
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
                                onClick={() => handleDelete(blog?._id)}
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
                    <td colSpan="3" className="py-8 text-center">
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

export default ManageBlogs;
