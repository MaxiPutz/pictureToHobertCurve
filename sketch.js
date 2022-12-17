let arr = [];
let arr2 = []
let img
let rate = 0
const skip = 4
const resolution = 6
let obj = []
const c = 200
function setup() {
    createCanvas(400, 800);
    hilbert(width / 2, 0, 0, resolution, 0, arr);
    console.log(arr);
    img = loadImage('./logo2.png');
}

function draw() {
    background(255);

    image(img, 0, 0, 400, 400);
    filter(GRAY);

    translate(0, 400)

    translate(width / 2, width / 2);
    scale(1, 1);
    let length = width / 2;
    stroke(255, 204, 0);
    strokeWeight(1);
    noFill();
    beginShape();
    arr.map((ele) => vertex(ele[0], ele[1]));
    endShape();


    if (rate == 100) {
        obj = []
        arr = []
        hilbert(width / 2, 0, 0, resolution, 0, arr);
        console.log(arr)
        obj.sort((ele1, ele2) => ele1.color-ele2.color)
        console.log(obj,'test');
        obj.sort((ele1, ele2) => ele2.color-ele1.color)
        console.log(obj,'test');

    }

    //console.log(get(mouseX, mouseY))

    rate++
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


    let realX 
    let realY 

    let color = 256

    if (currentDepth == depth-1) {
        let l = parseInt(len)

        temp = []
        for (let i = -l; i < l; i += skip) {
            for (let j = -l; j < l; j += skip) {
                realY = parseInt(y + (width / 2))
                realX = parseInt(x + (width / 2))

                color = get(realX + i, realY + j)
                color.pop()
                temp.push(
                    ...color
                )
            }
        }
        color = temp
        .reduce((ele1, ele2) => ele1+ele2, 0) / temp.length
        obj.push({
            x: realX,
            y: realY,
            color: color
        })
    }
    // ********
    if (currentDepth == depth 
         || (color < c
         //&& rate >0
         )
        ) {
        let p = primitiv(x, y, len / 2);

        for (let i = 0; i < rotLeft; i++) {
            p = left(p);
        }
        for (let i = 0; i < rotRight; i++) {
            p = right(p);
        }

        arr.push(...p);
        return
    }


   {
        {
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

   {

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

      {
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

        {
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
    } 
}

function left(primitiv) {
    return [primitiv[0], primitiv[3], primitiv[2], primitiv[1]];
}

function right(primitiv) {
    return [primitiv[2], primitiv[1], primitiv[0], primitiv[3]];
}