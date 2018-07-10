/**
 * Lite Datatable 1.0
 * https://github.com/joaofbvieira/lite-datatable-js
 * Copyright (c) 2018 João Pedro Vieira
 * 
 * Requirements:
 *      jquery.1.4+
 * 
 * Usage:
 *      var liteDataTable = new LiteDataTable();
 *      liteDataTable.init({
 *          table: $('YOUR-TABLE-SELECTOR')
 *      });
 * 
 * Optional configuration:
 *      recordsPerPage : (Set the number of lines per page. Type INT. DEFAULT 10)
 *      optionsRecordsPerPage : (Set the options to select of lines per page. Type INT[]. DEFAULT [10, 50, 100])
 *      captionLabelRecordsPerPage : (Set the caption to label of select of lines per page. Type STRING. DEFAULT 'Records per page:')
 *      captionSearchInput : (Set the placeholder to input search text. Type STRING. DEFAULT 'Search')
 *      captionButtonFirstPage : (Set the caption to button of first page. Type STRING. DEFAULT '<<')
 *      captionButtonPreviousPage : (Set the caption to button of previous page. Type STRING. DEFAULT '<')
 *      captionButtonNextPage : (Set the caption to button of next page. Type STRING. DEFAULT '>')
 *      captionButtonLastPage : (Set the caption to button of last page. Type STRING. DEFAULT '>>')
 *      showRecordsPerPage : (Set the visibility of configuration of lines per page. Type BOOL. DEFAULT true)
 *      showSearchInput : (Set the visibility of input search. Type BOOL. DEFAULT true)
 *      cssClassForRecordsPerPageContainer : (Set the CSS class to div container of records per page. Type STRING. DEFAULT '')
 *      cssClassForLabelRecordsPerPage : (Set the CSS class to label of records per page. Type STRING. DEFAULT '')
 *      cssClassForSelectRecordsPerPage : (Set the CSS class to select field of records per page. Type STRING. DEFAULT '')
 *      cssClassForSearchTextContainer : (Set the CSS class to div container of input search. Type STRING. DEFAULT '')
 *      cssClassForInputSearch : (Set the CSS class to input of search text. Type STRING. DEFAULT '')
 *      cssClassForContainerTopFields : (Set the CSS class to div container for TOP elements (records per page and input search). Type STRING. DEFAULT '')
 *      cssClassForContainerBottomFields : (Set the CSS class to div container for BOTTOM elements (buttons for pagination). Type STRING. DEFAULT '')
 *      cssClassForButtonFirstPage : (Set the CSS class to button First Page. Type STRING. DEFAULT '')
 *      cssClassForButtonPreviousPage : (Set the CSS class to button Previous Page. Type STRING. DEFAULT '')
 *      cssClassForButtonNextPage : (Set the CSS class to button Next Page. Type STRING. DEFAULT '')
 *      cssClassForButtonLastPage : (Set the CSS class to button Last Page. Type STRING. DEFAULT '')
 *      cssClassForSpanCurrentPage : (Set the CSS class to span that displays current page and total of pages. Type STRING. DEFAULT '')
 */

function LiteDataTable() {
    this.table = null;
    this.numberOfRecords = 0;
    this.numberOfPages = 0;
    this.recordsPerPage = 0;
    this.currentPage = 1;
    this.searchText = '';
    this.uniqueId = '';
    this.firstPageClass = '';
    this.previousPageClass = '';
    this.currentPageClass = '';
    this.nextPageClass = '';
    this.lastPageClass = '';
    this.selectRecordsPerPageClass = '';
    this.searchTextClass = '';
    this.tableLinesClass = '';
    this.linesToRender = null;
    this.optionsRecordsPerPage = 0;
    this.searchText_isWaiting = false;
    this.searchText_currentTimeout = null;
    this.currentSearchText = '';
    this.captionLabelRecordsPerPage = '';
    this.captionSearchInput = '';
    this.captionButtonFirstPage = '';
    this.captionButtonPreviousPage = '';
    this.captionButtonNextPage = '';
    this.captionButtonLastPage = '';
    this.showRecordsPerPage = true;
    this.showSearchInput = true;
    this.cssClassForRecordsPerPageContainer = '';
    this.cssClassForSearchTextContainer = '';
    this.cssClassForContainerTopFields = '';
    this.cssClassForContainerBottomFields = '';
    this.cssClassForButtonFirstPage = '';
    this.cssClassForButtonPreviousPage = '';
    this.cssClassForButtonNextPage = '';
    this.cssClassForButtonLastPage = '';
    this.cssClassForSpanCurrentPage = '';
    this.cssClassForInputSearch = '';
    this.cssClassForSelectRecordsPerPage = '';
    this.cssClassForLabelRecordsPerPage = '';
}

