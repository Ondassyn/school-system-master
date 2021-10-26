import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Box, Grid, IconButton, Typography } from "@material-ui/core";
import TableIcons from "../../../../lib/components/MaterialTable/TableIcons";
import { Tooltip } from "@material-ui/core";
import { MTableHeader, MTableToolbar } from "material-table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import MaterialTable from "material-table";
import TransferWithinAStationOutlinedIcon from "@material-ui/icons/TransferWithinAStationOutlined";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";

import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem 0 2rem",
  },
  actions: {
    display: "flex",
  },
  TableBorderRight: {
    borderRight: "1px solid darkgray",
  },
  TableBorderRightSticky: {
    borderRight: "1px solid darkgray",
    position: "sticky",
    left: 0,
    background: "white",
  },
  TableBorderRightBottom: {
    borderRight: "1px solid darkgray",
    borderBottom: "1px solid darkgray",
  },
  TableBorderRightBottomSticky: {
    borderRight: "1px solid darkgray",
    borderBottom: "1px solid darkgray",
    position: "sticky",
    left: 0,
    background: "white",
  },

  TableBorderRightBottomLight: {
    borderRight: "1px solid darkgray",
    borderBottom: "1px solid darkgray",
  },
  TableBorderRightLight: {
    borderRight: "1px solid lightgray",
  },
}));

