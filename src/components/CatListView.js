import React, { useState } from "react";
import MaterialTable from "material-table";
import CatService from "../services/CatService";
import { deepTrim } from "../utils/objectUtils";
import Modal from "./Modal";
import "../customcss/style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const COLUMNS = [
  { title: "ID", field: "id", hidden: true },
  {
    title: "Cat Name",
    field: "name",
  },
];

function CatListView() {
  const [data, setData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState(null);
  const [selectedCatName, setSelectedCatName] = useState(null);
  const [selectedCatCTime, setSelectedCatCTime] = useState(null);
  const tableRef = React.createRef();

  const getData = async () => {
    tableRef.current && tableRef.current.onQueryChange();
  };

  const viewDetailsIcon = () => <i className="fa fa-info-circle"></i>;

  const modalCatDetailsOpen = () => {
    setShowDetails(true);
  };

  const modalCatDetailsClose = () => {
    setShowDetails(false);
  };

  const getCatDetails = async (catId) => {
    await CatService.getCatbyId(catId)
      .then((response) => {
        setSelectedCatId(response?.id);
        setSelectedCatName(response?.name);
        const date = new Date(response?.ctime);
        setSelectedCatCTime(String(date));
        modalCatDetailsOpen();
      })
      .catch(() => {
        toast.error("There is some error while getting cat details.", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const saveData = (newData) => {
    if (newData.name === undefined) {
      toast.error("Please enter Cat name.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    } else if (newData.name.trim() === "") {
      toast.error("Please enter Cat name.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const newCatData = deepTrim(newData);

    CatService.createCat(newCatData)
      .then((response) => {
        const dataToAdd = [...data];
        dataToAdd.push(newCatData);
        setData(dataToAdd);
        toast.success(
          <span>
            Cat <b>{response.name}</b> has been saved successfully.
          </span>,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
        getData();
      })
      .catch(() => {
        toast.error("There is some error while adding new cat.", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const deleteData = (oldData) => {
    const catId = oldData.id;
    CatService.deleteCat(catId)
      .then(() => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        toast.success("Cat has been deleted successfully.", {
          position: toast.POSITION.TOP_CENTER,
        });
        getData();
      })
      .catch(() => {
        toast.error("There is some error while deleting cat.", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  return (
    <>
      <div className="col=md-12 container">
        <h3 className="cat-header">List of Cats</h3>
        <hr />
        <br />
        <MaterialTable
          title="List of Cats"
          fontWeight="fontWeightBold"
          tableRef={tableRef}
          columns={COLUMNS}
          data={(query) =>
            new Promise((resolve, reject) => {
              let url = "http://localhost:10000/v1/cats?";
              if (query.search) {
                url += `name=${query.search}&`;
              }
              if (query.orderBy) {
                const order = query.orderDirection === "asc" ? "" : "-";
                url += `sort_by=${order}${query.orderBy.field}&`;
              }
              if (query.filters.length) {
                const filter = query.filters.map((filter) => {
                  return `${filter.column.field}${filter.operator}${filter.value}&`;
                });
                url += filter.join("");
              }
              url += "page_number=" + (query.page + 1);
              url += "&page_size=" + query.pageSize;
              CatService.getAllCats(url).then((result) => {
                const catList = result;
                CatService.getCatsCount().then((response) => {
                  resolve({
                    data: catList,
                    page: query.page,
                    totalCount: response,
                  });
                });
              });
            })
          }
          actions={[
            (rowData) => ({
              icon: viewDetailsIcon,
              tooltip: "View Cat Details",
              onClick: (event, rowData) => getCatDetails(rowData.id),
            }),
            {
              icon: "refresh",
              tooltip: "Refresh Data",
              isFreeAction: true,
              onClick: () =>
                tableRef.current && tableRef.current.onQueryChange(),
            },
          ]}
          options={{
            pageSize: 5,
            pageSizeOptions: [5, 10, 20, 30],
            toolbar: true,
            paging: true,
            showTitle: false,
            headerStyle: {
              backgroundColor: "#01579b",
              color: "#FFF",
              fontWeight: "bold",
            },
            actionsCellStyle: {
              width: "40%",
            },
            debounceInterval: 1000,
            filtering: true,
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                saveData(newData, resolve);
                resolve();
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                deleteData(oldData);
                resolve();
              }),
          }}
        />
      </div>

      <div id="show-cat-details-popup">
        <Modal show={showDetails} handleClose={() => modalCatDetailsClose()}>
          <h4
            className="font-weight-bold p-3"
            style={{
              color: "#01579b",
              fontWeight: "bold",
            }}
          >
            Cat Details
          </h4>
          <hr />
          <div>
            <h6 className="p-3">Id : {selectedCatId}</h6>
            <h6 className="p-3">Name : {selectedCatName}</h6>
            <h6 className="p-3">Created Time : {selectedCatCTime}</h6>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default CatListView;
