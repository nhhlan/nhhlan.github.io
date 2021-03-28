const job = new Job;
const ui = new UI;


job.getJob().then(data => {
    if(data.length === 0){
        // Show alert
        console.log('alert');
    } else {
        console.log(data);
        ui.showJob(data);
    }
});

let tagListInSearchbar = [];
const clearButton = document.querySelector("#searchFilter a");
const jobContainer = document.querySelector('.job-container');

// Event delegation
jobContainer.addEventListener('click', (e) => {
    if(e.target && e.target.nodeName == 'LI'){
        let tag = e.target.innerHTML;
        ui.addTagsToSearchbar(tagListInSearchbar, tag);
        // ui.filterByTag(tag);
    }
    return tagListInSearchbar;
});

// Show searchbar when click on tag
document.addEventListener('click', (e) => ui.showSearchbar(e.target));
// Hide searchbar after clear tag
clearButton.addEventListener('click', () => {
    ui.clearTagsInSearchbar();
    tagListInSearchbar.splice(0);
})

