import {
  createTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
} from "@mui/material";
import React, { useState } from "react";
import style from "./SearchForm.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SearchInput } from "../../Common/SearchInput/SearchInput";
import { useSelector } from "react-redux";

const theme = createTheme({
  palette: {
    primary: {
      main: "#757575",
      primary: "#A3A3A3",
    },
  },
  typography: {
    fontFamily: `"Tahoma", "Verdana", sans-serif`,
    fontWeightRegular: 400,
    fontWeightBold: 700,
    fontSize: 16,
    textTransform: "none",
  },
});

const SearchForm = ({searchMedicalCares, sendDataToParent}) => {
  const [selectedPaid, setSelectedPaid] = useState(false);
  const [paid, setPaid] = useState('');
  const [doctor, setDoctor] = useState('');
  const [department, setDepartment] = useState('');

  const handlePaidChange = (event) => {
    const value = event.target.value;
    setPaid(value);
    setSelectedPaid(value);
    sendDataToParent({ paid: value, doctor, department });
  };
  const handleDoctorChange = (event) => {
    const value = event.target.value;
    setDoctor(value);
    sendDataToParent({ paid, doctor: value, department });
  };
  const handleDepartmentChange = (event) => {
    const value = event.target.value;
    setDepartment(value);
    sendDataToParent({ paid, doctor, department: value });
  };

  const employeeId = useSelector((state) => state.employee.employeeList);
  const departamentId = useSelector((state) => state.employee.departentsList);

  return (
    <ThemeProvider theme={theme}>
      <form
        className={style.searchForm}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <SearchInput
          placeholder={"Поиск услуги..."}
          onClick={searchMedicalCares}
        />
        <div className={style.searchForm__controls}>
          <FormControl sx={{ width: "154px" }}>
            <InputLabel sx={{ textAlign: "center" }} id="paid">
              Платно/ОМС
            </InputLabel>
            <Select
              IconComponent={ExpandMoreIcon}
              labelId="paid-label"
              id="paid"
              label="Платно/ОМС"
              onChange={handlePaidChange}
            >
              <MenuItem value={"oms=false"}>Платно</MenuItem>
              <MenuItem value={"oms=true"}>ОМС</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            sx={{ width: { xs: "154px", md: "255px" }, height: "44px" }}
          >
            <InputLabel id="doctor-label">Врач</InputLabel>
            <Select
              disabled={!selectedPaid}
              IconComponent={ExpandMoreIcon}
              labelId="doctor-label"
              id="doctor"
              label="doctor"
              onChange={handleDoctorChange}
            >
              {employeeId.map((item) => (
                <MenuItem value={item.idEmployee}>{item.idEmployee}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            sx={{
              width: { xs: "343px", md: "255px" },
              height: "44px",
              mt: { xs: "10px", md: "0" },
              mb: { xs: "10px" },
            }}
          >
            <InputLabel id="demo-simple-select-label">Отделение</InputLabel>
            <Select
              disabled={!selectedPaid}
              IconComponent={ExpandMoreIcon}
              labelId="departament-label"
              id="departament"
              label="departamentС"
              onChange={handleDepartmentChange}
            >
              {departamentId.map((item) => (
                <MenuItem value={item.idDepartment}>
                  {item.idDepartment}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {selectedPaid === "oms=true" && (
          <div className={style.searchForm__oms}>
            Для посещение услуг <span className={style.bold}>ОМС</span> Вам
            требуется <span className={style.bold}>направление</span>.
          </div>
        )}
        {paid.length === 0 && (
          <div className={style.searchForm__help}>
            Для поиска услуги введите название или используйте фильтрацию.
          </div>
        )}
      </form>
    </ThemeProvider>
  );
};

export default SearchForm;
