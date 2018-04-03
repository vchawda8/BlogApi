/**
 * @author Vishal Chawda
 * @description demonstration of calculation via different ways modular coding
 */

//global variable for storing expression with a '|' separator
var expression = ''

/**
 * @function clearInput()
 * @description will clear the input field via the getElementById method
 */
function clearInput() {
	document.getElementById('input').value = ''
	                        expression     = ''
}

/**
 * @function appendInput()
 * @description will append the string with the string passed via click and set it to the input element
 * @param {String} number
 */
function appendInput(number) {
	let existing = (document.getElementById('input').value) ? document.getElementById('input').value : ''

	expression = expression + "" + number

	document.getElementById('input').value = existing + "" + number
}

/**
 * @function appendOperation
 * @description will append operator string to the expression variable and also to the input element
 * @param {String} operator
 */
function appendOperation(operator) {
	let existing = (document.getElementById('input').value != '') ? document.getElementById('input').value : '0'

	expression = expression + "|" + operator + "|"

	document.getElementById('input').value = existing + "" + operator
}

/**
 * @function getResult()
 * @description will perform the evaluation of the string and rewrite the input element with the output of evaluation
 */
function getResult() {
	try {
		//optimized way to get result
		// document.getElementById('input').value  = eval(document.getElementById('input').value)
		let                     expressionArray = expression.split('|')
		let                     result          = performEvaluation(expressionArray)
		document.getElementById('input').value  = result
		expression = ''
	} catch (error) {
		console.log(error);
		document.getElementById('input').value       = ""
		document.getElementById('input').placeholder = "Malformed Expression"
		expression=''
	}
}

/**
 * @function performEvaluation(Array: expressionArray) : number
 * @description will perform calculation and replace the input element with result
 * @param {Array} expressionArray
 */
function performEvaluation(expressionArray) {
	let index  = 0
	let answer = 0
	//first multiplication
	expressionArray.forEach(value => {
		if (index === 0 && value === '*') {
			throw 'malformed expression'
		} else if (value == '*') {
			//perform operation
			number1 = index - 1
			number2 = index + 1
			answer  = parseInt(expressionArray[number1]) * parseInt(expressionArray[number2])
			//updating array after calculation
			expressionArray[number1]        = answer.toString()
			                expressionArray = removeElement(expressionArray, index)
		}
		index += 1
	})
	index = 0
	//second division
	expressionArray.forEach(value => {
		if (index === 0 && value == '/') {
			throw 'malformed expression'
		} else if (value == '/') {
			//perform operation
			number1 = index - 1
			number2 = index + 1
			answer  = parseInt(expressionArray[number1]) / parseInt(expressionArray[number2])
			//updating array after calculation
			expressionArray[number1]        = answer.toString()
			                expressionArray = removeElement(expressionArray, index)
		}
		index += 1
	})
	index = 0
	//third addition
	expressionArray.forEach(value => {
		if (index === 0 && value === '+') {
			throw 'malformed expression'
		} else if (value == '+') {
			//perform operation
			number1 = index - 1
			number2 = index + 1
			answer  = parseInt(expressionArray[number1]) + parseInt(expressionArray[number2])
			//updating array after calculation
			expressionArray[number1]        = answer.toString()
			                expressionArray = removeElement(expressionArray, index)
		}
		index += 1
	})
	index = 0
	//fourth subtraction
	expressionArray.forEach(value => {
		if (index === 0 && value === '-') {
			throw 'malformed expression'
		} else if (value == '-') {
			//perform operation
			number1 = index - 1
			number2 = index + 1
			answer  = parseInt(expressionArray[number1]) - parseInt(expressionArray[number2])
			//updating array after calculation
			expressionArray[number1]        = answer.toString()
			                expressionArray = removeElement(expressionArray, index)
		}
		index += 1
	})

	return expressionArray[0]
}

function removeElement(expressionArray, index) {
	expressionArray.splice(index, 2)
	return expressionArray
}