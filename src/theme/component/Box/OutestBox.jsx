import React from "react";
import { Box } from "@chakra-ui/react";

const OutestBox = ({ children, ...props }) => {
  return (
    <Box {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            borderRadius: "md",
            marginY: "50px",
          });
        }
        return child;
      })}
    </Box>
  );
};

export default OutestBox;
