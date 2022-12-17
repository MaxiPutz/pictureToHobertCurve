let arr = [];
let img
function setup() {
    createCanvas(400, 800);
    hilbert(width / 2, 0, 0, 3, 0, arr);
    console.log(arr);
    img = loadImage('./logo.png'); 
}

function draw() {
    translate(width / 2, width / 2);
    scale(0.9, -0.9);
    background(220);
    let length = width / 2;
    strokeWeight(1);
    noFill();
    beginShape();
    arr.map((ele) => vertex(ele[0], ele[1]));
    endShape();

    strokeWeight(3);

    fill(0, 102, 153);

    for (let i = 0; i < arr.length; i++) {
        const ele = arr[i];
        //point(ele[0], ele[1]);
    }

    strokeWeight(4);
    textSize(15);
    for (let i = 0; i < arr.length; i++) {
        const ele = arr[i];

        //text(i, ele[0] + 5, ele[1]);
    }

    scale(1,-1)
    translate(-200, 200)
    image(img, 0, 0, 300, 400);

}

function primitiv(offsetX, offsetY, l) {
    return [
        [-l, l],
        [-l, -l],
        [l, -l],
        [l, l],
    ].map((ele) => [ele[0] + offsetX, ele[1] + offsetY]);
}

function hilbert(
    len,
    x,
    y,
    depth,
    currentDepth,
    arr = [],
    rotLeft = 0,
    rotRight = 0
) {
    if (currentDepth < depth) {
        let dx = len / 2;
        let dy = len / 2;

        if (rotRight % 2 != 0) {
            dx = -dx;
            dy = -dy;
        }


        hilbert(
            len / 2,
            x - dx,
            y + dy,
            depth,
            currentDepth + 1,
            arr,
            rotLeft + 1,
            rotRight
        );
    }

    if (currentDepth < depth) {
        let dx = len / 2;
        let dy = len / 2;
        if (rotLeft % 2 != 0) {
            dx = -dx;
            dy = -dy;
        }



        hilbert(
            len / 2,
            x - dx,
            y - dy,
            depth,
            currentDepth + 1,
            arr,
            rotLeft,
            rotRight
        );
    }

    if (currentDepth < depth) {
        let dx = len / 2;
        let dy = len / 2;

        if (rotRight % 2 != 0) {
            dx = -dx;
            dy = -dy;
        }


        hilbert(
            len / 2,
            x + dx,
            y - dy,
            depth,
            currentDepth + 1,
            arr,
            rotLeft,
            rotRight
        );
    }

    if (currentDepth < depth) {
        let dx = len / 2;
        let dy = len / 2;
        if (rotLeft % 2 != 0) {
            dx = -dx;
            dy = -dy;
        }


        hilbert(
            len / 2,
            x + dx,
            y + dy,
            depth,
            currentDepth + 1,
            arr,
            rotLeft,
            rotRight + 1
        );
    }

    if (currentDepth == depth) {
        let p = primitiv(x, y, len / 2);

        for (let i = 0; i < rotLeft; i++) {
            p = left(p);
        }
        for (let i = 0; i < rotRight; i++) {
            p = right(p);
        }

        arr.push(...p);
    }
}

function left(primitiv) {
    return [primitiv[0], primitiv[3], primitiv[2], primitiv[1]];
}

function right(primitiv) {
    return [primitiv[2], primitiv[1], primitiv[0], primitiv[3]];
}
