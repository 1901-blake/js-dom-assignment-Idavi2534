/* -----------------------------------------------------------------------------------
 PART II
 Part II will focus on Javascript's ability to manipulate the DOM.
 Use the provided index.html
 */


const retrieve = (function () {
/* ----------------	
 1. USA
 Define function getUSA()
 Find the html element that contains "USA".
 Print that element's contents.
 */
        function retrieve() { }

	
	retrieve.getUSA = function () {
		let spans = document.getElementsByTagName('span');
		for (let i = 0; i < spans.length; i++) {
			if (spans[i].innerHTML === 'USA') {
				console.log(spans[i].innerHTML)
			}
		}
	};

/*  2. Sales
 Define function getPeopleInSales()
 Print the names of all the people in the sales department. */
	retrieve.getPeopleInSales = function () {
		let td = document.querySelectorAll('[class="empName"]');
		for (let i = 0; i < td.length; i++)
			console.log(td[i].innerHTML);
	};

/*  3. Click Here
 Define function getAnchorChildren()
Find all anchor elements with a <span> child.
 Print the contents of <span> */
	retrieve.getAnchorChildren = function () {
		let spans = document.querySelectorAll('a > span');
		for (let i = 0; i < spans.length; i++) {
			console.log(spans[i].innerHTML);
		}
	};

/*  4. Hobbies
 Define function getHobbies()
 Find all checked options in the 'skills' select element.
 Print the value and the contents. */
	retrieve.getHobbies = function () {
		let selector = document.querySelector('[name="hobbies"]');
		let opts = selector.getElementsByTagName('option');
		for (let i = 0; i < opts.length; i++) {
			let selected = opts[i].getAttribute('selected') === 'selected';
			if (selected) {
				let val = opts[i].getAttribute('value');
				console.log(`Content: ${opts[i].innerHTML}, Value: ${val}`);
			}
		}
	};
/*  5. Custom Attribute
 Define function getCustomAttribute()
 Find all elements with "data-customAttr" attribute
 Print the value of the attribute.
 Print the element that has the attribute. */
	retrieve.getCustomAttribute = function () {
		let cust = document.querySelectorAll('[data-customAttr]');
		for (let i = 0; i < cust.length; i++) {
			let value = cust[i].getAttribute('data-customAttr');
			console.log(`Value = ${value}, ${cust[i]}`);
		}
	}

	
	retrieve.walkTheDom = function(node, func) {
		func(node);
		if (node.childElementCount > 0) {
			for (let i = 0; i < node.children.length; i++) {
				WalkTheDom(node.children[i], func);
			}
		}
	};

	return retrieve;
})();



/*  6. Sum Event
 NOTE: Write unobtrusive Javascript
Regarding these elements:
	<input id="num1" class="nums" type="text"/>
 	<input id="num2" class="nums" type="text"/>
 	<h3>Sum: <span id="sum"></span></h3>
 Define onchange event handler.
 Add <input> element values.
 Put the sum in the <span> element.
 If values cannot be added, put "Cannot add" in the <span> element */
(function () {
	const rgx = new RegExp('^[0-9]*$');
	const num1 = document.getElementById('num1');
	const num2 = document.getElementById('num2');
	const sum = document.getElementById('sum');

	num1.value = '0';
	num2.value = '0';
	sum.innerHTML = '0';

	function add(ev) {
		if(rgx.test(num1.value) && rgx.test(num2.value)) {
			sum.innerHTML = +num1.value + +num2.value;
			return;
		}
		sum.innerHTML = 'Cannot Add';
	}

	num1.addEventListener('input', add);
	num2.addEventListener('input', add);
})();



/* 7. Skills Event
 NOTE: Write unobtrusive Javascript
 When user selects a skill, create an alert with a message similar to:
 	"Are you sure CSS is one of your skills?"
 NOTE: no alert should appear when user deselects a skill. */
(function() {
	const select = document.getElementsByTagName('select');
	for (let i = 0; i < select.length; i++) {
		if (select[i].getAttribute('name', 'skills')) {
			let id = select[i].value;
			select[i].addEventListener('change', e => {
				let ans = prompt(`Are you sure ${select[i].value} is one of your skills? (yes or no)`);
				console.log(ans);
				if (ans === null || ans.toLowerCase() === 'no') {
					select[i].value = id;
				}
			});
		}
	}
})();




/*  8. Favorite Color Event
 NOTE: Write unobtrusive Javascript
 NOTE: This is regarding the favoriteColor radio buttons.
 When a user selects a color, create an alert with a message similar to:
 	"So you like green more than blue now?"
 In this example, green is the new value and blue is the old value.
 Make the background color (of all favoriteColor radio buttons) the newly selected favoriteColor */
(function() {
	const favColors = document.querySelectorAll('form#firstForm input[name="favoriteColor"]');
	let last = null, current = null;
	for (let i = 0; i < favColors.length; i++) {
		favColors[i].addEventListener('change', (e) => {
			current = favColors[i];
			if (last === null) {
				last = current;
			} else {
				if (current != last) {
					let a = current.getAttribute('value');
					let b = last.getAttribute('value');
					alert(`So you like ${a} more than ${b} now.`);
					last = current;
				}
			}
			document.body.style.backgroundColor = current.getAttribute('value');
		});
	}
})();


/*  9. Show/Hide Event
 NOTE: Write unobtrusive Javascript
 When user hovers over an employees name:
 	Hide the name if shown.
 	Show the name if hidden. */
(function() {
	const td = document.querySelectorAll('[class="empName"]');
	for (let i = 0; i < td.length; i++) {
		let compute = getComputedStyle(td[i]);
		let last = compute.opacity;
		td[i].addEventListener('mouseover', (e) => {
			let isVis = compute.opacity === last;
			td[i].compute.opacity = (isVis ? '0' : last);
		});
	}
})();



 /* 10. Current Time
 Regarding this element:
 	<h5 id="currentTime"></h5>
 Show the current time in this element in this format: 9:05:23 AM
 The time should be accurate to the second without having to reload the page. */
(function() {
	window.addEventListener('load', (e) => {
		function PrintTime() {
			let h5 = document.getElementById('currentTime');
			function UpdateTime() {
				h5.innerHTML = new Date().toLocaleTimeString();
				let id = setTimeout(UpdateTime, 1000);
			}
			return UpdateTime();
		}
		PrintTime();
	});
})();


/*  11. Delay
 Regarding this element:
	<p id="helloWorld">Hello, World!</p>
 Three seconds after a user clicks on this element, change the text to a random color. */

(function() {
	function rangeRange(min, max) {
		return Math.round((min + (max - min) * Math.random())).toString();
	}
	function randColor() {
		let r = randRange(0, 255);
		let g = randRange(0, 255);
		let b = randRange(0, 255);
		return `rgb(${r}, ${g}, ${b})`;
	}

	let p = document.getElementById('helloWorld');
	let id = 0;
	p.addEventListener('click', (e) => {
		console.log('Clicked');
		clearTimeout(id);
		id = setTimeout(() => {
			p.style.color = RandColor();
		}, 3000);
	});
})();