LiteDataTable.prototype.init = (function (dataParam) {
    this.loadParameters(dataParam);
    this.generateAndSetUniqueId();
    this.configureTableLines();
    this.applyFilterToTableLines();
    this.calculatePagesAndRecords();
    this.render();
});

LiteDataTable.prototype.loadParameters = (function (config) {
    this.table = config.table;

    if (config.recordsPerPage){
        this.recordsPerPage = config.recordsPerPage;
    }
    else {
        this.recordsPerPage = 10;
    }

    if (config.optionsRecordsPerPage){
        this.optionsRecordsPerPage = config.optionsRecordsPerPage;
    }
    else {
        this.optionsRecordsPerPage = [10, 50, 100];
    }
    if (this.optionsRecordsPerPage.indexOf(this.recordsPerPage) < 0) {
        this.optionsRecordsPerPage.push(this.recordsPerPage);
    }

    if (config.captionLabelRecordsPerPage){
        this.captionLabelRecordsPerPage = config.captionLabelRecordsPerPage;
    }
    else {
        this.captionLabelRecordsPerPage = 'Records per page:';
    }

    if (config.captionSearchInput){
        this.captionSearchInput = config.captionSearchInput;
    }
    else {
        this.captionSearchInput = 'Search';
    }

    if (config.captionButtonFirstPage){
        this.captionButtonFirstPage = config.captionButtonFirstPage;
    }
    else {
        this.captionButtonFirstPage = '<<';
    }

    if (config.captionButtonPreviousPage){
        this.captionButtonPreviousPage = config.captionButtonPreviousPage;
    }
    else {
        this.captionButtonPreviousPage = '<';
    }

    if (config.captionButtonNextPage){
        this.captionButtonNextPage = config.captionButtonNextPage;
    }
    else {
        this.captionButtonNextPage = '>';
    }

    if (config.captionButtonLastPage){
        this.captionButtonLastPage = config.captionButtonLastPage;
    }
    else {
        this.captionButtonLastPage = '>>';
    }

    if (config.showRecordsPerPage != undefined){
        this.showRecordsPerPage = config.showRecordsPerPage;
    }
    else {
        this.showRecordsPerPage = true;
    }

    if (config.showSearchInput != undefined){
        this.showSearchInput = config.showSearchInput;
    }
    else {
        this.showSearchInput = true;
    }

    if (config.cssClassForRecordsPerPageContainer){
        this.cssClassForRecordsPerPageContainer = config.cssClassForRecordsPerPageContainer;
    }
    else {
        this.cssClassForRecordsPerPageContainer = '';
    }

    if (config.cssClassForSearchTextContainer){
        this.cssClassForSearchTextContainer = config.cssClassForSearchTextContainer;
    }
    else {
        this.cssClassForSearchTextContainer = '';
    }

    if (config.cssClassForLabelRecordsPerPage){
        this.cssClassForLabelRecordsPerPage = config.cssClassForLabelRecordsPerPage;
    }
    else {
        this.cssClassForLabelRecordsPerPage = '';
    }

    if (config.cssClassForSelectRecordsPerPage){
        this.cssClassForSelectRecordsPerPage = config.cssClassForSelectRecordsPerPage;
    }
    else {
        this.cssClassForSelectRecordsPerPage = '';
    }

    if (config.cssClassForInputSearch){
        this.cssClassForInputSearch = config.cssClassForInputSearch;
    }
    else {
        this.cssClassForInputSearch = '';
    }

    if (config.cssClassForContainerTopFields){
        this.cssClassForContainerTopFields = config.cssClassForContainerTopFields;
    }
    else {
        this.cssClassForContainerTopFields = '';
    }

    if (config.cssClassForContainerBottomFields){
        this.cssClassForContainerBottomFields = config.cssClassForContainerBottomFields;
    }
    else {
        this.cssClassForContainerBottomFields = '';
    }

    if (config.cssClassForButtonFirstPage){
        this.cssClassForButtonFirstPage = config.cssClassForButtonFirstPage;
    }
    else {
        this.cssClassForButtonFirstPage = '';
    }

    if (config.cssClassForButtonPreviousPage){
        this.cssClassForButtonPreviousPage = config.cssClassForButtonPreviousPage;
    }
    else {
        this.cssClassForButtonPreviousPage = '';
    }

    if (config.cssClassForButtonNextPage){
        this.cssClassForButtonNextPage = config.cssClassForButtonNextPage;
    }
    else {
        this.cssClassForButtonNextPage = '';
    }

    if (config.cssClassForButtonLastPage){
        this.cssClassForButtonLastPage = config.cssClassForButtonLastPage;
    }
    else {
        this.cssClassForButtonLastPage = '';
    }

    if (config.cssClassForSpanCurrentPage){
        this.cssClassForSpanCurrentPage = config.cssClassForSpanCurrentPage;
    }
    else {
        this.cssClassForSpanCurrentPage = '';
    }
});

