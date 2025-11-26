import { useForm } from "react-hook-form";
import { TextField, Button, MenuItem } from "@mui/material";
import { useEffect } from "react";
import "../styles/AddEditEmployee.css";

export default function AddEditEmployee({ isEdit, employee = null }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm();

    useEffect(() => {
        if (isEdit && employee) {
            reset({
                name: employee.name || "",
                email: employee.email || "",
                designation: employee.designation || "",
                salary: employee.salary || "",
            });
        }
    }, [isEdit, employee, reset]);

    const onSubmit = async (formData) => {
        if (isEdit) {
            console.log("Updating employee:", employee.id, formData);
            await fetch(`http://localhost:8080/employees/${employee.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
        } else {
            console.log("Adding new employee:", formData);
            await fetch(`http://localhost:8080/employees`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)} className="employee-form">
                <h2 className="form-heading">
                    {isEdit ? "Update Employee" : "Add Employee"}
                </h2>

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

                {/* DESIGNATION DROPDOWN */}
                <TextField
                    select
                    label="Designation"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                        "& .MuiSelect-select": {
                            textAlign: "left",
                            paddingLeft: "8px",
                        },
                    }}
                    {...register("designation", {
                        required: "Designation is required",
                    })}
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

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={isSubmitting}
                    sx={{ mt: 2 }}
                >
                    {isEdit ? "Update Employee" : "Add Employee"}
                </Button>
            </form>
        </div>
    );
}
