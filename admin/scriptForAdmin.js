const loginDiv = document.querySelector('#loginDiv');
const logout = document.querySelector('#logout');
const adminName = document.querySelector('#adminName');
const password = document.querySelector('#password');
const login = document.querySelector('#submit');
const forAdmin = document.querySelector('#forAdmin');
const addProducts = document.querySelector('#addProducts');
const products = document.querySelector('#products');
const error = document.querySelector('#error');
const createProduct = document.querySelector('#createProduct');
const type = document.querySelector('#type');
const color = document.querySelector('#color');
const productName = document.querySelector('#productName');
const sizeS = document.querySelector('#sizeS');
const sizeM = document.querySelector('#sizeM');
const sizeL = document.querySelector('#sizeL');
const sizeXL = document.querySelector('#sizeXL');
const description = document.querySelector('#description');
const price = document.querySelector('#price');
const picUrl = document.querySelector('#picUrl');
const addproductBtn = document.querySelector('#addProductBtn');
const closeAdd = document.querySelector('#closeAdd')
const showAddBtn = document.querySelector('#showAddBtn');
const mainBtns = document.querySelector('#mainBtns');
const pics = document.querySelector('#pics');
const addPic = document.querySelector('#addPic');
const filterColor = document.querySelector('#filterColor');
const filterSearch = document.querySelector('#filterSearch');
const searchesFields = document.querySelector('#searchesFields');
const filterCategorie = document.querySelector('#filterCategorie');
const closeAddSlide = document.querySelector('#closeAddSlide');
const addSlidePics = document.querySelector('#addSlidePics');
const sliderPic = document.querySelector('#sliderPic');
const allSliderPics = document.querySelector('#allSliderPics');
const addToSliderBtn = document.querySelector('#addToSliderBtn');
const showAddSlideBtn = document.querySelector('#showAddSlideBtn');

showAddSlideBtn.addEventListener('click', () => {
	addSlidePics.style.display= 'block';
})

closeAddSlide.addEventListener('click', () => {
	addSlidePics.style.display= 'none';
})

addToSliderBtn.addEventListener('click', (e) => {
	e.preventDefault();
	addSlide(sliderPic.value)
})


const getSliderData = () => {
  fetch('	https://testapi.io/api/lukasnvc/resource/sliderPics',
{
  method: 'GET',
  headers: {
    'Content-Type':
    'application/json'
  }
})
.then((response) => {
  if (response.ok) {
    return response.json()
  }
})
.then((result) => {
	return result.data
})
.then((data) => {
	allSliderPics.innerHTML='';
	sliderPic.value='';
	drawSlider(data)
})
}

const deleteSliderData = (id) => {
  fetch(`https://testapi.io/api/lukasnvc/resource/sliderPics/${id}`,
	{
		method: 'DELETE',
		headers: {
			'Content-Type':
			'application/json'
		}
	})
	.then((response) => {
		if (response.ok) {
			getSliderData();
		}
	})
}


const addSlide = (item) => {
	fetch(`https://testapi.io/api/lukasnvc/resource/sliderPics`,
	{
		method: 'POST',
		headers: {
			'Content-Type':
			'application/json'
		},
		body: JSON.stringify({
			pics: `${item}`
		}) 
	})
	.then((response) => {
		if (response.ok) {
			sliderPic.textContent='';
			allSliderPics.innerHTML='';
			getSliderData();
		return response.json();
		}
	})
}


const drawSlider = (data) => {
	data.forEach(element => {
		const sliderPic = document.createElement('img');
		const deleteSlidePic = document.createElement('div');
		deleteSlidePic.setAttribute('class', 'deleteSlide');
		deleteSlidePic.textContent = 'Delete';

		sliderPic.src=element.pics;
		sliderPic.setAttribute('class', 'prw');

		const divSlide = document.createElement('div');
		divSlide.setAttribute('class', 'divSlide');
		divSlide.appendChild(sliderPic);
		divSlide.appendChild(deleteSlidePic);
		allSliderPics.appendChild(divSlide);

		deleteSlidePic.addEventListener('click', () => {
			deleteSliderData(element.id);
		})
	})
}

getSliderData()

fetch('	https://testapi.io/api/lukasnvc/resource/adminLogin',
	{
		method: 'GET',
		headers: {
			'Content-Type':
			'application/json'
		}
	})
	.then((response) => {
		if (response.ok) {
			return response.json()
		}
	})
	.then((result) => {
		return result.data
	})
	.then((data) => {
		loginCheck(data)
})

