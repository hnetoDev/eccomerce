import toast from "react-hot-toast"

export const toastSuccess = (msg: string) => {
  toast.dismiss()
  toast.success(msg)
}

export const toastError = (msg: string) => {
  toast.dismiss()
  toast.error(msg)
}

export const toastLoading = (msg: string) => {
  toast.dismiss()
  return toast.loading(msg) // retorna o ID para poder atualizar depois
}

export const toastDismiss = (id: string) => {
  toast.dismiss(id)
}
