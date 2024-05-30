import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  components: {
    Table: {
      baseStyle: {
        table: {
          borderCollapse: "collapse",
          width: "100%",
          thead: {
            th: {
              cursor: "default",
              bg: "orange.300",
              color: "orange.100",
              fontSize: "1.2rem",
            },
          },
          tbody: {
            tr: {
              cursor: "pointer",
              _hover: {
                bg: "orange.100",
              },
            },
          },
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          zIndex: 1,
          borderColor: "orange",
          boxShadow: "0 0 0 1px lightgray",
          _focus: {
            borderColor: "orange",
            boxShadow: "0 0 0 2px orange",
          },
        },
      },
      defaultProps: {
        variant: "custom",
      },
    },
    Select: {
      baseStyle: {
        field: {
          option: {
            _hover: {
              bg: "orange.300",
            },
          },
          zIndex: 1,
          borderColor: "orange",
          boxShadow: "0 0 0 1px lightgray",
          _focus: {
            borderColor: "orange",
            boxShadow: "0 0 0 2px orange",
          },
        },
      },
      defaultProps: {
        variant: "custom",
      },
    },
    Textarea: {
      baseStyle: {
        zIndex: 1,
        borderColor: "orange",
        boxShadow: "0 0 0 1px lightgray",
        resize: "none",
        _focus: {
          borderColor: "orange",
          boxShadow: "0 0 0 2px orange",
        },
      },
      defaultProps: {
        variant: "custom",
      },
    },
    Button: {
      baseStyle: {
        fontWeight: "bold",
        textTransform: "uppercase",
        margin: "5px",
      },
      variants: {
        solid: {
          bg: "orange.400",
          color: "white",
          _hover: {
            bg: "orange.500",
          },
          _disabled: {
            bg: "orange.300",
            cursor: "not-allowed",
            _hover: {
              bg: "orange.400", // disabled 상태일 때 hover 시 배경 색상
            },
          },
        },
      },
    },
    Box: {
      baseStyle: {
        padding: 4,
        borderRadius: "md",
        border: "1px solid",
        borderColor: "orange.200",
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: "bold",
        lineHeight: "1.2",
      },
      sizes: {
        xl: {
          fontSize: "6xl",
        },
        lg: {
          fontSize: "4xl",
        },
      },
    },
  },
});
