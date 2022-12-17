let arr = [];
let img
let rate = 0
const skip = 4
function setup() {
    createCanvas(400, 1200);

    console.log('arr');
    img = loadImage('./logo.png');
}

function draw() {
    background(255);
    //translate(width / 2, width / 2);

    image(img, 100, 100, 200, 200);

    translate(width / 2, width / 2);
    scale(1, -1)
    if (rate == 10) {
        prepare(width/2 , 0, 0, 5, 0, arr)
        //arr = copy2()
        console.log(arr);
    }

   
    if(rate>10)
    translate(-arr[0].len/2,0)
    translate(0, -width)
    fill(51)
  
    for (let i =0; i< arr.length; i++) {
        const ele = arr[i]
        fill(ele.fill)
        square(ele.x, ele.y, ele.len)
    }

    
    rate++
}

function copy2 () {
    let arr = []
    for (let i=0; i<400; i+=100) {
        for(let j = 0; j<400; j+=100) {
            arr.push({
                x:i,
                y:j,
                fill: get(i,j).reduce((ele1, ele2) => ele1 + ele2, 0)/4,
                len : 100
            })
        }
    }
    return arr
}




function prepare(
    len,
    x,
    y,
    depth,
    currentDepth,
    arr = [],
) {

    if (currentDepth < depth) {
        let dx = len / 2
        let dy = len / 2
        prepare(len / 2, x + dx, y + dy, depth, currentDepth + 1, arr)
    }

    if (currentDepth < depth) {
        let dx = len / 2
        let dy = len / 2
        prepare(len / 2, x + dx, y - dy, depth, currentDepth + 1, arr)
    }

    if (currentDepth < depth) {
        let dx = len / 2
        let dy = len / 2
        prepare(len / 2, x - dx, y + dy, depth, currentDepth + 1, arr)
    }

    if (currentDepth < depth) {
        let dx = len / 2
        let dy = len / 2
        prepare(len / 2, x - dx, y - dy, depth, currentDepth + 1, arr)
    }


    if (currentDepth == depth) {
        let l = parseInt(len)

        let temp = []
        for (let i = -l; i < l; i+=skip) {
            for (let j = -l; j < l; j+=skip) {
                let realY =   (y + parseInt(width/2))
                let realX = x + parseInt(width/2)
                temp.push(
                    ...get(realX +i,realY+j)
                )
            }
        }

        arr.push({
            x: x,
            y:y,
            len:len*2,
            fill: temp.reduce((ele1, ele2)=> ele1+ele2, 0) /temp.length,
            realY: -(y + parseInt(width/2)),
            realX: (x + parseInt(width/2))
        })
    }
}



