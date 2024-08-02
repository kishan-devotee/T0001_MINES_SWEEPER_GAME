let boxX = 0;
let boxY = 0;
const boxSize = 40;
const randomBombSpaces = [];
let bombCount = 0;
let userWinCheck = 0;
const boxContainer = document.querySelector('.container');

const basicMode = () => {
    bombCount = 10;
    boxGenerator(8, 8);
};

const mediumMode = () => {
    bombCount = 20;
    boxGenerator(10, 10);
};

const extremeMode = () => {
    bombCount = 30;
    boxGenerator(12, 12);
};

const createBox = (x, y) => {
    const box = document.createElement('div');
    box.style.position = 'absolute';
    box.id = `${x + 1}${y + 1}`;
    box.className = `${x + 1},${y + 1}`;
    box.style.width = `${boxSize}px`;
    box.style.height = `${boxSize}px`;
    box.style.backgroundColor = 'rgb(113, 193, 113)';
    box.style.left = `${x * boxSize}px`;
    box.style.top = `${y * boxSize}px`;
    return box;
};

const boxGenerator = (x, y) => {
    boxContainer.innerHTML = ''; 
    randomBombSpaces.length = 0;
    boxX = x;
    boxY = y;
    
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            const box = createBox(i, j);
            boxContainer.appendChild(box);
        }
    }
    while (randomBombSpaces.length < bombCount) {
        randomMines();
    }
};

    const userWinChecker = () => {
        if(userWinCheck  == (boxX * boxY) - bombCount) {
            alert('Congratulations! You win!');
            userWinCheck = 0;
    }
    console.log(userWinCheck);
}

const getBoxAround = (box) => {
    const queue = [box];
    while (queue.length > 0) {
        const current = queue.shift();

        const [x, y] = current.split(',').map(Number);
        const neighbors = [
            `${x - 1},${y - 1}`, `${x - 1},${y}`, `${x - 1},${y + 1}`,
            `${x},${y - 1}`, `${x},${y + 1}`,
            `${x + 1},${y - 1}`, `${x + 1},${y}`, `${x + 1},${y + 1}`
        ];

        neighbors.forEach(neighbor => {
            const element = document.getElementsByClassName(neighbor)[0];
            if (element && !element.innerHTML.includes('💣') && element.style.backgroundColor !== 'gray') {
                element.style.backgroundColor = 'gray';
                if (!element.innerHTML) {
                    queue.push(neighbor);
                }
            }
        });
    }
};

boxContainer.addEventListener('click', (e) => {
    let clickedBox = document.getElementById(`${e.target.id}`);
    let box = e.target.className;
    if (clickedBox.className === 'Mine') {
        document.querySelectorAll(".Mine").forEach((boxes) => {
            boxes.childNodes[0].style.opacity = "1";
            boxes.style.backgroundColor = "rgba(255, 255, 255, 0.315)";
            boxContainer.style.pointerEvents = "none";
            userWinCheck++;
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        });
    } else {
        clickedBox.style.color = "green";
        clickedBox.style.backgroundColor = "gray";
        userWinCheck++;
        if (clickedBox.innerHTML === "") {
            getBoxAround(box);
            userWinCheck++;
        }
    }
    userWinChecker();
});

const getElement = (index, condition) => {
    let getThreeVal = function (val) {
        if (val > (boxX * boxY) + boxX) {
            let p1 = val.toString()[0];
            let p2 = val.toString()[1] + val.toString()[2];
            return Array.of(p1, p2);
        }
        let p1 = val.toString()[0] + val.toString()[1];
        let p2 = val.toString()[2];
        return Array.of(p1, p2);
    };

    const getVal = (val) => {
        if (val.toString().length === 4) {
            let p1 = val.toString()[0] + val.toString()[1];
            let p2 = val.toString()[2] + val.toString()[3];
            return Array.of(p1, p2);
        }
        return val.toString().split("");
    };
    let getEle = index.toString().length === 3 ? getThreeVal(index) : getVal(index);

    if (condition === "left") getEle[0] = +getEle[0] - 1;
    if (condition === "right") getEle[0] = +getEle[0] + 1;
    if (condition === "top") getEle[1] = +getEle[1] - 1;
    if (condition === "bottom") getEle[1] = +getEle[1] + 1;

    getEle[0] = getEle[0].toString();
    return getEle.join("");
};

