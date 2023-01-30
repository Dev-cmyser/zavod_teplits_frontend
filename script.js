




window.onload = function () {
	fetch('http://localhost:8000/feedback/')
		.then(response => response.json())
		.then(function (feedbacks) {
			// Generate the HTML for each product
			feedbacks.results.forEach(function (feedback) {
				const feedbackCard = `
			
			  <div class="otz_main_items_item">
						<img src="${feedback.images['0'].image.medium_square_crop}" alt="${feedback.name}"  class="otz_main_items_item_img">
						<div class="otz_main_items_item_title">
							${feedback.name}
						</div>
						<div class="otz_main_items_item_text">
							${feedback.message}
						</div>
					</div>
		  `;
				document.querySelector('#feedback-list').innerHTML += feedbackCard;
			});
		});










	// Get the product data from the API
	fetch('http://localhost:8000/products/')
		.then(response => response.json())
		.then(function (products) {
			// Generate the HTML for each product
			console.log(products.results)
			products.results.forEach(function (product) {
				console.log(product.images['0'].image.full_size)
				const productCard = `
			<div class="product-card">
			  <img  src="${product.images['0'].image.medium_square_crop}" alt="${product.name}" data-preview-src="${product.images['0'].image.medium_square_crop}">
			  <div class="goods_main_items_item_title">
			  ${product.name}
		  </div>
		  <div class="goods_main_items_item_row">
		  <div class="goods_main_items_item_row_rub">
		  ${product.price} руб/комп
		  </div>
		  <div class="goods_main_items_item_row_count">
			  <div class="goods_main_items_item_row_count_num">${product.count}</div>
			  комп.
		  </div>
	  </div>
	  <div class="goods_main_items_item_btn">
		  <div class="goods_main_items_item_btn_b">
			  Заказать
		  </div>
	  </div>


</div>
			</div>
		  `;
				document.querySelector('#product-list').innerHTML += productCard;
			});

			// Add click event listener for the product images
			const productCards = document.querySelectorAll('.product-card img');
			productCards.forEach(function (productCard) {
				productCard.addEventListener('click', function () {
					const previewImageSrc = this.getAttribute('data-preview-src');
					document.querySelector('#preview-image').setAttribute('src', previewImageSrc);
					document.querySelector('#preview-overlay').style.display = 'flex';
				});
			});

			// Add click event listener for the close button
			document.querySelector('#close-preview-button').addEventListener('click', function () {
				document.querySelector('#preview-overlay').style.display = 'none';
			});
			document.querySelector('#preview-overlay').addEventListener('click', function () {
				document.querySelector('#preview-overlay').style.display = 'none';
			});
		});


	const modal = document.getElementById('modal');
	const select = document.getElementById('choices');
	const btn = document.getElementById('show-modal-btn');
	const link = document.getElementById('selected-choice');

	btn.addEventListener('click', function () {
		modal.style.display = "flex";
	});
	let city_api;
	// Get the choices from the API
	fetch('http://localhost:8000/city/')
		.then(response => response.json())
		.then(data => {
			data.results.forEach(choice => {
				const option = document.createElement('option');
				option.value = choice.id;
				option.text = choice.name;
				select.appendChild(option);
			});
		})
		.catch(error => console.error(error));

	// Update the text under the link when a choice is selected
	select.addEventListener('change', function () {
		link.innerHTML = this.options[this.selectedIndex].text;
		city_api = this.options[this.selectedIndex].text;
		let center = [55.75399399999374, 37.62209300000001];
		fetch('http://localhost:8000/city/')
			.then(response => response.json())
			.then(data => {
				data.results.forEach(choice => {
					if (choice.name == city_api) {
						center = [choice.map_x, choice.map_y]
						document.querySelector('#phone_number').innerHTML = choice.phone_number
					}



				});
				function init() {
					let map = new ymaps.Map('YMapsID', {
						center: center,
						zoom: 10
					});

				}

				ymaps.ready(init);
			})
			.catch(error => console.error(error));
		let only_1 = document.getElementsByClassName('ymaps-2-1-79-map')
		for (let i = 0; i < only_1.length - 1; i++) {
			console.log(only_1[i])
			only_1[i].style.display = 'none'

		}




	});
	document.querySelector('#close-modal-btn').addEventListener('click', function () {
		document.querySelector('#modal').style.display = 'none';
	});


	let city = document.querySelector('#selected-choice').textContent
	let center = [55.75399399999374, 37.62209300000001];

	function init() {
		let map = new ymaps.Map('YMapsID', {
			center: center,
			zoom: 8
		});

		// 	map.controls.remove('geolocationControl'); // удаляем геолокацию
		//   map.controls.remove('searchControl'); // удаляем поиск
		//   map.controls.remove('trafficControl'); // удаляем контроль трафика
		//   map.controls.remove('typeSelector'); // удаляем тип
		//   map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
		//   map.controls.remove('zoomControl'); // удаляем контрол зуммирования
		//   map.controls.remove('rulerControl'); // удаляем контрол правил
		//   map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
	}

	ymaps.ready(init);



	const burgerMenuBtn = document.querySelector('.burger-menu-btn');
	const burgerMenu = document.querySelector('.burger-menu');
	const burgerMenuList = document.querySelector('.burger-menu__list');

	burgerMenuBtn.addEventListener('click', function () {
		burgerMenu.classList.toggle('show-burger-menu');
	});
	// burgerMenuList.addEventListener('click', function () {
	// 	burgerMenu.classList.toggle('show-burger-menu');
	// });

};