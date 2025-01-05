import React, { useState } from "react";
import { Box, Typography, List, ListItem, TextField } from "@mui/material";

const HelpCenter = () => {
  const helpContent = [
    {
      question: "How to post a status update?",
      answer: "Go to your profile, click 'Create Post', write your status, and click 'Post'.",
    },
    {
      question: "How to add a friend?",
      answer: "Search for your friend's name in the search bar and click 'Add Friend' on their profile.",
    },
    {
      question: "How to switch between light and dark mode?",
      answer: "Go to Settings > Display Preferences, and toggle between Light and Dark Mode.",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  // 过滤问题列表
  const filteredContent = helpContent.filter((item) =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "2rem auto",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Help Center
      </Typography>
      <Typography variant="body1" gutterBottom>
        Find answers to your questions below or use the search bar to get specific help.
      </Typography>
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Search for help..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // 更新搜索内容
        sx={{ marginBottom: "1rem" }}
      />
      <List>
        {filteredContent.length > 0 ? (
          filteredContent.map((item, index) => (
            <ListItem key={index} sx={{ marginBottom: "1rem", flexDirection: "column", alignItems: "flex-start" }}>
              <Typography variant="h6">{item.question}</Typography>
              <Typography variant="body2" sx={{ color: "#555" }}>
                {item.answer}
              </Typography>
            </ListItem>
          ))
        ) : (
          <Typography variant="body2" sx={{ color: "#555", textAlign: "center", marginTop: "1rem" }}>
            No results found for "{searchTerm}".
          </Typography>
        )}
      </List>
      <Box sx={{ textAlign: "center", marginTop: "1rem" }}>
        <Typography variant="body1">
          Still need help? <a href="mailto:support@example.com">Contact us</a>
        </Typography>
      </Box>
    </Box>
  );
};

export default HelpCenter;
