const searchFilter = document.getElementById('searchFilter');
const input = document.querySelector('#searchFilter input');
const clear = document.querySelector("#searchFilter a");
let tagsList = document.querySelectorAll('.job-tags ul li span');
let jobs = document.querySelectorAll('.job-items');
let tags = [];
let tagObj = {};

// Create object which hold tag list of each job
for(let i = 0; i < jobs.length; i++){
    const jobIndex = jobs[i].getAttribute('data-item');
    const jobTag = document.querySelectorAll(`[data-item='${jobIndex}'] .job-tags ul li span`);
    let jobTagList = [];
    jobTag.forEach(tag => {
        jobTagList.push(tag.innerHTML);
    });
    tagObj[`${jobIndex}`] = jobTagList;
}

// Create new tag
function createTag(label){
    const div = document.createElement('div');
    div.setAttribute('class', 'tag');
    const span = document.createElement('span');
    span.innerHTML = label;
    const closeIcon = document.createElement('i');
    closeIcon.setAttribute('class', 'fas fa-times' );
    closeIcon.setAttribute('data-item', label);
    div.appendChild(span);
    div.appendChild(closeIcon);
    return div;
}

// Check if tag in array
function checkIfTagIncludeInArray(tag){
    if(!tags.includes(tag)){
        tags.push(tag);
    }
};

// Clear tag before loading
function clearTags(){
    document.querySelectorAll('.tag').forEach(tag => {
        tag.parentElement.removeChild(tag);
    })
}

// Add tags to search bar
function addTags(){
    clearTags();
    tags.slice().reverse().forEach(tag => {
        searchFilter.prepend(createTag(tag));
    })
}

// Delete single tag when click 
function deleteTag(tag){
    const tagLabel = tag.getAttribute('data-item');
    const index = tags.indexOf(tagLabel);
    tags.splice(index, 1);
    addTags();
}

// Delete all tags
function deleteAllTags(){
    tags.splice(0);
}

// Show search bar
function showSearchBar(){
    if(tags.length !== 0){
        searchFilter.style.display = 'flex';
    } else {
        searchFilter.style.display = 'none';
    }
};

// Get matches between 2 arrays
function getMatch(keys,tempKeys){
    let matches = [];
    // for(let a = 0; a < keys.length; a++){
    //     for(let b = 0; b < tempKeys.length; b++){
    //         if(keys[a] === tempKeys[b]){
    //             matches.push(keys[a]);
    //         }
    //     }
    // }

    // for(let i of tempKeys){
    //     if(keys.includes(i)){
    //         matches.push(i);
    //     }
    // }

    for(let i = 0; i < keys.length; i++) {
        if(tempKeys.indexOf(keys[i]) > -1){
            matches.push(keys[i]);
        }
    }
    return matches;
}

// add hide class
function hideJob(){
    jobs.forEach(job => {
        job.classList.add('hide-job');
    });
}

// remove hide class
function displayJob(arr){   
    arr.forEach(el => {
        document.querySelector(`[data-item="${el}"]`).classList.remove('hide-job');
    });
}

// Input tag from job to tags array and add to search bar when click
(function inputTag(){
    for(let i = 0; i < tagsList.length; i++){
        tagsList[i].addEventListener('click', () => {
            checkIfTagIncludeInArray(tagsList[i].innerHTML);
            showSearchBar();
            addTags();
            filterTag();
        });
    }
})();

// Filter job by tag
function filterTag(){
    if(document.querySelectorAll('.tag').length > 0){
        let keys = [];
        let tempKeys = [];

        for(let key in tagObj){
            let objArr = tagObj[key];

            for(let i = 0; i < tags.length; i++){
                if(i === 0){
                    if(objArr.indexOf(tags[i]) !== -1){
                        keys.push(key);
                    } 
                } else if (i !== 0) {
                    if(objArr.indexOf(tags[i]) !== -1){
                        tempKeys.push(key);
                    }
                    keys = getMatch(keys, tempKeys);
                } 
                hideJob();
                displayJob(keys);
            }   
        }        
    } else {
        jobs.forEach(job => {
            job.classList.remove('hide-job');
        });
    }
};



// Event Listener

// input.addEventListener('keyup', (e) => {
//     if(e.key === 'Enter') {
//         checkIfTagIncludeInArray(e.target.value);
//         addTags();
//         input.value = '';
//     }
//     showSearchBar();
// });

document.addEventListener('click', (e) => {
    if(e.target.tagName === 'I') {
        deleteTag(e.target);
    }
    showSearchBar();
    filterTag();
})

clear.addEventListener('click', () => {
    deleteAllTags();
    addTags();
    input.value = '';
    showSearchBar();
    filterTag();
});