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
import { useRouter } from "next/navigation";
import {ButtonForm} from "tailwind-forms-ui";
import{ DropdownForm }from "tailwind-forms-ui";
import{ RadioGroupForm} from "tailwind-forms-ui";
import{ CheckboxGroupForm }from "tailwind-forms-ui";
import {TextAreaForm} from "tailwind-forms-ui";
import {InputForm }from "tailwind-forms-ui";
import {FileUploadForm} from "tailwind-forms-ui";
import {AutocompleteForm }from "tailwind-forms-ui";
...
 <DropdownForm
                    options={options}
                    label="text"
                    placeholder="choose"
                    value={watch("myoptions")}
                    {...register("myoptions", { required: "This field is required" })}
                    onChange={(e) => setValue("benefit", e.target.value)}
                    required
                    error={errors.benefit?.message}
                  />
                </div>


## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE.txt) file for details.