const loginCheck = (data) => {
	login.addEventListener('click', (e) => {
		e.preventDefault();
		data.forEach(element => {
			if (element.username===adminName.value && element.password===password.value) {
				loginDiv.style.display= 'none';
				mainBtns.style.display= 'block';
				forAdmin.style.display= "block";
				searchesFields.style.display= 'flex';
			} else {
				error.style.display= 'block';
			}
		})
		password.value='';
	})
}

logout.addEventListener('click', () => {
	loginDiv.style.display= 'block';
	mainBtns.style.display= 'none';
	forAdmin.style.display= "none";
	searchesFields.style.display= 'none';
	adminName.value= '';
	password.value= '';
})

showAddBtn.addEventListener('click', () => {
	addProducts.style.display= 'block';
	showAddBtn.style.display= 'none';
})

closeAdd.addEventListener('click', () => {
	addProducts.style.display= 'none';
	showAddBtn.style.display= 'inline-block';
})


const addProduct = (color, name, sizes, description, price, picUrl, type) => {

	fetch(`https://testapi.io/api/lukasnvc/resource/NewEshop`,
	{
		method: 'POST',
		headers: {
			'Content-Type':
			'application/json'
		},
		body: JSON.stringify({
			color: `${color}`,
			name: `${name}`,
			size: `${sizes}`,
			reserve:  JSON.stringify([0,0,0,0]),
			description: `${description}`,
			price: `${price}`,
			picUrl: `${picUrl}`,
			type: `${type}`
		}) 
	})
	.then((response) => {
		if (response.ok) {
			return response.json()
		}
	})
	.then((result) => {
		getData()
		products.innerHTML=''
	})
}

const editProduct = (id, color, name, sizes, description, price, picUrl, type) => {
	fetch(`https://testapi.io/api/lukasnvc/resource/NewEshop/${id}`,
	{
		method: 'PUT',
		headers: {
			'Content-Type':
			'application/json'
		},
		body: JSON.stringify({
			color: `${color}`,
			name: `${name}`,
			size: `${sizes}`,
			reserve: JSON.stringify([0,0,0,0]),
			description: `${description}`,
			price: `${price}`,
			picUrl: `${picUrl}`,
			type:  `${type}`
		}) 
	})
	.then((response) => {
		if (response.ok) {
			return response.json()
		}
	})
	.then((result) => {
		console.log('Fetching data : ', result);
		products.innerHTML='';
		getData()
	})
}

let pictures = [];
	
addPic.addEventListener('click', (e) => {
	e.preventDefault();
	if (!picUrl.value=='') {
	pictures.push(picUrl.value);
	const img = document.createElement('img');
	img.setAttribute('class', 'prw');
	img.src= picUrl.value;
	picUrl.value= '';
	pics.appendChild(img);
}
})

addproductBtn.addEventListener('click', (e) => {
e.preventDefault()
const picsJson = JSON.stringify(pictures);
const size = [sizeS.value, sizeM.value, sizeL.value, sizeXL.value]
const sizes = JSON.stringify(size);
addProduct(color.value, productName.value, sizes, description.value, price.value, picsJson, type.value)

color.value= '';
productName.value= '';
sizeS.value= '';
sizeM.value= '';
sizeL.value= '';
sizeXL.value= '';
description.value= '';
picUrl.value= '';
type.value= '';
addProducts.style.display= 'none';
showAddBtn.style.display= 'inline-block';
pictures=[];
pics.innerHTML='';
})

const getData = () => {
  fetch('https://testapi.io/api/lukasnvc/resource/NewEshop',
{
  method: 'GET',
  headers: {
    'Content-Type':
    'application/json'
  }
})
.then((response) => {
  if (response.ok) {
    return response.json()
  }
})
.then((result) => {
	return result.data
})
.then((data) => {
	draw(data);
	categorieSearch(data);
	colorSearch(data);
	search(data);
})
}

getData()

const deletItem = (id) => {
  fetch(`https://testapi.io/api/lukasnvc/resource/NewEshop/${id}`,
{
  method: 'DELETE',
  headers: {
    'Content-Type':
    'application/json'
  }
})
.then((response) => {
  if (response.ok) {
		products.innerHTML='';
		getData()
  }
})
}


