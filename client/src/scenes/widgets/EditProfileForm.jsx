import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

const EditProfileForm = ({ user, token, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    location: user.location,
    occupation: user.occupation,
  });

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
