import XLSX from 'xlsx';

let _workbook = null;
let _worksheet = null;
let _worksheet_name = null;

const column_letter = col => {
  // console.log('column_letter:',col);
  let _t = parseInt(col,10);
  if(_t > 702){
    console.log('column_letter Only supports two digits');
    return null;
  }
  let result = '';
  if(_t > 26){
    const tens = parseInt((_t-1)/26,10);
    result += '0ABCDEFGHIJKLMNOPQRSTUVWXYZ'[tens];
    _t -= (tens*26);
  }
  return result + '0ABCDEFGHIJKLMNOPQRSTUVWXYZ'[_t];
}

const XlsxHelper = {

  create_workbook: array => {
    _workbook = XLSX.utils.book_new();
    _worksheet = XLSX.utils.aoa_to_sheet(array)
    XLSX.utils.book_append_sheet(_workbook, _worksheet, 'Sheet 1');
  },

  download_workbook: filename => {
    XLSX.writeFile(_workbook, filename);
  },

  open: (file, on_open) => {
    const reader = new FileReader();
    reader.onload = function(e) {
      var data = new Uint8Array(e.target.result);
      _workbook = XLSX.read(data, {type: 'array'});
      _worksheet_name = Object.keys(_workbook.Sheets)[0];
      _worksheet = _workbook.Sheets[_worksheet_name]
      on_open(_workbook)
    };
    reader.readAsArrayBuffer(file);
  },

  // read_file: data => {
  //   _workbook = XLSX.read(data, {type: 'array'});
  //   return _workbook;
  // },

  set_workbook: workbook => _workbook = workbook,

  set_worksheet: sheet => {
    _worksheet_name = sheet;
    _worksheet = sheet ? _workbook.Sheets[sheet] : null
  },

  worksheet: () => _worksheet,

  worksheet_name: () => _worksheet_name,

  sheets: () => {
    const sheets = [];
    for (var sheet in _workbook.Sheets) {
      if (_workbook.Sheets.hasOwnProperty(sheet)) {
        sheets.push(sheet)
      }
    }
    return sheets;
  },

  column_count: () => {
    // convert A-Z as a base26 numeric system
    // A-Z = 1-26
    // AA = 27
    let range = _worksheet['!ref'];
    let high_string = range.split(':')[1].replace(/[0-9]/g,'');
    let value = 0;
    for (var i = 0; i < high_string.length; i++) {
      let offset = high_string.length - 1 - i;
      let intermediate = parseInt(high_string[offset], 36)-9;
      value += intermediate * (26**i);
    }
    return value;
  },

  // only supports letters up to ZZ (702)
  column_letter,

  // zero based
  get: (row,col) => {
    const c = parseInt(col,10);
    const r = parseInt(row,10)
    let address = column_letter(c+1) + (r+1);
    return _worksheet[address];
  },

  get_value: (row, col) => {
    const cell = XlsxHelper.get(row,col);
    return cell ? cell.v : undefined;
  },

  row_count:() => {
    let range = _worksheet['!ref'];
    return range.split(':')[1].replace(/[a-zA-Z]*/g,'');
  },

  row: r => {
    const result = []
    for (var i = 0; i < XlsxHelper.column_count(); i++) {
      result.push(XlsxHelper.get_value(r,i));
    }
    return result
  }
}

export default XlsxHelper;
