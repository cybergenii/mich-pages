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


export const NewPage = memo(PageM)
export const NewCreatePage = memo(CreatePageM)
export const NewViewPage = memo(ViewPageM)
export const NewSubmitPage = memo(SubmitPageM)
export const NewPageUi = memo(NewPageUiM)

