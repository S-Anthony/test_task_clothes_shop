// Original range element by: https://medium.com/@predragdavidovic10/native-dual-range-slider-html-css-javascript-91e778134816
// My range element has some modifications:
// 1) Preventing sliders from collapsing
// 2) Range : output (0-100 : 980-35000) ratio 
// 3) Free input in "from" & "to" fields

export default function range() {
	const fromSlider = document.querySelector('#fromSlider');
	const toSlider = document.querySelector('#toSlider');
	const fromInput = document.querySelector('#fromInput');
	const toInput = document.querySelector('#toInput');
	const sliderColor = '#C4C7C7';
	const rangeColor = '#8E9192';
	// Offset prevent slides from collapsing
	const sldiersOffset = 6;

  	const minValue = parseInt(fromInput.min, 10);
	const maxValue = parseInt(fromInput.max, 10);
	const factor = Math.ceil( (maxValue - minValue) / 100 );

	function controlFromInput(fromSlider, fromInput, toInput) {
		let [from, to] = getParsed(fromInput, toInput);
		if (from <= minValue) {
			fromSlider.value = 0;
			fromInput.value = getRefactoredValue(0);
		}
		else if (from <= to) {
			fromSlider.value = getRefactoredValue(from, true);
			fromInput.value = from;
		} else {
			fromSlider.value = getRefactoredValue(to, true);
			controlFromSlider(fromSlider, toSlider, fromInput);
		}
		fillSlider();
	}

	function controlToInput(toSlider, fromInput, toInput) {
		let [from, to] = getParsed(fromInput, toInput);
		if (to >= maxValue) {
			toSlider.value = 100;
			toInput.value =  getRefactoredValue(100);
		}
		else if (from < to) {
			toSlider.value = getRefactoredValue(to, true);
			toInput.value = to;
		} else {
			toSlider.value = getRefactoredValue(from, true);
			controlToSlider(fromSlider, toSlider, toInput);
		}
		fillSlider();
	}
	
	function controlFromSlider(fromSlider, toSlider, fromInput) {
	  const [from, to] = getParsed(fromSlider, toSlider);
	  fillSlider();
	  if (from >= to - sldiersOffset) {
		fromSlider.value = to - sldiersOffset;
		fromInput.value = getRefactoredValue(to - sldiersOffset);
	  } else {
		fromSlider.value = from;
		fromInput.value = getRefactoredValue(from);
	  }
	}
	
	function controlToSlider(fromSlider, toSlider, toInput) {
	  const [from, to] = getParsed(fromSlider, toSlider);
	  fillSlider();
	  if (from + sldiersOffset < to) {
		toSlider.value = to;
		toInput.value = getRefactoredValue(to);
	  } else {
		toInput.value = getRefactoredValue(from + sldiersOffset);
		toSlider.value = from + sldiersOffset;
	  }
	}
	
	function getParsed(currentFrom, currentTo) {
	  const from = parseInt(currentFrom.value, 10);
	  const to = parseInt(currentTo.value, 10);
	  return [from, to];
	}
	
	function getRefactoredValue (value, reduce=false) {
		if (reduce) {
			return (value - minValue) / factor;
		}
		return (value * factor) + minValue;
	}

	function fillSlider() {
		const rangeDistance = toSlider.max-toSlider.min;
		const fromPosition = fromSlider.value - toSlider.min;
		const toPosition = toSlider.value - toSlider.min;
		toSlider.style.background = `linear-gradient(
		  to right,
		  ${sliderColor} 0%,
		  ${sliderColor} ${(fromPosition)/(rangeDistance)*100}%,
		  ${rangeColor} ${((fromPosition)/(rangeDistance))*100}%,
		  ${rangeColor} ${(toPosition)/(rangeDistance)*100}%, 
		  ${sliderColor} ${(toPosition)/(rangeDistance)*100}%, 
		  ${sliderColor} 100%)`;
	}

	controlFromSlider(fromSlider, toSlider, fromInput);
	controlToSlider(fromSlider, toSlider, toInput);
	
	fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
	toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
	fromInput.onchange = () => controlFromInput(fromSlider, fromInput, toInput);
	toInput.onchange = () => controlToInput(toSlider, fromInput, toInput);
}