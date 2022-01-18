const canvas = document.getElementById('myCanvas');
const canvasContext = canvas.getContext('2d');



// return image path for respective frame and animation..
let imagePath = (frameNumber, animation) => {
    return `./images/${animation}/${frameNumber}.png`;
};


// load image from given source..
let loadImage = (src, callback) => {
    let img = document.createElement('img');
    img.onload = () => callback(img);
    img.src = src;
}

// frames for different animation..
let frames = {
    idle: [1, 2, 3, 4, 5, 6, 7, 8],
    kick: [1, 2, 3, 4, 5, 6, 7],
    punch: [1, 2, 3, 4, 5, 6, 7],
    backward: [1, 2, 3, 4, 5, 6],
    block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    forward: [1, 2, 3, 4, 5, 6]
};


// load all animating images...
let loadImages = callback => {
    let images = {
        idle: [],
        kick: [],
        punch: [],
        backward: [],
        block: [],
        forward: []
    };
    let imagesToLoad = 0;


    ["backward", "block", "forward", "idle", "kick", "punch"].forEach(animation => {
        let animationFrames = frames[animation];
        imagesToLoad += animationFrames.length;

        animationFrames.forEach(frameNumber => {
            let path = imagePath(frameNumber, animation);
    
            loadImage(path, img => {
                images[animation][frameNumber - 1] = img;
                imagesToLoad -= 1;
    
                if(imagesToLoad === 0) {
                    callback(images);
                }
            });
        })
    });

}

let animate = (ctx, images, animation, callback) => {
    images[animation].forEach((image, index) => {
        setTimeout(() => {
            ctx.clearRect(0, 0, 500, 500);
            ctx.drawImage(image, 0, 0, 500, 500);
        }, index * 100);
    });
    setTimeout(callback, images[animation].length * 100);
}


// load all animating images..
loadImages(images => {
    let queuedAnimation = [];

    let aux = () => {
        let selectedAnimation;

        if(queuedAnimation.length === 0) selectedAnimation = 'idle';
        else selectedAnimation = queuedAnimation.shift();
        animate(canvasContext, images, selectedAnimation, aux);
    }
    
    aux();

    document.getElementById('kick').onclick = () => {
        queuedAnimation.push('kick');
    };

    document.getElementById('punch').onclick = () => {
        queuedAnimation.push('punch');
    };

    document.getElementById('backward').onclick = () => {
        queuedAnimation.push('backward');
    };
    
    document.getElementById('block').onclick = () => {
        queuedAnimation.push('block');
    };

    document.getElementById('forward').onclick = () => {
        queuedAnimation.push('forward');
    };


    document.addEventListener('keyup', event => {
        const key = event.key;
        console.log(key);
        if(key === 'ArrowLeft') queuedAnimation.push('backward');
        if(key === 'ArrowRight') queuedAnimation.push('forward');
        if(key === 'ArrowUp') queuedAnimation.push('kick');
        if(key === 'ArrowDown') queuedAnimation.push('punch');
        if(key === 'Enter') queuedAnimation.push('block')
    });

});



