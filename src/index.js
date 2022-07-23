import './js/style.css';
import { httpRequest } from './js/http-request.js';
import nationalities from './js/nationalities.json';
import 'animate.css';

const months = {
	1: 'January ',
	2: 'February ',
	3: 'March ',
	4: 'April ',
	5: 'May ',
	6: 'June ',
	7: 'July ',
	8: 'August ',
	9: 'September ',
	10: 'October ',
	11: 'November ',
	12: 'December ',
};

function generateDate(id, inner) {
	let options = document.createElement('option');
	document.getElementById(id).appendChild(options).innerHTML = inner;
}

for (let year = 1950; year <= 2015; year++) generateDate('year-birth', year);

for (let day = 1; day <= 31; day++) generateDate('day-birth', day);

for (let month in months) generateDate('month-birth', months[month]);

nationalities.nationalities.forEach((nat) => {
	generateDate('nationality', nat);
});

const errorMessages = {
	'first-name': {
		valueMissing: 'Представьтесь, пожалуйста',
		patternMismatch: 'Что-то не похоже на имя',
	},

	'last-name': {
		valueMissing: 'Представьтесь, пожалуйста',
		patternMismatch: 'Что-то не похоже на фамилию',
	},

	email: {
		valueMissing: 'Предоставьте почту',
		typeMismatch: 'Что-то не очень похоже на почту',
		patternMismatch: 'Почта невалидна',
	},

	password: {
		valueMissing: 'Введите пароль',
		patternMismatch:
			'Пароль пользователя должен содержать от 8 символов и как минимум 1 заглавную букву, 1 строчную и 1 цифру',
	},
};

function hideError(fieldInput) {
	const field = fieldInput.closest('.field');
	const fieldError = field.querySelector('.field__error');

	fieldError.classList.add('field__error_hidden');
}

function showError(fieldInput, error) {
	const field = fieldInput.closest('.field');
	const fieldError = field.querySelector('.field__error');

	fieldError.textContent = error;

	fieldError.classList.remove('field__error_hidden');
}

function validateInput(fieldInput) {
	hideError(fieldInput);

	if (!fieldInput.validity.valid) {
		const error = Object.keys(ValidityState.prototype).find((key) => {
			if (key === 'valid') return false;

			return fieldInput.validity[key];
		});

		fieldInput.classList.add(
			'invalid:border-[#FF2222]',
			'invalid:text-[#FF2222]',
			'invalid:border-b-2'
		);

		console.log(error);

		showError(fieldInput, errorMessages[fieldInput.name][error]);
	}
}

const form = document.querySelector('.form');
const formFieldInputs = form.querySelectorAll('.field__input');

formFieldInputs.forEach((formField) => {
	formField.addEventListener('change', (event) => {
		const target = event.target;

		target.dataset.dirty = 'true';

		validateInput(target);
	});

	formField.addEventListener('input', (event) => {
		const target = event.target;

		if (target.dataset.dirty) {
			validateInput(target);
		}
	});
});

const Pass = form.querySelector('.form__password');
const confirmPass = form.querySelector('.form__confirm-password');
const passEror = form.querySelector('.error_pass');
const submitBtn = form.querySelector('.submit-btn');

confirmPass.addEventListener('input', () => {
	if (Pass.value !== confirmPass.value) {
		passEror.textContent = 'Пароли не совпадают';
		passEror.style.color = 'lightcoral';
	} else {
		passEror.textContent = 'Пароли совпадают';
		passEror.style.color = 'green';
	}
});

Pass.addEventListener('input', function () {
	this.value !== confirmPass.value
		? confirmPass.setCustomValidity('Пароли не совпадают')
		: confirmPass.setCustomValidity('');
});

confirmPass.addEventListener('input', function () {
	this.value !== Pass.value
		? this.setCustomValidity('Пароли не совпадают')
		: this.setCustomValidity('');

	!confirmPass.checkValidity() && submitBtn.click();
});

submitBtn.addEventListener('click', function (e) {
	Pass.value === '' && e.preventDefault();
});

function showData(data) {
	const status = data.status;
	if (status === 'ok') {
		form.reset();
		const modalRegister = document.getElementById('my-modal-6');
		const closeModalBtn = document.querySelector('.btn-close-modal');
		modalRegister.checked = true;
		//comment out if don't make request in confirm.html
		closeModalBtn.addEventListener('click', () => {
			httpRequest({
				url: './confirm.html',
				type: 'text',
				onSuccess: (data) => {
					document.body.innerHTML = data;
				},
			});
		});
	} else if (status === 'error') {
		alert('Ошибка авторизации');
		animateCSS('.submit-btn', 'wobble');
	} else {
		alert('Нет доступа');
		animateCSS('.submit-btn', 'wobble');
	}
}

form.addEventListener('submit', (event) => {
	event.preventDefault();

	const formElement = event.target;
	const fieldInputs = formElement.querySelectorAll('.field__input');

	if (formElement.checkValidity()) {
		console.log('success!');
		httpRequest({
			url: '../static/status-ok.json',
			onSuccess: (data) => {
				showData(data);
			},

			onError: (data) => {
				showData(data);
			},
		});
	}

	fieldInputs.forEach(validateInput);
});

document.addEventListener('DOMContentLoaded', () => {
	const formFields = form.querySelectorAll('.form__field');

	for (let i = 0; i < formFields.length; i++) {
		formFields[i].classList.add(
			'animate__animated',
			'animate__fadeInUp',
			`animate__delay-${i}s`
		);
	}
});

const animateCSS = (element, animation, prefix = 'animate__') =>
	// We create a Promise and return it
	// eslint-disable-next-line no-unused-vars
	new Promise((resolve, reject) => {
		const animationName = `${prefix}${animation}`;
		const node = document.querySelector(element);

		node.classList.add(`${prefix}animated`, animationName);

		// When the animation ends, we clean the classes and resolve the Promise
		function handleAnimationEnd(event) {
			event.stopPropagation();
			node.classList.remove(`${prefix}animated`, animationName);
			resolve('Animation ended');
		}

		node.addEventListener('animationend', handleAnimationEnd, {
			once: true,
		});
	});
