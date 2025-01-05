import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  DarkMode,
  LightMode,
  Help,
  Menu,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const dark = theme.palette.neutral.dark;
  const primaryLight = theme.palette.primary.light;

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <Box
      width="100%"
      padding="1rem 6%"
      sx={{
        background: "linear-gradient(90deg, #007bff, #00c6ff)", // 渐变背景
        color: "#fff", // 白色文字
        position: "sticky", // 固定在顶部
        top: 0, // 距顶部距离
        zIndex: 1000, // 确保在内容上方
      }}
    >
      <FlexBetween>
        {/* 网站名称 */}
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="inherit" // 继承父组件颜色（白色）
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight, // 悬停时颜色
              cursor: "pointer",
            },
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)", // 增强对比
          }}
        >
          SocialAura
        </Typography>

        {/* 搜索框和图标 */}
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor="#ffffff33" // 半透明白背景
            borderRadius="9px"
            padding="0.1rem 1.5rem"
            sx={{ width: "400px" }} // 调整搜索框宽度
          >
            <InputBase placeholder="Search..." sx={{ color: "#fff", width: "100%" }} />
            <IconButton>
              <Search sx={{ color: "#fff" }} />
            </IconButton>
          </FlexBetween>
        )}

        {/* Desktop Navigation */}
        {isNonMobileScreens ? (
          <FlexBetween gap="2rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Help sx={{ fontSize: "25px", color: "#fff" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: "#ffffff33", // 半透明白背景
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  color: "#fff", // 白色字体
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                    color: "#fff",
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu sx={{ color: "#fff" }} />
          </IconButton>
        )}
      </FlexBetween>
    </Box>
  );
};

export default Navbar;