LiteDataTable.prototype.render = (function () {
    var self = this;
    
    $(self.table).before(self.getTopComponentHTML());
    $(self.table).after(self.getBottomComponentHTML());

    self.bindDomEvents();

    self.setCurrentPage(1);
});

LiteDataTable.prototype.configureTableLines = (function (){
    var self = this;
    $(self.table).children("tbody").children("tr:visible").addClass(self.tableLinesClass);
});

LiteDataTable.prototype.bindDomEvents = (function (){
    var self = this;

    $('.' + self.firstPageClass).click(function (){
        self.firstPage_onClick();
    });

    $('.' + self.previousPageClass).click(function (){
        self.previousPage_onClick();
    });
    
    $('.' + self.nextPageClass).click(function (){
        self.nextPage_onClick();
    });

    $('.' + self.lastPageClass).click(function (){
        self.lastPage_onClick();
    });

    $('.' + self.selectRecordsPerPageClass).change(function (){
        self.selectRecordsPerPage_onChange();
    });

    $('.' + self.searchTextClass).keyup(function (e) {
        if (e.keyCode != 40 && e.keyCode != 38 && e.keyCode != 13) {
            if (self.searchText_isWaiting) {
                clearTimeout(self.searchText_currentTimeout);
            }
            self.searchText_currentTimeout = setTimeout(function () {
                self.searchText_onKeyUp();
            }, 500);
            self.searchText_isWaiting = true;
        }
    });
});

LiteDataTable.prototype.calculatePagesAndRecords = (function () {
    var self = this;
    self.numberOfRecords = self.linesToRender.length;
    self.numberOfPages = Math.ceil( self.numberOfRecords / self.recordsPerPage );
});

LiteDataTable.prototype.getBottomComponentHTML = (function () {
    var strHTML = '';
    var disabledNextButton = '';
    if (this.numberOfPages <= 1){
        disabledNextButton = 'disabled="disabled"';
    }

    strHTML = ' <div class="' + this.cssClassForContainerBottomFields + '" > \
                    <a class="' + this.cssClassForButtonFirstPage + ' ' + this.firstPageClass + '" disabled="disabled"> ' + this.captionButtonFirstPage + ' </a> \
                    <a class="' + this.cssClassForButtonPreviousPage + ' ' + this.previousPageClass + '" disabled="disabled"> ' + this.captionButtonPreviousPage + ' </a> \
                    <span class="' + this.cssClassForSpanCurrentPage + ' ' + this.currentPageClass + '"> 1 / ' + this.numberOfPages + ' </span> \
                    <a class="' + this.cssClassForButtonNextPage + ' ' + this.nextPageClass + '" ' + disabledNextButton + '> ' + this.captionButtonNextPage + ' </a> \
                    <a class="' + this.cssClassForButtonLastPage + ' ' + this.lastPageClass + '" ' + disabledNextButton + '> ' + this.captionButtonLastPage + ' </a> \
                </div>';
    
    return strHTML;
});

