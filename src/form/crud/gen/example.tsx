import { Calendar, LucideView, MailSearchIcon, Phone, Salad, User } from "lucide-react";

import { useState } from "react";
import { PageCategoriesI, PageHeadingI, PageI } from "../../interface/interface.form";
import { NewPage } from "../../page";



export function ExchangeSettings () {
  const [showPassword, setShowPassword] = useState(false);
  
  const cat: PageCategoriesI[] = [
    { key: "staff", name: "Staff" },

    { key: "customer", name: "Customer" },

    { key: "supplier", name: "Supplier" },
    { key: "members", name: "members" },
  ];

  const head: PageHeadingI[] = [
    {
      key: "members",
      name: "user",

      category: "members",
      placeholder: "enter user details",

      formType: "array",
      prefixIcons: <User />,
      child: [
        {
          key: "firstName",
          name: "firstName",
          unique: true,
          category: "members",
          placeholder: "enter user details",

          formType: "text",
          prefixIcons: <User />,
        },
        {
          key: "email",
          name: "email",

          category: "members",
          placeholder: "enter user details",

          formType: "text",
          prefixIcons: <User />,
        },
      ],
    },
    {
      key: "position",
      name: "position",

      category: "supplier",
      placeholder: "enter user details",
      required: true,

      formType: "select",
      prefixIcons: <MailSearchIcon />,
      keyValue: {
        STAFFs: { value: "STAFF", description: "staff" },
        USERs: { value: "USER", description: "user" },
        TEACHERs: { value: "TEACHER", description: "teacher" },
      },
    },
    {
      key: "password",
      name: "password",

      category: "supplier",
      placeholder: "enter user details",
      disabled: false,
      required: true,
      formType: showPassword ? "text" : "password",
      useRegex:[
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
  ],
      suffixIcons: (
        <LucideView
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          size={16}
        />
      ),
    },
    {
      key: "dateOfBirth",
      name: "date of birth",

      category: "customer",
      placeholder: "enter user details",
      required: true,
      formType: "date",
      prefixIcons: <User />,
    },
    {
      key: "phoneNumber",
      name: "phone number",

      category: "staff",
      placeholder: "enter user details",
      required: true,
      formType: "text",
      prefixIcons: <Phone />,
    },
    {
      key: "address",
      name: "address",

      category: "customer",
      placeholder: "enter user details",
      required: true,
      formType: "text",
      prefixIcons: <User />,
    },
    {
      key: "salary",
      name: "salary",

      category: "staff",
      placeholder: "enter user details",
      required: true,
      formType: "number",
      prefixIcons: <Salad />,
    },
    {
      key: "hireDate",
      name: "hire date",

      category: "customer",
      placeholder: "enter user details",

      formType: "date",
      prefixIcons: <User />,
    },
    {
      key: "details",
      name: "details",
      required: true,
      category: "customer",
      placeholder: "enter user details",

      formType: "textarea2",
      prefixIcons: <User />,
    },
  ];
  const b = {
    userId: {
      firstName: "derek",

      email: "godsown@gmail.com",
    },
    position: "staff",
    members: [
      {
        firstName: "derek",

        email: "godsown@gmail.com",
      },
      {
        firstName: "derek",

        email: "godsown@gmail.com",
      },
    ],
    isActive: true,
    dateOfBirth: "2024-01-01T00:00:00.000Z",
    phoneNumber: "+2347059011222",
    address: "Nigeria, Lagos",
    salary: 34555,
    hireDate: "2024-01-04T00:00:00.000Z",
    id: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACDklEQVR4Ae1VA6wcURR9tW23+95s7cZVUNuKaiOsu3dqB7UV1EFt27btjup2el6y+ObMFv+f5OwObuacqzyWilQ4CYs8tQwSJw3ilcIu/n6qJ5dJ4gNow8SdD1Q6Nws3DFVpBwO/QBvcYa9n6VwVlALItkIkE8TH+w1ITmVuAuLzIfLFUpW+QVPE0prEt/oN/EJMR1fEP08sUwoCLyJku9qmIlmD8+DjN/3PLZPKVGFuwKTShSFwMIKJKzp5vAzQyVsO9x/9Q3kf9/ndmQOqn172OsLwaRBszwBLFS1Cz/keR4bSJKWrRUpz2WsWARbx1oE19IvOthfVzGD5xLgIFZrtxK6/95f1rukTw+Qz5odGXODdhZCgcuSTTxQ3SNmMeAMm+yR36iuglIcDAn4jukVibqD3NpXOjJgVEWJewWjDjxMEZ04BgjX8Il8iCP0Cd5gqbyLbg5geuP8MPpFVYG7AmCQKoKxjIPIUtCPwluHjg3TVW8exc8EiT1NTFd2M8Ur5qNMshw1CndGOE1GMjHBw58W+CH03wWOy92APa7yoLk0ETkTErEGLnr+ZVjaHkwZ2ghpox8Kv4DkYWwwOkBvBnIYcLjnthso7IcNpENyN/3cxGZItS5bY8jXrbEmWAHwiT0ld5W2Queo/iJ5oVCFvxO+4ZCBuOGpAljUx/I8MJAP/vgEn+K8ZCD9S8Rsz4IeXsWZCowAAAABJRU5ErkJggg==",
  };

  const da: PageI = {
    type: "CREATE",
    headings: head,
    categories: cat,
    data: b,
    name: "Company",
    icon: <Calendar />,
    id: "string",
    style: {},
    showButton: {
      deleteButton: true,
      createButton: true,
      updateButton: true,
    },
    create: {
      errorMessage: "",
      create: async function (
        data: any
      ): Promise<"isLoading" | "isSuccess" | "isError" | "none"> {
        console.log({ data });
        const d = await "none";

        return d;
      },
      createStatus: "none",
    },

    delete: {
      delete(id) {
        console.log({ id });
        return true;
      },
      deleteStatus: "error",
      deleteMetaData: [],
    },
    update: {
      update: async function (id) {
        console.log({ id });
        return "none";
      },
      updateStatus: "none",
    },
  };
  return <NewPage data={da}  />;
}
