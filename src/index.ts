import FileInput from "./form/inputs/file";
import { Input } from "./form/inputs/input";
import { SelectInput, SelectInput2, SelectInput3 } from "./form/inputs/select";
import {
    FileInputI,
    InputI,
    InputTypeI,
    PageCategoriesI,
    PageHeadingI,
    PageI,
    SelectI,
    SelectThreeI,
    SelectTwoI,
} from "./form/interface/interface.form";
import {
    NewCreatePage,
    NewPage,
    NewPageUi,
    NewSubmitPage,
    NewViewPage,
} from "./form/page";
import StyledButton from "./form/utillities/button";
import PresetQuillEditor from "./form/utillities/textbox/rich-text-ui";

import "./index.css";
import "./style.css";

export {
    FileInput,
    Input,
    NewCreatePage,
    NewPage,
    NewPageUi,
    NewSubmitPage,
    NewViewPage, PresetQuillEditor, SelectInput,
    SelectInput2,
    SelectInput3, StyledButton
};
export type {
    FileInputI,
    InputI,
    InputTypeI,
    PageCategoriesI,
    PageHeadingI,
    PageI,
    SelectI,
    SelectThreeI,
    SelectTwoI
};

