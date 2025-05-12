export const mainTheme = {
  token: {
    colorPrimary: "#FFB000",
    colorInfo: "var(--primary)",
    colorError: "#ca0b00",
  },

  components: {
    Menu: {
      itemBg: "transparent",
      itemColor: "#000",
      itemHoverBg: "var(--primary)",
      itemHoverColor: "#fff",
      itemSelectedBg: "var(--primary)",
      itemSelectedColor: "var(--primary-white)",
      iconSize: 17,
      itemMarginBlock: 10,
      itemHeight: 56,
      itemPaddingInline: 1,
    },

    Table: {
      headerBg: "var(--primary)",
      headerSplitColor: "black",
      headerColor: "var(--primary-black)",
      colorBgContainer: "var(--primary-white)",
      cellFontSize: 16,
      colorText: "var(--primary-black)",
      borderColor: "var(--primary)",
      headerFilterHoverBg: "transparent",
      rowHoverBg: "white",
      filterDropdownMenuBg: "#000",
      filterDropdownBg: "#000",
    },

    Button: {
      colorPrimary: "var(--primary)",
      color: "var(--primary)",
    },

    Input: {
      colorBorder: "var(--input-border)",
      activeBorderColor: "var(--primary)",
      controlHeight: 38,
    },

    Select: {
      colorBorder: "var(--input-border)",
    },

    DatePicker: {
      controlHeight: 40,
      colorBorder: "var(--secondary)",
    },

    Tabs: {
      itemColor: "var(--primary)",
      itemActiveColor: "var(--primary)",
    },

    Pagination: {
      itemActiveBg: "var(--primary)",
      colorBgContainer: "#000000",
      colorText: "#ffffff",
      colorPrimary: "#ffffff",
      colorBgTextHover: "var(--primary)",
    },

    Spin: {
      colorPrimary: "var(--primary)",
    },
    Segmented: {
      itemColor: "var(--primary-white)",
      trackBg: "var(--primary)",
    },

    Empty: {
      colorTextDescription: "var(--primary)",
    },
  },
};
