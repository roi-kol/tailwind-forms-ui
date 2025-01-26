Forms React
# Forms React

This project is a React application that demonstrates how to create and manage forms using Tailwind CSS.

## Features

- Responsive form design
- Validation and error handling
- Custom input components
- Integration with Tailwind CSS

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/roi-kol/tailwind-forms-ui.git
    ```
2. Install the package in your project directory with:

    ```sh
    npm install tailwind-forms-ui

    ```

## Examples

```typescript

"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ButtonForm from "../Fields/ButtonForm";
import { DropdownForm } from "tailwind-forms-ui";
import { CheckboxGroupForm } from "tailwind-forms-ui";
import { TextAreaForm } from "tailwind-forms-ui";

interface ContactFormInputs {
  subject: string;
  requestType: string;
  location: string[];
  notes?: string;
}

interface LocationOption {
  id: string;
  label: string;
  value: string;
}

const ContactForm = () => {

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
    trigger,
  } = useForm<ContactFormInputs>({
    defaultValues: {
      subject: "",
      requestType: "",
      location: [],
      notes: "",
    },
    mode: "onChange", // Validates on change
  });

  const requestTypes = [
    { value: "general", label: "General", id: "1" },
    { value: "support", label: "Support", id: "2" },
    { value: "service", label: "Service", id: "3" },
  ];

  const allSubjectOptions = [
    { value: "accmmodation", label: "Accmmodation", id: "1", parentId: "1" },
    { value: "employment", label: "Employment", id: "2", parentId: "1" },
    { value: "health", label: "Health", id: "3", parentId: "1" },
    { value: "education", label: "Education", id: "4", parentId: "1" },
    { value: "family", label: "Family", id: "5", parentId: "1" },
    { value: "general", label: "General", id: "6", parentId: "1" },
    { value: "personal", label: "Personal Login", id: "7", parentId: "2" },
    { value: "internet", label: "Internent Enter", id: "8", parentId: "2" },
    { value: "email", label: "Email Enter", id: "9", parentId: "2" },
    { value: "other", label: "General", id: "10", parentId: "2" },
    { value: "service", label: "Service", id: "11", parentId: "3" },
  ];

  const locationOptions: LocationOption[] = [
    { id: "1", value: "north", label: "North" },
    { id: "2", value: "south", label: "South" },
    { id: "3", value: "center", label: "Center" },

  ];

  const selectedRequestType = watch("subject");

  const filteredSubjectOptions = allSubjectOptions.filter((option) => {
    const selectedRequest = requestTypes.find(
      (request) => request.value === selectedRequestType
    );
    return selectedRequest && option.parentId === selectedRequest.id;
  });

  const handleRequestTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue("subject", e.target.value);
    setValue("requestType", "");
    await trigger("subject"); // Trigger validation for subject field
  };

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    try {
      // Validate location field separately since it's a checkbox group
      if (data.location.length === 0) {
        return;
      }

      console.log("Form data:", data);
      
      // Here you would typically send the data to your backend
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      
      // if (!response.ok) throw new Error('Failed to submit form');

      reset();
      setSelectedOptions([]);
      alert("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md" dir="rtl">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-xl font-bold">
        This is a contact form
        </h1>
        <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
          <i className="text-blue-500">i</i>
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <DropdownForm
            options={requestTypes}
            label="Subject"
            placeholder="Select subject"
            value={watch("subject")}
            {...register("subject", { 
              required: "Need to select a subject",
              validate: value => value !== "" || "Need to select a subject"
            })}
            onChange={handleRequestTypeChange}
            required
            error={errors.subject?.message}
          />

          <DropdownForm
            options={filteredSubjectOptions}
            label="Request Type"
            placeholder="Select request type"
            value={watch("requestType")}
            {...register("requestType", { 
              required: "Need to select a request type",
              validate: value => value !== "" || "Need to select a request type"
            })}
            onChange={(e) => {
              setValue("requestType", e.target.value);
              trigger("requestType");
            }}
            required
            error={errors.requestType?.message}
          />

          <CheckboxGroupForm
            title="location"
            options={locationOptions}
            {...register("location", {
              required: "Nedd to select at least one location",
              validate: value => value.length > 0 || "Need to select at least one location"
            })}
            selectedValues={selectedOptions}
            onChange={(values) => {
              setSelectedOptions(values);
              setValue("location", values, {
                shouldValidate: true,
              });
            }}
             error={errors.location?.message}
          />

          <TextAreaForm
            label="Description"
            placeholder="Note..."
            value={watch("notes")}
            {...register("notes", {
              maxLength: {
                value: 500,
                message: "Need to be less than 500 characters",
              }
            })}
            onChange={(e) => {
              setValue("notes", e.target.value);
              trigger("notes");
            }}
            maxLength={500}
            error={errors.notes?.message}
          />
        </div>

        <div className="flex gap-4">
          <ButtonForm 
            variant="filled" 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Send..." : "Send Form"}
          </ButtonForm>
          <ButtonForm 
            variant="outline" 
            type="button" 
            onClick={() => {
              reset();
              setSelectedOptions([]);
            }}
          >
            Clear Form
          </ButtonForm>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

```
![Form](/Screenshots/contactus%20form.png)


## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE.txt) file for details.
