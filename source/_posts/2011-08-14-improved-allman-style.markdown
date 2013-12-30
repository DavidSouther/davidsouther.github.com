---
author: admin
comments: true
date: 2011-08-14 04:35:38+00:00
layout: post
slug: improved-allman-style
title: Improved Allman Style
wordpress_id: 121
categories:
- Coding Standards
- Technology
tags:
- allman
- c
- c-style
- coding
- java
- php
- standards
- style guidelines
---

C-Based languages are those with “Brace” syntax describing blocks. Since the first C programming texts, there has been something of a holy war between zealots of different standards. Being an exemplar of the programming virtue of hubris, I have my entry. Allman-style bracing is the correct, best form for indenting block level code, provided a single addition: the opening brace MUST BE FOLLOWED BY AN INLINE COMMENT. The control statement might tell what the program is doing, but by always including a one-line verbal explanation of the block, other programmers know why the control statement is important. The following is an example mildly complex algorithm from the [jmtt analysis demo](http://davidsouther.com/projects/jmtt/tree.js).

```javascript
this.calculate = function(li)
/**
 * Recursive function to calculate all the scores for a row in our analysis.
 * Gets the weight, grade, and cost from the children, then calcs the weighted
 * average for each middle node. Finally, hands off the data for a second
 * pass determining the target values.
 *
 * Params:
 *	li	HTMLLiNode tree row to calculate for.
 *
 * Returns:
 *	[weight, grade, cost]	Details for the current row.
 */
{
	var grade, weight, cost, children;
	if(undefined === li)
	{	//Calcing the entire analysis.
		children = tree.treetable("body");
		weight = 100;
	}
	else
	{	//Just doing one branch
		children = $(li).children("ul").children("li");
		weight = parseFloat($(li).children("span.weight:first").html().replace("%", ""));
	}

	if(children.length === 0)
	{	//A leaf, floating on the winds...
		var span, input;
		span = $(li).children("span.grade");
		input = span.find("input")[0];
		grade = parseInt((input && input.value) || span.html());

		span = $(li).children("span.cost");
		input = span.find("input")[0];
		cost = parseInt((input && input.value) || span.html());
	}
	else
	{	//Weighted average the children.
		grade = 0; cost = 0;
		children.each(function(){
			var calc = self.calculate(this);
			grade += (calc[0] * calc[1]);
			cost += calc[2];
		});
		grade /= 100;

		grade = Math.rounder(grade);

		//Fill in the node.
		((li && $(li).children("span.grade")) || grade_total).html(grade).addClass("aggregate");
		((li && $(li).children("span.cost")) || cost_total).html(cost).addClass("aggregate");
	}

	if(undefined === li)
	{	//At the head, so go back to calculate cost/value
		return _calculate_value();
	}
	else
	{	// Pass the aggregate values back up the call chain.
		return [weight, grade, cost];
	}
}
```

```javascript
_decorate_cells: function(li)
/**
 * Private method to get the row in line with the rest of the table by
 * attaching any remaining cells and setting all the cell styles.
 *
 * Params:
 *	li	HTMLLiNode with s to apply classes to. */ { var cells, columns; columns = this.options.columns; cells = $(li).children(this.options.cell_tag); while(cells.length < columns.count) { //Add enough cells to make up for any missing cells in the body that are in the header. $(this.options.cell_tag_html).insertAfter($(li).children(this.options.cell_tag+":last")); cells = $(li).children(this.options.cell_tag); } for(i=0; i
```

### More guidelines    
    There are a few other guidelines I follow for consistently readable code.

### Variable Names
    
    Variables must be reasonably named to indicate their purpose and contents. Very short, non-word variables should only be used as iterators in for() loops. Projects should choose either lower-case underscore compound variables or camel case compound variables. Once a decision has been made, it must stay consistent throughout the project. In general, if using a framework, try to use whatever format the framework uses. That said, multi-word variable names should be discouraged. It is better to refactor variable visibility so that words don’t clash in a scope than try to juggle buffered_text, buffered_word, and buffered_reader.




#### INCORRECT


```c
$j = 'foo'; // single letter variables should only be used in for() loops
Str; // contains uppercase letters
bufferedText; // Could be shortened without losing semantic meaning
groupid; // multiple words, needs underscore separator or camel casing
$name_of_last_city_used; // too long
```


#### CORRECT


```c
for ($j = 0; $j < 10; $j++)
$str
buffer
group_id, groupID
$last_city
```

### Commenting

In general, code should be commented prolifically. It not only helps describe the flow and intent of the code for less experienced programmers, but can prove invaluable when returning to your own code months down the line. Functions and classes must always have a DocBlock style comment. This includes private members. Sure, your users might only need the API, but your maintainers will really appreciate a comment saying the private _expand method implements a hacked LL(1) parser because the COTS LALR parser was too slow. DocBlock style comments preceding class and method declarations so they can be picked up by IDEs in all languages:

```c
    /**
    * Super Class
    *
    * @package Package Name
    * @subpackage Subpackage
    * @category Category
    * @author Author Name
    * @link http://example.com
    */
    class SuperClass
    
    /**
    * Encodes string for use in XML
    *
    * @access public
    * @param string
    * @return string
    */
    function xml_encode($str)
```

Javascript Exception: In Javascript, the DocBlock should be placed BETWEEN the function declaration and the function’s opening brace. This makes the comment a syntactic part of the function, and when a developer passes the function to console.log, the comment will be included in the output.

```c
var xml_encode = function($str)
    /**
    * Encodes string for use in XML
    *
    * @access public
    * @param string
    * @return string
    */
    {
```

    Use single line comments within code, leaving a blank line between large comment blocks and code.

```c
    // break up the string by newlines
    $parts = explode("\n", $str);
    
    // A longer comment that needs to give greater detail on what is
    // occurring and why can use multiple single-line comments.  Try to
    // keep the width reasonable, around 70 characters is the easiest to
    // read.  Don't hesitate to link to permanent external resources
    // that may provide greater detail:
    //
    // http://example.com/information_about_something/in_particular/
    
    $parts = $this->foo($parts);
```

As stated in the Indent Style section, control structures should always have a one-line comment on why they are necessary.

### Constants



    
    Constants follow the same guidelines as do variables, except constants should always be fully uppercase and use underscores for spaces.




#### INCORRECT


```c
myConstant // missing underscore separator and not fully uppercase
N // no single-letter constants
S_C_VER // not descriptive
```


#### CORRECT


```c
MY_CONSTANT
NEWLINE
SUPER_CLASS_VERSION
```


### TRUE, FALSE, NULL, UNDEFINED



    
    TRUE, FALSE, NULL, and similar keywords should always be either fully uppercase or undercase as the language allows. This is another “choose at the beginning of the project, then be consistent” rules. INCORRECT

    ```c
    if ($foo == true)
    $bar = false;
    function foo($bar = null)
    ```

    CORRECT

    ```c
    if (TRUE === $foo)
    $bar = FALSE;
    function foo($bar = NULL)
    Logical Operators
    ```

Use of || is discouraged as its clarity on some output devices is low (looking like the number 11 for instance). AND is preferred over && . A space should always precede and follow !. INCORRECT

```c
    if ($foo || $bar)
    if ($foo && $bar)  // okay but not recommended for common syntax highlighting applications
    if (!$foo)
    if (! is_array($foo))
```

    CORRECT

```c
    if ($foo OR $bar)
    if ($foo AND $bar) // recommended
    if ( ! $foo)
    if ( ! is_array($foo))
```
    
    
### Comparing Return Values and Typecasting

Some PHP functions return FALSE on failure, but may also have a valid return value of "" or 0, which would evaluate to FALSE in loose comparisons. Be explicit by comparing the variable type when using these return values in conditionals to ensure the return value is indeed what you expect, and not a value that has an equivalent loose-type evaluation. Use the same stringency in returning and checking your own variables. Always use === and !==. INCORRECT
    [php]
    // If 'foo' is at the beginning of the string, strpos will return a 0,
    // resulting in this conditional evaluating as TRUE
    if (strpos($str, 'foo') == FALSE) ;
    
    function build_string($str = "") {
    if ($str == "") // uh-oh!  What if FALSE or the integer 0 is passed as an argument?
    {
    }
    }
    [/php]
    CORRECT
    [php]
    if (strpos($str, 'foo') === FALSE);
    
    function build_string($str = "") {
    if ("" ===  $str)
    {
    }
    }
    [/php]
    See also information regarding typecasting, which can be quite useful. Typecasting has a slightly different effect which may be desirable. When casting a variable as a string, for instance, NULL and boolean FALSE variables become empty strings, 0 (and other numbers) become strings of digits, and boolean TRUE becomes “1”.




#### Example


[php]
$str = (string) $str; // cast $str as a string
[/php]


### One File per Class



    
    Use separate files for each class, unless the classes are very closely related. An example of Design Delegates files that contains multiple classes is the Datagrid class file, which contains both the Datagrid class and the Datagrid Template classes.




### Whitespace



    
    Use tabs for leading whitespace, not spaces. This may seem like a small thing, but using tabs instead of whitespace allows the developer looking at your code to have indentation at levels that they prefer and customize in whatever application they use. And as a side benefit, it results in (slightly) more compact files, storing one tab character versus, say, four space characters. Use regular spaces inside text for ascii art. The exception is the tab preceding a closing } in CSS declarations, and a tab between a single-line { and its comment in a block of C-style code.




### Condition Tests



    
    Condition Tests should be var op test, to avoid assigning the test to the variable.  Short circuit logical operators should use AND, OR, and ! instead of &&, ||, and NOT. Liberal use of parenthesis to guarantee order of operations is needed (no more than one operation in an expression block). INCORRECT
    [php]
    if($var == 0);
    if(term == strpos(haytack, ‘needle’);
    [/php]
    CORRECT
    [php]
    if(0 === $var);
    if(strpos(haytack, ‘needle’) > -1);
    [/php]
    
    
    <h3>Bracket and Parenthetic Spacing</h3>
    
    
    In general, parenthesis and brackets should not use any additional spaces. The exception is that a space should always follow PHP control structures that accept arguments with parenthesis (declare, do-while, elseif, for, foreach, if, switch, while), to help distinguish them from functions and increase readability. INCORRECT
    [php]
    $arr[ $foo ] = 'foo';
    function foo ( $bar ) {
    }
    foreach( $query->result() as $row )
    [/php]
    CORRECT
    [php]
    $arr[$foo] = 'foo'; // no spaces around array keys
    
    // no spaces around parenthesis in function declarations
    function foo($bar) {
    }
    foreach ($query->result() as $row) // single space following PHP control structures, but not in interior parenthesis
    [/php]
    
    
    <h3>Localized Text</h3>
    
    
    Any text that is output in the control panel should use the translation function __. The __ function will be defined in as many languages as possible. Check the language specific documentation as needed. INCORRECT
    ```c
    return "Invalid Selection";
    ```
    CORRECT
    ```c
    return __('Invalid Selection');
    ```
    
    
    <h3>Private Methods and Variables</h3>
    
    
    Methods and variables that are only accessed internally by your class, such as utility and helper functions that your public methods use for code abstraction, should be prefixed with an underscore. Use language constructs as appropriate to enforce visibility constraints.




#### Example


```c
 class Some_Class {
 public function convert_text() {
 }
 private function _convert_text() {
 }
 }
```


### One Statement Per Line



    
    Never combine statements on one line. Exception: Variable declaration and initialization, which can be one per type and initial value. In this case, variables should be listed in alphabetical order.




#### INCORRECT


[php]
$foo = 'this'; $bar = 'that'; $bat = str_replace($foo, $bar, $bag);
[/php]
```c
int a = 0;
float z = 1.0f;
int c = count = 0;
float r = z;
```


#### CORRECT


[php]
$foo = 'this';
$bar = 'that';
$bat = str_replace($foo, $bar, $bag);
[/php]
```c
int a = b = count = 0;
int m = n = max = 10;
float r = ratio = z = 1.0f;
```
