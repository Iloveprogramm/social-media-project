import { Box, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";

const TrendingTopicsWidget = () => {
  const theme = useTheme();
  const trendingTopics = [
    { topic: "#coding", posts: 120 },
    { topic: "#javascript", posts: 85 },
    { topic: "#reactjs", posts: 90 },
  ];

  return (
    <WidgetWrapper>
      <Typography variant="h6" fontWeight="bold" mb="1rem">
        Trending Topics
      </Typography>
      {trendingTopics.map((topic, index) => (
        <Box key={index} mb="1rem">
          <Typography fontWeight="500">{topic.topic}</Typography>
          <Typography fontSize="small" color={theme.palette.neutral.medium}>
            {topic.posts} posts
          </Typography>
        </Box>
      ))}
    </WidgetWrapper>
  );
};

export default TrendingTopicsWidget;
