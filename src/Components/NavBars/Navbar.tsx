import { AppBar, Button, Toolbar } from "@mui/material"; // styled //Fab //IconButton //Badge
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import { NavLink } from "react-router-dom";
import { PrimaryMoreIcon } from "../../UI/Icons/Icons";

function Navbar() {
  return (
    <AppBar
      position="fixed"
      color="default"
      sx={{
        top: "auto",
        bottom: 0,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-evenly",
        }}
      >
        <NavLink
          to="./users"
          className={({ isActive, isPending }) =>
            (isPending ? "pending" : isActive ? "active" : "") + " partner-nav"
          }
        >
          <Button color="inherit" aria-label="open drawer">
            <span className="flex flex-col items-center">
              <GridViewOutlinedIcon />
              <span className="text-xs">Users</span>
            </span>
          </Button>
        </NavLink>

        <NavLink
          to="./more"
          className={({ isActive, isPending }) =>
            (isPending ? "pending" : isActive ? "active" : "") + " partner-nav"
          }
        >
          <Button color="inherit" aria-label="open drawer">
            <span className="flex flex-col items-center">
              <PrimaryMoreIcon />
              <span className="text-xs">Chat</span>
            </span>
          </Button>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
