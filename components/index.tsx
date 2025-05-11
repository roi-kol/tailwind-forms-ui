// src/index.js

import AutocompleteForm from './Form/Fields/AutocompleteForm';
import ButtonForm from './Form/Fields/ButtonForm';
import { Option } from './Form/Fields/AutocompleteForm'; // Importing the Option type
import DropdownForm from "./Form/Fields/DropdownForm";
import RadioGroupForm from "./Form/Fields/RadioGroupForm";
import CheckboxGroupForm from "./Form/Fields/CheckboxGroupForm";
import TextAreaForm from "./Form/Fields/TextAreaForm";
import InputForm from "./Form/Fields/InputForm";
import FileUploadForm from "./Form/Fields/FileUploadForm";
import DatePickerForm from "./Form/Fields/DatePickerForm";
// import './styles.css'; // If you have any global styles

// Exporting the component so it can be used in other projects
export { AutocompleteForm, };
export { ButtonForm };
export { DropdownForm };
export { RadioGroupForm };
export { CheckboxGroupForm };
export { TextAreaForm };
export { InputForm };
export { FileUploadForm };
export { DatePickerForm };
export type { Option }; // Exporting the Option type for use in other components
// Optionally, you can also export other components or utilities
// export { AnotherComponent } from './components/AnotherComponent';
