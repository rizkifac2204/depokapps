import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";

import CustomCard from "components/Layout/ui-components/cards/CustomCard";

export default function CardUtama({ profile }) {
  return (
    <CustomCard boxShadow={true}>
      <CardHeader
        avatar={
          <Avatar
            alt={profile.nama_admin || profile.name}
            src={profile.image}
          />
        }
        title={<Typography>{profile.nama_admin}</Typography>}
        subheader={profile.level}
      />
      <Divider />
      <CardContent>
        <List>
          <ListItem
            disablePadding
            secondaryAction={
              <Typography variant="caption">{profile.nama_admin}</Typography>
            }
          >
            <ListItemButton>Nama User</ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            secondaryAction={
              <Typography variant="caption">{profile.level}</Typography>
            }
          >
            <ListItemButton>Level</ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            secondaryAction={
              <Typography variant="caption">{profile.telp_admin}</Typography>
            }
          >
            <ListItemButton>Telp / HP</ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            secondaryAction={
              <Typography variant="caption">{profile.email_admin}</Typography>
            }
          >
            <ListItemButton>Email</ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            secondaryAction={
              <Typography variant="caption">{profile.alamat_admin}</Typography>
            }
          >
            <ListItemButton>Alamat</ListItemButton>
          </ListItem>
        </List>
      </CardContent>
    </CustomCard>
  );
}
