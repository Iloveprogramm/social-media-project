import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import Form from "./Form";
import { Language, Google, Facebook, Twitter } from "@mui/icons-material";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleLanguageClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        paddingBottom: "2rem",
        background: "linear-gradient(180deg, #f5f5f5, #e3f2fd)",
        position: "relative",
      }}
    >
      {/* Header Section */}
      <Box
        width="100%"
        p="1rem 6%"
        textAlign="center"
        style={{
          background: "linear-gradient(90deg, #007bff, #00c6ff)",
          color: "#fff",
        }}
      >
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color="inherit"
          style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)" }}
        >
          SocialAura
        </Typography>

        {/* Language Selector */}
        <IconButton
          onClick={handleLanguageClick}
          sx={{
            position: "absolute",
            top: "1rem",
            right: "2rem",
            color: "#fff",
          }}
        >
          <Language />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleLanguageClose}>
          <MenuItem onClick={handleLanguageClose}>English</MenuItem>
          <MenuItem onClick={handleLanguageClose}>中文</MenuItem>
          <MenuItem onClick={handleLanguageClose}>Español</MenuItem>
        </Menu>
      </Box>

      {/* Login Box */}
      <Box
        width={isNonMobileScreens ? "40%" : "90%"}
        p="2rem"
        m="2rem auto"
        borderRadius="2rem"
        style={{
          background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
          boxShadow: "8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff", // 高级玻璃拟态阴影
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
        sx={{
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "8px 8px 20px #cccccc, -8px -8px 20px #ffffff",
          },
        }}
      >
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{
            mb: "1.5rem",
            color: "#333",
            textAlign: "center",
          }}
        >
          Welcome to SocialAura, the Social Media for Everyone!
        </Typography>

        {/* Form Component */}
        <Form />

        {/* Social Login Buttons */}
        <Box mt="2rem" display="flex" justifyContent="center" gap="1rem">
          {/* Google Button */}
          <IconButton
            sx={{
              backgroundColor: "#fff",
              border: "2px solid #db4437",
              "&:hover": { backgroundColor: "#f5f5f5" },
              borderRadius: "15px",
              p: "1rem",
            }}
          >
            <Google sx={{ color: "#db4437" }} />
          </IconButton>

          {/* Facebook Button */}
          <IconButton
            sx={{
              backgroundColor: "#fff",
              border: "2px solid #3b5998",
              "&:hover": { backgroundColor: "#f5f5f5" },
              borderRadius: "15px",
              p: "1rem",
            }}
          >
            <Facebook sx={{ color: "#3b5998" }} />
          </IconButton>

          {/* Twitter Button */}
          <IconButton
            sx={{
              backgroundColor: "#fff",
              border: "2px solid #1DA1F2",
              "&:hover": { backgroundColor: "#f5f5f5" },
              borderRadius: "15px",
              p: "1rem",
            }}
          >
            <Twitter sx={{ color: "#1DA1F2" }} />
          </IconButton>
        </Box>
      </Box>

      {/* Footer Section */}
      <Box
        component="footer"
        textAlign="center"
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "2rem",
          background: "linear-gradient(90deg, #007bff, #00c6ff)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="body2" fontSize="12px">
          © 2024 SocialAura. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;