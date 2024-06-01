import React from "react";
import { Box } from "@chakra-ui/react";

const CustomBox = ({ children, ...props }) => {
  return (
    <Box {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            borderRadius: "md",
            bg: "orange.100",
            padding: "10px",
            margin: "5px",
            _dark: { bg: "blackAlpha.300" },
          });
        }
        return child;
      })}
    </Box>
  );
};

export default CustomBox;
