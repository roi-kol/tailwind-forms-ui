"use client";

import React, {  useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
// import { useRouter } from "next/navigation";
import ButtonForm from "./Form/Fields/ButtonForm";
import DropdownForm from "./Form/Fields/DropdownForm";
import RadioGroupForm from "./Form/Fields/RadioGroupForm";
import CheckboxGroupForm from "./Form/Fields/CheckboxGroupForm";
import TextAreaForm from "./Form/Fields/TextAreaForm";
import InputForm from "./Form/Fields/InputForm";
import FileUploadForm from "./Form/Fields/FileUploadForm";
import AutocompleteForm from './Form/Fields/AutocompleteForm';
interface FormInputs {
  benefit: string;
  employmentStatus: string;
  name: string;
  email: string;
  target: string;
  comments?: string;
  multipleOptions?: string[];
  attachments?: FileList;
  profession?: string;
}

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // TODO - not needed, is only for debugging
  const [formDataTemp, setFormDataTemp] = useState<FormInputs>({
    benefit: "",
    employmentStatus: "",
    name: "",
    email: "",
    target: "",
    comments: "",
    multipleOptions: [],
    attachments: undefined,
    profession: "",
  });
  // const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<FormInputs>({
    mode: "onChange",
    defaultValues: {
      benefit: "",
      employmentStatus: "",
      name: "",
      email: "",
      target: "",
      comments: "",
      multipleOptions: [],
      attachments: undefined,
      profession: "", 
    },
  });

  const options = [
    { value: "option1", label: "אפשרות 1" },
    { value: "option2", label: "אפשרות 2" },
    { value: "option3", label: "אפשרות 3" },
  ];

  const options2 = [
    { value: "employed", label: "מועסק" },
    { value: "unemployed", label: "ללא תעסוקה" },
  ];

  const options3 = [
    { id: "1", label: "פעילות ייעוץ ראשונה (אינטייק)" },
    { id: "2", label: "ייעוץ והכנה לראיון עבודה" },
    { id: "3", label: "ייעוץ להכנת קורות חיים" },
    { id: "4", label: "אבחון תעסוקתי עם פסיכולוג תעסוקתי" },
    { id: "5", label: "הכנה למבחני מיון והערכה" },
    { id: "6", label: "הכשרה מקצועית" },
    { id: "7", label: "ייעוץ לפיתוח קריירה" },
    { id: "8", label: "ייעוץ והכוונה לפתיחת עסק" },
  ];

  const professionOptions = [
    { value: "software-engineer", label: "מהנדס תוכנה" },
    { value: "data-scientist", label: "מדען נתונים" },
    { value: "product-manager", label: "מנהל מוצר" },
    { value: "ux-designer", label: "מעצב חווית משתמש" },
    { value: "marketing-manager", label: "מנהל שיווק" },
    { value: "sales-manager", label: "מנהל מכירות" },
    // Add more professions as needed
  ];

  const handleNext = async () => {
    const fieldsToValidate: (keyof FormInputs)[] = getFieldsToValidate(step);
    console.log('Validating fields:', fieldsToValidate);
    const isStepValid = await trigger(fieldsToValidate);
    console.log('Step validation result:', isStepValid);
  
    if (isStepValid) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const getFieldsToValidate = (currentStep: number): (keyof FormInputs)[] => {
    switch (currentStep) {
      case 1:
        return ["benefit"];
      case 2:
        return ["employmentStatus"];
      case 3:
        return ["name", "email", "target"];
      case 4:
        return [ "attachments"];
        case 5:
     return ["profession"]; 
      default:
        return [];
    }
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      debugger;
      // Handle file upload
      if ((data.attachments?.length ?? 0) > 0) {
        const formData = new FormData();
        if (data.attachments) {
          Array.from(data.attachments).forEach((file, index) => {
            formData.append(`file-${index}`, file);
          });
        }
        formData.append("data", JSON.stringify(data));
      }
      setFormDataTemp(data);
      setIsSubmitted(true);
      console.log("Form submitted temp:", formDataTemp);
      console.log("Form submitted:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleGoToMySpace = () => {
    window.location.href = "/";
    // router.push("/myspace");
  };

  return (
    // min-h-screen
    <div className="flex items-center justify-center bg-gray-100 p-24">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" dir="rtl">
          <h2 className="text-xl font-semibold mb-4">הטבה</h2>

          {!isSubmitted ? (
            <>
              {step === 1 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    שלב 1: בחירת הטבה
                  </h3>
                  <DropdownForm
                    options={options}
                    label="הטבה"
                    placeholder="בחר תחום"
                    value={watch("benefit")}
                    {...register("benefit", { required: "נא לבחור הטבה" })}
                    onChange={(e) => setValue("benefit", e.target.value)}
                    required
                    // TODO        error={errors.benefit?.message}
                  />
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    שלב 2: מצב תעסוקה
                  </h3>
                  <RadioGroupForm
                    title="הטבה"
                    subtitle="שלב 2: מצב תעסוקה"
                    options={options2}
                    value={watch("employmentStatus")}
                    {...register("employmentStatus", {
                      required: "נא לבחור מצב תעסוקה",
                    })}
                    onChange={(e) =>
                      setValue("employmentStatus", e.target.value)
                    }
                    name="employment-status"
                  />
                  {errors.employmentStatus && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.employmentStatus.message}
                    </p>
                  )}
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    שלב 3: פרטים                  </h3>

                  <div className="space-y-4">
                    <InputForm
                      label="שם מלא"
                      placeholder="הכנס שם מלא"
                      value={watch("name")}
                      {...register("name", {
                        required: "שדה חובה",
                        pattern: {
                          // value: /^[a-zA-Z\s]+$/,
                          value: /^[\p{L}\s]+$/u, // Updated regex to include all letters and spaces
                          message: "נא להזין שם תקין",
                        },
                      })}
                      onChange={(e) => setValue("name", e.target.value)}
                      required
                      // regex={/^[a-zA-Z\s]+$/}
                      regex={/^[\p{L}\s]+$/u}
                      errorMessage="נא להזין שם תקין"
                      error={errors.name?.message}
                    />

                    <InputForm
                      label="דוא״ל"
                      placeholder="הכנס דואר אלקטרוני"
                      value={watch("email")}
                      {...register("email", {
                        required: "שדה חובה",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'נא להזין כתובת דוא"ל תקינה',
                        },
                      })}
                      onChange={(e) => setValue("email", e.target.value)}
                      required
                      type="email"
                      error={errors.email?.message}
                    />

                    <InputForm
                      label="מהות הבקשה"
                      placeholder="הכנס את מהות הבקשה"
                      value={watch("target")}
                      {...register("target", { required: "שדה חובה" })}
                      onChange={(e) => setValue("target", e.target.value)}
                      required
                      error={errors.target?.message}
                    />

                    <TextAreaForm
                      label="הערות"
                      placeholder="הכנס את ההערות שלך כאן..."
                      value={watch("comments")}
                      {...register("comments")}
                      onChange={(e) => setValue("comments", e.target.value)}
                      maxLength={500}
                    />

                  </div>
                </div>
              )}
 {step === 4 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">שלב 4: פרטי ההטבה ומסמכים
                  </h3>
                  <div className="space-y-4">
                  {/* <CheckboxGroupForm
                      title="שם ההטבה:"
                      options={options3}
                      selectedValues={selectedOptions}
                      onChange={(values) => {
                        setSelectedOptions(values);
                        setValue("multipleOptions", values);
                      }}
                    /> */}
                    <CheckboxGroupForm
      title="שם ההטבה:"
      options={options3}
      selectedValues={selectedOptions}
      onChange={(values) => {
        setSelectedOptions(values);
        setValue("multipleOptions", values, { 
          shouldValidate: true 
        });
      }}
    />
                     <FileUploadForm
                      label="צירוף קבצים"
                      required
                      multiple
                      value={watch("attachments")}
                      error={errors.attachments?.message}
                      {...register("attachments", {
                        required: "נא לצרף לפחות קובץ אחד",
                        validate: {
                          fileSize: (files) => {
                            if (!files?.[0]) return true;
                            return (
                              files[0].size <= 5 * 1024 * 1024 ||
                              "הקובץ גדול מדי (מקסימום 5MB)"
                            );
                          },
                          fileType: (files) => {
                            if (!files?.[0]) return true;
                            const types = [
                              "application/pdf",
                              "image/jpeg",
                              "image/png",
                              "application/msword",
                            ];
                            return (
                              types.includes(files[0].type) ||
                              "סוג קובץ לא נתמך"
                            );
                          },
                        },
                      })}
                      onChange={(e) => setValue("attachments", e.target.files ?? undefined)}
                    />
                     </div>
                </div>
              )}
               {step === 5 && (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        שלב 5: פרטי מקצוע
      </h3>
      <AutocompleteForm
      options={professionOptions}
      label="תחום מקצועי"
      placeholder="בחר את תחום המקצוע שלך"
      value={watch("profession")}
      {...register("profession", { required: "נא לבחור תחום מקצועי" })}
      onChange={(value) => setValue("profession", value)}
      required
      error={errors.profession?.message}
    />
        {/* <pre className="bg-gray-100 p-4 rounded mt-4">
                    {JSON.stringify(formDataTemp, null, 2)}
                  </pre> */}
    </div>
     )}
             
              
              <div className="flex justify-between mt-6">
                {step > 1 && (
                  <ButtonForm variant="outline" onClick={handleBack} >
                    הקודם
                  </ButtonForm>
                )}
                {step < 5 ? (
                  <ButtonForm variant="filled" onClick={handleNext}>
                    הבא
                  </ButtonForm>
                ) : (
                  <ButtonForm type="submit" variant="filled">
                    שלח טופס
                  </ButtonForm>
                )}
              </div>
            </>
          ) : (
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">תודה על הפנייה</h3>
              <p className="mb-6">נחזור אליך בהקדם</p>
              <ButtonForm
                variant="filled"
                fullWidth={true}
                onClick={handleGoToMySpace}
              >
                למרחב האישי
              </ButtonForm>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default MultiStepForm;
