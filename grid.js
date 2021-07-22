"use strict";

const e = React.createElement;

const domContainer = document.getElementById("root");

const data = [
  { name: "Coffe", expense: "$100", notes: "@Starbucks", type: "electronic" },
  { name: "bicycle", expense: "$101", notes: "@cosco", type: "aaaaaaaa" },
];
const filter = { keyWrod: "cosco", byType: "" };

function render(data, filter) {
  ReactDOM.render(
    <div>
      <AddExpense />
      <br />
      <Search />
      <ExpenseGrid filteredData={getData(data, filter)} />
    </div>,
    domContainer
  );
}
function onSunmitAddExpense(e) {
  e.preventDefault();
  console.log(e);
}

const AddExpense = () => {
  return (
    <form onSubmit={(e) => onSunmitAddExpense(e)}>
      <div style={{}}>
        Add Expense: <br />
        <label for="name">Name:</label>
        <input
          name="name"
          type="text"
          style={{ display: "table", color: "red" }}
        ></input>
        Expense:<input name="expense" type="number"></input>
        Notes:<input name="notes" type="text"></input>
        <input type="submit"></input>
      </div>
    </form>
  );
};

function onSearch(e) {
  console.log(e.target.value);
  filter.byType = e.target.value;
  console.log(filter);
  render(data, filter);
}

const Search = () => {
  return (
    <div style={{ display: "inline-flex" }}>
      <div>SearchByType:</div>
      <input
        onChange={(e) => onSearch(e)}
        style={{ width: "50%", height: "50%" }}
      ></input>
    </div>
  );
};

const ExpenseGrid = (filteredData) => {
  return (
    <div>
      <div className="rTable">
        <div className="rTableHeading">
          <div className="rTableHead">Name</div>
          <div className="rTableHead">Expense</div>
          <div className="rTableHead">Notes</div>
          <div className="rTableHead">Type</div>
        </div>
        {filteredData.filteredData.map((item, index) => (
          <div className="rTableRow">
            <div className="rTableCell">{item.name}</div>
            <div className="rTableCell">{item.expense}</div>
            <div className="rTableCell">{item.notes}</div>
            <div className="rTableCell">{item.type}</div>
            <div className="rTableCell" onClick={() => editExpense(item)}>
              Edit
            </div>
            <div className="rTableCell" onClick={() => deleteExpense(item)}>
              Delete
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getData = (data, filter) => {
  return data
    .filter((item) => {
      let dataByType = item.type.toLowerCase().includes(filter.byType);
      return dataByType;
    })
    .sort((a, b) => {
      let aName = a.name.toLowerCase(),
        bName = b.name.toLowerCase();
      if (aName < bName) return -1;
      if (aName > bName) return 1;
      return 0;
    });
};

render(data, filter);
