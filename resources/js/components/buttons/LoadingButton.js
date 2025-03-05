import LoadingButton from "@mui/lab/LoadingButton";

export default function LoadingButtonComponent(props) {
  const {
    loading = false,
    label = "Submit",
    variant = "outlined",
    type = "submit",
    disabled = false,
    onClick,
    size = "medium",
    cls = "",
  } = props;
  return (
    <LoadingButton
      loading={loading}
      variant={variant}
      type={type}
      disableElevation
      onClick={onClick}
      disabled={disabled}
      size={size}
      className={cls}
    >
      {label}
    </LoadingButton>
  );
}
