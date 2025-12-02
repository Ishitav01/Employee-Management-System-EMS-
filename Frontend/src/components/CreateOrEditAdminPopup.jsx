import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useEffect } from "react";
import {useAdmin} from "../api/useAdmin";


export default function CreateOrEditAdminPopup({ open, onClose, data,setAdminData }) {
  
    const isEdit = !!data;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  // Prefill fields only in edit mode
  useEffect(() => {
    if (isEdit && data) {
      reset({
        username: data.username,
        name: data.name,
        email: data.email,
        password: "",
      });
    } else {
      reset({
        username: "",
        name: "",
        email: "",
        password: "",
      });
    }
  }, [isEdit, data, reset]);

  const {createAdmin,updateAdmin}= useAdmin();

  // const onSubmit = async (formData) => {
  //   if (isEdit) {

  //     await fetch(`http://localhost:8080/admin/${data.id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     });
  //     alert("Admin updated successfully!");
  //   } else {

  //     await fetch(`http://localhost:8080/admin`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     });
  //     alert("Admin created successfully!");
  //   }
  //   reset();
  //   onClose();
  // };

  const onSubmit = async (formData) => {
    if (isEdit) {
      const updatedData = {
        ...formData
      }
      await updateAdmin(updatedData);
    } else {
      const emp = {
        ...formData
      }
      await createAdmin(emp);
    }

    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{ fontWeight: 600, textAlign: "center", fontSize: "22px" }}
      >
        {isEdit ? "Update Admin" : "Create Admin"}
      </DialogTitle>
      <DialogContent dividers>
        <form id="admin-form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            disabled={isEdit}
            {...register("username", {
              required: "Username is required",
              minLength: { value: 3, message: "Minimum 3 characters" },
            })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            label="Full Name"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            {...register("name", {
              required: "Name is required",
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Only letters allowed",
              },
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            disabled={isEdit}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            {...register("password", {
              required: !isEdit ? "Password is required" : false,
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </form>
      </DialogContent>
      <DialogActions sx={{ padding: "15px" }}>
        <Button onClick={onClose} variant="outlined" sx={{ width: "40%" }}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="admin-form"
          variant="contained"
          disabled={isSubmitting}
          sx={{ width: "60%", fontWeight: "600" }}
          onClick={handleSubmit(onSubmit)}
        >
          {isEdit ? "Update Admin" : "Create Admin"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}