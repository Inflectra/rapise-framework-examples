


function Test(params)
{
    Navigator.Open();
    
	var grid = SeS('people_table_grid');
	var cc = grid.GetColumnCount();
	Tester.Message("Column Count: " + cc);
	for(var i = 0; i < cc; i++)
	{
		var colName = grid.GetColumnName(i);
		Tester.Message(colName);
	}
	
	var ci = grid.GetColumnIndex('Title');
	Tester.Message("Column Index: " + ci);
	
	var rc = grid.GetRowCount();
	Tester.Message("Row Count: " + rc);
	
	var sr = grid.GetSelectedRow();
	Tester.Message("Selected Row: " + sr);
	
	var src = grid.GetSelectedRowCount();
	Tester.Message('Selected Row Count: ' + src);
	
	var srs = grid.GetSelectedRows();
	Tester.Message("Selected Rows: " + srs);
	
	grid.DoClickCell(1, 2);
	grid.DoClickCell(1, "Name");
	grid.DoClickCell("Jim Norred", "Name");

	RVL.DoPlayScript();
}

g_load_libraries=["%g_browserLibrary:Firefox HTML%", "DomDynamicsCrm", "DomCustomControls"];


