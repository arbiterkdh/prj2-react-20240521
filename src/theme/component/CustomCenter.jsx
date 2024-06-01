import React from "react";
import { Center } from "@chakra-ui/react";

const CustomCenter = ({ children, ...props }) => {
  return (
    <Center {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { width: "80%" });
        }
        return child;
      })}
    </Center>
  );
};

export default CustomCenter;
