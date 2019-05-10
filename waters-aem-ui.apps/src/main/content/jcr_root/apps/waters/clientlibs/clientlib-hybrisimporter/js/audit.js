$(function () {
    HybrisImporter.Audit.initialize();
});

HybrisImporter.Audit = function () {

    var table;

    return {
        initialize: function () {
            var auditRecordTable = $('.importer-audit-record');
            var auditRecordPath = auditRecordTable.data('path');

            auditRecordTable.DataTable({
                ajax: '/bin/importer/audit.json' + auditRecordPath,
                columns: [
                    {data: 'path'},
                    {data: 'title'},
                    {data: 'status'}
                ],
                processing: true,
                language: {
                    emptyTable: 'No results for import.',
                    search: 'Filter: ',
                    zeroRecords: 'No matching results found.',
                    info: 'Showing _START_ to _END_ of _TOTAL_ items',
                    infoEmpty: '',
                    infoFiltered: '(filtered from _MAX_ total results)'
                }
            });

            table = $('.importer-audit').DataTable({
                ajax: '/bin/importer/audit.json',
                columns: [
                    {data: 'date'},
                    {data: 'success'},
                    {data: 'duration'},
                    {data: 'count'}
                ],
                language: {
                    emptyTable: 'No audit records found.',
                    info: 'Showing _START_ to _END_ of _TOTAL_ records',
                    infoEmpty: ''
                },
                searching: false,
                processing: true,
                order: [[0, 'desc']],
                rowCallback: function (row, data) {
                    $('td:eq(0)', row).html('<a href="' + data.href + '">' + data.date + '</a>');
                    $('td:eq(1)', row).html(data.success ? 'Yes' : 'No');
                }
            });
        }
    };
}();