LiteDataTable.prototype.getTopComponentHTML = (function () {
    var self = this;
    var strHTML = '';
    var disabledNextButton = '';
    if (self.numberOfPages <= 1){
        disabledNextButton = 'disabled="disabled"';
    }

    var displayRecordsPerPage = ' display: block; ';
    if (!self.showRecordsPerPage){
        displayRecordsPerPage = ' display: none; ';
    }

    var displaySearchInput = ' display: block; ';
    if (!self.showSearchInput){
        displaySearchInput = ' display: none; ';
    }

    var displayContainerTopHTML = ' display: block; ';
    if (!self.showSearchInput && !self.showRecordsPerPage){
        displayContainerTopHTML = ' display: none; ';
    }

    self.optionsRecordsPerPage.sort(function (a, b) {
        return a - b;
    });

    var inlineStyleContainerRecordsPerPage = 'float: left;';
    if (self.cssClassForRecordsPerPageContainer != ''){
        inlineStyleContainerRecordsPerPage = '';
    }

    var inlineStyleContainerSearchTextContainer = 'float: right;';
    if (self.cssClassForSearchTextContainer != ''){
        inlineStyleContainerSearchTextContainer = '';
    }

    var inlineStyleContainerTopElements = 'width: 100%; margin-top: 10px; margin-bottom: 10px; height: 40px;';
    if (self.cssClassForContainerTopFields != ''){
        inlineStyleContainerTopElements = '';
    }

    var inlineStyleLabelSelectRecordsPerPage = 'float: left; vertical-align: middle; line-height: 35px;';
    if (self.cssClassForLabelRecordsPerPage != ''){
        inlineStyleLabelSelectRecordsPerPage = '';
    }

    var inlineStyleSelectRecordsPerPage = 'float: left; width: auto; margin-left: 5px;';
    if (self.cssClassForSelectRecordsPerPage != ''){
        inlineStyleSelectRecordsPerPage = '';
    }


    strHTML = ' <div class="' + self.cssClassForContainerTopFields + '" style="' + inlineStyleContainerTopElements + ' ' + displayContainerTopHTML + '"> \
                    <div class="' + self.cssClassForRecordsPerPageContainer + '" style="' + inlineStyleContainerRecordsPerPage + ' ' + displayRecordsPerPage + '"> \
                        <span class="' + self.cssClassForLabelRecordsPerPage + '" style="' + inlineStyleLabelSelectRecordsPerPage + '">' + self.captionLabelRecordsPerPage + '</span> \
                        <select class="' + self.cssClassForSelectRecordsPerPage + ' ' + self.selectRecordsPerPageClass + '" style="' + inlineStyleSelectRecordsPerPage + '">';

    $.each(self.optionsRecordsPerPage, function (index, item) {
        var optSelected = '';
        if (item == self.recordsPerPage){
            optSelected = 'selected="selected"';
        }

        strHTML += '<option value="' + item + '" ' + optSelected + '>' + item + '</option>';
    });

    strHTML += '        </select> \
                    </div> \
                    <div class="' + self.cssClassForSearchTextContainer + '" style="' + inlineStyleContainerSearchTextContainer + ' ' + displaySearchInput + '"> \
                        <input type="text" class="' + self.searchTextClass + ' ' + self.cssClassForInputSearch + '" placeholder="' + self.captionSearchInput + '" /> \
                    </div> \
                </div> ';
    
    return strHTML;
});

LiteDataTable.prototype.generateAndSetUniqueId = (function (){
    this.uniqueId = '_' + Math.random().toString(36).substr(2, 9);
    
    this.firstPageClass = this.uniqueId + '-first-page';
    this.previousPageClass = this.uniqueId + '-previous-page';
    this.currentPageClass = this.uniqueId + '-actual-page';
    this.nextPageClass = this.uniqueId + '-next-page';
    this.lastPageClass = this.uniqueId + '-last-page';

    this.selectRecordsPerPageClass = this.uniqueId + '-select-records-per-page';
    this.searchTextClass = this.uniqueId + '-input-search-text';

    this.tableLinesClass = this.uniqueId + '-lines-table-to-paginate';
});

