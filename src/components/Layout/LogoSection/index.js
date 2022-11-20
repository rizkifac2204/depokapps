import Link from "next/link";

// material-ui
import { ButtonBase } from "@mui/material";

// project imports
import Logo from "../ui-components/Logo";

const LogoSection = () => (
  <ButtonBase disableRipple>
    <Link href={`/`}>
      <Logo />
    </Link>
  </ButtonBase>
);

export default LogoSection;
