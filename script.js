const productData = {
	product: {
		id: 6937548554342,
		title: "Embrace Sideboard",
		description:
			"<p>The Embrace Sideboard is a stylish wear. With a top cloth designed to provide superior protection and look great, this storage solution is both functional and attractive. It fits seamlessly into any home decor, with clean lines and a timeless look. Crafted from premium materials for a combination of style, durability, and reliability.</p>",
		vendor: "Marmeto",
		product_type: "Cloth",
		price: "$12999.00",
		compare_at_price: "$19999.00",
		options: [
			{
				name: "Color",
				position: 1,
				values: [
					{
						Yellow: "#ECDECC",
					},
					{
						Green: "#BBD278",
					},
					{
						Blue: "#BBC1F8",
					},
					{
						Pink: "#FFD3F8",
					},
				],
			},
			{
				name: "Size",
				position: 2,
				values: ["Small", "Medium", "Large", "Extra large", "XXL"],
			},
		],
		images: [
			{
				src: "img5.jpeg",
			},
			{
				src: "img3.jpeg",
			},
			{
				src: "img2.jpeg",
			},
			{
				src: "img4.jpeg",
			},
		],
	},
};

const selectedVariant = {
	color: "Yellow",
	size: "Small",
	quantity: 1,
};

document.addEventListener("DOMContentLoaded", () => {
	const product = productData.product;
	document.getElementById("vendor").innerText = product.vendor;
	document.getElementById("title").innerText = product.title;
	document.getElementById(
		"price"
	).innerHTML = `
    <div id="compare-price-discount">
    <span id="current-price">${product.price}</span>
            <span id="discount">${calculateDiscount(
							product.price,
							product.compare_at_price
						)}% Off</span>
    </div>
        <span id="compare-at-price">${product.compare_at_price}</span>
    `;

	document.getElementById("description").innerHTML = product.description;
	document.getElementById("main-image").src = product.images[0].src;

	const thumbnails = document.getElementById("thumbnails");
	product.images.forEach((image, index) => {
		const img = document.createElement("img");
		img.src = image.src;
		img.onclick = () => changeImage(image.src);
		if (index === 0) {
			img.classList.add("active");
		}
		thumbnails.appendChild(img);
	});

	const colorOptions = document.getElementById("color-options");
	product.options[0].values.forEach((color) => {
		const colorName = Object.keys(color)[0];
		const button = document.createElement("button");
		// button.textContent = colorName;
		button.style.backgroundColor = color[colorName];
		button.onclick = () => selectOption("color", colorName);
		if (colorName === selectedVariant.color) {
			button.classList.add("active");
		}
		colorOptions.appendChild(button);
	});

	const sizeOptions = document.getElementById("size-options");
product.options[1].values.forEach((size) => {
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "size";
    input.value = size;
    input.id = `size-${size.replace(" ", "-").toLowerCase()}`;
    input.onclick = () => selectOption("size", size);
    if (size === selectedVariant.size) {
        input.checked = true;
    }

    const label = document.createElement("label");
    label.textContent = size;
    label.setAttribute("for", `size-${size.replace(" ", "-").toLowerCase()}`);

    const optionDiv = document.createElement("div");
    optionDiv.appendChild(input);
    optionDiv.appendChild(label);

    sizeOptions.appendChild(optionDiv);
});

});

function changeImage(src) {
	document.getElementById("main-image").src = src;
	document
		.querySelectorAll(".thumbnails img")
		.forEach((img) => img.classList.remove("active"));
	event.target.classList.add("active");
}

function selectOption(type, value) {
	document
		.querySelectorAll(`#${type}-options button`)
		.forEach((button) => button.classList.remove("active"));
	event.target.classList.add("active");
	selectedVariant[type] = value;
}

function changeQuantity(amount) {
	let quantity = parseInt(document.getElementById("quantity").value);
	quantity = Math.max(1, quantity + amount);
	document.getElementById("quantity").value = quantity;
	selectedVariant.quantity = quantity;
}

function addToCart() {
	const message = `Embrace Sideboard with Color ${selectedVariant.color} and Size ${selectedVariant.size} added to cart`;
	const cartMessage = document.getElementById("cart-message");
	cartMessage.innerText = message;
	cartMessage.style.display = "block";
}

function calculateDiscount(price, compareAtPrice) {
	const originalPrice = parseFloat(compareAtPrice.replace("$", ""));
	const currentPrice = parseFloat(price.replace("$", ""));
	return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}