LiteDataTable.prototype.firstPage_onClick = (function (){
    this.setCurrentPage(1);
});

LiteDataTable.prototype.previousPage_onClick = (function (){
    if (this.currentPage == 1){
        return false;
    }

    this.setCurrentPage(this.currentPage-1);
});

LiteDataTable.prototype.nextPage_onClick = (function (){
    if (this.currentPage >= this.numberOfPages){
        return false;
    }

    this.setCurrentPage(this.currentPage+1);
});

LiteDataTable.prototype.lastPage_onClick = (function (){
    this.setCurrentPage(this.numberOfPages);
});

LiteDataTable.prototype.selectRecordsPerPage_onChange = (function (){
    this.recordsPerPage = $('.' + this.selectRecordsPerPageClass).val();
    this.calculatePagesAndRecords();
    this.setCurrentPage(1);
});

LiteDataTable.prototype.searchText_onKeyUp = (function (){
    var inputText = $('.' + this.searchTextClass).val();
    inputText = this.parseSearchText(inputText);

    if (inputText == this.currentSearchText){
        return true;
    }

    this.currentSearchText = inputText;
    this.applyFilterToTableLines();
    this.calculatePagesAndRecords();
    this.setCurrentPage(1);
});

LiteDataTable.prototype.setCurrentPage = (function (pageNumber) {
    var self = this;
    self.currentPage = pageNumber;

    $('.' + self.tableLinesClass).hide();

    var startRecord = (self.currentPage * self.recordsPerPage) - self.recordsPerPage;
    var endRecord = (self.currentPage * self.recordsPerPage);

    $(self.linesToRender).slice(startRecord, endRecord).show();

    self.updateCaptionAndStateOfPaginator();
});

LiteDataTable.prototype.updateCaptionAndStateOfPaginator = (function (){
    var self = this;

    if (self.numberOfPages == 0){
        $('.' + self.currentPageClass).text('0 / 0');
    }
    else {
        $('.' + self.currentPageClass).text(self.currentPage + ' / ' + self.numberOfPages);
    }

    $('.' + self.firstPageClass).removeAttr('disabled');
    $('.' + self.previousPageClass).removeAttr('disabled');
    $('.' + self.nextPageClass).removeAttr('disabled');
    $('.' + self.lastPageClass).removeAttr('disabled');

    if (self.currentPage == 1 || self.numberOfPages == 0){
        $('.' + self.firstPageClass).attr('disabled', 'disabled');
        $('.' + self.previousPageClass).attr('disabled', 'disabled');
    }

    if (self.currentPage == self.numberOfPages || self.numberOfPages == 0){
        $('.' + self.nextPageClass).attr('disabled', 'disabled');
        $('.' + self.lastPageClass).attr('disabled', 'disabled');
    }
});

LiteDataTable.prototype.parseSearchText = (function (text) {
    if (text == null || text == undefined) {
        return '';
    }

    text = text.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    text = text.toLowerCase();

    var arrayAccentuationHex = {
        a: /[\xE0-\xE6]/g,
        e: /[\xE8-\xEB]/g,
        i: /[\xEC-\xEF]/g,
        o: /[\xF2-\xF6]/g,
        u: /[\xF9-\xFC]/g,
        c: /\xE7/g,
        n: /\xF1/g
    };

    for (var character in arrayAccentuationHex) {
        var regex = arrayAccentuationHex[character];
        text = text.replace(regex, character);
    }

    return text;
});

LiteDataTable.prototype.applyFilterToTableLines = (function (){
    var self = this;
    var lines = $('.' + self.tableLinesClass);

    if (self.currentSearchText != ''){
        self.linesToRender = lines.filter(function (index, line) {
            return self.parseSearchText($(line).text()).indexOf(self.currentSearchText) >= 0;
        });
    }
    else {
        self.linesToRender = lines;
    }
});
