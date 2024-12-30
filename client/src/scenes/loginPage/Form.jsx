import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import { ClipLoader } from "react-spinners"; // 用于加载动画

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

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
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const [isSubmitting, setIsSubmitting] = useState(false); // 新增状态

  const register = async (values, onSubmitProps) => {
    setIsSubmitting(true); // 开始动画
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 模拟 2 秒延迟
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
      setIsSubmitting(false); // 停止动画
    }
  };

  const login = async (values, onSubmitProps) => {
    setIsSubmitting(true); // 开始动画
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 模拟 2 秒延迟
      const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const loggedIn = await loggedInResponse.json();
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
    } finally {
      setIsSubmitting(false); // 停止动画
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
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.85)",
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
                color: palette.primary.dark,
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
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
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
              />
            )}

            {isRegister && (
              <TextField
                label="Occupation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.occupation}
                name="occupation"
                error={
                  Boolean(touched.occupation) && Boolean(errors.occupation)
                }
                helperText={touched.occupation && errors.occupation}
                fullWidth
                sx={{ mt: "1rem" }}
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
                  backgroundColor: "white",
                  cursor: "pointer",
                  "&:hover": { borderColor: palette.primary.main },
                  mt: "1rem",
                }}
              >
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box {...getRootProps()} sx={{ flex: 1 }}>
                      <input {...getInputProps()} />
                      <Typography
                        sx={{
                          color: values.picture ? palette.text.primary : palette.neutral.medium,
                          fontSize: "0.9rem",
                        }}
                      >
                        {values.picture ? values.picture.name : "Click to add a picture"}
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
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              fullWidth
              sx={{ mt: "1rem" }}
            />

            <Button
              fullWidth
              type="submit"
              sx={{
                mt: "2rem",
                py: "0.75rem",
                fontWeight: "bold",
                color: "white",
                background: "linear-gradient(90deg, #667eea, #764ba2)",
                borderRadius: "10px",
                "&:hover": {
                  background: "linear-gradient(90deg, #764ba2, #667eea)",
                },
              }}
              disabled={isSubmitting} // 禁用按钮以避免重复提交
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>

            {isSubmitting && (
              <Box display="flex" justifyContent="center" mt="1rem">
                <ClipLoader color={palette.primary.main} size={30} />
              </Box>
            )}

            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                mt: "1.5rem",
                textAlign: "center",
                textDecoration: "underline",
                color: palette.primary.main,
                fontWeight: "500",
                cursor: "pointer",
                "&:hover": {
                  color: palette.primary.light,
                },
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
