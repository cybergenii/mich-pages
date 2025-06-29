# Mich-Pages

[![npm version](https://badge.fury.io/js/mich-pages.svg)](https://badge.fury.io/js/mich-pages)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![GitHub stars](https://img.shields.io/github/stars/derekzyl/mich-pages.svg)](https://github.com/derekzyl/mich-pages)
[![npm bundle size](https://img.shields.io/bundlephobia/min/mich-pages)](https://bundlephobia.com/package/mich-pages)
[![npm downloads](https://img.shields.io/npm/dw/mich-pages)](https://www.npmjs.com/package/mich-pages)

A powerful React library for rapidly generating Create, Read, Update, and Delete (CRUD) pages with minimal code. Built with TypeScript and featuring a comprehensive set of form components for modern web applications.

## ✨ Features

- 🚀 **Rapid Development**: Create full CRUD pages with just configuration objects
- 🎨 **Rich Components**: Input, Select (3 variants), TextArea, Toggle, FileUpload, and more
- 📱 **Responsive Design**: Mobile-first approach with beautiful UI out of the box
- 🔒 **TypeScript Support**: Full type safety and excellent developer experience
- 🎯 **Form Validation**: Built-in validation with regex support and custom error messages
- 📁 **File Handling**: Drag-and-drop file uploads with image preview
- 📝 **Rich Text Editor**: Integrated Quill editor for rich content
- 🏗️ **Flexible Architecture**: Support for nested fields, arrays, and complex data structures
- 🎭 **Customizable**: Extensive theming and styling options

## 📦 Installation

```bash
# Using npm
npm install mich-pages

# Using yarn
yarn add mich-pages

# Using pnpm
pnpm add mich-pages
```

## 🚀 Quick Start

```jsx
import React from 'react';
import { NewPage } from 'mich-pages';
import { User, Phone } from 'lucide-react';

const pageConfig = {
  type: "CREATE",
  name: "User Profile",
  icon: <User />,
  id: "user-form",
  categories: [
    { key: "personal", name: "Personal Information" }
  ],
  headings: [
    {
      key: "name",
      name: "Full Name",
      category: "personal",
      placeholder: "Enter your full name",
      formType: "text",
      prefixIcons: <User />,
      required: true
    },
    {
      key: "phone",
      name: "Phone Number",
      category: "personal",
      placeholder: "Enter phone number",
      formType: "text",
      prefixIcons: <Phone />
    }
  ],
  data: {},
  showButton: { createButton: true },
  create: {
    create: async (data) => {
      console.log("Form submitted:", data);
      return "isSuccess";
    },
    createStatus: "none"
  }
};

export function UserForm() {
  return <NewPage data={pageConfig} />;
}
```

## 📖 Documentation

### Core Components

| Component | Description |
|-----------|-------------|
| `NewPage` | General purpose page component for all CRUD operations |
| `NewCreatePage` | Specialized component for creation forms |
| `NewViewPage` | Read-only view component |
| `NewSubmitPage` | Form submission component |
| `NewPageUi` | Base UI component for custom implementations |

### Form Components

| Component | Description |
|-----------|-------------|
| `Input` | Enhanced input with validation and error handling |
| `SelectInput` | Standard dropdown select |
| `SelectInput2` | Card-style selection interface |
| `SelectInput3` | Advanced select with search functionality |
| `FileInput` | Drag-and-drop file upload with preview |
| `PresetQuillEditor` | Rich text editor |
| `StyledButton` | Customizable button component |

### Field Types

| Type | Description | Use Case |
|------|-------------|----------|
| `text` | Standard text input | Names, titles, descriptions |
| `email` | Email input with validation | Email addresses |
| `password` | Password input with toggle | Secure text entry |
| `number` | Numeric input | Ages, quantities, prices |
| `date` | Date picker | Birthdays, deadlines |
| `select` | Dropdown selection | Categories, statuses |
| `select2` | Card-based selection | Visual choices |
| `select3` | Searchable dropdown | Large option lists |
| `toggle` | Switch/checkbox | Boolean values |
| `textarea1` | Single-line text area | Short descriptions |
| `textarea2` | Rich text editor | Long content |
| `file` | File upload | Documents, images |
| `array` | Repeating field groups | Multiple entries |
| `obj` | Nested object fields | Complex data structures |

## 🔧 Configuration

### Page Configuration

```typescript
interface PageI {
  type: "CREATE" | "UPDATE" | "VIEW";
  name: string;
  icon: ReactNode;
  id: string;
  style?: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
  };
  categories: PageCategoriesI[];
  headings: PageHeadingI[];
  data: Record<string, any>;
  showButton?: {
    createButton?: boolean;
    updateButton?: boolean;
    deleteButton?: boolean;
  };
  create?: CreateConfig;
  update?: UpdateConfig;
  delete?: DeleteConfig;
  extraInfo?: string;
  showHeading?: boolean;
}
```

### Advanced Field Configuration

```jsx
const advancedField = {
  key: "email",
  name: "Email Address",
  category: "contact",
  placeholder: "Enter your email",
  formType: "email",
  required: true,
  prefixIcons: <Mail />,
  suffixIcons: <Check />,
  helper: "We'll never share your email",
  useRegex: [
    {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address"
    }
  ]
};
```

## 💼 Advanced Examples

### Form with Validation

```jsx
import { useState } from "react";
import { NewPage } from "mich-pages";
import { Lock, Eye, EyeOff } from "lucide-react";

export function SecureForm() {
  const [showPassword, setShowPassword] = useState(false);
  
  const passwordField = {
    key: "password",
    name: "Password",
    category: "security",
    placeholder: "Create a strong password",
    required: true,
    formType: showPassword ? "text" : "password",
    prefixIcons: <Lock />,
    suffixIcons: (
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="p-1 hover:bg-gray-100 rounded"
      >
        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    ),
    useRegex: [
      {
        regex: /^.{8,}$/,
        message: "Password must be at least 8 characters long"
      },
      {
        regex: /[A-Z]/,
        message: "Password must contain at least one uppercase letter"
      },
      {
        regex: /[a-z]/,
        message: "Password must contain at least one lowercase letter"
      },
      {
        regex: /\d/,
        message: "Password must contain at least one number"
      },
      {
        regex: /[!@#$%^&*(),.?":{}|<>]/,
        message: "Password must contain at least one special character"
      }
    ]
  };
  
  // ... rest of configuration
}
```

### Dynamic Array Fields

```jsx
const teamMembersField = {
  key: "teamMembers",
  name: "Team Members",
  category: "team",
  formType: "array",
  child: [
    {
      key: "name",
      name: "Member Name",
      category: "team",
      formType: "text",
      required: true,
      placeholder: "Enter member name"
    },
    {
      key: "role",
      name: "Role",
      category: "team",
      formType: "select",
      required: true,
      keyValue: {
        developer: { value: "developer", description: "Developer" },
        designer: { value: "designer", description: "Designer" },
        manager: { value: "manager", description: "Manager" }
      }
    },
    {
      key: "email",
      name: "Email",
      category: "team",
      formType: "email",
      placeholder: "member@company.com"
    }
  ]
};
```

### File Upload Configuration

```jsx
const profilePictureField = {
  key: "profilePicture",
  name: "Profile Picture",
  category: "personal",
  formType: "image",
  placeholder: "Upload your profile picture",
  accept: "image/*",
  maxSize: 5000000, // 5MB
  helper: "Supported formats: JPG, PNG, GIF (max 5MB)"
};
```

## 🎨 Theming

Customize the appearance of your forms:

```jsx
const customTheme = {
  style: {
    primary: "#3b82f6",     // Primary color for buttons and accents
    secondary: "#6b7280",   // Secondary color for borders and labels
    tertiary: "#1e293b"     // Tertiary color for backgrounds
  }
};
```

## 🔍 API Reference

### Component Props

#### NewPage

```typescript
interface NewPageProps {
  data: PageI;
}
```

#### Input

```typescript
interface InputProps {
  label: string;
  inputType: InputTypeI;
  helper?: string;
  showHelper?: boolean;
  className?: string;
}
```

#### SelectInput3

```typescript
interface SelectInput3Props {
  label: string;
  kv: Record<string, { value: string; description: string }>;
  placeholder?: string;
  inputType: SelectInputTypeI;
  helper?: string;
  showHelper?: boolean;
}
```

## 🤔 FAQ

**Q: Can I use custom validation rules?**
A: Yes! Use the `useRegex` property with custom regex patterns and error messages.

**Q: How do I handle file uploads?**
A: Use the `FileInput` component or set `formType: "file"` in your field configuration.

**Q: Can I nest objects and arrays?**
A: Absolutely! Use `formType: "obj"` for nested objects and `formType: "array"` for arrays.

**Q: Is server-side rendering supported?**
A: Yes, the library is compatible with Next.js and other SSR frameworks.

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/derekzyl/mich-pages.git

# Install dependencies
npm install

# Run development server
npm run dev

# Build the library
npm run build

# Run tests
npm test
```

## 📝 Changelog

### v1.0.0 (Latest)
- Initial release with full CRUD functionality
- TypeScript support
- Comprehensive form validation
- File upload capabilities
- Rich text editor integration
## Image Examples  
- [create  desktop page](/src/assets/create_desktop.jpeg)
- [update desktop page](/src/assets/update_desktop.jpeg)
- [view desktop page](/src/assets/view_desktop.jpeg)
- [create mobile page](/src/assets/create_mobile.jpeg)
- [update mobile page](/src/assets/update_mobile.jpeg)
- [view mobile page](/src/assets/view_mobile.jpeg)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Icons by [Lucide React](https://lucide.dev/)
- Rich text editing powered by [Quill](https://quilljs.com/)

## 📞 Support

- 📧 **Email**: [derekzyl@gmail.com](mailto:derekzyl@gmail.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/derekzyl/mich-pages/issues)
- 📖 **Documentation**: [GitHub Repository](https://github.com/derekzyl/mich-pages)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/derekzyl/mich-pages/discussions)

---

Made with ❤️ by [Derek Og](https://github.com/derekzyl)
