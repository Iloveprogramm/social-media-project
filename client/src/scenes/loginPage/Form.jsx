// Form.jsx
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

// 验证模式
const registerSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
  location: yup.string().required("Required"),
  occupation: yup.string().required("Required"),
  picture: yup.string().required("Required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
});

// 初始值
const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const [passwordError, setPasswordError] = useState(""); // 用于保存密码错误信息
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    setPasswordError("");
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      formData.append("picturePath", values.picture.name);

      const savedUserResponse = await fetch(
        "http://localhost:3001/auth/register",
        {
          method: "POST",
          body: formData,
        }
      );
      const savedUser = await savedUserResponse.json();
      onSubmitProps.resetForm();

      if (savedUser) {
        setPageType("login");
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const login = async (values, onSubmitProps) => {
    setPasswordError(""); // 清空错误信息
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message === "Invalid password") {
          setPasswordError("Wrong Password, Please Try Again.");
        } else {
          setPasswordError("Login Failed, Please Check Your Information.");
        }
        return;
      }

      const loggedIn = await response.json();
      onSubmitProps.resetForm();
      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/home");
      }
    } catch (error) {
      console.error("Login error:", error);
      setPasswordError("Network Error, Please Try Again Later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{
              backgroundColor: palette.mode === "dark" ? "#000" : "rgba(255, 255, 255, 0.85)",
              borderRadius: "15px",
              padding: "3rem",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: "1.5rem",
                fontWeight: "bold",
                color: palette.primary.main,
              }}
            >
              {isLogin ? "Login to Your Account" : "Create an Account"}
            </Typography>

            {isRegister && (
              <Box display="grid" gridTemplateColumns="1fr 1fr" gap="1rem" sx={{ width: "100%" }}>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  InputLabelProps={{ style: { color: palette.mode === "dark" ? "#FFF" : "#000" } }}
                  InputProps={{ style: { color: palette.mode === "dark" ? "#FFF" : "#000" } }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  InputLabelProps={{ style: { color: palette.mode === "dark" ? "#FFF" : "#000" } }}
                  InputProps={{ style: { color: palette.mode === "dark" ? "#FFF" : "#000" } }}
                />
              </Box>
            )}

            {isRegister && (
              <TextField
                label="Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                error={Boolean(touched.location) && Boolean(errors.location)}
                helperText={touched.location && errors.location}
                fullWidth
                sx={{ mt: "1rem" }}
                InputLabelProps={{ style: { color: palette.mode === "dark" ? "#FFF" : "#000" } }}
                InputProps={{ style: { color: palette.mode === "dark" ? "#FFF" : "#000" } }}
              />
            )}

            {isRegister && (
              <TextField
                label="Occupation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.occupation}
                name="occupation"
                error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                helperText={touched.occupation && errors.occupation}
                fullWidth
                sx={{ mt: "1rem" }}
                InputLabelProps={{ style: { color: palette.mode === "dark" ? "#FFF" : "#000" } }}
                InputProps={{ style: { color: palette.mode === "dark" ? "#FFF" : "#000" } }}
              />
            )}

            {isRegister && (
              <Box
                sx={{
                  width: "100%",
                  height: "56px",
                  borderRadius: "4px",
                  border: `1px solid ${palette.neutral.medium}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 1rem",
                  backgroundColor: palette.mode === "dark" ? "#424242" : "white",
                  mt: "1rem",
                }}
              >
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) =>
                    setFieldValue("picture", acceptedFiles[0])
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box {...getRootProps()} sx={{ flex: 1 }}>
                      <input {...getInputProps()} />
                      <Typography
                        sx={{
                          color: values.picture ? palette.text.primary : palette.neutral.medium,
                        }}
                      >
                        {values.picture
                          ? values.picture.name
                          : "Click to add a picture"}
                      </Typography>
                    </Box>
                  )}
                </Dropzone>
                {values.picture && <EditOutlinedIcon sx={{ color: palette.primary.main }} />}
              </Box>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              fullWidth
              sx={{ mt: "1rem" }}
              InputLabelProps={{ style: { color: palette.mode === "dark" ? "#FFF" : "#000" } }}
              InputProps={{ style: { color: palette.mode === "dark" ? "#FFF" : "#000" } }}
            />

            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={passwordError || (touched.password && errors.password)}
              fullWidth
              sx={{ mt: "1rem" }}
              InputLabelProps={{ style: { color: palette.mode === "dark" ? "#FFF" : "#000" } }}
              InputProps={{ style: { color: palette.mode === "dark" ? "#FFF" : "#000" } }}
            />

            <Button
              fullWidth
              type="submit"
              sx={{
                mt: "2rem",
                py: "0.75rem",
                fontWeight: "bold",
                color: palette.primary.contrastText,
                background: palette.mode === "dark"
                  ? "linear-gradient(90deg, #334e68, #102a43)"
                  : "linear-gradient(90deg, #667eea, #764ba2)",
                borderRadius: "10px",
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (isLogin ? "Logging in..." : "Registering...") : isLogin ? "LOGIN" : "REGISTER"}
            </Button>

            <Typography
              onClick={() => setPageType(isLogin ? "register" : "login")}
              sx={{
                mt: "1.5rem",
                textAlign: "center",
                textDecoration: "underline",
                color: palette.primary.main,
                cursor: "pointer",
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
