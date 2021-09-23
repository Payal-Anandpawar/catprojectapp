import React, { useState, useEffect } from "react";
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

const PAGE_INDEX = 1;
const PAGE_SIZE = 10;

function CatListView() {
  const [data, setData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState(null);
  const [selectedCatName, setSelectedCatName] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);

  const getData = async (pageIndex) => {
    CatService.getAllCats({
      pageNumber: pageIndex,
      pageSize: PAGE_SIZE,
      sortBy: "-id",
    }).then((response) => {
      const catData = response?.results;
      setData(catData);
      setPageIndex(pageIndex);
      setHasNextPage(response?.metadata.hasNextPage);
    });
  };

  useEffect(() => {
    getData(PAGE_INDEX);
  }, []);

  const viewDetailsIcon = () => <i className="fa fa-info-circle"></i>;

  const modalCatDetailsOpen = () => {
    setShowDetails(true);
  };

  const modalCatDetailsClose = () => {
    setShowDetails(false);
  };

  const moveToNextPage = () => {
    getData(pageIndex + 1);
  };

  const moveToPrevPage = () => {
    getData(pageIndex - 1);
  };

  const getCatDetails = async (catId) => {
    CatService.getCatbyId(catId)
      .then((response) => {
        setSelectedCatId(response?.id);
        setSelectedCatName(response?.name);
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
      .then(() => {
        toast.success("Cat has been saved successfully.", {
          position: toast.POSITION.TOP_CENTER,
        });
        getData(PAGE_INDEX);
      })
      .catch(() => {
        toast.error("There is some error while adding new cat.", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const deleteData = (oldData) => {
    const catId = oldData?.id;
    CatService.deleteCat(catId)
      .then(() => {
        toast.success("Cat has been deleted successfully.", {
          position: toast.POSITION.TOP_CENTER,
        });
        getData(PAGE_INDEX);
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
          columns={COLUMNS}
          data={data}
          actions={[
            (rowData) => ({
              icon: viewDetailsIcon,
              tooltip: "View Cat Details",
              onClick: (event, rowData) => getCatDetails(rowData.id),
            }),
          ]}
          options={{
            toolbar: true,
            paging: false,
            showTitle: false,
            headerStyle: {
              backgroundColor: "#01579b",
              color: "#FFF",
              fontWeight: "bold",
            },
            actionsCellStyle: {
              width: "40%",
            },
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
        <br />
        <div>
          <nav className="pagination">
            <button
              type="button"
              className="btn btn-primary"
              onClick={moveToPrevPage}
              disabled={pageIndex === 1}
            >
              Previous
            </button>

            <button
              className="btn btn-primary paginationbtn"
              onClick={moveToNextPage}
              disabled={!hasNextPage}
            >
              Next
            </button>
          </nav>
        </div>
        <br />
      </div>

      <div id="show-cat-details-popup">
        <Modal show={showDetails} handleClose={() => modalCatDetailsClose()}>
          <h4 className="font-weight-bold p-3 show-details-header">
            Cat Details
          </h4>
          <hr />
          <div>
            <h6 className="p-3">Id : {selectedCatId}</h6>
            <h6 className="p-3">Name : {selectedCatName}</h6>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default CatListView;