const printNumber = (index) => {
    let centerTop = document.getElementById(`${getElement(index, "top")}`);
    let centerBottom = document.getElementById(`${getElement(index, "bottom")}`);
    let centerLeft = document.getElementById(`${getElement(index, "left")}`);
    let centerRight = document.getElementById(`${getElement(index, "right")}`);

    let leftTopId = getElement(index, "left").split("");
    leftTopId[1] = leftTopId[1] - 1;
    let leftBottomId = getElement(index, "left").split("");
    leftBottomId[1] = +leftBottomId[1] + 1;
    let rightTopId = getElement(index, "right").split("");
    rightTopId[1] = rightTopId[1] - 1;
    let rightBottomId = getElement(index, "right").split("");
    rightBottomId[1] = +rightBottomId[1] + 1;

    let leftTop = document.getElementById(`${leftTopId = leftTopId.join("")}`);
    let leftBottom = document.getElementById(`${leftBottomId = leftBottomId.join("")}`);
    let rightTop = document.getElementById(`${rightTopId = rightTopId.join("")}`);
    let rightBottom = document.getElementById(`${rightBottomId = rightBottomId.join("")}`);

    if (centerLeft && centerLeft.innerHTML !== "<span>💣</span>") centerLeft.innerHTML = `${centerLeft.innerHTML ? +centerLeft.innerHTML + 1 : 1}`;
    if (centerRight && centerRight.innerHTML !== "<span>💣</span>") centerRight.innerHTML = `${centerRight.innerHTML ? +centerRight.innerHTML + 1 : 1}`;
    if (centerTop && centerTop.innerHTML !== "<span>💣</span>") centerTop.innerHTML = `${centerTop.innerHTML ? +centerTop.innerHTML + 1 : 1}`;
    if (centerBottom && centerBottom.innerHTML !== "<span>💣</span>") centerBottom.innerHTML = `${centerBottom.innerHTML ? +centerBottom.innerHTML + 1 : 1}`;
    if (leftTop && leftTop.innerHTML !== "<span>💣</span>") leftTop.innerHTML = `${leftTop.innerHTML ? +leftTop.innerHTML + 1 : 1}`;
    if (rightTop && rightTop.innerHTML !== "<span>💣</span>") rightTop.innerHTML = `${rightTop.innerHTML ? +rightTop.innerHTML + 1 : 1}`;
    if (leftBottom && leftBottom.innerHTML !== "<span>💣</span>") leftBottom.innerHTML = `${leftBottom.innerHTML ? +leftBottom.innerHTML + 1 : 1}`;
    if (rightBottom && rightBottom.innerHTML !== "<span>💣</span>") rightBottom.innerHTML = `${rightBottom.innerHTML ? +rightBottom.innerHTML + 1 : 1}`;
};

const randomMines = async () => {
    try {
        let randomIndex = Math.floor(Math.random() * Number(boxX.toString() + boxY.toString()) + 1);
        let randomBombSpace = Array.from(randomIndex.toString()).join("");
        document.getElementById(`${randomBombSpace}`).innerHTML = "<span>&#128163;</span>";
        document.getElementById(`${randomBombSpace}`).className = "Mine";
        if (!randomBombSpaces.includes(randomIndex) && randomIndex.toString().length >= 2) {
            randomBombSpaces.push(randomIndex);
        }
        printNumber(randomIndex);
    } catch (error) {
        console.log(); 
    }
};

// Initial CallS
basicMode(); 

document.querySelector('.difficultyBasic').addEventListener('click', basicMode);
document.querySelector('.difficultyMedium').addEventListener('click', mediumMode);
document.querySelector('.difficultyExtreme').addEventListener('click', extremeMode);