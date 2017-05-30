import { get, set, keys, reduce, isUndefined, pick } from 'lodash';

// ref. http://docs.telerik.com/kendo-ui/api/javascript/ui/grid
const metaData = {
  id: 'accountID',
  fields : {
    'Account ID': {
      field: 'accountID',
      tableauName: 'Account ID',
      title: 'Account ID',
      type: 'string',
      sortable: false,
    },
    'District': {
      field: 'district',
      tableauName: 'District',
      title: 'District',
      type: 'string',
    },
    'Marketing Associate': {
      field: 'marketingAssociate',
      tableauName: 'Marketing Associate',
      title: 'Marketing Associate',
      type: 'string',
    },
    'Account Type': {
      field: 'accountType',
      tableauName: 'Account Type',
      title: 'Account Type',
      type: 'string',
    },
    Company: {
      field: 'company',
      tableauName: 'Company',
      title: 'Company',
      type: 'string',
    },
    'Customer City': {
      field: 'customerCity',
      tableauName: 'Customer City',
      title: 'Customer City',
      type: 'string',
    },
    'Cuisine Type': {
      field: 'cuisineType',
      tableauName: 'Cuisine Type',
      title: 'Cuisine Type',
      type: 'string',
    },

    /*'Reco.IC 1': {
     field: 'recoIC1',
     tableauName: 'Reco.IC 1',
     title: 'Reco.IC 1',
     type: 'string',
     },
     'Reco.IC 2': {
     field: 'recoIC2',
     tableauName: 'Reco.IC 2',
     title: 'Reco.IC 2',
     type: 'string',
     },
     'Reco.IC 3': {
     field: 'recoIC3',
     tableauName: 'Reco.IC 3',
     title: 'Reco.IC 3',
     type: 'string',
     },
     'Reco.IC 4': {
     field: 'recoIC4',
     tableauName: 'Reco.IC 4',
     title: 'Reco.IC 4',
     type: 'string',
     },
     'Reco.IC 5': {
     field: 'recoIC5',
     tableauName: 'Reco.IC 5',
     title: 'Reco.IC 5',
     type: 'string',
     },
     'Medal Status': {
     field: 'medalStatus',
     tableauName: 'Medal Status',
     title: 'Medal Status',
     type: 'string',
     },
     'Priority': {
     field: 'priority',
     tableauName: 'Priority',
     title: 'Priority',
     type: 'string',
     },
     'Last Invoice Date':{
     field: 'lastInvoiceDate',
     tableauName: 'Last Invoice Date',
     title: 'Last Invoice Date',
     type: 'date',
     format: "{0: MM-dd-yyyy}"
     },
     'Average Weekly Sales': {
     field: 'averageWeeklySales',
     tableauName: 'Average Weekly Sales',
     title: 'Average Weekly Sales',
     type: 'number',
     },
     'SUM(Meat)': {
     field: 'meat',
     tableauName: 'SUM(Meat)',
     title: 'Meat',
     type: 'number',
     },
     'SUM(Seafood)': {
     field: 'seafood',
     tableauName: 'SUM(Seafood)',
     title: 'Seafood',
     type: 'number',
     },
     'SUM(Poultry)': {
     field: 'poultry',
     tableauName: 'SUM(Poultry)',
     title: 'Poultry',
     type: 'number',
     },
     'SUM(Produce)': {
     field: 'produce',
     tableauName: 'SUM(Produce)',
     title: 'Produce',
     type: 'number',
     },
     'SUM(All Other)': {
     field: 'allOther',
     tableauName: 'SUM(All Other)',
     title: 'All Other',
     type: 'number',
     },*/
  }
};

class FinalRecommendationTable {
  constructor() {
    this.data = null;
    this.columns = null;
  }

  /**
   * Process the data
   */
  getFormattedData() {
    let data = this.data.map((row) => {
      let d = {};
      row.map((col, j) => {
        let confData = get(metaData.fields, get(this.columns, `${j}.$0.$1`));
        if (!isUndefined(confData)) {
          set(d, confData.field, get(col, 'formattedValue'))
        };
      });
      return d;
    });
    return data;
  }

  getMetadata () {
    return metaData;
  }

}
export default FinalRecommendationTable;
