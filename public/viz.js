/**
 * Tableau API manager file
 */
var viz, sheet, checkedItems = {}, metaData;
window.onload = function() {
  // load data only in the hope path
  var containerDiv = document.getElementById("vizContainer"),
    url = "http://ms240tableau01/t/CI/views/Priyantha-OpportunityFeederforSpecialists/Recommendations",
    options = {
      hideTabs: true,
      hideToolbar: true,
      onFirstInteractive: function () {
        loadData();
        listenToFilterChange();
        listenToParameterValueChange();
      }
    };
  viz = new tableau.Viz(containerDiv, url, options);
}

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

function loadData() {
  sheet = viz.getWorkbook().getActiveSheet().getWorksheets().get("Final Recommendations Table");
  options = {
    maxRows: 0, // Max rows to return. Use 0 to return all rows
    ignoreAliases: false,
    ignoreSelection: true,
  };
  displayLoading("#dataTable");
  sheet.getSummaryDataAsync(options).then(function(table) {
    $.ajax({
      type: "POST",
      url: '/init/data',
      data: {
        data: JSON.stringify(table.getData()),
        name: table.getName(),
        column: JSON.stringify(table.getColumns()),
        dataCount: table.getTotalRowCount(),
      },
      success: function(data, textStatus, jqXHR){
        // console.log(textStatus)
        // console.log(jqXHR)
        renderTable(data);
        displayLoading("#dataTable", true);
      },
      dataType: 'json'
    });
  })
    .otherwise((err)=>{
      console.log(err);
      renderTable({});
      displayLoading("#dataTable", true);
    });
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
  // Assign the Meta data to the global
  metaData = data.metaData;

  let dataTable = $("#dataTable").kendoGrid({
    dataSource: {
      data: data.data,
      schema: {
        model: {
          id: metaData.id,
          fields: _.reduce(data.metaData.fields, function(obj, value, key){
            obj[_.get(value, 'field')] = _.pick(value, ['type']);
            return obj;
          }, {}),
        }
      },
      pageSize: 20
    },
    scrollable: {
      virtual: true
    },
    filterable: true,
    sortable: true,
    pageable: {
      numeric: false,
      previousNext: false,
      messages: {
        display: "Showing {1} of {2} data items"
      }
    },
    columns: _.reduce(metaData.fields, function(obj, value, key){
      obj.push(_.omit(value, ['tableauName', 'type']));
      return obj
    }, [{ template: "<input type='checkbox' class='checkbox' />", width: '30px' }]),
    dataBound: onDataBind,
  }).data("kendoGrid");

  // Allow selecting the row
  dataTable.table.on("click", ".checkbox" , selectRow);
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
  var element = $(target);
  kendo.ui.progress(element, isHide ? !isHide : true);
}
