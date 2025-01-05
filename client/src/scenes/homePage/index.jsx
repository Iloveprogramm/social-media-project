import { Box, Typography, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import WhoToFollowWidget from "scenes/widgets/WhoToFollowWidget";
import TrendingTopicsWidget from "scenes/widgets/TrendingTopicsWidget";
import WidgetWrapper from "components/WidgetWrapper";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="1.5rem"
        justifyContent="space-between"
      >
        {/* 左侧导航栏和用户信息 */}
        <Box flexBasis={isNonMobileScreens ? "20%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
          <Box mt="2rem">
            {/* Quick Tips 模块 */}
            <WidgetWrapper>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ marginBottom: "1rem" }}
              >
                Quick Tips
              </Typography>
              <Box>
                <Typography sx={{ marginBottom: "1rem" }}>
                  🎉 Welcome back!
                </Typography>
                <Typography sx={{ marginBottom: "1rem" }}>
                  💡 Tip: Use hashtags (#) to make your posts more discoverable!
                </Typography>
                <Typography sx={{ marginBottom: "1rem" }}>
                  🔔 Reminder: Check your notifications daily for updates!
                </Typography>
              </Box>
            </WidgetWrapper>
          </Box>
        </Box>

        {/* 中间内容 */}
        <Box
          flexBasis={isNonMobileScreens ? "50%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* 传递 userId 确保发帖表单显示 */}
          <MyPostWidget picturePath={picturePath} userId={_id} />
          <PostsWidget userId={_id} />
        </Box>

        {/* 右侧模块 */}
        {isNonMobileScreens && (
          <Box flexBasis="25%" display="flex" flexDirection="column" gap="2rem">
            {/* 热点模块放在首位 */}
            <TrendingTopicsWidget />
            {/* 合并关注和好友列表模块 */}
            <WidgetWrapper>
              <Typography variant="h6" fontWeight="bold" mb="1rem">
                Connections
              </Typography>
              <WhoToFollowWidget />
              <FriendListWidget userId={_id} />
            </WidgetWrapper>
            {/* 广告模块放在最后 */}
            <AdvertWidget />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
