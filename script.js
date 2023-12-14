document.addEventListener('DOMContentLoaded', function() {
            const form = document.querySelector('form');
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                searchVideos();
            });

            document.getElementById('clearResults').addEventListener('click', function() {
                document.getElementById('pesquisa').value = '';
                document.getElementById('videos').innerHTML = '';
            });

            function searchVideos() {
                const searchTerm = document.getElementById('pesquisa').value;
                const apiKey = 'AIzaSyANy4MHdTd5vBitzqylWELr5rgu0fHANoM';
                const maxResults = 10;

                const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&type=video&maxResults=${maxResults}&key=${apiKey}`;

                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        const videos = data.items;
                        const videosDiv = document.getElementById('videos');
                        videosDiv.innerHTML = '';

                        videos.forEach(video => {
                            const videoId = video.id.videoId;
                            const videoTitle = video.snippet.title;
                            const videoThumbnail = video.snippet.thumbnails.default.url;

                            const videoElement = document.createElement('iframe');
                            videoElement.src = `https://www.youtube.com/embed/${videoId}?&fs=1`;
                            videoElement.allowFullscreen = true;
                            videoElement.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
                            videoElement.width = 560;
                            videoElement.height = 315;

                            videosDiv.appendChild(videoElement);
                        });
                    })
                    .catch(error => console.error('Erro ao buscar vídeos: ', error));
            }
        });
