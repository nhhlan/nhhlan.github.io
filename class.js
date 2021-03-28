class Job {
    async getJob(){
        const jobDataResponse = await fetch('./data.json');
        const jobData = await jobDataResponse.json();
        return jobData;        
    }
}

class UI {
    constructor(){
        this.searchFilter = document.getElementById('searchFilter');
        this.jobContainer = document.querySelector('.job-container');
        this.tagContainer = document.querySelector('.tag-container');
        this.input = document.querySelector('#searchFilter input');
    }

    showJob(jobs){
        let jobOutput = [];

        jobs.forEach((job) => {
            jobOutput += `
            <div class="job-items" data-item="${job.id}">
                <div class="job-comp-ava">
                    <img src="${job.logo}" alt="${job.company}">
                </div>

                <div class="job-content">
                    <div class="job-comp-name">
                    <span>${job.company}</span>
                    <span class="${job.new ? "new-tag" : "hidden"}">New!</span>
                    <span class="${job.featured ? "featured-tag" : "hidden"}">Featured</span>
                    </div>

                    <div class="job-position">
                    <h3>${job.position}</h3>
                    </div>

                    <div class="job-info">
                    <span>${job.postedAt}</span>
                    <span class="dot"></span>
                    <span>${job.contract}</span>
                    <span class="dot"></span>
                    <span>${job.location}</span>
                    </div>
                </div>

                <div class="job-tags">
                    <ul>
                        <li data-role="${job.role}">${job.role}</li>
                        <li data-level="${job.level}">${job.level}</li>
                        ${job.languages.length ? job.languages.map(language => `<li data-language="${language}">${language}</li>`).join("") : ''}
                        ${job.tools.length ? job.tools.map(tool => `<li data-tool="${tool}">${tool}</li>`).join("") : ''}
                    </ul>
                </div>
            </div>
            `
        })

        this.jobContainer.innerHTML = jobOutput;
    };

    showSearchbar(tag){
        tag.parentElement.parentElement.className == 'job-tags' || this.tagContainer.innerHTML !== '' ? this.searchFilter.style.display = 'flex' : this.searchFilter.style.display = 'none';
    }

    createTag(label){
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

    clearTagsInSearchbar(){
        document.querySelector('.tag-container').innerHTML = '';
    }

    addTagsToSearchbar(tagArr, tag){
        // Check if tag already in searchbar
        if(!tagArr.includes(tag)){
            tagArr.push(tag);
        }
        // Clear tags
        this.clearTagsInSearchbar();
        // Add tag from tag list to searchbar
        tagArr.forEach(tag => {
            this.tagContainer.append(this.createTag(tag));
        })
    }

    filterByTag(tag){
        
    }

    clearJob(){
        this.jobContainer.innerHTML = '';
    }
}