
/** @behavior */
var DomCustomGridBehavior = {
	actions: [	
		{
			actionName: "FullText",
			/** @action */
			DoAction: DomCustomGridBehavior_DoFullText
		}, 
		{
			actionName: "ClickCell",
			/** @action */
			DoAction: DomCustomGridBehavior_DoClickCell
		}
	],
	properties:
	{
		/** @property */
		Cell:
		{
			Get: DomCustomGridBehavior_GetCell
		},		 
		/** @property */
		ColumnCount:
		{
			Get: DomCustomGridBehavior_GetColumnCount
		},		 
		/** @property */
		RowCount:
		{
			Get: DomCustomGridBehavior_GetRowCount
		},		 
		/** @property */
		ColumnName:
		{
			Get: DomCustomGridBehavior_GetColumnName
		},
		/** @property */
		ColumnIndex:
		{
			Get: DomCustomGridBehavior_GetColumnIndex
		},
		/** @property */
		SelectedRow:
		{
			Get: DomCustomGridBehavior_GetSelectedRow
		},		 
		/** @property */
		SelectedRowCount:
		{
			Get: DomCustomGridBehavior_GetSelectedRowCount
		},		 
		/** @property */
		SelectedRows:
		{
			Get: DomCustomGridBehavior_GetSelectedRows
		}
	}
}

function DomCustomGridBehavior_DoFullText()
{
	var text = "";
	var rows = this._DoDOMQueryXPath('./tbody/tr');
	for(var rowIndex = 0; rowIndex < rows.length; rowIndex++)
	{
		var row = rows[rowIndex];
		var cells = row._DoDOMQueryXPath('./td');
		for(var columnIndex = 0; columnIndex < cells.length; columnIndex++)
		{
			var cell = cells[columnIndex];
			var cellText = cell.GetInnerText();
			text += cellText;
			if (columnIndex < cells.length - 1) text += "\t";
		}
		text += "\n";
	}
	return text;
}

function DomCustomGridBehavior_DoClickCell(/**number|string*/ row, /**string|number*/ col, /**string*/ clickType, /**number*/ xOffset, /**number*/ yOffset)
{
	var cell = DomCustomGrid_FindCell(this, row, col);
	if (cell)
	{
		cell._DoEnsureVisible();
		var rect = cell._DoGetRect();
		
		var cx = rect.x;
		var cy = rect.y;
		
		if(typeof(xOffset)=="number")
		{
			cx = cx+xOffset;
		} else {
			cx = cx+(rect.w>>1);
		}

		if(typeof(yOffset)=="number")
		{
			cy = cy+yOffset;
		} else {
			cy = cy+(rect.h>>1);
		}
		
		Global.DoMouseMove(cx,cy);
		Global.DoClick(clickType);
		
		return true;
	}
	return false;
}

function DomCustomGridBehavior_GetCell(/**number|string*/row, /**string|number*/col)  /**string*/ 
{
	var cell = DomCustomGrid_FindCell(this, row, col);
	if (cell)
	{
		return cell.GetInnerText();
	}
	return null;
}

function DomCustomGridBehavior_GetColumnCount()  /**number*/ 
{
	var res = this.doQuery(/**xpath*/ "count(./thead/tr/th)", /**timeout*/ 0, /**numeric result*/ true);
	
	if (res && res.length)
	{
		return res[0];
	}
	
	return -1;
}

function DomCustomGridBehavior_GetColumnName(/**number*/columnIndex)  /**string*/ 
{
	if (!columnIndex)
	{
		columnIndex = 0;
	}
		
	var res = this._DoDOMQueryXPath("./thead/tr/th[" + (columnIndex + 1) + "]/div");
	if (res && res.length)
	{
		return res[0].GetInnerText();
	}
	
	return null;
}

function DomCustomGridBehavior_GetColumnIndex(/**string*/columnName)  /**number*/ 
{
	if (!columnName)
	{
		return -1;
	}
		
	var columns = this._DoDOMQueryXPath('./thead/tr/th/*[1]');
	if (columns && columns.length > 0)
	{
		for(var i = 0; i < columns.length; i++)
		{
			var cn = columns[i].GetInnerText();
			if (cn == columnName)
			{
				return i;
			}
		}
	}
	
	return -1;
}

function DomCustomGridBehavior_GetRowCount()  /**number*/ 
{
	var res = this.doQuery(/**xpath*/ "count(./tbody/tr)", /**timeout*/ 0, /**numeric result*/ true);
	
	if (res && res.length)
	{
		return res[0];
	}
	
	return -1;
}

function DomCustomGridBehavior_GetSelectedRow()  /**number*/ 
{
	var res = this.doQuery("count(./tbody/tr[contains(@class,'selected')]/preceding-sibling::tr)", 0, true);
	if(res && res.length)
	{
		return res[0];
	}
	return -1;
}

function DomCustomGridBehavior_GetSelectedRowCount()  /**number*/ 
{
	var res = this.doQuery("count(./tbody/tr[contains(@class,'selected')])", 0, true);
	if(res && res.length)
	{
		return res[0];
	}
	return -1;
}

function DomCustomGridBehavior_GetSelectedRows(/**boolean*/asArray, /**string*/separator)  /**array|string*/ 
{
	separator = separator || ",";
	asArray = asArray || false;
	
	var selectedRows = [];
	var rows = this._DoDOMQueryXPath('./tbody/tr');
	for(var i = 0; i < rows.length; i++)
	{
		if (rows[i]._DoDOMGetAttribute("class").indexOf("selected") != -1)
		{
			selectedRows.push(i);
		}
	}	
	
	if (asArray)
	{
		return selectedRows;
	}
	else
	{
		return selectedRows.join(separator);
	}
}

function DomCustomGrid_FindCell(obj, row, col)
{
	if (typeof(col) == "string")
	{
		col = obj.GetColumnIndex(col);
		if (col == -1)
		{
			return null;
		}
	}
	
	if (typeof(col) != "number")
	{
		return null;
	}

	var cells = [];
	
	if (typeof(row) == "number")
	{
		cells = obj._DoDOMQueryXPath("./tbody/tr[" + (row + 1) + "]/td[" + (col + 1) + "]");
	}
	else if (typeof(row) == "string")
	{
		cells = obj._DoDOMQueryXPath("./tbody/tr/td[" + (col + 1) + "][normalize-space(.//text())='" + row + "']");
	}

	if (cells.length > 0)
	{
		var cell = cells[0];
		return cell;
	}
	
	
	return null;
}
