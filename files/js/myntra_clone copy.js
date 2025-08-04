let Items_Container = document.querySelector(".items_container");
let NO_OF_ITEMS = document.querySelector(".Cart_items_count");
let bagItems = [];
WhenPageIsLoad();

function WhenPageIsLoad() {
  SavePage();
  displayItemsOnHomePage();
  NoOfCartItems();
  updateIconVisibility(); // Call to update visibility on load
}

function displayItemsOnHomePage(filteredItems = items) {
  let innerHTML = "";
  filteredItems.forEach((item) => {
    innerHTML += `<article class="item_container">
      <img src="${item.item_image}" class="IMAGES" alt="product pic" />
      <div class="rating_reviews">
        <div class="ratings">${item.rating.stars} ★</div>
        <div>|</div>
        <div class="reviews">${item.rating.reviews} Reviews</div>
      </div>
      <div class="brand_name">
      <div >${item.brand_name}</div>
        <div class="remove_icon_wrapper">
          <img onclick="removeFromBag('${item.id}')"
            src="/myntra_clone/pics/dustbin.png"
            alt=""
            class="remove_from_bag"
            data-item-id="${item.id}"
          />
          <span class="remove_from_bag_overlay">Remove from Bag</span>
        </div>
      </div>
      <div class="item_name">${item.item_name}</div>
      <div class="price_tags">
        <div class="final_price">
          <div class="price">Rs ${item.current_price}</div>
        </div>
        <div class="original_price">
          <div class="price">Rs ${item.original_Price}</div>
        </div>
        <div class="percentile_cut">
          <div class="percentile">(${item.percentile_cutoff} % off)</div>
        </div>
      </div>
      <button class="add_to_bag" onclick="addToBag('${item.id}')" ${
      bagItems.includes(item.id) ? "disabled" : ""
    }>${AddedToBagChangeFuctionality(item.id)}</button>
    </article>`;
  });
  Items_Container.innerHTML = innerHTML;
  updateIconVisibility();
}

function addToBag(itemID) {
  if (!bagItems.includes(itemID)) {
    bagItems.push(itemID);
    localStorage.setItem("bagItems", JSON.stringify(bagItems));
  }
  WhenPageIsLoad();
}

function NoOfCartItems() {
  if (bagItems.length > 0) {
    NO_OF_ITEMS.style.display = "flex";
    NO_OF_ITEMS.innerText = bagItems.length;
  } else {
    NO_OF_ITEMS.style.display = "none";
  }
}

function SavePage() {
  bagItems = JSON.parse(localStorage.getItem("bagItems") || "[]");
}

function AddedToBagChangeFuctionality(itemID) {
  if (bagItems.includes(itemID)) {
    return "added to bag";
  } else {
    return "add to bag";
  }
}

function removeFromBag(itemID) {
  bagItems = bagItems.filter((bagItemID) => bagItemID != itemID);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  WhenPageIsLoad();
}

function updateIconVisibility() {
  const allDustbinIcons = document.querySelectorAll(".remove_from_bag");
  allDustbinIcons.forEach((icon) => {
    const currentIconItemId = icon.getAttribute("data-item-id");
    if (currentIconItemId && bagItems.includes(currentIconItemId)) {
      icon.style.display = "inline"; // Show if in bag
    } else {
      icon.style.display = "none"; // Hide if not in bag
    }
  });
}

function searchItems() {
  const searchInput = document.querySelector(".search_bar input");
  const searchTerm = searchInput.value.toLowerCase();
  const filteredItems = items.filter(
    (item) =>
      item.item_name.toLowerCase().includes(searchTerm) ||
      item.brand_name.toLowerCase().includes(searchTerm)
  );
  displayItemsOnHomePage(filteredItems);
}
