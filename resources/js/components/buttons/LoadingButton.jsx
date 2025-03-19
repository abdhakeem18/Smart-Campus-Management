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
    fullWidth = false,
  } = props;
  return (
    <LoadingButton
      loading={loading}
      variant={variant}
      type={type}
      fullWidth={fullWidth}
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
