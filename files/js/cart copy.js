let displayBagSummary = document.querySelector(".amount_display_card");

let NO_OF_ITEMS = document.querySelector(".Cart_items_count");

let cartItemsContainer = document.querySelector(".container");

let bag_items_obj = [];

let BagSummaryElement = document.querySelector(".amount_display_card");

let between_line = document.querySelector(".line");

let Mian_element = document.querySelector(".Main");

let seperateProductCountElement = document.querySelectorAll(
  ".display_seperate_items"
);

// let bagItems = []; // Add bagItems variable

onLoad();

function onLoad() {
  loadBagItemsFromStorage();
  loadTheBagItems();
  displayTheItemsOnPage();
  noOfSameItems();
  noOfCartItems();
  displayThePricing();
}

function noOfCartItems() {
  if (bagItems.length > 0) {
    NO_OF_ITEMS.style.display = "flex";
    NO_OF_ITEMS.innerText = bagItems.length;
  } else {
    NO_OF_ITEMS.style.display = "none";
  }
}
// Add function to load bagItems from localStorage
function loadBagItemsFromStorage() {
  bagItems = JSON.parse(localStorage.getItem("bagItems") || "[]");
}

function loadTheBagItems() {
  bag_items_obj = bagItems.map((itemID) => {
    for (let i = 0; i < items.length; i++) {
      if (itemID == items[i].id) {
        return items[i];
      }
    }
  });

  console.log(bag_items_obj);
}

function displayTheItemsOnPage() {
  let innerHTML = "";
  const displayedItems = {};

  bag_items_obj.forEach((item) => {
    if (!displayedItems[item.id]) {
      innerHTML += generateTheHTML(item);
      displayedItems[item.id] = true;
    }
  });
  cartItemsContainer.innerHTML = innerHTML;

  let plusIconElement = document.querySelectorAll(".plusItemCount");

  let minusIconElement = document.querySelectorAll(".minusItemCount");

  // plusIconElement.forEach((plusButton) => {
  //   plusButton.addEventListener("click", () => {
  //     alert("u cliked on plus button");
  //   });
  // });

  // minusIconElement.forEach((minusButton) => {
  //   minusButton.addEventListener("click", () => {
  //     alert("u cliked on minus button");
  //   });
  // });
}

function generateTheHTML(item) {
  return `<article class="item_container">
      <img class="IMAGES" src="${item.item_image}" alt="" />
      <article class="col2">
        <div class="brand_name">${item.brand_name}</div>
        <div class="item_name">${item.item_name}</div>
        <div class="price_tags">
          <span class="final_price">Rs ${item.current_price}</span>
          <span class="original_price">Rs ${item.original_Price}</span>
          <span class="percentile_cutoff">(${
            item.percentile_cutoff
          } % off)</span>
        </div>
        <div class="return_time">
          <div class="ret_time">${item.return_period} days</div>
          <div class="return_text">return available</div>
        </div>
        <div class="delivery_time">
          <div class="delivery_text">will delivered by</div>
          <div class="del_time">${item.delivery_date}</div>
        </div>
        
      <div class="itemCounts">
        <img
          src="../pics/minus.png"
          alt=""
          class="minusItemCount" onclick="RemoveSeperateItemCount('${item.id}')"
        />
        <div class="display_seperate_items">${noOfSameItems(item.id)}</div>
        <img
          src="../pics/plus.png"
          alt=""
          class="plusItemCount" onclick="AddSeperateItemCount('${item.id}')"
        />
      </div>

      </article>
      <article class="col3">
        <div onclick='removeItemsFromBag(${item.id})'>
                    <img class="cross" src="../pics/dustbin.png" alt="">

        </div>
      </article>
    </article>`;
}

function noOfSameItems(itemID) {
  let count = 0;
  for (let i = 0; i < bagItems.length; i++) {
    if (bagItems[i] === itemID) {
      count++;
    }
  }
  return count;
}

function removeItemsFromBag(itemID) {
  bagItems = bagItems.filter((bagItemID) => bagItemID != itemID);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  onLoad();
}

function displayThePricing() {
  if (bagItems.length === 0) {
    BagSummaryElement.style.display = "none";
    between_line.style.display = "none";
    replace_HTML_on_Items_ZERO();
  } else {
    BagSummaryElement.style.display = "flex";
    between_line.style.display = "block";
  }

  let total_mrp = 0;
  let discountOnMrp = 0;
  let ConvenienceFee = 110;
  let final_amount = 0;

  bag_items_obj.forEach((bag_items_obj) => {
    total_mrp += bag_items_obj.original_Price;
    discountOnMrp += bag_items_obj.original_Price - bag_items_obj.current_price;
  });
  final_amount = total_mrp - discountOnMrp + ConvenienceFee;

  BagSummaryElement.innerHTML = `<div>
          <div class="top">
            <div class="top_text">price details</div>
            <div class="items_count">(${bagItems.length} items)</div>
          </div>

          <div class="middle">
            <div class="T_mrp">
              <div class="text">total MRP</div>
              <div class="T_mrp_price">Rs ${total_mrp}</div>
            </div>
            <div class="discount_mrp">
              <div class="text">discount on mrp</div>
              <div class="dis_mrp_price">Rs ${discountOnMrp}</div>
            </div>
            <div class="convenience_fee">
              <div class="text">convenienve fee</div>
              <div class="fee">Rs ${ConvenienceFee}</div>
            </div>
          </div>
          <hr />
          <div class="bottom">
            <div class="t_amount">
              <div class="text">total amount</div>
              <div class="total_amount">rs ${final_amount}</div>
            </div>
            <button class="place_order_btn">place order</button>
          </div>
        </div>`;
}

function replace_HTML_on_Items_ZERO() {
  const emptyBagMessages = [
    "Your shopping bag is empty. Start adding items now!",
  ];
  const randomIndex = Math.floor(Math.random() * emptyBagMessages.length);
  Mian_element.innerHTML = `<div class="empty-cart-container">
    <img class="empty-cart-image" src="../pics/cart.png" alt="Empty Cart">

    <div class="empty-cart-message">${emptyBagMessages[randomIndex]}</div>
    
    <a href="/myntra_clone/files/html/myntra_clone.html" class="add-items-button">add items</a>
  </div>`;
}

function AddSeperateItemCount(itemID) {
  if (bagItems.includes(itemID)) {
    bagItems.push(itemID);
    localStorage.setItem("bagItems", JSON.stringify(bagItems));
  }
  // loadTheBagItems();
  onLoad();
}

function RemoveSeperateItemCount(itemID) {
  const index = bagItems.indexOf(itemID);
  if (index > -1) {
    bagItems.splice(index, 1);
  }
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  onLoad();
}
