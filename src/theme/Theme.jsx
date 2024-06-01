import { extendTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "orange.50",
        color: "#652B19",
        _dark: {
          bg: "#0A1C37",
          color: "#D4E5FE",
        },
      },
    },
  },
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
              _dark: {
                bg: "#19355B",
                color: "#132237",
              },
            },
          },
          tbody: {
            tr: {
              _dark: {
                _hover: {
                  bg: "#132337",
                },
              },
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
          width: "99%",
          zIndex: 1,
          margin: "5px",
          borderColor: "orange",
          bg: "white",
          boxShadow: "0 0 0 1px lightgray",
          _focus: {
            borderColor: "orange",
            boxShadow: "0 0 0 2px orange",
          },
          _dark: {
            bg: "blackAlpha.200",
            borderColor: "gray",
            boxShadow: "0 0 0 1px gray",
            _focus: {
              borderColor: "gray",
              boxShadow: "0 0 0 2px gray",
            },
          },
        },
      },
      variants: {
        noBorder: {
          field: {
            width: "99%",
            border: "none",
            boxShadow: "none",
            _hover: {
              border: "none",
            },
            _focus: {
              border: "none",
              boxShadow: "none",
            },
            _dark: {
              border: "none",
              boxShadow: "none",
              _hover: {
                border: "none",
              },
              _focus: {
                border: "none",
                boxShadow: "none",
              },
            },
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
          zIndex: 1,
          borderColor: "orange",
          boxShadow: "0 0 0 1px lightgray",
          _focus: {
            borderColor: "orange",
            boxShadow: "0 0 0 2px orange",
          },
          _dark: {
            _focus: {
              borderColor: "darkgray",
              boxShadow: "0 0 0 2px darkgray",
            },
          },
        },
      },
      defaultProps: {
        variant: "custom",
      },
    },
    Textarea: {
      baseStyle: {
        margin: "5px",
        width: "99%",
        zIndex: 1,
        borderColor: "orange",
        boxShadow: "0 0 0 1px lightgray",
        resize: "none",
        _focus: {
          borderColor: "orange",
          boxShadow: "0 0 0 2px orange",
        },
        _dark: {
          bg: "blackAlpha.300",
          _focus: {
            borderColor: "gray",
            boxShadow: "0 0 0 2px gray",
          },
        },
      },
      variants: {
        noBorder: {
          bgColor: "orange.50",
          margin: "5px",
          width: "99%",
          height: "400px",
          border: "none",
          boxShadow: "none",
          _hover: {
            border: "none",
          },
          _focus: {
            border: "none",
            boxShadow: "none",
          },
          _dark: {
            bg: "blackAlpha.300",
            _focus: {
              borderColor: "none",
              boxShadow: "none",
            },
          },
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
            cursor: "default",
            _hover: {
              bg: "orange.400", // disabled 상태일 때 hover 시 배경 색상
            },
          },
          _dark: {
            bg: "blue.900",
            color: "white",
            _hover: {
              bg: "blue.700",
            },
          },
        },
      },
    },
    FormLabel: {
      baseStyle: {
        margin: "5px",
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
