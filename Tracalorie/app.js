//Storage controller
const StorageCtrl = (function(){
  //pm
  return{
    storeItem: function(item){
      let items;
      //check if any items

      if(localStorage.getItem('items')=== null){
        items =[];
        //push new item
        items.push(item);
        //set ls
        localStorage.setItem('items', JSON.stringify(items));
      }else {
        //get wt is already in LS
        items = JSON.parse(localStorage.getItem('items'));

        //push new item
        items.push(item);

        //re set ls
        localStorage.setItem('items', JSON.stringify(items));
      }
    },
    getItemsFromStorage : function()
    {
      let items;
      if(localStorage.getItem('items')=== null){
        items =[];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },
    updateItemStorage:  function(updatedItem){
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach(function(item, index){
        if(updatedItem.id === item.id){
          items.splice(index, 1, updatedItem);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    deleteItemFromStrorage: function(id){
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach(function(item, index){
        if(id === item.id){
          items.splice(index, 1,);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    clearItemsFromStorage: function(){
      localStorage.removeItem('items');
    }
  }

})();


//item controller
const ItemCtrl = (function(){
  //Itemconstructor

  const Item = function(id, name, calories){
    this.id = id;
    this.name =name;
    this.calories = calories;
  }

  //data 
  const data ={

   // items: [
      //{id:0, name:'steak dinner', calories:1500},
      //{id:1, name:'Roti', calories:500},
      //{id:2, name:'Eggs', calories: 200}
   // ],

   items : StorageCtrl.getItemsFromStorage(),
  
    currentItem: null,
    totalCalories: 0
  }

  //return
  return{
    getItems: function(){
      return data.items;
    },

    addItem: function(name, calories){
      let ID;

      //create ID 
      if(data.items.length > 0){
        ID = data.items[data.items.length -1].id +1;
      }else{
        ID = 0;
      }
    


  // calories to number
  calories = parseInt(calories);

  //create a new item
  newItem = new Item(ID, name, calories);

  //Add to items array
  data.items.push(newItem);

  return newItem;

    },
    getItemById : function(id){
      let found = null;
      //loop through the  items
      data.items.forEach(function(item){
        if(item.id === id){
          found = item;
        }
      });
      return  found;
    },
    updateItem :function(name, calories){
      //calories into num
      calories = parseInt(calories);

      let found = null;
      data.items.forEach(function(item){
        if(item.id == data.currentItem.id){
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });

      return found;

    },
    deleteItem: function(id){
      //get ids
     const ids = data.items.map(function(item){
        return item.id;

      });
      //get index
      const index = ids.indexOf(id);

      //remove item

      data.items.splice(index, 1);
      },
      clearAllItems: function(){
        data.items =[];
      },
    setCurrentItem: function(item){
      data.currentItem = item;
    },
    getCurrentItem: function(){
      return data.currentItem;
    },
    
    getTotalCalories : function(){
      let total = 0;

      //loop through the itema and addcalor
      data.items.forEach(function(item){
        total += item.calories;

      });

      //set total cal in DS
      data.totalCalories = total;
      //return
      return data.totalCalories;

    },

    logData:function(){
      return data;
    }
  }

  
})();

//UI controller
const UICtrl = (function(){
  const UISelectors = {
    itemList: '#item-list',
    listItems:'#item-list li',
    addBtn : '.add-btn',
    updateBtn : '.update-btn',
    deleteBtn : '.delete-btn',
    backBtn : '.back-btn',
    clearBtn:'.clear-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput : '#item-calories',
    totalCalories:'.total-calories'

  }


  //return pm
  return {
    populateItemList: function(items){
      let html ="";

      items.forEach(function(item){
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`
      });
      // Insert LI
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function(){
      return{
        name:document.querySelector(UISelectors.itemNameInput).value,

        calories:document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    addListItem: function(item){
      //show the list 
      document.querySelector(UISelectors.itemList).style.display = 'block';
    // create li element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    //add ID
    li.id = `item-${item.id}`;
    //add HTML
    li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} calories </em>
    <a href='#' class='secondary-content'> 
    <i class ='edit-item fa fa-pencil'></i></a>`;
    
    //insert item
    document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)

    },
    updateListItem: function(item){
      let listItems = document.querySelectorAll(UISelectors.listItems);

      //turn node into array
      listItems = Array.from(listItems);

      listItems.forEach(function(listItem){
         const itemID = listItem.getAttribute('id');
         if(itemID === `item-${item.id}`){
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}:</strong> <em>${item.calories}Calories</em>
          <a href="#" class = "secondary-content"><i class ='edit-item fa fa-pencil'>
          </i>
          </a>`;
         }

      });
       

      
    },
    deleteListItem : function(id){
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();


    },
  clearInput: function(){
    document.querySelector(UISelectors.itemNameInput).value = "";
    document.querySelector(UISelectors.itemCaloriesInput).value = "";
  },
  addItemToForm : function(){
    document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
    
    document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
    UICtrl.showEditState();

  },
  removeItems :function(){
    let listItems = document.querySelectorAll(UISelectors.listItems);

    //turn node into array
    listItems = Array.from(listItems);

    listItems.forEach(function(item){
      item.remove();
    });
  },
  hideList: function(){
    document.querySelector(UISelectors.itemList).style.display = 'none';
  },
  showTotalCalories: function(totalCalories){
    document.querySelector(UISelectors.totalCalories).textContent = totalCalories;

  },
  clearEditState: function(){
    UICtrl.clearInput();
    document.querySelector(UISelectors.updateBtn).style.display = 'none';
    document.querySelector(UISelectors.deleteBtn).style.display = 'none';
    document.querySelector(UISelectors.backBtn).style.display = 'none';
    document.querySelector(UISelectors.addBtn).style.display = 'inline';
    

  },
  showEditState: function(){
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
    getSelectors: function(){
      return UISelectors;
    }

  }
})();

//App controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl)
{
  //Load event listeners
  const loadEventListeners = function(){
    //get UI selectors
    const UISelectors = UICtrl.getSelectors();

    //add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    //Disable  submit 
    document.addEventListener('keypress', function(e){
      if(e.keyCode  === 13 || e.which === 13){
        e.preventDefault();
        return false;
          }
    });

    //edit icon click
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    //update item event 
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);


    //delete item event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);



    //Back event
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState );

   //clear items event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
  }

  //add item submit

  const itemAddSubmit = function(e){
    //get form input from UI controller
    const input = UICtrl.getItemInput();

    //check for name and calorie input
    if(input.name !== ' ' && input.calories !== ''){
      //add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      //add item to ui list
      UICtrl.addListItem(newItem);

      //get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      //add TC in UI
      UICtrl.showTotalCalories(totalCalories);

      //store in LocalStorage
      StorageCtrl.storeItem(newItem);

      //clear fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  }

  //click ei
  const itemEditClick = function(e){
  if (e.target.classList.contains('edit-item')){
//get list item id
const listId = e.target.parentNode.parentNode.id;
//break into an array 
const listIdArr = listId.split('-');

//get the actual ID
const id = parseInt(listIdArr[1]);

//get item 
const itemToEdit = ItemCtrl.getItemById(id);

//set curremt item
ItemCtrl.setCurrentItem(itemToEdit);

//add item to form
UICtrl.addItemToForm();



  }
    e.preventDefault();

  }

  //update item submit
  const  itemUpdateSubmit = function(e){
    //get item input
    const input = UICtrl.getItemInput();

    //update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    //update Ui
    UICtrl.updateListItem(updatedItem);

    //get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    //add total calo to UI
    UICtrl.showTotalCalories(totalCalories);

    //update LS
    StorageCtrl.updateItemStorage(updatedItem);

    UICtrl.clearEditState();
    
     e.preventDefault();
  }

  //delete button event
  const itemDeleteSubmit =function(e){
    //get id from current iteam

    const currentItem = ItemCtrl.getCurrentItem();

    //delete from ds
    ItemCtrl.deleteItem(currentItem.id);

    //del from ui

    UICtrl.deleteListItem(currentItem.id);

     //get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    //add total calo to UI
    UICtrl.showTotalCalories(totalCalories);

    //del nfrom ls
    StorageCtrl.deleteItemFromStrorage(currentItem.id);

    UICtrl.clearEditState();
    
    e.preventDefault();
  }

    //clear items eve
    const clearAllItemsClick = function(){
      //del items from ds
      ItemCtrl.clearAllItems();

       //get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    //add total calo to UI
    UICtrl.showTotalCalories(totalCalories);

    
   //remove from ui
    UICtrl.removeItems();

    //clear from ls
    StorageCtrl.clearItemsFromStorage();

    //hide ul li
    UICtrl.hideList();

  }
  //pm
  return{
    init: function(){
      //clear edit state
      UICtrl.clearEditState();

      //fetch items from DS
      const items = ItemCtrl.getItems();

      //check if any iteams
      if(items.length === 0){
        UICtrl.hideList();
      }else{
        
      //populate list with item
      UICtrl.populateItemList(items);

      }
      
      //get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      //add TC in UI
      UICtrl.showTotalCalories(totalCalories);

          


      //load load EL
      loadEventListeners();
    }
  }
})(ItemCtrl, StorageCtrl, UICtrl);

//
App.init();

