import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  p: 4,
};

export default function ModalComponent(props) {
  const { open, closeModal, children, formTitle } = props;

  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="d-flex align-items-center justify-content-between">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {formTitle}
          </Typography>
          <IconButton color="error" aria-label="clode" onClick={closeModal}>
            <CloseRoundedIcon />
          </IconButton>
        </div>
        <hr />
        {children}
      </Box>
    </Modal>
  );
}
