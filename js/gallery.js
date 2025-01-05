document.addEventListener('DOMContentLoaded', function() {
    const leftPane = document.getElementById('leftPane');
    const rightPane = document.getElementById('rightPane');

    
    fetch('./assets/media.json')
        .then(response => response.json())
        .then(data => {
            function createCard(content, type) {
                const card = document.createElement('div');
                card.classList.add('card');
                const filename = content.split('/').pop(); 
                
                if (type === 'image') {
                    const img = document.createElement('img');
                    img.src = content;
                    card.appendChild(img);
                } else if (type === 'video') {
                    const video = document.createElement('video');
                    video.src = content;
                    video.controls = true;
                    card.appendChild(video);
                } else if (type === 'youtube') {
                    const iframe = document.createElement('iframe');
                    iframe.src = content;
                    iframe.width = "600";
                    iframe.height = "350";
                    iframe.frameBorder = "0";
                    card.appendChild(iframe);
                }

                
                card.addEventListener('click', function() {
                    if (type === 'image') {
                        rightPane.innerHTML = `<div id="filename">${filename}</div><img src="${content}">`;
                    } else if (type === 'video') {
                        rightPane.innerHTML = `<div id="filename">${filename}</div><video src="${content}" controls autoplay></video>`;
                    } else if (type === 'youtube') {
                        rightPane.innerHTML = `<iframe src="${content}" width="100%" height="700px" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                    }
                });

                leftPane.appendChild(card);
            }

            
            data.images.forEach(image => createCard(image, 'image'));
            data.videos.forEach(video => createCard(video, 'video'));
            data.youtube.forEach(link => createCard(link, 'youtube'));
        })
        .catch(error => console.error('Error loading media files:', error));
});
