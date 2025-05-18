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

export const toastCustom = (content: React.ReactNode) => {
  toast.dismiss()
  toast((t) => (
    <div
      onClick={() => toast.dismiss(t.id)} // fecha ao clicar
      style={{
        cursor: "pointer",
        padding: "16px",
        background: "#1f2937",
        color: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        maxWidth: "360px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      {content}
    </div>
  ))
}