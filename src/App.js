import React from "react";
import SelectBox from "devextreme-react/select-box";
import {
  Column,
  DataGrid,
  FilterRow,
  HeaderFilter,
  GroupPanel,
  Scrolling,
  Editing
} from "devextreme-react/data-grid";

import { createStore } from "devextreme-aspnet-data-nojquery";

class App extends React.Component {
  constructor(props) {
    const vehicleTypeUrl =
      "https://my-json-server.typicode.com/brian-anderson-iowa/interviewData/vehicleTypes/";

    super(props);

    const dataSource = createStore({
      key: "id",
      loadUrl: `${vehicleTypeUrl}`
    });

    this.data = dataSource;
    this.state = {
      value: null,
      gridDataStore: createStore({
        key: "id",
        loadUrl:
          "https://my-json-server.typicode.com/brian-anderson-iowa/interviewData/vehicles/"
      })
    };
    this.onValueChanged = this.onValueChanged.bind(this);
  }
  onValueChanged(e) {
    this.setState({
      value: e.value,
      gridDataStore: createStore({
        key: "id",
        loadUrl:
          "https://my-json-server.typicode.com/brian-anderson-iowa/interviewData/vehicleTypes/" +
          e.value +
          "/vehicles"
      })
    });
  }
  render() {
    return (
      <div>
        <div className="dx-fieldset">
          <div className="dx-field">
            <div className="dx-field-label">Select a Car Type</div>
            <div className="dx-field-value">
              <SelectBox
                id="custom-templates"
                dataSource={this.data}
                displayExpr="type"
                valueExpr="id"
                value={this.state.value}
                onValueChanged={this.onValueChanged}
              />
            </div>
          </div>
        </div>
        <DataGrid
          dataSource={this.state.gridDataStore}
          showBorders={true}
          height={600}
          remoteOperations={true}
        >
          <FilterRow visible={true} />
          <HeaderFilter visible={true} />
          <GroupPanel visible={true} />
          <Scrolling mode="virtual" />
          <Editing
            mode="row"
            allowAdding={false}
            allowDeleting={false}
            allowUpdating={false}
          />

          <Column dataField="id" caption="Car Id"></Column>

          <Column dataField="make"></Column>
          <Column dataField="model"></Column>
          <Column dataField="color"></Column>
          <Column dataField="year"></Column>

          {/* <Column
          dataField="ShipVia"
          caption="Shipping Company"
          dataType="number"
        >
          <Lookup dataSource={shippersData} valueExpr="Value" displayExpr="Text" />
        </Column> */}
        </DataGrid>
      </div>
    );
  }
}

export default App;