const Main = (props) => {
  const classes = useStyles();

  const [goal1Open, setGoal1Open] = useState(true);
  const [goal2Open, setGoal2Open] = useState(true);
  const [goal3Open, setGoal3Open] = useState(true);
  const [goal4Open, setGoal4Open] = useState(true);
  const [goal5Open, setGoal5Open] = useState(true);
  const [goal6Open, setGoal6Open] = useState(true);
  const [goal7Open, setGoal7Open] = useState(true);
  const [goal8Open, setGoal8Open] = useState(true);
  const [goal9Open, setGoal9Open] = useState(true);

  const TableCellStyle = {
    borderRight: "1px solid #e5e5e5",
    textAlign: "center",
  };

  const TableCellStyleDark = {
    borderRight: "2px solid darkgray",
    textAlign: "center",
  };

  const TableCellStyleDarkSticky = {
    borderRight: "2px solid darkgray",
    textAlign: "center",
    position: "sticky",
    left: 0,
    background: "white",
  };

  useEffect(() => {
    if (!Meteor.userId()) props.history.push("/signin");
  });

  if (!Meteor.userId()) return null;

  const COLUMNS = [
    {
      title: "Мектеп",
      field: "sName",
      cellStyle: TableCellStyleDarkSticky,
    },
    ...(goal1Open
      ? [
          {
            title: "Орындалған",
            field: "goal1111_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal1Open
      ? [
          {
            title: "Мақсат",
            field: "goal1111_target",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal1Open
      ? [
          {
            title: "Орындалған",
            field: "goal1121_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal1Open
      ? [
          {
            title: "Мақсат",
            field: "goal1121_target",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal1Open
      ? [
          {
            title: "Орындалған",
            field: "goal1211_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal1Open
      ? [
          {
            title: "Мақсат",
            field: "goal1211_target",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal1Open
      ? [
          {
            title: "Орындалған",
            field: "goal1221_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal1Open
      ? [
          {
            title: "Мақсат",
            field: "goal1221_target",
            cellStyle: TableCellStyle,
          },
        ]
      : [{ title: "Мақсат", field: "", cellStyle: TableCellStyle }]),
    ...(goal2Open
      ? [
          {
            title: "Орындалған",
            field: "goal2111_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal2Open
      ? [
          {
            title: "Мақсат",
            field: "goal2111_target",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal2Open
      ? [
          {
            title: "Орындалған",
            field: "goal2121_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal2Open
      ? [
          {
            title: "Мақсат",
            field: "goal2121_target",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal2Open
      ? [
          {
            title: "Орындалған",
            field: "goal2122_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal2Open
      ? [
          {
            title: "Мақсат",
            field: "goal2122_target",
            cellStyle: TableCellStyle,
          },
        ]
      : [{ title: "Мақсат", field: "", cellStyle: TableCellStyle }]),
    ...(goal3Open
      ? [
          {
            title: "Орындалған",
            field: "goal3111_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal3Open
      ? [
          {
            title: "Мақсат",
            field: "goal3111_target",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal3Open
      ? [
          {
            title: "Орындалған",
            field: "goal3121_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal3Open
      ? [
          {
            title: "Мақсат",
            field: "goal3121_target",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal3Open
      ? [
          {
            title: "Орындалған",
            field: "goal3211_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal3Open
      ? [
          {
            title: "Мақсат",
            field: "goal3211_target",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal3Open
      ? [
          {
            title: "Орындалған",
            field: "goal3221_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal3Open
      ? [
          {
            title: "Мақсат",
            field: "goal3221_target",
            cellStyle: TableCellStyle,
          },
        ]
      : [{ title: "Мақсат", field: "", cellStyle: TableCellStyle }]),
    ...(goal4Open
      ? [
          {
            title: "Орындалған",
            field: "goal4111_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal4Open
      ? [
          {
            title: "Мақсат",
            field: "goal4111_target",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal4Open
      ? [
          {
            title: "Орындалған",
            field: "goal4112_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal4Open
      ? [
          {
            title: "Мақсат",
            field: "goal4112_target",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal4Open
      ? [
          {
            title: "Орындалған",
            field: "goal4113_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal4Open
      ? [
          {
            title: "Мақсат",
            field: "goal4113_target",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal4Open
      ? [
          {
            title: "Орындалған",
            field: "goal4121_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal4Open
      ? [
          {
            title: "Мақсат",
            field: "goal4121_target",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal4Open
      ? [
          {
            title: "Орындалған",
            field: "goal4122_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal4Open
      ? [
          {
            title: "Мақсат",
            field: "goal4122_target",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal4Open
      ? [
          {
            title: "Орындалған",
            field: "goal4123_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal4Open
      ? [
          {
            title: "Мақсат",
            field: "goal4123_target",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal4Open
      ? [
          {
            title: "Орындалған",
            field: "goal4211_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal4Open
      ? [
          {
            title: "Мақсат",
            field: "goal4211_target",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal4Open
      ? [
          {
            title: "Орындалған",
            field: "goal4221_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal4Open
      ? [
          {
            title: "Мақсат",
            field: "goal4221_target",
            cellStyle: TableCellStyle,
          },
        ]
      : [{ title: "Мақсат", field: "", cellStyle: TableCellStyle }]),
    ...(goal5Open
      ? [
          {
            title: "Орындалған",
            field: "goal5111_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal5Open
      ? [
          {
            title: "Мақсат",
            field: "goal5111_target",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal5Open
      ? [
          {
            title: "Орындалған",
            field: "goal5121_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal5Open
      ? [
          {
            title: "Мақсат",
            field: "goal5121_target",
            cellStyle: TableCellStyle,
          },
        ]
      : [{ title: "Мақсат", field: "", cellStyle: TableCellStyle }]),
    ...(goal6Open
      ? [
          {
            title: "Орындалған",
            field: "goal6111_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal6Open
      ? [
          {
            title: "Мақсат",
            field: "goal6111_target",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal6Open
      ? [
          {
            title: "Орындалған",
            field: "goal6121_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal6Open
      ? [
          {
            title: "Мақсат",
            field: "goal6121_target",
            cellStyle: TableCellStyle,
          },
        ]
      : [{ title: "Мақсат", field: "", cellStyle: TableCellStyle }]),
    ...(goal7Open
      ? [
          {
            title: "Орындалған",
            field: "goal7111_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal7Open
      ? [
          {
            title: "Мақсат",
            field: "goal7111_target",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal7Open
      ? [
          {
            title: "Орындалған",
            field: "goal7112_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal7Open
      ? [
          {
            title: "Мақсат",
            field: "goal7112_target",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal7Open
      ? [
          {
            title: "Орындалған",
            field: "goal7113_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal7Open
      ? [
          {
            title: "Мақсат",
            field: "goal7113_target",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal7Open
      ? [
          {
            title: "Орындалған",
            field: "goal7114_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal7Open
      ? [
          {
            title: "Мақсат",
            field: "goal7114_target",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal7Open
      ? [
          {
            title: "Орындалған",
            field: "goal7121_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal7Open
      ? [
          {
            title: "Мақсат",
            field: "goal7121_target",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal7Open
      ? [
          {
            title: "Орындалған",
            field: "goal7122_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal7Open
      ? [
          {
            title: "Мақсат",
            field: "goal7122_target",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal7Open
      ? [
          {
            title: "Орындалған",
            field: "goal7123_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal7Open
      ? [
          {
            title: "Мақсат",
            field: "goal7123_target",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal7Open
      ? [
          {
            title: "Орындалған",
            field: "goal7124_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal7Open
      ? [
          {
            title: "Мақсат",
            field: "goal7124_target",
            cellStyle: TableCellStyle,
          },
        ]
      : [{ title: "Мақсат", field: "", cellStyle: TableCellStyle }]),
    ...(goal8Open
      ? [
          {
            title: "Орындалған",
            field: "goal8111_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal8Open
      ? [
          {
            title: "Мақсат",
            field: "goal8111_target",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal8Open
      ? [
          {
            title: "Орындалған",
            field: "goal8121_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal8Open
      ? [
          {
            title: "Мақсат",
            field: "goal8121_target",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal8Open
      ? [
          {
            title: "Орындалған",
            field: "goal8211_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal8Open
      ? [
          {
            title: "Мақсат",
            field: "goal8211_target",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal8Open
      ? [
          {
            title: "Орындалған",
            field: "goal8221_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal8Open
      ? [
          {
            title: "Мақсат",
            field: "goal8221_target",
            cellStyle: TableCellStyle,
          },
        ]
      : [{ title: "Мақсат", field: "", cellStyle: TableCellStyle }]),
    ...(goal9Open
      ? [
          {
            title: "Орындалған",
            field: "goal9111_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal9Open
      ? [
          {
            title: "Мақсат",
            field: "goal9111_target",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal9Open
      ? [
          {
            title: "Орындалған",
            field: "goal9121_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal9Open
      ? [
          {
            title: "Мақсат",
            field: "goal9121_target",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal9Open
      ? [
          {
            title: "Орындалған",
            field: "goal9211_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal9Open
      ? [
          {
            title: "Мақсат",
            field: "goal9211_target",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal9Open
      ? [
          {
            title: "Орындалған",
            field: "goal9221_completed",
            cellStyle: TableCellStyle,
          },
        ]
      : []),
    ...(goal9Open
      ? [
          {
            title: "Мақсат",
            field: "goal9221_target",
          },
        ]
      : [{ title: "Мақсат", field: "", cellStyle: TableCellStyle }]),
  ];

  const exportCsv = () => {
    const fileName = "academic_goals";
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const headers_1 = [
      "Мақсаттар",
      "Әлемнің ең үздік 100 yниверситетіне оқушыларды дайындау",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "Пәндік олимпиадаларға дайындау",
      "",
      "",
      "",
      "",
      "",
      "Оқушыларды жоғарғы оқу орнына дайындау",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "Оқушылардың ағылшын тілін меңгеру деңгейін көтеру",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "SAT сынақтарына дайындау",
      "",
      "",
      "",
      "Оқушылардың икемді дағдыларын дамыту",
      "",
      "",
      "",
      "Оқушылардың оқу мақсаттарын меңгеруі",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "Мұғалімдерді кәсіби жетілдіру",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "Оқушылардың жан-жақты дамуы",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ];

    const header_2 = [
      "Суб-мақсаттар",
      "Түрлі халықаралық рейтингтер бойынша үздік танылған университеттерге түсуге 11 сынып оқушыларын ынталандыру, жан-жақты қолдау көрсету",
      "",
      "",
      "",
      "Түрлі халықаралық рейтингтер бойынша үздік танылған университеттерге түсуге 10 сынып оқушыларын ынталандыру, жан-жақты қолдау көрсету",
      "",
      "",
      "",
      "Жоқ",
      "",
      "",
      "",
      "",
      "",
      "Қазақстанда немесе шетелде оқуды қалайтын оқушыларды сапалы (safe) және үздік ЖОО-ларға бағыттау және грант алуларын қолдау көрсету",
      "",
      "",
      "",
      "Оқушыларды ҰБТ сынағында жоғары ұпай алуларына және нәтижесінде грантқа түсулері үшін бағыттау",
      "",
      "",
      "",
      "7, 8 және 9 сынып оқушыларының ағылшын тілі бойынша тілдік білім мен төрт дағдыларды (оқылым, жазылым, айтылым, тыңдалым) меңгеру деңгейін жоғарылату",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "10 және 11 сынып оқушыларының ағылшын тілі бойынша тілдік білім мен төрт дағдыларды (оқылым, жазылым, айтылым, тыңдалым) меңгеру деңгейін жоғарылату",
      "",
      "",
      "",
      "Жоқ",
      "",
      "",
      "",
      "Жоқ",
      "",
      "",
      "",

      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "Мұғалімдердің біліктілік санаттарын алуы (санаты жоқтарға) және көтеруі",
      "",
      "",
      "",
      "Жас мамандармен жұмыс",
      "",
      "",
      "",
      "Оқушылардың лицейде немесе лицейден тыс жерде үйірмелерге қатысуы",
      "",
      "",
      "",
      "Лицейдегі үйірмелердің қызметі",
      "",
      "",
      "",
    ];

    let dataToExport = [];

    let studentRecord = {
      [headers[0]]: "001",
      [headers[1]]: "00001",
      [headers[2]]: "Абаев Абай",
      [headers[3]]: "1",
    };

    dataToExport.push(studentRecord);

    const ws = XLSX.utils.json_to_sheet(dataToExport);

    const merge = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 1 } },
      // { s: { r: 3, c: 0 }, e: { r: 4, c: 0 } },
    ];
    ws["!merges"] = merge;

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <div>
      <MaterialTable
        title={<Typography variant="h4">Академиялық мақсаттар</Typography>}
        columns={COLUMNS}
        data={props.goals.map((goal) => {
          goal.sName = props.schools.find(
            (school) => school.schoolId === goal.schoolId
          ).shortName;
          return goal;
        })}
        icons={TableIcons}
        options={{
          // search: false,
          // paging: false,
          // filtering: true,
          exportButton: {
            csv: true,
            pdf: false,
          },
          actionsColumnIndex: -1,
          pageSize: 3,
          pageSizeOptions: [3, 5, 10, 20, 50, 100],
          // exportCsv: (columns, data) => {
          //   exportCsv();
          // },
          headerStyle: { position: "sticky", top: 0 },
        }}
        components={{
          Header: (compProps) => {
            return (
              <TableHead>
                <TableRow>
                  <TableCell className={classes.TableBorderRightSticky}>
                    <Typography variant="h6">Мақсаттар</Typography>
                  </TableCell>
                  {goal1Open ? (
                    <TableCell
                      colSpan={8}
                      align="center"
                      className={classes.TableBorderRight}
                    >
                      <IconButton onClick={() => setGoal1Open(false)}>
                        <VisibilityOffIcon />
                      </IconButton>
                      <Typography variant="h6">
                        Әлемнің ең үздік 100 yниверситетіне оқушыларды дайындау
                      </Typography>
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRight}
                    >
                      <IconButton onClick={() => setGoal1Open(true)}>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  )}
                  {goal2Open ? (
                    <TableCell
                      colSpan={6}
                      align="center"
                      className={classes.TableBorderRight}
                    >
                      <IconButton onClick={() => setGoal2Open(false)}>
                        <VisibilityOffIcon />
                      </IconButton>
                      <Typography variant="h6">
                        Пәндік олимпиадаларға дайындау
                      </Typography>
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRight}
                    >
                      <IconButton onClick={() => setGoal2Open(true)}>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  )}
                  {goal3Open ? (
                    <TableCell
                      colSpan={8}
                      align="center"
                      className={classes.TableBorderRight}
                    >
                      <IconButton onClick={() => setGoal3Open(false)}>
                        <VisibilityOffIcon />
                      </IconButton>
                      <Typography variant="h6">
                        Оқушыларды жоғарғы оқу орнына дайындау
                      </Typography>
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRight}
                    >
                      <IconButton onClick={() => setGoal3Open(true)}>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  )}
                  {goal4Open ? (
                    <TableCell
                      colSpan={16}
                      align="center"
                      className={classes.TableBorderRight}
                    >
                      <IconButton onClick={() => setGoal4Open(false)}>
                        <VisibilityOffIcon />
                      </IconButton>
                      <Typography variant="h6">
                        Оқушылардың ағылшын тілін меңгеру деңгейін көтеру
                      </Typography>
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRight}
                    >
                      <IconButton onClick={() => setGoal4Open(true)}>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  )}
                  {goal5Open ? (
                    <TableCell
                      colSpan={4}
                      align="center"
                      className={classes.TableBorderRight}
                    >
                      <IconButton onClick={() => setGoal5Open(false)}>
                        <VisibilityOffIcon />
                      </IconButton>
                      <Typography variant="h6">
                        SAT сынақтарына дайындау
                      </Typography>
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRight}
                    >
                      <IconButton onClick={() => setGoal5Open(true)}>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  )}
                  {goal6Open ? (
                    <TableCell
                      colSpan={4}
                      align="center"
                      className={classes.TableBorderRight}
                    >
                      <IconButton onClick={() => setGoal6Open(false)}>
                        <VisibilityOffIcon />
                      </IconButton>
                      <Typography variant="h6">
                        Оқушылардың икемді дағдыларын дамыту
                      </Typography>
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRight}
                    >
                      <IconButton onClick={() => setGoal6Open(true)}>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  )}
                  {goal7Open ? (
                    <TableCell
                      colSpan={16}
                      align="center"
                      className={classes.TableBorderRight}
                    >
                      <IconButton onClick={() => setGoal7Open(false)}>
                        <VisibilityOffIcon />
                      </IconButton>
                      <Typography variant="h6">
                        Оқушылардың оқу мақсаттарын меңгеруі
                      </Typography>
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRight}
                    >
                      <IconButton onClick={() => setGoal7Open(true)}>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  )}
                  {goal8Open ? (
                    <TableCell
                      colSpan={8}
                      align="center"
                      className={classes.TableBorderRight}
                    >
                      <IconButton onClick={() => setGoal8Open(false)}>
                        <VisibilityOffIcon />
                      </IconButton>
                      <Typography variant="h6">
                        Мұғалімдерді кәсіби жетілдіру
                      </Typography>
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRight}
                    >
                      <IconButton onClick={() => setGoal8Open(true)}>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  )}
                  {goal9Open ? (
                    <TableCell colSpan={8} align="center">
                      <IconButton onClick={() => setGoal9Open(false)}>
                        <VisibilityOffIcon />
                      </IconButton>
                      <Typography variant="h6">
                        Оқушылардың жан-жақты дамуы
                      </Typography>
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRight}
                    >
                      <IconButton onClick={() => setGoal9Open(true)}>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell className={classes.TableBorderRightSticky}>
                    Суб-мақсаттар
                  </TableCell>
                  {goal1Open ? (
                    <TableCell
                      colSpan={4}
                      align="center"
                      className={classes.TableBorderRightLight}
                    >
                      Түрлі халықаралық рейтингтер бойынша үздік танылған
                      университеттерге түсуге 11 сынып оқушыларын ынталандыру,
                      жан-жақты қолдау көрсету
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRight}
                    ></TableCell>
                  )}
                  {goal1Open && (
                    <TableCell
                      colSpan={4}
                      align="center"
                      className={classes.TableBorderRight}
                    >
                      Түрлі халықаралық рейтингтер бойынша үздік танылған
                      университеттерге түсуге 10 сынып оқушыларын ынталандыру,
                      жан-жақты қолдау көрсету
                    </TableCell>
                  )}
                  {goal2Open ? (
                    <TableCell
                      colSpan={6}
                      align="center"
                      className={classes.TableBorderRight}
                    >
                      Жоқ
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRight}
                    ></TableCell>
                  )}
                  {goal3Open && (
                    <TableCell
                      colSpan={4}
                      align="center"
                      className={classes.TableBorderRightLight}
                    >
                      Қазақстанда немесе шетелде оқуды қалайтын оқушыларды
                      сапалы (safe) және үздік ЖОО-ларға бағыттау және грант
                      алуларына қолдау көрсету
                    </TableCell>
                  )}
                  {goal3Open ? (
                    <TableCell
                      colSpan={4}
                      align="center"
                      className={classes.TableBorderRight}
                    >
                      Оқушыларды ҰБТ сынағында жоғары ұпай алуларына және
                      нәтижесінде грантқа түсулері үшін бағыттау
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRight}
                    ></TableCell>
                  )}
                  {goal4Open && (
                    <TableCell
                      colSpan={12}
                      align="center"
                      className={classes.TableBorderRightLight}
                    >
                      7, 8 және 9 сынып оқушыларының ағылшын тілі бойынша тілдік
                      білім мен төрт дағдыларды (оқылым, жазылым, айтылым,
                      тыңдалым) меңгеру деңгейін жоғарылату
                    </TableCell>
                  )}
                  {goal4Open ? (
                    <TableCell
                      colSpan={4}
                      align="center"
                      className={classes.TableBorderRight}
                    >
                      10 және 11 сынып оқушыларының ағылшын тілі бойынша тілдік
                      білім мен төрт дағдыларды (оқылым, жазылым, айтылым,
                      тыңдалым) меңгеру деңгейін жоғарылату
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRight}
                    ></TableCell>
                  )}
                  {goal5Open ? (
                    <TableCell
                      colSpan={4}
                      align="center"
                      className={classes.TableBorderRight}
                    ></TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRight}
                    ></TableCell>
                  )}
                  {goal6Open ? (
                    <TableCell
                      colSpan={4}
                      align="center"
                      className={classes.TableBorderRight}
                    ></TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRight}
                    ></TableCell>
                  )}
                  {goal7Open ? (
                    <TableCell
                      colSpan={16}
                      align="center"
                      className={classes.TableBorderRight}
                    ></TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRight}
                    ></TableCell>
                  )}
                  {goal8Open && (
                    <TableCell
                      colSpan={4}
                      align="center"
                      className={classes.TableBorderRightLight}
                    >
                      Мұғалімдердің біліктілік санаттарын алуы (санаты жоқтарға)
                      және көтеруі
                    </TableCell>
                  )}
                  {goal8Open ? (
                    <TableCell
                      colSpan={4}
                      align="center"
                      className={classes.TableBorderRight}
                    >
                      Жас мамандармен жұмыс
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRight}
                    ></TableCell>
                  )}
                  {goal9Open && (
                    <TableCell
                      colSpan={4}
                      align="center"
                      className={classes.TableBorderRightLight}
                    >
                      Оқушылардың лицейде немесе лицейден тыс жерде үйірмелерге
                      қатысуы
                    </TableCell>
                  )}
                  {goal9Open ? (
                    <TableCell colSpan={4} align="center">
                      Лицейдегі үйірмелердің қызметі
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRight}
                    ></TableCell>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell className={classes.TableBorderRightSticky}>
                    Мерзім
                  </TableCell>
                  {goal1Open && (
                    <TableCell
                      colSpan={2}
                      align="center"
                      className={classes.TableBorderRightLight}
                    >
                      Жартыжылдық индикатор
                    </TableCell>
                  )}
                  {goal1Open && (
                    <TableCell
                      colSpan={2}
                      align="center"
                      className={classes.TableBorderRightLight}
                    >
                      Жылдық индикатор
                    </TableCell>
                  )}
                  {goal1Open && (
                    <TableCell
                      colSpan={2}
                      align="center"
                      className={classes.TableBorderRightLight}
                    >
                      Жартыжылдық индикатор
                    </TableCell>
                  )}
                  {goal1Open ? (
                    <TableCell
                      colSpan={2}
                      align="center"
                      className={classes.TableBorderRight}
                    >
                      Жылдық индикатор
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRight}
                    ></TableCell>
                  )}

                  {goal2Open && (
                    <TableCell
                      colSpan={2}
                      align="center"
                      className={classes.TableBorderRightLight}
                    >
                      Жартыжылдық индикатор
                    </TableCell>
                  )}
                  {goal2Open ? (
                    <TableCell
                      colSpan={4}
                      align="center"
                      className={classes.TableBorderRight}
                    >
                      Жылдық индикатор
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRight}
                    ></TableCell>
                  )}

                  {goal3Open && (
                    <TableCell
                      colSpan={2}
                      align="center"
                      className={classes.TableBorderRightLight}
                    >
                      Жартыжылдық индикатор
                    </TableCell>
                  )}
                  {goal3Open && (
                    <TableCell
                      colSpan={2}
                      align="center"
                      className={classes.TableBorderRightLight}
                    >
                      Жылдық индикатор
                    </TableCell>
                  )}
                  {goal3Open && (
                    <TableCell
                      colSpan={2}
                      align="center"
                      className={classes.TableBorderRightLight}
                    >
                      Жартыжылдық индикатор
                    </TableCell>
                  )}
                  {goal3Open ? (
                    <TableCell
                      colSpan={2}
                      align="center"
                      className={classes.TableBorderRight}
                    >
                      Жылдық индикатор
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRight}
                    ></TableCell>
                  )}

                  {goal4Open && (
                    <TableCell
                      colSpan={6}
                      align="center"
                      className={classes.TableBorderRightLight}
                    >
                      Жартыжылдық индикатор
                    </TableCell>
                  )}
                  {goal4Open && (
                    <TableCell
                      colSpan={6}
                      align="center"
                      className={classes.TableBorderRightLight}
                    >
                      Жылдық индикатор
                    </TableCell>
                  )}
                  {goal4Open && (
                    <TableCell
                      colSpan={2}
                      align="center"
                      className={classes.TableBorderRightLight}
                    >
                      Жартыжылдық индикатор
                    </TableCell>
                  )}
                  {goal4Open ? (
                    <TableCell
                      colSpan={2}
                      align="center"
                      className={classes.TableBorderRight}
                    >
                      Жылдық индикатор
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRight}
                    ></TableCell>
                  )}

                  {goal5Open && (
                    <TableCell
                      colSpan={2}
                      align="center"
                      className={classes.TableBorderRightLight}
                    >
                      Жартыжылдық индикатор
                    </TableCell>
                  )}
                  {goal5Open ? (
                    <TableCell
                      colSpan={2}
                      align="center"
                      className={classes.TableBorderRight}
                    >
                      Жылдық индикатор
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRight}
                    ></TableCell>
                  )}

                  {goal6Open && (
                    <TableCell
                      colSpan={2}
                      align="center"
                      className={classes.TableBorderRightLight}
                    >
                      Жартыжылдық индикатор
                    </TableCell>
                  )}
                  {goal6Open ? (
                    <TableCell
                      colSpan={2}
                      align="center"
                      className={classes.TableBorderRight}
                    >
                      Жылдық индикатор
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRight}
                    ></TableCell>
                  )}

                  {goal7Open && (
                    <TableCell
                      colSpan={8}
                      align="center"
                      className={classes.TableBorderRightLight}
                    >
                      Жартыжылдық индикатор
                    </TableCell>
                  )}
                  {goal7Open ? (
                    <TableCell
                      colSpan={8}
                      align="center"
                      className={classes.TableBorderRight}
                    >
                      Жылдық индикатор
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRight}
                    ></TableCell>
                  )}

                  {goal8Open && (
                    <TableCell
                      colSpan={2}
                      align="center"
                      className={classes.TableBorderRightLight}
                    >
                      Жартыжылдық индикатор
                    </TableCell>
                  )}
                  {goal8Open && (
                    <TableCell
                      colSpan={2}
                      align="center"
                      className={classes.TableBorderRightLight}
                    >
                      Жылдық индикатор
                    </TableCell>
                  )}
                  {goal8Open && (
                    <TableCell
                      colSpan={2}
                      align="center"
                      className={classes.TableBorderRightLight}
                    >
                      Жартыжылдық индикатор
                    </TableCell>
                  )}
                  {goal8Open ? (
                    <TableCell
                      colSpan={2}
                      align="center"
                      className={classes.TableBorderRight}
                    >
                      Жылдық индикатор
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRight}
                    ></TableCell>
                  )}

                  {goal9Open && (
                    <TableCell
                      colSpan={2}
                      align="center"
                      className={classes.TableBorderRightLight}
                    >
                      Жартыжылдық индикатор
                    </TableCell>
                  )}
                  {goal9Open && (
                    <TableCell
                      colSpan={2}
                      align="center"
                      className={classes.TableBorderRightLight}
                    >
                      Жылдық индикатор
                    </TableCell>
                  )}
                  {goal9Open && (
                    <TableCell
                      colSpan={2}
                      align="center"
                      className={classes.TableBorderRightLight}
                    >
                      Жартыжылдық индикатор
                    </TableCell>
                  )}
                  {goal9Open ? (
                    <TableCell colSpan={2} align="center">
                      Жылдық индикатор
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRight}
                    ></TableCell>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell className={classes.TableBorderRightBottomSticky}>
                    Мектеп
                  </TableCell>
                  {goal1Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal1Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Мақсат
                    </TableCell>
                  )}
                  {goal1Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal1Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Мақсат
                    </TableCell>
                  )}
                  {goal1Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal1Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Мақсат
                    </TableCell>
                  )}
                  {goal1Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal1Open ? (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottom}
                    >
                      Мақсат
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottom}
                    ></TableCell>
                  )}

                  {goal2Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal2Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Мақсат
                    </TableCell>
                  )}
                  {goal2Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal2Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Мақсат
                    </TableCell>
                  )}
                  {goal2Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal2Open ? (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottom}
                    >
                      Мақсат
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottom}
                    ></TableCell>
                  )}

                  {goal3Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal3Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Мақсат
                    </TableCell>
                  )}
                  {goal3Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal3Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Мақсат
                    </TableCell>
                  )}
                  {goal3Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal3Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Мақсат
                    </TableCell>
                  )}
                  {goal3Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal3Open ? (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottom}
                    >
                      Мақсат
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottom}
                    ></TableCell>
                  )}

                  {goal4Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal4Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Мақсат
                    </TableCell>
                  )}
                  {goal4Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal4Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Мақсат
                    </TableCell>
                  )}
                  {goal4Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal4Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Мақсат
                    </TableCell>
                  )}
                  {goal4Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal4Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Мақсат
                    </TableCell>
                  )}
                  {goal4Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal4Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Мақсат
                    </TableCell>
                  )}
                  {goal4Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal4Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Мақсат
                    </TableCell>
                  )}
                  {goal4Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal4Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Мақсат
                    </TableCell>
                  )}
                  {goal4Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal4Open ? (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottom}
                    >
                      Мақсат
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottom}
                    ></TableCell>
                  )}

                  {goal5Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal5Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Мақсат
                    </TableCell>
                  )}
                  {goal5Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal5Open ? (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottom}
                    >
                      Мақсат
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottom}
                    ></TableCell>
                  )}

                  {goal6Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal6Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Мақсат
                    </TableCell>
                  )}
                  {goal6Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal6Open ? (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottom}
                    >
                      Мақсат
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottom}
                    ></TableCell>
                  )}

                  {goal7Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal7Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Мақсат
                    </TableCell>
                  )}
                  {goal7Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal7Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Мақсат
                    </TableCell>
                  )}
                  {goal7Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal7Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Мақсат
                    </TableCell>
                  )}
                  {goal7Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal7Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Мақсат
                    </TableCell>
                  )}
                  {goal7Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal7Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Мақсат
                    </TableCell>
                  )}
                  {goal7Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal7Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Мақсат
                    </TableCell>
                  )}
                  {goal7Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal7Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Мақсат
                    </TableCell>
                  )}
                  {goal7Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal7Open ? (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottom}
                    >
                      Мақсат
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottom}
                    ></TableCell>
                  )}

                  {goal8Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal8Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Мақсат
                    </TableCell>
                  )}
                  {goal8Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal8Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Мақсат
                    </TableCell>
                  )}
                  {goal8Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal8Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Мақсат
                    </TableCell>
                  )}
                  {goal8Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal8Open ? (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottom}
                    >
                      Мақсат
                    </TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottom}
                    ></TableCell>
                  )}

                  {goal9Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal9Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Мақсат
                    </TableCell>
                  )}
                  {goal9Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal9Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Мақсат
                    </TableCell>
                  )}
                  {goal9Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal9Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Мақсат
                    </TableCell>
                  )}
                  {goal9Open && (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottomLight}
                    >
                      Орындалған
                    </TableCell>
                  )}
                  {goal9Open ? (
                    <TableCell align="center">Мақсат</TableCell>
                  ) : (
                    <TableCell
                      align="center"
                      className={classes.TableBorderRightBottom}
                    ></TableCell>
                  )}
                </TableRow>
                {/* <MTableHeader {...compProps} /> */}
              </TableHead>
            );
          },
          // Row: ({ data }) => {
          //   return (
          //     <TableRow>
          //       <TableCell>{data.schoolId}</TableCell>
          //       <TableCell>{data.schoolId}</TableCell>
          //       <TableCell align="center">{data.goal1111_completed}</TableCell>
          //       <TableCell align="center">{data.goal1111_target}</TableCell>
          //       <TableCell align="center">{data.goal1121_completed}</TableCell>
          //       <TableCell align="center">{data.goal1121_target}</TableCell>
          //       <TableCell align="center">{data.goal1211_completed}</TableCell>
          //       <TableCell align="center">{data.goal1211_target}</TableCell>
          //       <TableCell align="center">{data.goal1221_completed}</TableCell>
          //       <TableCell align="center">{data.goal1221_target}</TableCell>

          //       <TableCell align="center">{data.goal2111_completed}</TableCell>
          //       <TableCell align="center">{data.goal2111_target}</TableCell>
          //       <TableCell align="center">{data.goal2121_completed}</TableCell>
          //       <TableCell align="center">{data.goal2121_target}</TableCell>
          //       <TableCell align="center">{data.goal2122_completed}</TableCell>
          //       <TableCell align="center">{data.goal2122_target}</TableCell>

          //       <TableCell align="center">{data.goal3111_completed}</TableCell>
          //       <TableCell align="center">{data.goal3111_target}</TableCell>
          //       <TableCell align="center">{data.goal3121_completed}</TableCell>
          //       <TableCell align="center">{data.goal3121_target}</TableCell>
          //       <TableCell align="center">{data.goal3211_completed}</TableCell>
          //       <TableCell align="center">{data.goal3211_target}</TableCell>
          //       <TableCell align="center">{data.goal3221_completed}</TableCell>
          //       <TableCell align="center">{data.goal3221_target}</TableCell>

          //       <TableCell align="center">{data.goal4111_completed}</TableCell>
          //       <TableCell align="center">{data.goal4111_target}</TableCell>
          //       <TableCell align="center">{data.goal4112_completed}</TableCell>
          //       <TableCell align="center">{data.goal4112_target}</TableCell>
          //       <TableCell align="center">{data.goal4113_completed}</TableCell>
          //       <TableCell align="center">{data.goal4113_target}</TableCell>
          //       <TableCell align="center">{data.goal4121_completed}</TableCell>
          //       <TableCell align="center">{data.goal4121_target}</TableCell>
          //       <TableCell align="center">{data.goal4122_completed}</TableCell>
          //       <TableCell align="center">{data.goal4122_target}</TableCell>
          //       <TableCell align="center">{data.goal4123_completed}</TableCell>
          //       <TableCell align="center">{data.goal4123_target}</TableCell>
          //       <TableCell align="center">{data.goal4211_completed}</TableCell>
          //       <TableCell align="center">{data.goal4211_target}</TableCell>
          //       <TableCell align="center">{data.goal4221_completed}</TableCell>
          //       <TableCell align="center">{data.goal4221_target}</TableCell>

          //       <TableCell align="center">{data.goal5111_completed}</TableCell>
          //       <TableCell align="center">{data.goal5111_target}</TableCell>
          //       <TableCell align="center">{data.goal5121_completed}</TableCell>
          //       <TableCell align="center">{data.goal5121_target}</TableCell>

          //       <TableCell align="center">{data.goal6111_completed}</TableCell>
          //       <TableCell align="center">{data.goal6111_target}</TableCell>
          //       <TableCell align="center">{data.goal6121_completed}</TableCell>
          //       <TableCell align="center">{data.goal6121_target}</TableCell>

          //       <TableCell align="center">{data.goal7111_completed}</TableCell>
          //       <TableCell align="center">{data.goal7111_target}</TableCell>
          //       <TableCell align="center">{data.goal7112_completed}</TableCell>
          //       <TableCell align="center">{data.goal7112_target}</TableCell>
          //       <TableCell align="center">{data.goal7113_completed}</TableCell>
          //       <TableCell align="center">{data.goal7113_target}</TableCell>
          //       <TableCell align="center">{data.goal7114_completed}</TableCell>
          //       <TableCell align="center">{data.goal7114_target}</TableCell>
          //       <TableCell align="center">{data.goal7121_completed}</TableCell>
          //       <TableCell align="center">{data.goal7121_target}</TableCell>
          //       <TableCell align="center">{data.goal7122_completed}</TableCell>
          //       <TableCell align="center">{data.goal7122_target}</TableCell>
          //       <TableCell align="center">{data.goal7123_completed}</TableCell>
          //       <TableCell align="center">{data.goal7123_target}</TableCell>
          //       <TableCell align="center">{data.goal7124_completed}</TableCell>
          //       <TableCell align="center">{data.goal7124_target}</TableCell>

          //       <TableCell align="center">{data.goal8111_completed}</TableCell>
          //       <TableCell align="center">{data.goal8111_target}</TableCell>
          //       <TableCell align="center">{data.goal8121_completed}</TableCell>
          //       <TableCell align="center">{data.goal8121_target}</TableCell>
          //       <TableCell align="center">{data.goal8211_completed}</TableCell>
          //       <TableCell align="center">{data.goal8211_target}</TableCell>
          //       <TableCell align="center">{data.goal8221_completed}</TableCell>
          //       <TableCell align="center">{data.goal8221_target}</TableCell>

          //       <TableCell align="center">{data.goal9111_completed}</TableCell>
          //       <TableCell align="center">{data.goal9111_target}</TableCell>
          //       <TableCell align="center">{data.goal9121_completed}</TableCell>
          //       <TableCell align="center">{data.goal9121_target}</TableCell>
          //       <TableCell align="center">{data.goal9211_completed}</TableCell>
          //       <TableCell align="center">{data.goal9211_target}</TableCell>
          //       <TableCell align="center">{data.goal9221_completed}</TableCell>
          //       <TableCell align="center">{data.goal9221_target}</TableCell>
          //     </TableRow>
          //   );
          // },
        }}
      />
    </div>
  );
};

export default withTracker((props) => {
  const schoolSub = Meteor.subscribe("schools");
  const schools = Schools.find().fetch();

  Meteor.subscribe("adminAcademicGoals", academicYear.get());
  const goals = AcademicGoals.find().fetch();

  return {
    schools,
    goals,
  };
})(Main);
