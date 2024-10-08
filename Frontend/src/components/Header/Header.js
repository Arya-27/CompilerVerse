import React, { useState, useContext } from "react";
import style from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import HomeIcon from "@mui/icons-material/Home";
import Avatar from "@mui/material/Avatar";
import { AuthContext } from "../../App";
import AppBar from "@mui/material/AppBar";
import { Container } from "@mui/system";
import { Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { googleLogout } from "@react-oauth/google";
import { useMediaQuery, useTheme } from "@mui/material";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(AuthContext);
  const pages = ["Compiler", "Blogs"];
  const settings = ["Profile", "Dashboard"];

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick = (index) => {
    navigate(`/${pages[index].toLowerCase()}`);
  };

  const handleSettings = (index) => {
    if (window.localStorage.getItem("username") === null) {
      toast.error("Please Sign In to continue");
      navigate(`/${"signin"}`);
      return;
    }
    navigate(`/${settings[index].toLowerCase()}`);
  };

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSignIn = () => {
    navigate(`/${"signin"}`);
  };

  const handleLogout = async () => {
    googleLogout();
    navigate("/");
    window.localStorage.removeItem("avatar");
    window.localStorage.removeItem("username");
    window.location.reload();
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  };

  return (
    <AppBar position="static">
      <Container maxWidth="100%" sx={{ zIndex: "2", width: "100vw" }}>
        <Toolbar
          disableGutters
          sx={{ display: { md: "flex" }, justifyContent: "flex-end" }}
        >
          {/* <img
            src={logo}
            style={{
              height: "50px",
              width: "50px",
              borderRadius: "50%",
              marginRight: "10px",
            }}
            alt="Not Found"
          /> */}
          <Typography
            variant="h4"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 900,
              letterSpacing: ".3rem",
              textDecoration: "none",
              "&:hover": {
               color: "#1e88e5", 
    },
            }}
          >
            CompilerVerse
          </Typography>
          {/* <HomeIcon
            sx={{
              display: { xs: "none", md: "flex" },
              ml: 5,
              mr: 2,
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/home");
            }}
          /> */}
          {isMobile ? (
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page, index) => (
                  <MenuItem
                    key={index}
                    onClick={(handleCloseNavMenu, () => handleClick(index))}
                  >
                    <Typography
                      textAlign="center"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1rem",
                      }}
                    >
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, index) => (
                <Typography
                  key={index}
                  onClick={(handleCloseNavMenu, () => handleClick(index))}
                  sx={{
                    mx: 2,
                    my: 2,
                    display: "block",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    // letterSpacing: ".1rem",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "scale(.8)",
                      boxShadow: "0 5px 10px rgba(0, 0, 0, 0.3)",
                    },
                  }}
                >
                  {page}
                </Typography>
              ))}
            </Box>
          )}
          <Typography
            variant="h1"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            className="headerName"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Playfair Display",
              fontWeight: 700,
              fontSize: ".7rem",
              color: "#FFFFFF",
              cursor: "pointer",
              letterSpacing: ".3rem",
            }}
          >
            CompilerVerse
          </Typography>
          <div className={style.mode}>
            {darkMode ? (
              <LightModeIcon
                fontSize="small"
                cursor="pointer"
                onClick={handleDarkMode}
              />
            ) : (
              <DarkModeIcon
                fontSize="small"
                cursor="pointer"
                onClick={handleDarkMode}
              />
            )}
          </div>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                className={style.avatar}
                onClick={handleOpenUserMenu}
                sx={{ p: 0, mx: 2 }}
              >
                {window.localStorage?.getItem("username") ? (
                  window.localStorage?.getItem("avatar") ? (
                    <Avatar
                      className={style.avatar}
                      onClick={handleOpenUserMenu}
                      src={window.localStorage?.getItem("avatar").toString()}
                      alt="G"
                    />
                  ) : (
                    <Avatar>
                      {window.localStorage
                        ?.getItem("username")
                        .charAt(0)
                        .toUpperCase()}
                    </Avatar>
                  )
                ) : (
                  <Avatar>
                    <AccountCircleIcon color="info" />
                  </Avatar>
                )}
              </IconButton>
            </Tooltip>
            {!window.localStorage?.getItem("username") ? (
              <Button variant="contained" color="info" onClick={handleSignIn}>
                Sign In
              </Button>
            ) : (
              <Button variant="contained" color="info" onClick={handleLogout}>
                Logout
              </Button>
            )}

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem
                  key={index}
                  onClick={(handleCloseUserMenu, () => handleSettings(index))}
                >
                  {setting}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
