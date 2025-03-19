import { memo } from "react";
import { Page } from "./crud/components";
import { CreatePage } from "./crud/components/create";
import { SubmitPage } from "./crud/components/submit";
import { PageUI } from "./crud/components/ui";
import { ViewPage } from "./crud/components/view";
import { FormContextProvider } from "./hooks/form/context-hooks";
import { PageI } from "./interface/interface.form";
import { ModalProvider } from "./state-manager/modal/modal-context";
import ToastProvider from "./utillities/toaster";

/**
 * The function `PageM` renders a `Page` component with data passed as props, wrapped in
 * `FormContextProvider`, `ModalProvider`, and `ToastProvider`.
 * @param  - The `PageM` function takes an object as a parameter with a `data` property of type
 * `PageI`. The `data` property is then passed down to the `Page` component as a prop. Additionally,
 * the function wraps the `Page` component with providers for `FormContext`,
 * @returns The `PageM` function is returning a JSX structure that includes a `FormContextProvider`, a
 * `ModalProvider`, a `ToastProvider`, and a `Page` component with the `data` prop passed to it.
 */
function PageM ({data}:{data: PageI}) {
    return (
        <FormContextProvider>
            <ModalProvider>
                <ToastProvider />
                <Page data={data}/>
            </ModalProvider>
        </FormContextProvider>
    )
}
/**
 * The CreatePageM function in TypeScript React renders a CreatePage component within
 * FormContextProvider, ModalProvider, and ToastProvider.
 * @param  - The `CreatePageM` function takes an object as a parameter with a `data` property of type
 * `PageI`. The function then returns a JSX element that includes a `FormContextProvider`,
 * `ModalProvider`, `ToastProvider`, and a `CreatePage` component with the `data`
 * @returns A JSX element is being returned, which includes a hierarchy of components wrapped in
 * providers. The `CreatePage` component is being rendered with the `data` prop passed to it.
 */
function CreatePageM ({data}:{data: PageI}) {
    return (
        <FormContextProvider>
            <ModalProvider>
                <ToastProvider />
                <CreatePage data={data}/>
            </ModalProvider>
        </FormContextProvider>
    )
}
/**
 * The ViewPageM function in TypeScript React renders a ViewPage component within FormContextProvider,
 * ModalProvider, and ToastProvider.
 * @param  - The function `ViewPageM` takes an object as a parameter with a property `data` of type
 * `PageI`. The `data` parameter is then passed down to the `ViewPage` component as a prop.
 * Additionally, the function wraps the `ViewPage` component with context providers for
 * @returns The `ViewPageM` function is returning a JSX structure that includes a
 * `FormContextProvider`, `ModalProvider`, `ToastProvider`, and a `ViewPage` component with the `data`
 * prop passed to it.
 */
function ViewPageM ({data}:{data: PageI}) {
    return (
        <FormContextProvider>
            <ModalProvider>
                <ToastProvider />
                <ViewPage data={data}/>
            </ModalProvider>
        </FormContextProvider>
    )
}
/**
 * The SubmitPageM function renders the SubmitPage component with data passed as props within the
 * context providers for Form, Modal, and Toast.
 * @param  - The function `SubmitPageM` takes an object as a parameter with a property `data` of type
 * `PageI`. The function then returns a component structure that includes a `FormContextProvider`,
 * `ModalProvider`, `ToastProvider`, and `SubmitPage` component with the `data` passed
 * @returns The `SubmitPageM` function is returning a JSX structure that includes a
 * `FormContextProvider`, `ModalProvider`, `ToastProvider`, and the `SubmitPage` component with the
 * `data` prop passed to it.
 */
function SubmitPageM ({data}:{data: PageI}) {
    return (
        <FormContextProvider>
            <ModalProvider>
                <ToastProvider />
                <SubmitPage data={data}/>
            </ModalProvider>
        </FormContextProvider>
    )
}
/**
 * The function `NewPageUiM` renders a UI component with provided data and children within a context
 * provider and modal and toast providers.
 * @param  - The `NewPageUiM` function takes two parameters:
 */
function NewPageUiM ({ data,children }: { data: PageI, children: React.ReactNode }) {
    return (
        <FormContextProvider>
            <ModalProvider>
                <ToastProvider />
                <PageUI data={data} Children={children}/>
            </ModalProvider>
        </FormContextProvider>
    )
}


export const NewPage =/* `memo(PageM)` is a higher-order component provided by React that memoizes the
functional component `PageM`. This means that React will only re-render the
component if its props have changed. By using `memo`, you can optimize
performance by preventing unnecessary re-renders of the component when its
props remain the same. */
 memo(PageM)
export const NewCreatePage = /* `memo(CreatePageM)` is a higher-order component provided by React that
memoizes the functional component `CreatePageM`. This means that React
will only re-render the component if its props have changed. By using
`memo`, you can optimize performance by preventing unnecessary
re-renders of the component when its props remain the same. */
memo(CreatePageM)
export const NewViewPage = /* `memo(ViewPageM)` is a higher-order component provided by React that
memoizes the functional component `ViewPageM`. This means that React will
only re-render the component if its props have changed. By using `memo`,
you can optimize performance by preventing unnecessary re-renders of the
component when its props remain the same. */
memo(ViewPageM)
export const NewSubmitPage = /* `memo(SubmitPageM)` is a higher-order component provided by React that
memoizes the functional component `SubmitPageM`. This means that React
will only re-render the component if its props have changed. By using
`memo`, you can optimize performance by preventing unnecessary
re-renders of the component when its props remain the same. */
memo(SubmitPageM)
export const NewPageUi = /* `memo(NewPageUiM)` is a higher-order component provided by React that
memoizes the functional component `NewPageUiM`. This means that React will
only re-render the component if its props have changed. By using `memo`,
you can optimize performance by preventing unnecessary re-renders of the
component when its props remain the same. */
memo(NewPageUiM)

