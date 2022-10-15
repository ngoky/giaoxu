import { Add } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Tables from "../../../../components/Tables";
import "./index.scss";

function createData(id, name, calories, fat, carbs, protein) {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const createList = () => {
  const list = [];
  for (let i = 0; i < 22; i += 1) {
    list.push(createData(i + 1, `Oreo ${i}`, 437 * i, 18.0 / i, 63, 4.0));
  }
  return list;
};

const headCellsDefault = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Dessert (100g serving)",
  },
  {
    id: "calories",
    numeric: true,
    disablePadding: false,
    label: "Calories",
  },
  {
    id: "fat",
    numeric: true,
    disablePadding: false,
    label: "Fat (g)",
  },
  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "Carbs (g)",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "Protein (g)",
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EnhancedTable(props) {
  const { rows = createList() } = props;
  const navigate = useNavigate();
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  console.log("render");
  return (
    <div className="NewsTable">
      <Tables rows={rows} headCells={headCellsDefault} />
      <Fab
        color="secondary"
        style={{
          margin: 0,
          top: "auto",
          right: 20,
          bottom: 20,
          left: "auto",
          position: "fixed",
        }}
        onClick={() => navigate("add")}
        aria-label="add"
      >
        <Add />
      </Fab>
    </div>
  );
}
