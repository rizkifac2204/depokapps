// assets
import Groups3OutlinedIcon from "@mui/icons-material/Groups3Outlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";

// constant
const icons = {
  GroupAddOutlinedIcon,
  Groups3OutlinedIcon,
};

const simpeg = {
  id: "simpeg",
  title: "Kepegawaian",
  type: "group",
  children: [
    {
      id: "simpeg-data",
      title: "Data Pegawai",
      type: "item",
      url: "/admin/simpeg",
      icon: icons.Groups3OutlinedIcon,
      breadcrumbs: false,
    },
    {
      id: "simpeg-add",
      title: "Tambah Pegawai",
      type: "item",
      url: "/admin/simpeg/add",
      icon: icons.GroupAddOutlinedIcon,
      breadcrumbs: false,
    },
  ],
};

export default simpeg;
