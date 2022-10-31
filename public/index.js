

const nftContainer = document.querySelector("#nft-container")
const cartItem = document.querySelector(".cart-items")
const cart = document.querySelector("#cart")
const search = document.querySelector("#search")
const nameInput = document.querySelector(".name-input")
const cartDiv = document.querySelector(".cart-items")
const header = document.querySelector("#head")
const submitBtn = document.querySelector("#sign-up")
const emailInput = document.querySelector(".email")
const signText = document.querySelector(".sign-text")






function clearNft() {
    nftContainer.innerHTML = ``
}

function createNftCard(nft) {
    const allNft = document.createElement("div")
    allNft.classList.add("nft-card")
    allNft.setAttribute("key",nft.id)
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
    })
    
    allNft.appendChild(newBtn)
    nftContainer.appendChild(allNft)
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
    })
        addedToCart.appendChild(delBtn)
        cartDiv.appendChild(addedToCart)
}



function deleteCart(event){
    event.target.parentNode.remove()
    

}





function getAllNft() {
    axios.get('http://localhost:4000/nfts')
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
    axios.get(`http://localhost:4000/nfts/${nameInput.value}`)
    .then(response => {
        console.log(response.data)
        response.data.forEach(nft => createNftCard(nft))
    })
    
    }else { alert (`Please Enter a valid NFT name`)}
    nameInput.value = ``
}

// function darkTheme(){
//     header.classList.add("dark-theme")
// }

// darkTheme()

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
    axios.post('http://localhost:4000/emails', body)
        .then(()=>{
            emailInput.value = ``
        signText.textContent = "Thanks for signing up for our Newsletter"
        })
    
    

}



submitBtn.addEventListener("click", submit)

search.addEventListener("click",getNft)
cart.addEventListener("click", toggleCart)




