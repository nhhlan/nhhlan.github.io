const job = new Job;
const ui = new UI;

job.getJobs().then(data => {
    if(data.length === 0){
        ui.showAlert('No job available.');
    } else {
        ui.showJob(data);
    }
})

let tagListInSearchbar = [];
const clearButton = document.querySelector("#searchFilter a");
const jobContainer = document.querySelector('.job-container');

// Event delegation
jobContainer.addEventListener('click', (e) => {
    if(e.target && e.target.nodeName == 'LI'){
        let tag = e.target.innerHTML;
        ui.addTagsToSearchbar(tagListInSearchbar, tag);
        job.getJobs().then(data => {
            let filteredArr = data.filter((user) => {
                const userTags = [user.level, user.role].concat(user.tools, user.languages);
                return tagListInSearchbar.every(searchItem => userTags.includes(searchItem));
              });
            if(filteredArr.length === 0){
                ui.showAlert('No job available.');
            } else {
                ui.showJob(filteredArr);
            }
        })
        
    }
    return tagListInSearchbar;
});

// Delete tag from searchbar
document.addEventListener('click', (e) => {
    if(e.target.tagName === 'I') {
        const tagLabel = e.target.previousElementSibling.innerHTML;
        const index = tagListInSearchbar.indexOf(tagLabel);
        tagListInSearchbar.splice(index, 1);
        console.log(tagListInSearchbar.length);
        if(tagListInSearchbar.length === 0){
            ui.clearTagsInSearchbar();
            job.getJobs().then(data => ui.showJob(data));
        } else {
            ui.clearTagsInSearchbar();
            tagListInSearchbar.forEach(tag => {
                ui.tagContainer.append(ui.createTag(tag));
            })
            job.getJobs().then(data => {
                let filteredArr = data.filter((user) => {
                    const userTags = [user.level, user.role].concat(user.tools, user.languages);
                    return tagListInSearchbar.every(searchItem => userTags.includes(searchItem));
                  });
                if(filteredArr.length === 0){
                    ui.showAlert('No job available.');
                } else {
                    ui.showJob(filteredArr);
                }
            })
        }
    }
})

// Show searchbar when click on tag
document.addEventListener('click', (e) => ui.showSearchbar(e.target));

// Hide searchbar after clear tag
clearButton.addEventListener('click', () => {
    ui.clearTagsInSearchbar();
    tagListInSearchbar.splice(0);
    job.getJobs().then(data => ui.showJob(data));
})





