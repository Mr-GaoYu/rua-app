import { makeStyles, createStyles, Theme } from "src/components/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menu: {
      minWidth: 250,
      maxWidth: 250,
      zIndex: 10,
      backgroundColor: "#ffffff",
      position: "relative",
      transition: "all .2s ease-out",
      boxShadow: "0 0 35px 0 rgba(154,161,171,.15)",
      border: "1px solid red",
      padding: 0,
    },
    menuItem: {
      listStyle: "none",
      boxSizing: "border-box",
    },
    itemLink: {
      color: "#6c757d",
      display: "block",
      padding: "15px 30px",
      position: "relative",
      transition: "all .4s",
    },
    collapse: {
      "&$menu": {
        minWidth: 70,
        maxWidth: 70,
        zIndex: 5,
      },
      "&$menuItem": {
        position: "relative",
        whiteSpace: "nowrap",
      },
      "&$itemLink": {
        padding: "15px 20px",
        minHeight: 56,
      },
    },
  })
);

export default useStyles;
