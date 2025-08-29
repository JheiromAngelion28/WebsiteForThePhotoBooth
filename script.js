document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle for mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
    
    // Check if we're on the photo booth page
    if (document.getElementById('video')) {
        // Get elements
        const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        const captureBtn = document.getElementById('capture-btn');
        const photo = document.getElementById('photo'); // Make sure this element exists
        const ctx = canvas.getContext('2d');
        const flash = document.querySelector('.flash');
        
        // Store video dimensions
        let width, height;
        
        // Access webcam
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function(stream) {
                    video.srcObject = stream;
                    video.play();
                })
                .catch(function(error) {
                    console.error("Unable to access camera:", error);
                    alert("Unable to access camera. Please check permissions.");
                });
        } else {
            alert("Your browser doesn't support camera access.");
        }
        
        // Initialize canvas size to match video
        video.addEventListener('loadedmetadata', function() {
            width = video.videoWidth;
            height = video.videoHeight;
            canvas.width = width;
            canvas.height = height;
        });
        
        // Clear photo function
        function clearphoto() {
            const context = canvas.getContext('2d');
            context.fillStyle = "#AAA";
            context.fillRect(0, 0, canvas.width, canvas.height);
            const data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);
        }
        
        // Take picture function (incorporated)
        function takePicture() {
            const context = canvas.getContext('2d');
            if (width && height) {
                canvas.width = width;
                canvas.height = height;
                context.drawImage(video, 0, 0, width, height);
                
                // Get the image data
                const data = canvas.toDataURL('image/png');
                if (photo) {
                    photo.setAttribute('src', data);
                }
                
                // Redirect to contact page after taking photo
                setTimeout(() => {
                    // Try different paths - use the one that works
                    const pathsToTry = [
                        'Pages/contact.html',
                        '../Pages/contact.html',
                        '/Pages/contact.html',
                        './Pages/contact.html'
                    ];
                    
                    // Try redirecting (browser will show which path works)
                    window.location.href = 'Pages/contact.html';
                }, 1000);
            } else {
                clearphoto();
            }
        }
        
        // Capture photo and redirect to contact page
        captureBtn.addEventListener('click', function() {
            // Add pulse animation to button
            this.classList.add('pulse');
            
            // Flash effect
            if (flash) {
                flash.classList.add('flash-animate');
            }
            
            // Use the takePicture function
            takePicture();
            
            // Remove pulse animation after delay
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 1500);
            
            // Remove flash animation after it completes
            if (flash) {
                setTimeout(() => {
                    flash.classList.remove('flash-animate');
                }, 500);
            }
        });
    }
});