import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

const EditProfileForm = ({ user, token, onSubmit }) => {
  const loggedInUserId = useSelector((state) => state.user?._id); // 获取当前登录用户 ID

  // 如果不是自己的主页，不渲染组件，提前判断权限
  const isOwnProfile = loggedInUserId === user._id;

  // 确保 Hook 调用在逻辑判断前
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    location: user.location,
    occupation: user.occupation,
  });

  // 如果不是自己的主页，直接返回空组件（确保 Hook 调用顺序）
  if (!isOwnProfile) {
    return <></>;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const response = await fetch(`http://localhost:3001/users/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const updatedUser = await response.json();
    onSubmit(updatedUser); // 通知父组件更新用户数据
  };

  return (
    <Box display="flex" flexDirection="column" gap="1rem" p="1rem">
      <Typography variant="h5">Edit Profile</Typography>
      <TextField
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />
      <TextField
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
      />
      <TextField
        label="Occupation"
        name="occupation"
        value={formData.occupation}
        onChange={handleChange}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save
      </Button>
    </Box>
  );
};

export default EditProfileForm;
