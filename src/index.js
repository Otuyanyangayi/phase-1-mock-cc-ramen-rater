// write your code here
document.addEventListener("DOMContentLoaded", () => {
    const menuContainer = document.getElementById("ramen-menu")
    const detailContainer = document.getElementById("ramen-detail")
    const newRamenform = document.getElementById("new-ramen")

    fetch("http://localhost:3000/ramens")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        data.forEach(element => {
            loadMenu(element)

            if(element.id === 1){
                displayInfo(element)
            }
        });
    })

    function loadMenu(item) {
        let image = document.createElement("img")
        image.setAttribute("src", `${item.image}`)
        menuContainer.append(image)

        image.addEventListener("click", () => {
            displayInfo(item)
        })
    }

    function displayInfo(item) {
        detailContainer.querySelector("img").setAttribute("src", `${item.image}`);
        detailContainer.querySelector("h2").innerText = item.name;
        detailContainer.querySelector("h3").innerText = item.restaurant;
        document.getElementById("rating-display").innerText = item.rating;
        document.getElementById("comment-display").innerText = item.comment;
    }

    newRamenform.addEventListener("submit", (e) => {
        e.preventDefault()
        let data = {
            name: document.getElementById("new-name").value,
            restaurant: document.getElementById("new-restaurant").value,
            image: document.getElementById("new-image").value,
            rating: document.getElementById("new-rating").value,
            comment: document.getElementById("new-comment").value
        }
        fetch("http://localhost:3000/ramens", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => loadMenu(data))

        newRamenform.reset()
    })
})