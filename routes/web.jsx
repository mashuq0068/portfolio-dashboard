import SidebarLayout from "@/layout/SidebarLayout";
import Login from "@/pages/Authentication/Login";
import CreateBlog from "@/pages/Blogs/CreateBlog";
import EditBlog from "@/pages/Blogs/EditBlog";
import ManageBlogs from "@/pages/Blogs/ManageBlogs";
import DashboardPage from "@/pages/Dashboard/DashboardPage";
import CreateProject from "@/pages/Projects/CreateProject";
import EditProject from "@/pages/Projects/EditProject";
import ManageProjects from "@/pages/Projects/ManageProjects";
import CreateSkill from "@/pages/Skills/CreateSkill";
import EditSkill from "@/pages/Skills/EditSkill";
import ManageSkills from "@/pages/Skills/ManageSkills";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

const Web = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("access");
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } 
  }, [isLoggedIn]);

  return (
    <Routes>
      {!isLoggedIn ? (
        <Route path="/login" element={<Login />} />
      ) : (
        <Route path="/" element={<SidebarLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/create-skill" element={<CreateSkill />} />
          <Route path="/manage-skills" element={<ManageSkills />} />
          <Route path="/edit-skill/:id" element={<EditSkill />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/manage-projects" element={<ManageProjects />} />
          <Route path="/edit-project/:id" element={<EditProject />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/manage-blogs" element={<ManageBlogs />} />
          <Route path="/edit-blog/:id" element={<EditBlog />} />
        </Route>
      )}
    </Routes>
  );
};

export default Web;
