const nftContainer = document.querySelector("#nft-container")
const cartItem = document.querySelector(".cart-items")
const cart = document.querySelector("#cart")
const search = document.querySelector("#search")
const nameInput = document.querySelector(".name-input")
const cartDiv = document.querySelector(".items")
const header = document.querySelector("#head")
const submitBtn = document.querySelector("#sign-up")
const emailInput = document.querySelector(".email")
const signText = document.querySelector(".sign-text")
const body = document.querySelector("body")
const footer = document.querySelector("footer")
const nftCard = document.querySelector(".nft-card")
const circleContainer = document.querySelector(".cicle-container")
const checkOutBtn = document.querySelector(".check-out")
const cartCard = document.querySelector(".cart-card")
const cartKount = document.querySelector(".kount")
const cartItems = document.querySelector(".cart-items")



function clearNft() {
    nftContainer.innerHTML = ``
}



function createNftCard(nft) {
    const allNft = document.createElement("div")
    allNft.classList.add(`nft-${nft.id}`)
    allNft.classList.add("nft-card")
    const nftCard = 
    `<img class="nft-image" src=${nft.imageurl} alt="nft image"/>
    <p>${nft.name}</p>
    `
    allNft.innerHTML = nftCard
    let newBtn = document.createElement("button")
    newBtn.classList.add("add-button")
    newBtn.textContent = "Add to Cart"
    newBtn.addEventListener("click", function () {
        addToCart(nft)
        cartCount()
    })
   
    
    allNft.appendChild(newBtn)
    nftContainer.appendChild(allNft)
}

let count = 0;
function cartCount(){
    
    count = count + 1;
    if(count===1){
    cartKount.textContent="1"
    }else if(count > 6) {
        cartItems.classList.add("extend")
        cartKount.textContent = count;
    }else{
        cartKount.textContent = count;
    }
}

function cartReduce(){
    count = count - 1;
    if(count === 0){
        cartKount.textContent ="0"
    }else{
        cartKount.textContent = count;
    }
}



function addToCart(nft){
    const addedToCart = document.createElement("div")
        addedToCart.classList.add(`nft-${nft.id}`)
        addedToCart.classList.add("cart-card")
        addedToCart.setAttribute("data-nft",nft.id)
        const cartCard =
        `<img class="cart-image" src=${nft.imageurl}/>
        <p>${nft.name}</p>
        `
        addedToCart.innerHTML = cartCard

    let delBtn = document.createElement("button")
    delBtn.classList.add("delete-btn")
    delBtn.textContent = "X"

    delBtn.addEventListener("click", function (event) {
        event.preventDefault()
        deleteCart(event)
        cartReduce()
    })
   
        addedToCart.appendChild(delBtn)
        cartDiv.appendChild(addedToCart)

}


checkOutBtn.addEventListener("click", function(event){
    event.preventDefault()
    cartDiv.innerHTML=""
    count = 0
    cartKount.textContent = 0
    alert ("Thank you for shopping with us today, your nfts will be delivered to your Eth wallet shortly");
    cartItem.classList.toggle("open")

})


function deleteCart(event){
    event.target.parentNode.remove()
}





function getAllNft() {
    axios.get('/nfts')
    .then(res => {
        res.data.forEach(nft => {
            createNftCard(nft)
        })
    })
    .catch(err => console.log(err))
}
getAllNft()

function toggleCart(event){
    event.preventDefault()
    cartItem.classList.toggle("open")
}

function getNft(event) {
    event.preventDefault()
    clearNft()
    if(nameInput.value != ``){
    axios.get(`/nfts/${nameInput.value}`)
    .then(response => {
        console.log(response.data)
        response.data.forEach(nft => createNftCard(nft))
    })
    
    }else { alert (`Please Enter a valid NFT name`)}
    nameInput.value = ``
}

function darkTheme(){
    body.classList.toggle("dark-theme");
    header.classList.toggle("theme-border");
    footer.classList.toggle("theme-border");
    nftCard.classList.toggle("theme-border");
}


function submit(e){
    e.preventDefault()
    if(!emailInput.value){
        alert ("you must enter a valid email")
        return
    }
    console.log(emailInput.value)
    let body = {
        email: emailInput.value
    }
    axios.post('/emails', body)
        .then(()=>{
            emailInput.value = ``
        signText.textContent = "Thanks for signing up for our Newsletter"
        })
}



function changeCircle(){
    circleContainer.classList.toggle("change-flex")
    darkTheme()
}


circleContainer.addEventListener("click",changeCircle)



submitBtn.addEventListener("click", submit)

search.addEventListener("click",getNft)
cart.addEventListener("click", toggleCart)




