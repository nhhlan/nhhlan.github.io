

window.onload = function(){
    fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        let output = '';
        data.forEach((job) => {
            output = `
            <div class="job-items" data-item="${job.id}">
            <div class="job-comp-ava">
                <img src="${job.logo}" alt="${job.company}">
            </div>

            <div class="job-content">
                <div class="job-comp-name">
                    <span>${job.company}</span>
                    <span class="new-tag" style="display:${job.new ? 'inline' : 'none'}">New!</span>
                    <span class="featured-tag" style="display:${job.featured ? 'inline' : 'none'}">Featured</span>
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
                    <li data-role="${job.role}"><span>${job.role}</span></li>
                    <li data-level="${job.level}"><span>${job.level}</span></li>
                    <li data-language="HTML"><span>HTML</span></li>
                    <li data-language="CSS"><span>CSS</span></li>
                    <li data-language="JavaScript"><span>JavaScript</span></li>
                </ul>
            </div>
            `;
            document.querySelector('.job-container').insertAdjacentHTML('beforeend', output);
        })
        
    })
    .catch((err) => console.log(err));
}

