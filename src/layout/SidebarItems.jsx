import {
  Monitor,
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Book,
  Wrench,
  File,
} from "lucide-react";

// Sample data with updated icons
const SidebarItems = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "cpMed",
      logo: GalleryVerticalEnd,
      plan: "Control Panel",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Monitor,
    },
    {
      title: "Skills",
      icon: Wrench,
      items: [
        {
          title: "Create Skill",
          url: "/create-skill",
        },
        {
          title: "Manage Skills",
          url: "/manage-skills",
        },
      ],
    },
    {
      title: "Projects",
      icon: File,
      items: [
        {
          title: "Create Project",
          url: "/create-project",
        },
        {
          title: "Manage Projects",
          url: "/manage-projects",
        },
      ],
    },
    {
      title: "Blogs",
      icon: Book,
      items: [
        {
          title: "Create Blog",
          url: "/create-blog",
        },
        {
          title: "Manage Blogs",
          url: "/manage-blogs",
        },
      ],
    },
  ],
};

export default SidebarItems;
