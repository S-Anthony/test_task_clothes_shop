export default function accordion() {

	document.querySelectorAll('.accordion__item-label').forEach(trigger => {
		trigger.addEventListener('click', () => {
			trigger.closest('.accordion__item').classList.toggle('accordion__item_active');
		});
	});	
}