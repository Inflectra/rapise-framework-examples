// Whatever should be accessible from within Browser is here
// this corresponds to a related browser object.
function DomCustomControlsPluginAttach(browser, actionHolder)
{
	if(l2) Log2("DomCustomControls Plugin Initializing");
	// Context (object information) about object to be executed
	var browserObject = browser;
	
	// return codes of functions
	var R_NOT_OBJECT = 0; // if is not object of this kind
	var R_ACTION_FOUND = 1; // all is ok, object and action found
	var R_OBJECT_FOUND = 2; // this is object of this kind, but action is unknown
	
	
	// tree item state
	var TI_EXPANDED = 0;
	var TI_COLLAPSED = 1;
	var TI_NOCHILDREN = 2;
	
	if(typeof(console) == "undefined") 
	{
		// Install dummy functions, so that logging does not break the code if console is not present
		var console = {};
		console.log = function(msg){};
		console.info = function(msg){};
		console.warn = function(msg){};
	}
	else 
	{
		// console.log provided
	}
	
	//////////////////////////////////////////////////////////////////////
	/// region of recorder functions, all other functions must be upper
	//////////////////////////////////////////////////////////////////////
	
	
	// Detect if we interact with this type of object and if so detect the action as well.
	function IsDomCustomGrid(evt, element, eventOpts, objName, description, flavor, items)
	{
		function _getName(el)
		{
			var name = __getAttribute(el, '<attributeName>');
			if (name)
			{
				return name;
			}
			return "Grid";
		}        
        
		function _getCell(el)
		{
			return {row: 0, col: 0};
		}
	
		var rvalue =
		{
			root: null, // to define in future the most near element or smth else
			result: null, // here will be old res placed
			rcode: R_NOT_OBJECT // return code
		};
	  
		var root = false;

		/**
		 * Test element or it's neighbour nodes to detect type of an object we are dealing with.
		 * Element API is described here: https://developer.mozilla.org/en-US/docs/Web/API/Element
		 * API to use:
		 *	__hasParentWithAttr(element, attributeName, regexp)
		 *  __getAttribute(element, attributeName);
		 *
		 */
		if(root=__hasParentWithAttr(element, '<attributeName>', /<attributeValue>/ig))
		{
			// TODO
	
			var res = {
				cancel: false,
				object_flavor: 'Grid',
				object_name: _getName(root),
				object_type: 'DomCustomGrid',
				description: 'TODO Action description',
				locator_data: 
				{
					xpath: SeS_GenerateXPath(root)
	    		}
			};
	
			// Learn
			rvalue.result = res;
			rvalue.root = root;
			rvalue.rcode = R_OBJECT_FOUND;
			
			if(evt == "resolveElementDescriptor")
			{
				res.rect = __getElementRect(root);
				res.action = undefined;
				return rvalue;
			}
			
			if (evt == "Click")
			{
				var cell = _getCell(element);
				if (cell)
				{
					var actionClick = {
							name: "ClickCell",
							description: "Click cell in a grid",
							params: [cell.row, cell.col]
						};	
					res.action = actionClick;
				}
			}				
		
			// Actions 
			rvalue.rcode = R_ACTION_FOUND;
		}
		
		return rvalue;
	}
	
	// Entry point to process action recorded event
	// Returns "false" if no relation to current plugin is detected
	// or action information.
	actionHolder.OnActionRecorded = function(evt, element, eventOpts, objName, description, flavor, items)
	{
		if(!element) return false;
		 
		function _checkDomCustomControls()
		{
			// Test each object type supported by the library
			var r = manageExceptions(IsDomCustomGrid)(evt, element, eventOpts, objName, description, flavor, items);
			if(r.rcode == R_OBJECT_FOUND || r.rcode == R_ACTION_FOUND)
			{
				return r.result;
			}
		}
		
		if(typeof(g_debug)!="undefined"&&g_debug)
		{
			return _checkDomCustomControls();
		} else {
			try
			{
				return _checkDomCustomControls();
			}
			catch(exc)
			{
				PrintException("DomCustomControls Plugin exception", exc);
			}
		}
		return false;
	}
	
	//#region Debug Functions
	function PrintException(title, exc)
	{
		Log("************** " + title + " *********************\n");
		var vDebug = "";
		for (var prop in exc)
		{
			vDebug += "    ["+ prop+ "]:"+ exc[prop] + "\n";
		}
		Log(vDebug);
		Log('**********************************************************');	
	}

	function print(msg) 
	{
		console.log(msg); // to see it in console if possible
		if(l1)Log1(msg);
	}

	function manageExceptions(func) 
	{
		var orignal = func;
		var decorated = function() 
		{
			// purpose of this wrap is to write function name where error is, if stack is unavailable
			function functionName(fn)
			{
				var name = /\W*function\s+([\w\$]+)\(/.exec(fn);
				if(!name)
				{
					return 'No name';
				}
				return name[1];
			}
			var funcName = functionName(orignal.toString());
			
			if(typeof(g_debug)!="undefined"&&g_debug)
			{
				var _s = new Date();
				if(l3) Log3("Trying:"+funcName);
				var res = orignal.apply(this, arguments);
				if(l3) Log3( (new Date()-_s)+"[ms]" );
				return res;
			} else {
				try 
				{
					return orignal.apply(this, arguments);
				}
				catch(exception) 
				{
					if (!exception.stack) // give user more chances to find out error
					{
						Log("************** Exception in " + funcName + " *********************\n");
					}
					throw exception; // to catch it in the end of recorder
				}
			}			
		}
		return decorated;
	}
	//#endregion
}