import { useForm, Watch } from "react-hook-form";
import {
  TextField,
  Button,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { useEffect } from "react";
import "../styles/AddEditEmployee.css";
import { useEmployee } from "../api/useEmployee";
import { useSnackbar } from "../context/SnackbarContext";

export default function AddEditEmployee({ open, handleClose, data }) {
  const isEdit = !!data;

  const {editEmployee, addEmployee} = useEmployee();
  // const {showSnackbar} = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  useEffect(() => {
    if (isEdit && data) {
      reset({
        name: data.name,
        email: data.email,
        designation: data.designation,
        salary: data.salary,
      });
    } else {
      reset({
        name: "",
        email: "",
        designation: "",
        salary: "",
      });
    }
    console.log(data?.designation);
    
  }, [isEdit, data, reset]);

  const onSubmit = async (formData) => {
    if (isEdit) {
      const updatedData = {
        id : data.id,
        ...formData
      }
      await editEmployee(updatedData);
    } else {
      const userData = JSON.parse(localStorage.getItem("userData") || null);
      const emp = {
        ...formData,
        createdBy : userData?.id
      }
      await addEmployee(emp);
    }

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle className="dialog-title">
        {isEdit ? "Update Employee" : "Add Employee"}
      </DialogTitle>

      <DialogContent dividers>
        {/* NAME */}
        <TextField
          label="Full Name"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          {...register("name", {
            required: "Name is required",
            minLength: { value: 3, message: "Minimum 3 characters" },
            pattern: { value: /^[A-Za-z\s]+$/, message: "Only letters allowed" },
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        {/* EMAIL */}
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          disabled={isEdit}
          InputLabelProps={{ shrink: true }}
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

        {/* DESIGNATION */}
        <TextField
          select
          label="Designation"
          fullWidth
          margin="normal"
          defaultValue={data?.designation || ""} 
          InputLabelProps={{ shrink: true }}
          {...register("designation", { required: "Designation is required" })}
          error={!!errors.designation}
          helperText={errors.designation?.message}
        >
          <MenuItem value="HR">HR</MenuItem>
          <MenuItem value="Developer">Developer</MenuItem>
          <MenuItem value="Delivery">Delivery</MenuItem>
          <MenuItem value="Designer">Designer</MenuItem>
          <MenuItem value="Sales">Sales</MenuItem>
        </TextField>

        {/* SALARY */}
        <TextField
          label="Salary"
          type="number"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          {...register("salary", {
            required: "Salary is required",
            validate: (value) => value > 0 || "Salary must be > 0",
          })}
          error={!!errors.salary}
          helperText={errors.salary?.message}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>

        <Button type="submit" variant="contained" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
          {isEdit ? "Update Employee" : "Add Employee"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
