import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function ToggleButtonComponent(props) {
  const { error, errorMsg, value, label, getValue } = props;
  const [carrier, setCarrier] = React.useState(value);

  const theme = createTheme({
    components: {
      MuiToggleButton: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              backgroundColor: "#ff4553",
              color: "white",
              "&:hover": {
                backgroundColor: "#ff212e",
              },
            },
          },
        },
      },
    },
  });

  const handleChange = (event, newCarrier) => {
    if (newCarrier) {
      setCarrier(newCarrier);
      getValue(newCarrier);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <label className="fw-bold mb-1">{label}*:</label>
        <br />
        <ToggleButtonGroup
          color="primary"
          value={carrier}
          exclusive
          onChange={handleChange}
          aria-label="carrier"
        >
          <ToggleButton value="DHL">DHL</ToggleButton>
          <ToggleButton value="FedEx">FedEx</ToggleButton>
          <ToggleButton value="UPS">UPS</ToggleButton>
        </ToggleButtonGroup>
      </ThemeProvider>
    </>
  );
}
