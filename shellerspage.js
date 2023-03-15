document.getElementById('addForm').addEventListener("submit", addproduct);
let electronics = document.getElementById('electronics');
let food = document.getElementById('food');
let skincare = document.getElementById('skincare');
let wearables = document.getElementById('wearables');

electronics.addEventListener("click", removeItem);
food.addEventListener("click", removeItem);
skincare.addEventListener("click", removeItem);
wearables.addEventListener("click", removeItem);

async function getdata() {
    try {
        let res = await axios.get("https://crudcrud.com/api/afbcb76495d547f480ca96da5635c6c1/crud")
        for (let i = 0; i < res.data.length; i++) {
            let Obj = res.data[i];
            showuser(Obj)
        }
    } catch (err) {
        console.log(err)
    }
}
getdata()

async function addproduct(e) {
    e.preventDefault();
    let amount = document.getElementById('amount').value;
    let product = document.getElementById('product').value;
    let category = document.getElementById('category').value;

    amount = amount.toString()
    product = product.toString()
    category = category.toString()
    if (amount === "" || product === "") {
        alert('Please enter correct details !')
    } else {
        try {
            const Obj = {
                amount,
                product,
                category
            }
            let res = await axios.post("https://crudcrud.com/api/afbcb76495d547f480ca96da5635c6c1/crud", Obj)
            let ans = res.data;
            showuser(ans)
        } catch (err) {
            console.log(err)
        }
    }
}
function showuser(Obj) {
    let li = document.createElement("li");

    li.id = Obj._id;
    let amount = document.createTextNode(Obj.amount);
    li.appendChild(amount);
    li.appendChild(document.createTextNode(' - '));
    let product = document.createTextNode(Obj.product);
    li.appendChild(product);
    li.appendChild(document.createTextNode(' - '));
    let category = document.createTextNode(Obj.category);
    li.appendChild(category);

    // create delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    deleteBtn.appendChild(document.createTextNode('delete'));
    li.appendChild(deleteBtn);
    if (Obj.category === "electronics") {
        electronics.appendChild(li)
    } else if (Obj.category === "food") {
        food.appendChild(li)
    } else if (Obj.category === "skincare") {
        skincare.appendChild(li)
    } else if (Obj.category === "wearables") {
        wearables.appendChild(li)
    }
}

async function removeItem(e) {
    if (e.target.classList.contains('delete')) {
        let li = e.target.parentElement;
        let id = li.id
        try {
            let res = await axios.delete(`https://crudcrud.com/api/afbcb76495d547f480ca96da5635c6c1/crud/${id}`)
            const id1 = li.parentElement.id
            if (id1 === "electronics") {
                electronics.removeChild(li)
            } else if (id1 === "food") {
                food.removeChild(li)
            } else if (id1 === "skincare") {
                skincare.removeChild(li)
            } else if (id1 === "wearables") {
                wearables.removeChild(li)
            }
        } catch (err) {
            console.log(err)
        }
    }
}