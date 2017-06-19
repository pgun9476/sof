/**
 * Tableau API manager file
 */
let viz = null;
let sheet = null;
const checkedItems = {};
let config = null;
let containerDiv = null;
let dashboardUrl = null;
let vizOptions = null;
let tableData = null;

function listenToFilterChange() {
  viz.addEventListener(tableau.TableauEventName.FILTER_CHANGE, onFilterChange);
}

function listenToParameterValueChange() {
  viz.addEventListener(tableau.TableauEventName.PARAMETER_VALUE_CHANGE, onParameterValueChange);
}

function onFilterChange(e) {
  e.getFilterAsync()
    .then(function(){
      destroyTable();
      loadData();
    })
}

function onParameterValueChange(e) {
  e.getParameterAsync().then(function(){
    destroyTable();
    loadData();
  })
}

function destroyTable() {
  let grid = $("#dataTable").data("kendoGrid");
  grid.destroy();
  $("#dataTable").empty();
}

/**
 *
 {
  data: {},
  metaData: {},
 }
 * @param data
 */
function renderTable(data) {

  let dataTable = $("#dataTable").kendoGrid({
    dataSource: {
      data: data.data,
      schema: {
        model: {
          id: data.metaData.id,
          fields: _.reduce(data.metaData.fields, function(obj, value, key){
            obj[_.get(value, 'field')] = _.pick(value, ['type']);
            return obj;
          }, {}),
        },
      },
      pageSize: 20,
    },
    scrollable: {
      virtual: true,
    },
    filterable: true,
    sortable: true,
    pageable: {
      numeric: false,
      previousNext: false,
      messages: {
        display: 'Showing {1} of {2} data items',
      },
    },
    columns: _.reduce(data.metaData.fields, function(obj, value, key){
      obj.push(_.omit(value, ['tableauName', 'type', 'displayAsSelected']));
      return obj
    }, [{ template: "<input type='checkbox' class='checkbox' />", width: '30px' }]),
    dataBound: onDataBind,
  }).data("kendoGrid");

  // Allow selecting the row
  dataTable.table.on("click", ".checkbox" , selectRow);
}

function loadData() {
  sheet = viz.getWorkbook().getActiveSheet().getWorksheets().get(_.get(config, 'tableau.dashboardContactTable'));
  const options = {
    maxRows: 100, // Max rows to return. Use 0 to return all rows
    ignoreAliases: false,
    ignoreSelection: true,
  };

  displayLoading('#dataTable');

  sheet.getSummaryDataAsync(options).then(function(table) {

    console.log(JSON.stringify(table.getData()))

    $.ajax({
      type: 'POST',
      url: '/api/tableau/init/data',
      data: {
        data: JSON.stringify(table.getData()),
        name: table.getName(),
        column: JSON.stringify(table.getColumns()),
        dataCount: table.getTotalRowCount(),
      },
      success: (data) => {
        tableData = data;
        renderTable(data);
        displayLoading('#dataTable', true);
      },
      dataType: 'json',
    });
  })
    .otherwise((err) => {
      console.log(err);
      renderTable({});
      displayLoading("#dataTable", true);
    });
}



function selectRow() {
  let checked = this.checked,
  row = $(this).closest("tr"),
  grid = $("#dataTable").data("kendoGrid"),
  dataItem = grid.dataItem(row);
  if (checked) {
    checkedItems[dataItem.id]= dataItem;
  } else {
    delete checkedItems[dataItem.id];
  }
}

function onDataBind() {
  var view = this.dataSource.view();
  for(var i = 0; i < view.length;i++){
    if(checkedItems[view[i].id]){
      this.tbody.find("tr[data-uid='" + view[i].uid + "']")
        .find(".checkbox")
        .attr("checked","checked");
    }
  }
}

function displayLoading(target, isHide) {
  kendo.ui.progress($(target), isHide ? !isHide : true);
}

function arrangeScreen() {
  $('#displaySelected').show();
  $('#exportTo360').show();
  $('#sendAnEmail').show();
}

function displaySelected(selectedData, tableMetadata) {

  $("#selectedContactsTable").empty();
  let selectedContactsTable = $("#selectedContactsTable").kendoGrid({
    dataSource: {
      data: _.map(selectedData, (data) => data),
      schema: {
        model: {
          id: 'accountID',
          fields: _.reduce(tableMetadata.fields, function(obj, value, key){
            obj[_.get(value, 'field')] = _.pick(value, ['type']);
            return obj;
          }, {}),
        },
      },
      pageSize: 0,
    },
    scrollable: {
      virtual: true,
    },
    filterable: true,
    sortable: true,
    pageable: false,
    columns: _.reduce(tableMetadata.fields, function(obj, value, key){
      obj.push(_.omit(value, ['tableauName', 'type', 'displayAsSelected']));
      return obj
    }, []),
  }).data("kendoGridSelectContacts");

  $( "#selectedContactsModal" ).dialog( "open" );
}

$(document).ready(function(){

  $( "#selectedContactsModal" ).dialog({
    autoOpen: false,
    show: {
      effect: "blind",
      duration: 500
    },
    hide: {
      effect: "blind",
      duration: 100
    }
  });


  // Event binding
  $('#displaySelected').bind('click', () => {
    displaySelected(checkedItems, tableData.metaDataForSelectedTable);
  });
});


window.onload = () => {
  // if route is not dashboard do not load the viz
  if (window.location.pathname !== '/dashboard') { return true; }

  $.ajax({
    type: 'GET',
    url: '/api/common/client-config',
    success: (data) => {
      config = data;
      // load data only in the hope path
      containerDiv = document.getElementById('vizContainer');
      dashboardUrl = _.get(config, 'tableau.dashboardUrl');
      vizOptions = {
        hideTabs: true,
        hideToolbar: true,
        onFirstInteractive: () => {
          arrangeScreen();
          loadData();
          listenToFilterChange();
          listenToParameterValueChange();
        },
      };
      try {
        viz = new tableau.Viz(containerDiv, dashboardUrl, vizOptions);
      } catch(e) {
        console.log(e);
      }
    },
    error: (err) => {
      console.log(err);
    },
    dataType: 'json',
  });
  return true;
}


