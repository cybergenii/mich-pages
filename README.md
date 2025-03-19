# Mich-Pages

A powerful React library for quickly generating Create, Read, Update, and Delete (CRUD) pages with minimal code. It comes with custom components like Input, Select1, Select2, Select3, TextArea1, TextArea2, Toggle, and FileUpload that you can use throughout your project.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
  - [Basic Example](#basic-example)
  - [Component API](#component-api)
- [Configuration](#configuration)
  - [Page Configuration](#page-configuration)
  - [Field Types](#field-types)
  - [Category System](#category-system)
- [Advanced Usage](#advanced-usage)
  - [Custom Styling](#custom-styling)
  - [Form Validation](#form-validation)
  - [Nested Fields](#nested-fields)
  - [Array Fields](#array-fields)
  - [Password Fields](#password-fields)
- [Components](#components)
  - [Input Component](#input-component)
  - [Select Components](#select-components)
  - [File Input](#file-input)
  - [Rich Text Editor](#rich-text-editor)
- [TypeScript Support](#typescript-support)
- [Examples](#examples)
- [Image Examples](#image-examples)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
# Using npm
npm install mich-pages

# Using yarn
yarn add mich-pages

# Using pnpm
pnpm add mich-pages
```

## Features

- 🚀 Rapidly create CRUD pages with minimal code
- 🎇 Custom Input, Select1, Select2, Select3, TextArea1, TextArea2, Toggle, and FileUpload components
- 🧩 Supports multiple field types (text, number, date, select, toggle, etc.)
- 📋 Organized category system for grouping related fields
- 🔄 Built-in create, view, update, and delete functionality
- 🎨 Customizable styling options
- 📱 Responsive design out of the box
- 🔒 TypeScript support for type safety
- 📁 Support for file uploads and image handling
- 📝 Rich text editor support

## Usage

### Basic Example

```jsx
import React from 'react';
import { NewPage } from 'mich-pages';
import { User, Phone, Calendar } from 'lucide-react';

const pageConfig = {
  type: "CREATE",
  name: "Company",
  icon: <Calendar />,
  id: "company-form",
  style: {},
  categories: [
    { key: "staff", name: "Staff" },
    { key: "customer", name: "Customer" }
  ],
  headings: [
    {
      key: "name",
      name: "Name",
      category: "staff",
      placeholder: "Enter company name",
      formType: "text",
      prefixIcons: <User />,
      required: true
    },
    {
      key: "phoneNumber",
      name: "Phone Number",
      category: "staff",
      placeholder: "Enter phone number",
      formType: "text",
      prefixIcons: <Phone />
    }
  ],
  data: {}, // Initial data
  showButton: {
    createButton: true
  },
  create: {
    create: async (data) => {
      console.log("Form submitted:", data);
      return "isSuccess";
    },
    createStatus: "none"
  }
};

export function CompanyForm() {
  return <NewPage data={pageConfig} />;
}
```

### Component API

The library exports several components for different use cases:

```jsx
import {
  NewPage,           // General purpose page component
  NewCreatePage,     // Specifically for creation forms
  NewViewPage,       // For view-only pages
  NewSubmitPage,     // For submission forms
  NewPageUi,         // Base UI component for custom implementations
  FileInput,         // File Upload UI with drag and drop features
  Input,             // Custom Input with error checking
  PresetQuillEditor, // Rich text editor
  SelectInput,       // Custom select input
  SelectInput2,      // Card-like select feature
  SelectInput3,      // Select with search bar
  StyledButton       // Normal styled button
} from 'mich-pages';
```

## Configuration

### Page Configuration

The `PageI` interface defines the structure for page configuration:

| Property | Type | Description |
|----------|------|-------------|
| `type` | `"CREATE" \| "UPDATE" \| "VIEW"` | The type of page |
| `name` | `string` | Page title |
| `icon` | `ReactNode` | Icon to display with the title |
| `id` | `string` | Unique identifier for the page |
| `style` | `object` | Custom styling options with primary, secondary, and tertiary colors |
| `categories` | `PageCategoriesI[]` | Categories for organizing fields |
| `headings` | `PageHeadingI[]` | Fields to display on the page |
| `data` | `Record<string, any>` | Initial data for the form |
| `showButton` | `object` | Control visibility of action buttons (create, update, delete) |
| `create` | `object` | Configuration for create operations |
| `update` | `object` | Configuration for update operations |
| `delete` | `object` | Configuration for delete operations |
| `extraInfo` | `string` | Additional information about the page |
| `showHeading` | `boolean` | Whether to show the page heading |

### Field Types

Mich-Pages supports various field types:

- `text`: Standard text input
- `password`: Password input with show/hide toggle
- `email`: Email input
- `number`: Numeric input
- `date`: Date picker
- `datetime-local`: Date and time picker
- `select`: Dropdown selection
- `select2`: Enhanced dropdown selection with card-like UI
- `select3`: Advanced dropdown selection with search capabilities
- `toggle`: Toggle switch
- `textarea1`: Single-line text area
- `textarea2`: Multi-line text area with rich text capabilities
- `array`: Array of nested fields
- `image`: Image upload field
- `file`: File upload field
- `obj`: Object field with nested properties
- `rawHtml`: Raw HTML content

### Category System

Categories help organize fields into logical groups:

```jsx
const categories = [
  { key: "personal", name: "Personal Information" },
  { key: "contact", name: "Contact Details" },
  { key: "employment", name: "Employment Information" }
];
```

## Advanced Usage

### Custom Styling

```jsx
const pageConfig = {
  // ...other config
  style: {
    primary: "#3b82f6",    // Primary color
    secondary: "#6b7280",  // Secondary color
    tertiary: "#1e293b"    // Tertiary color
  }
};
```

### Form Validation

Mich-Pages supports advanced form validation using regex patterns:

```jsx
const headings = [
  {
    key: "password",
    name: "Password",
    category: "security",
    placeholder: "Enter password",
    formType: "password",
    required: true,
    useRegex: [
      {
        regex: /^.{8,15}$/,
        message: "Password must be between 8 and 15 characters"
      },
      {
        regex: /[a-z]/,
        message: "Password must contain at least one lowercase letter"
      },
      {
        regex: /[A-Z]/,
        message: "Password must contain at least one uppercase letter"
      },
      {
        regex: /\d/,
        message: "Password must contain at least one number"
      },
      {
        regex: /[@.#$!%*?&]/,
        message: "Password must contain at least one special character (@.#$!%*?&)"
      }
    ]
  }
];
```

### Nested Fields

```jsx
const headings = [
  {
    key: "address",
    name: "Address",
    category: "contact",
    formType: "obj",
    child: [
      {
        key: "street",
        name: "Street",
        category: "contact",
        formType: "text",
        required: true
      },
      {
        key: "city",
        name: "City",
        category: "contact",
        formType: "text"
      },
      {
        key: "zipCode",
        name: "Zip Code",
        category: "contact",
        formType: "text"
      }
    ]
  }
];
```

### Array Fields

Mich-Pages supports array fields for collecting multiple instances of a data structure:

```jsx
const headings = [
  {
    key: "members",
    name: "User",
    category: "members",
    placeholder: "Enter user details",
    formType: "array",
    prefixIcons: <User />,
    child: [
      {
        key: "firstName",
        name: "First Name",
        category: "members",
        placeholder: "Enter first name",
        formType: "text",
        required: true
      },
      {
        key: "email",
        name: "Email",
        category: "members", 
        placeholder: "Enter email address",
        formType: "email"
      }
    ]
  }
];
```

### Password Fields

Password fields can be configured with a show/hide toggle:

```jsx
const [showPassword, setShowPassword] = useState(false);

const headings = [
  {
    key: "password",
    name: "Password",
    category: "security",
    placeholder: "Enter your password",
    required: true,
    formType: showPassword ? "text" : "password",
    suffixIcons: (
      <LucideView
        onClick={() => {
          setShowPassword(!showPassword);
        }}
        size={16}
      />
    )
  }
];
```

## Components

### Input Component

The `Input` component provides a standardized way to create form inputs with validation:

```jsx
import { Input } from 'mich-pages';

const MyForm = () => {
  return (
    <Input
      label="Email Address"
      inputType={{
        type: "email",
        name: "email",
        placeholder: "Enter your email",
        required: true
      }}
      helper="We'll never share your email"
      showHelper={true}
    />
  );
};
```

### Select Components

Mich-Pages offers three select components with different UIs:

1. `SelectInput`: Standard dropdown select
2. `SelectInput2`: Card-like selection interface
3. `SelectInput3`: Advanced select with search capabilities

```jsx
import { SelectInput3 } from 'mich-pages';

const MyForm = () => {
  return (
    <SelectInput3
      label="Position"
      kv={{
        STAFFs: { value: "STAFF", description: "Staff" },
        USERs: { value: "USER", description: "User" },
        TEACHERs: { value: "TEACHER", description: "Teacher" }
      }}
      placeholder="Select a position"
      inputType={{
        className: "w-full",
        name: "position",
        required: true,
        onChange: ({ key, value }) => console.log(key, value)
      }}
    />
  );
};
```

### File Input

The `FileInput` component provides drag-and-drop file upload functionality:

```jsx
import { FileInput } from 'mich-pages';

const MyForm = () => {
  return (
    <FileInput
      label="Profile Picture"
      placeholder="Drag and drop or click to upload"
      inputType={{
        accept: "image/*",
        name: "profilePic",
        className: "w-full",
        onChange: (e) => console.log(e.target.files)
      }}
    />
  );
};
```

### Rich Text Editor

The `PresetQuillEditor` component provides rich text editing capabilities:

```jsx
import { PresetQuillEditor } from 'mich-pages';

const MyForm = () => {
  const [content, setContent] = useState('');
  
  return (
    <PresetQuillEditor
      value={content}
      onChange={setContent}
      placeholder="Enter your content here..."
    />
  );
};
```

## TypeScript Support

Mich-Pages includes TypeScript definitions for all components and interfaces:

```typescript
import {
  InputI,
  InputTypeI,
  PageCategoriesI,
  PageHeadingI,
  PageI,
  SelectI,
  SelectThreeI,
  SelectTwoI,
  FileInputI
} from 'mich-pages';
```

## Examples

Here's a complete example of a form page with multiple field types:

```jsx
import { useState } from "react";
import { NewPage } from "mich-pages";
import { Calendar, LucideView, MailSearchIcon, Phone, Salad, User } from "lucide-react";

export function ExchangeSettings() {
  const [showPassword, setShowPassword] = useState(false);
  
  const categories = [
    { key: "staff", name: "Staff" },
    { key: "customer", name: "Customer" },
    { key: "supplier", name: "Supplier" },
    { key: "members", name: "Members" }
  ];

  const headings = [
    {
      key: "members",
      name: "User",
      category: "members",
      placeholder: "Enter user details",
      formType: "array",
      prefixIcons: <User />,
      child: [
        {
          key: "firstName",
          name: "First Name",
          category: "members",
          placeholder: "Enter first name",
          formType: "text",
          unique: true
        },
        {
          key: "email",
          name: "Email",
          category: "members",
          placeholder: "Enter email address",
          formType: "text"
        }
      ]
    },
    {
      key: "position",
      name: "Position",
      category: "supplier",
      placeholder: "Select position",
      required: true,
      formType: "select3",
      prefixIcons: <MailSearchIcon />,
      keyValue: {
        STAFFs: { value: "STAFF", description: "Staff" },
        USERs: { value: "USER", description: "User" },
        TEACHERs: { value: "TEACHER", description: "Teacher" }
      }
    },
    {
      key: "password",
      name: "Password",
      category: "supplier",
      placeholder: "Enter password",
      required: true,
      formType: showPassword ? "text" : "password",
      useRegex: [
        {
          regex: /^.{8,15}$/,
          message: "Password must be between 8 and 15 characters"
        },
        {
          regex: /[a-z]/,
          message: "Password must contain at least one lowercase letter"
        },
        {
          regex: /[A-Z]/,
          message: "Password must contain at least one uppercase letter"
        },
        {
          regex: /\d/,
          message: "Password must contain at least one number"
        },
        {
          regex: /[@.#$!%*?&]/,
          message: "Password must contain at least one special character"
        }
      ],
      suffixIcons: (
        <LucideView
          onClick={() => setShowPassword(!showPassword)}
          size={16}
        />
      )
    },
    {
      key: "dateOfBirth",
      name: "Date of Birth",
      category: "customer",
      placeholder: "Select date of birth",
      required: true,
      formType: "date",
      prefixIcons: <User />
    },
    {
      key: "phoneNumber",
      name: "Phone Number",
      category: "staff",
      placeholder: "Enter phone number",
      required: true,
      formType: "text",
      prefixIcons: <Phone />
    }
  ];

  const initialData = {
    position: "STAFF",
    members: [
      {
        firstName: "John",
        email: "john@example.com"
      },
      {
        firstName: "Jane",
        email: "jane@example.com"
      }
    ],
    dateOfBirth: "2000-01-01",
    phoneNumber: "+1234567890"
  };

  const pageConfig = {
    type: "CREATE",
    headings: headings,
    categories: categories,
    data: initialData,
    name: "Company",
    icon: <Calendar />,
    id: "company-form",
    style: {},
    showButton: {
      createButton: true
    },
    create: {
      create: async (data) => {
        console.log("Form submitted:", data);
        return "isSuccess";
      },
      createStatus: "none"
    }
  };

  return <NewPage data={pageConfig} />;
}
```

## Image Examples

- [create  desktop page](/src/assets/create_desktop.jpeg)
- [update desktop page](/src/assets/update_desktop.jpeg)
- [view desktop page](/src/assets/view_desktop.jpeg)
- [create mobile page](/src/assets/create_mobile.jpeg)
- [update mobile page](/src/assets/update_mobile.jpeg)
- [view mobile page](/src/assets/view_mobile.jpeg)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Created by [Derek Og](mailto:derekzyl@gmail.com)

GitHub: [https://github.com/derekzyl/mich-pages](https://github.com/derekzyl/mich-pages)

Report issues: [https://github.com/derekzyl/mich-pages/issues](https://github.com/derekzyl/mich-pages/issues)
