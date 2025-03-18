/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Plus, RefreshCw, RotateCw, Trash2 } from "lucide-react";


import { useTableContext } from "../../hooks/form/context";
import { validateFormKeys } from "../../hooks/validateFields";
import { PageI } from "../../interface/interface.form";
import { ActionFormTypesE } from "../../state-manager/form/state-actions";
import StyledButton from "../../utillities/button";
import { deleteEmptyKeysAndValues } from "../../utillities/delete-empty-kv";
import { DeleteModal, Modal } from "../../utillities/modals";
import { successToast } from "../../utillities/toaster";
import { splitByUppercase } from "../../utillities/utils";

export function SubmitPage({ data }: { data: PageI }) {
  const name = data.name.toLowerCase().trim();
  const fieldName = name.split(" ").join("-") + "-form";
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const field: Record<string, any> = {};
  const requiredField: Record<string, string> = {};
  const selector = useTableContext().state
  const dispatch = useTableContext().dispatch;

  data.headings.forEach((heading) => {
    if (heading.formType === "obj" && heading.child) {
      heading.child.forEach((el) => {
        const va = splitByUppercase(el.key).join("-");
        field[el.key] = `${fieldName}-${va}`;
        if (el.required) {
          requiredField[el.key] = `${fieldName}-${va}`;
        }
      });
    } else {
      const val = splitByUppercase(heading.key).join("-");
      field[heading.key] = `${fieldName}-${val}`;
      if (heading.required) {
        requiredField[heading.key] = `${fieldName}-${val}`;
      }
    }
  });

  const [call, setCall] = useState(true);
  const [_status, setStatus] = useState<
    "isLoading" | "isSuccess" | "isError" | "none"
  >("none");


  const showDeleteButton =
    data.showButton && data.showButton.deleteButton
      ? data.showButton.deleteButton
      : false;
  const showUpdateButton =
    data.showButton && data.showButton.updateButton
      ? data.showButton.updateButton
      : false;

  useEffect(() => {
    if (data.update && data.update?.updateStatus) {
      switch (data.update?.updateStatus) {
        case "error": {
          let er = "error updating " + data.name;

          if (data.create?.errorMessage) {
            if (typeof data.create?.errorMessage === "string") {
              er = data.create?.errorMessage;
            } else {
              if (data.create?.errorMessage.data) {
                if (typeof data.create?.errorMessage.data === "string") {
                  er = data.create?.errorMessage.data;
                } else {
                  if (data.create?.errorMessage.data.message === "string") {
                    er = data.create?.errorMessage.data.message;
                  }
                }
              }
            }
          }

          toast.error(er);
          break;
        }
        case "success":
          toast.success("updated " + data.name + " successfully");
          break;
        default:
          return;
      }
    }

    if (data.create && data.create?.createStatus) {
      switch (data.create?.createStatus) {
        case "error": {
          let er = "error creating " + data.name;

          if (data.create?.errorMessage) {
            if (typeof data.create?.errorMessage === "string") {
              er = data.create?.errorMessage;
            } else {
              if (data.create?.errorMessage.data) {
                if (typeof data.create?.errorMessage.data === "string") {
                  er = data.create?.errorMessage.data;
                } else {
                  if (data.create?.errorMessage.data.message) {
                    er = data.create?.errorMessage.data.message;
                  }
                }
              }
            }
          }

          toast.error(er);
          break;
        }
        case "success":
          toast.success("created " + data.name + " successfully");
          break;
        default:
          return;
      }
    }

    if (data.delete && data.delete?.deleteStatus) {
      switch (data.delete?.deleteStatus) {
        case "error": {
          let er = "error deleting " + data.name;

          if (data.create?.errorMessage) {
            if (typeof data.create?.errorMessage === "string") {
              er = data.create?.errorMessage;
            } else {
              if (data.create?.errorMessage.data) {
                if (typeof data.create?.errorMessage.data === "string") {
                  er = data.create?.errorMessage.data;
                } else {
                  if (data.create?.errorMessage.data.message) {
                    er = data.create?.errorMessage.data.message;
                  }
                }
              }
            }
          }

          toast.error(er);
          break;
        }
        case "success":
          toast.success("deleted successfully");
          break;
        default:
          break;
      }
    }
  }, [data.create, data.delete, data.name, data.update]);

  async function submit() {
    try {
      const obj: Record<string, any> = {};
      Object.entries(field).map(([key, value]) => {
        if (selector[value] && selector[value]?.value !== undefined) {
          obj[key] = selector[value]?.value;
        }
      });

      const deleteEmptyKV = deleteEmptyKeysAndValues(obj);

      if (call) {
        if (data.type === "UPDATE") {
          if (data.update && data.update.update) {
            const submit = await data.update.update(deleteEmptyKV);
            setStatus(submit);

            if (
              data.update?.updateStatus === "success" ||
              submit === "isSuccess"
            ) {
              dispatch(
                
                {type: ActionFormTypesE.DELETE_FORM_KEYS,
                payload:  Object.values(field)
                });
            }
          }
        }

        if (data.type === "CREATE") {
          const validateValues: Record<string, any> = {};
          Object.entries(requiredField).map(([_, value]) => {
            validateValues[value] = selector[value];
          });

          const validator = validateFormKeys(validateValues, dispatch);

          if (data.create && data.create.create && validator) {
            const submit = await data.create.create(deleteEmptyKV);
            setStatus(submit);

            if (
              data.create?.createStatus === "success" ||
              submit === "isSuccess"
            ) {
              dispatch({
                type: ActionFormTypesE.DELETE_FORM_KEYS,
                payload: Object.values(field),
                
            });
            }
          }
        }

        if (
          data.update?.updateStatus === "success" ||
          data.create?.createStatus === "success" ||
          data.delete?.deleteStatus === "success"
        ) {
        successToast("success")
        }

        setCall(false);
        const setT = setTimeout(() => {
          setCall(true);
        }, 3000);

        return () => {
          clearTimeout(setT);
        };
      }
    } catch (e) {
      // Error handling
    }
  }

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      {data.delete && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          title="Delete Confirmation"
          size="md"
        >
          <DeleteModal
            id={data.id}
            confirm={data.delete.delete}
            metadata={data.delete.deleteMetaData}
            isLoading={data.delete?.deleteStatus === "loading"}
            onClose={handleCloseDeleteModal}
          />
        </Modal>
      )}

      <div className="px-4 sm:px-6 lg:px-6">
        <div className="flex flex-col items-end justify-end pb-4">
          {data.type !== "VIEW" && (
            <StyledButton
              variant="primary"
              size="md"
              onClick={submit}
              isLoading={
                data.update?.updateStatus === "loading" ||
                data.create?.createStatus === "loading"
              }
              icon={
                data.type === "CREATE" ? (
                  <Plus size={18} />
                ) : (
                  <RotateCw size={18} />
                )
              }
              className="shadow-sm"
            >
              {data.buttonName ?? data.type.toLowerCase()}
            </StyledButton>
          )}

          {data.type === "VIEW" && (
            <div className="flex flex-row space-x-3">
              {showUpdateButton && (
                <StyledButton
                  variant="secondary"
                  size="md"
                  icon={<RefreshCw size={18} />}
                  onClick={() => {
                    // Handle update action or navigation
                    if (data.update && data.update.updateRoute) {
                      location.href=data.update.updateRoute
                    }
                  }}
                >
                  update
                </StyledButton>
              )}

              {showDeleteButton && (
                <StyledButton
                  variant="danger"
                  size="md"
                  icon={<Trash2 size={18} />}
                  onClick={handleOpenDeleteModal}
                >
                  delete
                </StyledButton>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

