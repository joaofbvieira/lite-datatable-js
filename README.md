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

- `recordsPerPage`  (int)  (Set the number of lines per page. DEFAULT 10)
- `optionsRecordsPerPage`  (int[])  (Set the options to select of lines per page. DEFAULT [10, 50, 100])
- `captionLabelRecordsPerPage`  (string)  (Set the caption to label of select of lines per page. DEFAULT 'Records per page:')
- `captionSearchInput`  (string)  (Set the placeholder to input search text. DEFAULT 'Search')
- `captionButtonFirstPage`  (string)  (Set the caption to button of first page. DEFAULT '<<')
- `captionButtonPreviousPage`  (string)  (Set the caption to button of previous page. DEFAULT '<')
- `captionButtonNextPage`  (string)  (Set the caption to button of next page. DEFAULT '>')
- `captionButtonLastPage`  (string)  (Set the caption to button of last page. DEFAULT '>>')
- `showRecordsPerPage`  (boolean)  (Set the visibility of configuration of lines per page. DEFAULT true)
- `showSearchInput`  (boolean)  (Set the visibility of input search. DEFAULT true)
- `cssClassForRecordsPerPageContainer`  (string)  (Set the CSS class to div container of records per page. DEFAULT '')
- `cssClassForLabelRecordsPerPage`  (string)  (Set the CSS class to label of records per page. DEFAULT '')
- `cssClassForSelectRecordsPerPage`  (string)  (Set the CSS class to select field of records per page. DEFAULT '')
- `cssClassForSearchTextContainer`  (string)  (Set the CSS class to div container of input search. DEFAULT '')
- `cssClassForInputSearch`  (string)  (Set the CSS class to input of search text. DEFAULT '')
- `cssClassForContainerTopFields`  (string)  (Set the CSS class to div container for TOP elements (records per page and input search). DEFAULT '')
- `cssClassForContainerBottomFields`  (string)  (Set the CSS class to div container for BOTTOM elements (buttons for pagination). DEFAULT '')
- `cssClassForButtonFirstPage`  (string)  (Set the CSS class to button First Page. DEFAULT '')
- `cssClassForButtonPreviousPage`  (string)  (Set the CSS class to button Previous Page. DEFAULT '')
- `cssClassForButtonNextPage`  (string)  (Set the CSS class to button Next Page. DEFAULT '')
- `cssClassForButtonLastPage`  (string)  (Set the CSS class to button Last Page. DEFAULT '')
- `cssClassForSpanCurrentPage`  (string)  (Set the CSS class to span that displays current page and total of pages. DEFAULT '')


## License

Copyright (c) 2018 João Pedro Vieira.
