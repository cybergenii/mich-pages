# Mich-Pages

A powerful React library for quickly generating Create, Read, Update, and Delete (CRUD) pages with minimal code; it comes with custom Input, Select1, Select2, Select3, TextArea1, TextArea2, Toggle, FileUpload components that you can use also within your project. .

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
- 🎇 Custom Input, Select1, Select2, Select3, TextArea1, TextArea2, Toggle, and FileUpload components available for use
- 🧩 Supports multiple field types (text, number, date, select, toggle, etc.)
- 📋 Organized category system for grouping related fields
- 🔄 Built-in create, view, update, and delete functionality
- 🎨 Customizable styling options
- 📱 Responsive design out of the box
- 🔒 TypeScript support for type safety
- 📁 Support for file uploads and image handling

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
  NewPage,        // General purpose page component
  NewCreatePage,  // Specifically for creation forms
  NewViewPage,    // For view-only pages
  NewSubmitPage,  // For submission forms
  NewPageUi       // Base UI component for custom implementations
  FileInput,     // File Upload ui with drag and drop features
  Input,          // Custom Input with error checker
  PresetQuillEditor, // rich text editor
  SelectInput, // custom select input
  SelectInput2, // card like select feature
  SelectInput3, // select with search bar
  StyledButton // normal styled button
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
| `style` | `object` | Custom styling options |
| `categories` | `PageCategoriesI[]` | Categories for organizing fields |
| `headings` | `PageHeadingI[]` | Fields to display on the page |
| `data` | `Record<string, any>` | Initial data for the form |
| `showButton` | `object` | Control visibility of action buttons |
| `create` | `object` | Configuration for create operations |
| `update` | `object` | Configuration for update operations |
| `delete` | `object` | Configuration for delete operations |

### Field Types

Mich-Pages supports various field types:

- `text`: Standard text input
- `password`: Password input
- `email`: Email input
- `number`: Numeric input
- `date`: Date picker
- `select`: Dropdown selection
- `select2`: Enhanced dropdown selection
- `select3`: Advanced dropdown selection
- `toggle`: Toggle switch
- `textarea1`: Single-line text area
- `textarea2`: Multi-line text area
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

```jsx
const headings = [
  {
    key: "email",
    name: "Email",
    category: "contact",
    placeholder: "Enter email address",
    formType: "email",
    required: true,
    useRegex: true, // Enable regex validation
    // Other validation options...
  }
];
```

### Nested Fields

```jsx
const headings = [
  {
    key: "user",
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
