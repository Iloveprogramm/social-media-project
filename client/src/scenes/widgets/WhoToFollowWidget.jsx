import { Box, Typography, Button, useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";

const WhoToFollowWidget = () => {
  const theme = useTheme();
  const recommendedUsers = [
    { id: 1, name: "Alice", username: "@alice" },
    { id: 2, name: "Bob", username: "@bob" },
    { id: 3, name: "Charlie", username: "@charlie" },
  ];

  return (
    <WidgetWrapper>
      <Typography variant="h6" fontWeight="bold" mb="1rem">
        Who to Follow
      </Typography>
      {recommendedUsers.map((user) => (
        <Box
          key={user.id}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb="1rem"
        >
          <Box>
            <Typography fontWeight="500">{user.name}</Typography>
            <Typography fontSize="small" color={theme.palette.neutral.medium}>
              {user.username}
            </Typography>
          </Box>
          <Button variant="contained" color="primary" size="small">
            Follow
          </Button>
        </Box>
      ))}
    </WidgetWrapper>
  );
};

export default WhoToFollowWidget;
