var token= document.cookie.split('=')[1]

// getting all news from the database
const getNewsFromDb=(url)=>{
    let listContainer= document.querySelector('#list-container')
    fetch(url)
    .then((response)=>{return response.json()})
    .then((data)=>{
        // slice the data to display the first 20 items
        data= data.slice(0, 20)
        // loop through the data, to dynamically create elements needed and pass in their respective attributes and contents
        for(let count= 0; count<data.length;count++){
            // create elements
            let orderedList= document.createElement('li')
            let newsParentContainer= document.createElement('div')
            let newsTitle= document.createElement('p')
            let itemDetails= document.createElement('div')
            let newsStory= document.createElement('a')
            let newsType=  document.createElement('p')

            // set the element's respective attributes below
            orderedList.setAttribute('id', 'list')
            newsParentContainer.setAttribute('class','latest-news')
            newsTitle.setAttribute('class', 'news-title')
            itemDetails.setAttribute('class', 'item-details')
            newsStory.setAttribute('class', 'news-story')
            newsStory.setAttribute('id', 'story-url')
            newsType.setAttribute('class', 'news-type')

            // now pass in data from the api
            newsTitle.textContent= data[count].title;
            newsStory.url= data[count].url;
            newsType.textContent= data[count].type;
            // append to their respective parents
            newsParentContainer.appendChild(newsTitle)
            itemDetails.appendChild(newsStory)
            itemDetails.appendChild(newsType)
            newsParentContainer.appendChild(itemDetails)
            orderedList.appendChild(newsParentContainer)
            listContainer.appendChild(orderedList)
        }//end of loop
    })
}

getNewsFromDb('http://127.0.0.1:7000/api')
// function for filtering news
const filterFunction= ()=>{
    // get the needed element from frontend, including the filter widgets; and other one to update the data with
    let filterSelection = document.querySelectorAll("#filter")
    var [parentDiv, newsTitle, newsStory, newsType] = [document.querySelectorAll('.latest-news'), document.querySelectorAll('.news-title'), document.querySelectorAll('.news-story'), document.querySelectorAll('.news-type')]
    // loop through the filter widgets to get both mobile and large screen, for their values
    for (let elem of filterSelection){
        elem.addEventListener('change', (e)=>{
        filteredBy=e.target.value
        fetch('/filter',{
            method: 'POST',
            body:JSON.stringify(filteredBy),
            'headers': {
                'X-CSRFToken':token,
            },
            'Content-Type': 'application/json',
        }).then((response)=>{return response.json()})
          .then(
            (data)=>{
            // loop through the returned data, and update DOM accordingly
            for (let info=0; info<data.length;info++){
                newsTitle[info].textContent= data[info].fields.title
                if(!data[info].fields.url){newsStory[info].url=''}//do this to set empty link for none available urls, for now
                newsType[info].textContent= 'Type: ' + data[info].fields.type
                parentDiv[info]+=`${newsTitle}\n
                ${newsStory}\n
                ${newsType}\n
                `
                console.log(data[info].fields.url)
            }
        })
    })}//for loop ends here
}

filterFunction()

// search functionality
const search= ()=>{
    let searchFields= document.querySelectorAll('[name=search_query]')
    let searchIcons= document.querySelectorAll('.search')
    for(let item=0; item< searchIcons.length; item++){
        searchIcons[item].addEventListener('click', (e)=>{
            let searchContent= searchFields[item].value
            searchFields[item].value= ''
            fetch('/search', {
                method:'POST',
                body: JSON.stringify(searchContent),
                'headers':{
                    'X-CSRFToken': token,
                    'Content-Type': 'application/json'
                }
            })//end of fetch
        })//end of listener
    }
}
search()