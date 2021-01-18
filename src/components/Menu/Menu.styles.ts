import { makeStyles, createStyles, Theme } from "src/components/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menu: {
      minWidth: 250,
      maxWidth: 250,
      zIndex: 10,
      position: "relative",
      backgroundColor: "#ffffff",
      boxShadow: "0 0 35px 0 rgba(154,161,171,.15)",
      border: "1px solid red",
      padding: 0,
      margin: 0,
    },
    menuItem: {
      color: "#6c757d",
      padding: "15px 30px",
      position: "relative",
      transition: "all .4s",
      display: "block",
      textDecoration: "none",
      boxSizing: "border-box",
      "& .prefix-icon": {
        width: 20,
        height: 20,
        margin: "0 10px 0 3px",
        textAlign: "center",
        verticalAlign: "middle",
      },
      "& span": {
        verticalAlign: "middle",
      },
      "&:hover": {
        color: "#727cf5",
      },
    },
    collapse: {
      minWidth: 70,
      maxWidth: 70,
      zIndex: 5,
      "& $menuItem": {
        padding: "15px 20px",
        minHeight: 56,
        "& .prefix-icon": {
          marginRight: 20,
        },
        "& span": {
          display: "none",
          paddingLeft: 10,
        },
        "&:hover": {
          position: "relative",
          width: 260,
          background: "#fff",
          "& span": {
            display: "inline",
          },
        },
      },
    },

    selected: {
      color: "#727cf5",
    },
    active: {},
    disabled: {},
  })
);

export default useStyles;
