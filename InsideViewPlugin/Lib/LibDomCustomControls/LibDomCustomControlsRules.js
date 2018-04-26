/**
 * Load behaviors
 */
eval(g_helper.IncludeOnce("Lib/LibDomCustomControls/DomCustomGrid.js"));


/**
 * Rule definitions
 */

/** @rule */
var DomCustomGridRule = new SeSMatcherRule(
	{
		/**
		 * User-specified type of an object.
		 */
		object_type: "DomCustomGrid",
		
		/**
		 * Used to show descriptive icon in the object tree.
		 * Possible values: Edit, Label, Grid, List, ComboBox, Radio, Menu
		 * See more icon names in c:\Program Files (x86)\Inflectra\Rapise\Core\Engine\ObjectImages 
		 */
		object_flavor: "Grid",

		extend_rule: "HTMLObject",
		dont_hash: true,

		/** @behaviors */
		behavior: [DomCustomGridBehavior]
	}
);
