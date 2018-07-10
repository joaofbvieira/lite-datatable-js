lite-datatable-js
=============


lite-datatable-js - A light-weight javascript lib to "power-up" a HTML table.
-------------------------------------------------------------------------------


**Notable Features**
   - Paging in HTML tables.

   - Configure the number of records per page.

   - Search input.
   
   - Fully customizable by adding css classes.


## Requirements
jQuery.1.4+


## Desktop Browser Support
IE9+, Firefox 4+, Chrome, Safari 4+, Opera 11+ (Other browsers may work, but I did not test on them)


## Forking
If you find that you need a feature that LiteDataTable does not currently support, either let me know via the LiteDataTable issue tracker.

## Usage

*To just go with the default options simply do*

```javascript
 $(document).ready(function () {
	var liteDataTable = new LiteDataTable();
	liteDataTable.init({
		table: $('YOUR-TABLE-SELECTOR')
	});
 });
```

*To provide optional settings, simply pass settings object to init function of LiteDataTable()*

```javascript
 $(document).ready(function () {
	var liteDataTable = new LiteDataTable();
	liteDataTable.init({
		table: $('YOUR-TABLE-SELECTOR'),
		recordsPerPage: 5,
		showSearchInput: false
	});
 });
```

**Settings**

- `recordsPerPage`  (Set the number of lines per page. Type INT. DEFAULT 10)
- `optionsRecordsPerPage`  (Set the options to select of lines per page. Type INT[]. DEFAULT [10, 50, 100])
- `captionLabelRecordsPerPage`  (Set the caption to label of select of lines per page. Type STRING. DEFAULT 'Records per page:')
- `captionSearchInput`  (Set the placeholder to input search text. Type STRING. DEFAULT 'Search')
- `captionButtonFirstPage`  (Set the caption to button of first page. Type STRING. DEFAULT '<<')
- `captionButtonPreviousPage`  (Set the caption to button of previous page. Type STRING. DEFAULT '<')
- `captionButtonNextPage`  (Set the caption to button of next page. Type STRING. DEFAULT '>')
- `captionButtonLastPage`  (Set the caption to button of last page. Type STRING. DEFAULT '>>')
- `showRecordsPerPage`  (Set the visibility of configuration of lines per page. Type BOOL. DEFAULT true)
- `showSearchInput`  (Set the visibility of input search. Type BOOL. DEFAULT true)
- `cssClassForRecordsPerPageContainer`  (Set the CSS class to div container of records per page. Type STRING. DEFAULT '')
- `cssClassForLabelRecordsPerPage`  (Set the CSS class to label of records per page. Type STRING. DEFAULT '')
- `cssClassForSelectRecordsPerPage`  (Set the CSS class to select field of records per page. Type STRING. DEFAULT '')
- `cssClassForSearchTextContainer`  (Set the CSS class to div container of input search. Type STRING. DEFAULT '')
- `cssClassForInputSearch`  (Set the CSS class to input of search text. Type STRING. DEFAULT '')
- `cssClassForContainerTopFields`  (Set the CSS class to div container for TOP elements (records per page and input search). Type STRING. DEFAULT '')
- `cssClassForContainerBottomFields`  (Set the CSS class to div container for BOTTOM elements (buttons for pagination). Type STRING. DEFAULT '')
- `cssClassForButtonFirstPage`  (Set the CSS class to button First Page. Type STRING. DEFAULT '')
- `cssClassForButtonPreviousPage`  (Set the CSS class to button Previous Page. Type STRING. DEFAULT '')
- `cssClassForButtonNextPage`  (Set the CSS class to button Next Page. Type STRING. DEFAULT '')
- `cssClassForButtonLastPage`  (Set the CSS class to button Last Page. Type STRING. DEFAULT '')
- `cssClassForSpanCurrentPage`  (Set the CSS class to span that displays current page and total of pages. Type STRING. DEFAULT '')


## License

Copyright (c) 2018 João Pedro Vieira.
