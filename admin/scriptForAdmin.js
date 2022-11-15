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
const addPic = document.querySelector('#addPic')



	 
//loging to admin panel
login.addEventListener('click', (e) => {
	e.preventDefault();
	if (adminName.value==='Lukas' && password.value==='123'){
		loginDiv.style.display= 'none';
		mainBtns.style.display= 'block';
		forAdmin.style.display= "block";
	} else {
		console.log('not found')
		error.style.display= 'block';
		password.value='';
	}
})

logout.addEventListener('click', () => {
	loginDiv.style.display= 'block';
	mainBtns.style.display= 'none';
	forAdmin.style.display= "none";
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
//loging to admin panel


const addProduct = (color, name, sizes, description, price, picUrl, type) => {
	console.log(color, name, sizes, description, price, picUrl, type)
	fetch(`https://testapi.io/api/lukasnvc/resource/Eshop`,
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
		console.log('Fetching data : ', result);
		getData()
		products.innerHTML=''
	})
}

const editProduct = (id, color, name, sizes, description, price, picUrl, type) => {
	fetch(`https://testapi.io/api/lukasnvc/resource/Eshop/${id}`,
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
	pictures.push(picUrl.value);
	const img = document.createElement('img');
	img.setAttribute('class', 'prw');
	img.src= picUrl.value;
	picUrl.value= '';
	pics.appendChild(img);
	console.log(pictures)
})

addproductBtn.addEventListener('click', (e) => {
e.preventDefault()
const picsJson = JSON.stringify(pictures);
const size = [sizeS.value, sizeM.value, sizeL.value, sizeXL.value]
const sizes = JSON.stringify(size);
console.log(sizes)
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
  fetch('https://testapi.io/api/lukasnvc/resource/Eshop',
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
	draw(data)
	console.log('GOT this data to draw :', data)
})
}

getData()

const deletItem = (id) => {
  fetch(`https://testapi.io/api/lukasnvc/resource/Eshop/${id}`,
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
		edit.textContent= 'Update item';

		const deleteBtn = document.createElement('button');
		deleteBtn.setAttribute('class', 'deleteBtn');
		deleteBtn.textContent= 'Delete item';

		div.appendChild(edit);
		div.appendChild(deleteBtn);
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
		parsedPics.forEach(element => {
			const drawnpic = document.createElement('img');
			drawnpic.src= element;
			div.appendChild(drawnpic)
		})

		edit.addEventListener('click', (e)=> {
			e.preventDefault();
			console.log()
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
	console.log(newSizes)
	editProduct(id, color, name, jsonNewSizes, description, price, jsonNewPics, type);
} 