const draw = (data) => {

	data.forEach(element => {
		const div = document.createElement('div');
		div.setAttribute('class', 'drawnProduct');

		const inputPic = document.createElement('input');
		inputPic.setAttribute('placeholder', 'enter Url');

		const inputType = document.createElement('input');
		inputType.setAttribute('class', 'drawType')
		inputType.value= element.type;

		const inputColor = document.createElement('input');
		inputColor.setAttribute('class', 'drawnColor');
		inputColor.value= element.color;

		const inputName = document.createElement('input');
		inputName.setAttribute('class', 'drawnName');
		inputName.value= element.name;

		const inputDescription = document.createElement('input');
		inputDescription.setAttribute('class', 'drawnDescription');
		inputDescription.value = element.description;

		const inputPrice  = document.createElement('input');
		inputPrice.setAttribute('class', 'drawnPrice');
		inputPrice.value = element.price;

		const edit = document.createElement('button');
		edit.setAttribute('class', 'editBtn');
		edit.textContent= 'Update info';

		const addPic = document.createElement('button');
		addPic.setAttribute('class', 'addPic');
		addPic.textContent= 'Add pic'

		const deleteBtn = document.createElement('button');
		deleteBtn.setAttribute('class', 'deleteBtn');
		deleteBtn.textContent= 'Delete item';

		div.appendChild(edit);
		div.appendChild(addPic);
		div.appendChild(deleteBtn);
		div.appendChild(inputPic);
		div.appendChild(inputType);
		div.appendChild(inputColor);
		div.appendChild(inputName);
		div.appendChild(inputDescription);
		div.appendChild(inputPrice);

		const sizes = element.size;
		const parsedSizes = JSON.parse(sizes)
		parsedSizes.forEach((size, index) => {
			index= index+1;
			const inputSize = document.createElement('input');
			inputSize.setAttribute('class', 'drawnSize');
			inputSize.setAttribute('id', `size${element.id}${index}`)
			inputSize.value = size
			div.appendChild(inputSize)
		})


		const pics = element.picUrl;
		
		const parsedPics = JSON.parse(pics)
		parsedPics.forEach((pic, picIndex) => {
			const drawnpic = document.createElement('img');
			const delPic = document.createElement('button');
			delPic.setAttribute('class', 'picDelete');
			delPic.textContent= 'delete';
			drawnpic.src= pic;
			const forPic = document.createElement('div');

			forPic.appendChild(delPic);
			forPic.appendChild(drawnpic);
			div.appendChild(forPic);
			delPic.addEventListener('click', () => {
				parsedPics.splice(picIndex,1);
				editItem(element.id, parsedPics, inputColor.value, inputName.value, inputDescription.value, inputPrice.value, inputType.value)
			})
		})


		addPic.addEventListener('click', () => {
			parsedPics.push(inputPic.value);
			inputPic.innerHTML='';
			editItem(element.id, parsedPics, inputColor.value, inputName.value, inputDescription.value, inputPrice.value, inputType.value)
		}) 

		edit.addEventListener('click', (e)=> {
			e.preventDefault();
			editItem(element.id, parsedPics, inputColor.value, inputName.value, inputDescription.value, inputPrice.value, inputType.value)
		})

		deleteBtn.addEventListener('click', () => {
			deletItem(element.id);
		})

		products.appendChild(div)
	});
}


const editItem = (id, pics, color, name, description, price, type) => {
	const newS = document.querySelector(`#size${id}1`);
	const newM = document.querySelector(`#size${id}2`);
	const newL = document.querySelector(`#size${id}3`);
	const newXL = document.querySelector(`#size${id}4`);
	const newSizes = [newS.value, newM.value, newL.value, newXL.value];
	const jsonNewSizes = JSON.stringify(newSizes);

	const jsonNewPics = JSON.stringify(pics);
	editProduct(id, color, name, jsonNewSizes, description, price, jsonNewPics, type);
} 

const search = (data) => {
	filterSearch.addEventListener('keyup', (e) => {
	const b = e.target.value.toLowerCase();
	const filteredProducts = data.filter((products) => {
		return (
			products.name.toLowerCase().includes(b)
		);
	})
	if (b){
		products.innerHTML=null;
		draw(filteredProducts);
		} else {
		products.innerHTML=null;
		getData()
		}
	})
}
	
const colorSearch = (data) => {
	filterColor.addEventListener('change', (e) => {
		e.preventDefault();
		const value = filterColor.value;
		const filteredColor = data.filter((products) => {
			return (
				products.color.includes(value)
			);
		})
		if (value) {
			products.innerHTML=null;
			draw(filteredColor);
		} else {
			products.innerHTML=null;
			getData()
		}
	})
}

const categorieSearch = (data) => {
	filterCategorie.addEventListener('change', (e) => {
		e.preventDefault();
		const value = filterCategorie.value;
		const filteredCategories = data.filter((product) => {
			return (
				product.type === value
			);
		})
		if (value) {
			products.innerHTML=null;
			draw(filteredCategories);
		} else {
			products.innerHTML=null;
			getData();
		}
	})
}

mainIndex.addEventListener('click', (e) => {
	e.preventDefault()
	localStorage.setItem('categorie', 'all');
	window.location.href = '../index.html';
})



