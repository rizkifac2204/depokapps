// assets
import AcUnitIcon from "@mui/icons-material/AcUnit";

// constant
const icons = {
  AcUnitIcon,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: "utilities",
  title: "Utilities",
  type: "group",
  children: [
    {
      id: "util-typography",
      title: "Typography",
      type: "item",
      url: "/c1",
      icon: icons.AcUnitIcon,
      breadcrumbs: false,
    },
    {
      id: "icons",
      title: "Icons",
      type: "collapse",
      icon: icons.AcUnitIcon,
      children: [
        {
          id: "tabler-icons",
          title: "Tabler Icons",
          type: "item",
          url: "/c1",
          breadcrumbs: false,
        },
        {
          id: "material-icons",
          title: "Material Icons",
          type: "item",
          url: "/c2",
          breadcrumbs: false,
        },
      ],
    },
  ],
};

export default utilities;
