//定义数组，存放所有图片的地址
var images = [];
var ifGameOver = false;
//初始化数组
(function inputImages() {
    for (let i = 1; i <= 9; i++) {
        images[i] = 'images/' + i + '.jpg';
    }
    // console.log(images)
    stochastic();
    // console.log(document.getElementById('col3').getAttribute('style'))  //null
})()

function newGame() {
    ifGameOver = false;
    document.getElementById('score').innerHTML = "通关有惊喜哦~加油！！！"
    //清除已有的图片
    for (let i = 1; i <= 9; i++) {
        let temp = document.getElementById('col' + i);
        temp.removeAttribute('style');
    }
    //产生两个随机图片
    stochastic();
}

//随机产生两张图片
function stochastic() {
    var first = Math.ceil(Math.random() * 9);
    var last = Math.ceil(Math.random() * 9);
    while (first == last) {
        last = Math.ceil(Math.random() * 9);
    }
    // console.log(first+" "+last)
    var temp1 = document.getElementById('col' + first);
    temp1.setAttribute('style', 'background-image:url(' + images[1] + ')');
    var temp2 = document.getElementById('col' + last);
    temp2.setAttribute('style', 'background-image:url(' + images[2] + ')');
}


//判断是否成功
function ifSuccess() {
    var pic = [];
    for (let i = 1; i <= 9; i++) {
        let temp = document.getElementById('col' + i);
        pic.push(temp.getAttribute('style'));
    }
    // console.log(pic)
    var flag = false;
    for (let i = 0; i < pic.length; i++) {
        if (pic[i] == null || pic[i] == "background-image:url(undefined)") {
            pic[i] = "undefined";
        } else {
            if (pic[i].indexOf(9) != -1) {
                flag = true;
            }
        }
    }
    // console.log(flag)
    if (flag) {
        // console.log("2")
        document.getElementById('score').innerHTML = "彭彭妹妹是真哒~~"
        last();
    }
}

//随机新增一张图片
function addPic() {
    let temp = [];
    for (let i = 1; i <= 9; i++) {
        let temp1 = document.getElementById('col' + i);
        temp1 = temp1.getAttribute('style');
        temp.push(temp1);
    }
    // console.log(temp)
    let flag = true;
    let tempArr = [];
    for (let i = 0; i <= 8; i++) {
        if (temp[i].indexOf('undefined') != -1) {
            flag = false;
            tempArr.push(i + 1);
        }
    }
    if (!flag) {
        let tempLength = tempArr.length;
        tempLength = Math.ceil(Math.random() * tempLength);
        document.getElementById('col' + tempArr[tempLength - 1]).setAttribute('style', 'background-image:url(images/1.jpg)')
    } else {
        alert('失败啦~再试一次吧~');
        newGame();
    }
}

let bodyElement = document.getElementById('bodyElement');
bodyElement.addEventListener('touchstart', onTouchStart, { passive: false });
bodyElement.addEventListener('touchmove', onTouchMove, { passive: false });
bodyElement.addEventListener('touchend', onTouchEnd, { passive: false });

//监听滑屏事件
var pageX1, pageY1, pageX2, pageY2;
function onTouchStart(e) {
    let touch = e.touches[0];
    pageX1 = touch.pageX;
    pageY1 = touch.pageY;
    // console.log(pageX1+" "+pageY1)
}

function onTouchMove(e) {
    // e.preventDefault();
}

function onTouchEnd(e) {
    let touch = e.changedTouches[0];
    pageX2 = touch.pageX - pageX1;
    pageY2 = touch.pageY - pageY1;

    // console.log(pageX2+" "+pageY2)
    if (Math.abs(pageX2) > Math.abs(pageY2)) { //认定为水平方向滑动
        if (pageX2 > 30) { //向右
            rightSlide();

        } else if (pageX2 < -30) { //向左
            leftSlide();
        }
    } else { //认定为垂直方向滑动
        if (pageY2 > 30) { //向下
            bottomSlide();
        } else if (pageY2 < -30) {//向上
            topSlide();
        }
    }
}


function getArr() {
    let picImages = [];
    for (let i = 1; i <= 9; i++) {
        picImages[i] = document.getElementById('col' + i).getAttribute('style');
        // console.log(picImages[i])
        if (picImages[i] == null || picImages[i] == "background-image:url(undefined)") {
            picImages[i] = 0;
        } else {
            picImages[i] = picImages[i].replace('background-image:url(images/', '');
            picImages[i] = picImages[i].replace('.jpg)', '')
            // console.log(picImages[i])
            picImages[i] = Number(picImages[i]);
        }
    }
    return picImages;
}

function bottomSlide() {
    let picImages = getArr();
    // console.log(picImages);
    //第一列
    if (picImages[7] == picImages[4] && picImages[4] != 0) {
        picImages[7] += 1;
        picImages[4] = 0;
    } else {
        if (picImages[4] == picImages[1] && picImages[4] != 0) {
            picImages[4] += 1;
            picImages[1] = 0;
        } else {
            if (picImages[7] == picImages[1] && picImages[4] == 0 && picImages[7] != 0) {
                picImages[7] += 1;
                picImages[1] = 0;
            }
        }
    }
    //第二列
    if (picImages[8] == picImages[5] && picImages[5] != 0) {
        picImages[8] += 1;
        picImages[5] = 0;
    } else {
        if (picImages[5] == picImages[2] && picImages[5] != 0) {
            picImages[5] += 1;
            picImages[2] = 0;
        } else {
            if (picImages[2] == picImages[8] && picImages[5] == 0 && picImages[2] != 0) {
                picImages[8] += 1;
                picImages[2] = 0;
            }
        }
    }
    //第三列
    if (picImages[9] == picImages[6] && picImages[6] != 0) {
        picImages[9] += 1;
        picImages[6] = 0;
    } else {
        if (picImages[6] == picImages[3] && picImages[6] != 0) {
            picImages[6] += 1;
            picImages[3] = 0;
        } else {
            if (picImages[3] == picImages[9] && picImages[6] == 0 && picImages[3] != 0) {
                picImages[9] += 1;
                picImages[3] = 0;
            }
        }
    }
    // console.log(picImages)

    if (picImages[7] == 0) {
        picImages[7] = picImages[4];
        picImages[4] = picImages[1];
        picImages[1] = 0;
        if (picImages[7] == 0) {
            picImages[7] = picImages[4];
            picImages[4] = 0;
        }
    } else {
        if (picImages[4] == 0) {
            picImages[4] = picImages[1];
            picImages[1] = 0;
        }
    }

    if (picImages[8] == 0) {
        picImages[8] = picImages[5];
        picImages[5] = picImages[2];
        picImages[2] = 0;
        if (picImages[8] == 0) {
            picImages[8] = picImages[5];
            picImages[5] = 0;
        }
    } else {
        if (picImages[5] == 0) {
            picImages[5] = picImages[2];
            picImages[2] = 0;
        }
    }

    if (picImages[9] == 0) {
        picImages[9] = picImages[6];
        picImages[6] = picImages[3];
        picImages[3] = 0;
        if (picImages[9] == 0) {
            picImages[9] = picImages[6];
            picImages[6] = 0;
        }
    } else {
        if (picImages[6] == 0) {
            picImages[6] = picImages[3];
            picImages[3] = 0;
        }
    }
    // console.log(picImages)

    if (!ifGameOver) {
        for (let i = 1; i <= 9; i++) {
            let temp = document.getElementById('col' + i);
            temp.removeAttribute('style');
            temp.setAttribute('style', 'background-image:url(' + images[picImages[i]] + ')');
        }
    }

    ifSuccess();

    if (!ifGameOver) {
        addPic();
    }
}
// bottomSlide();

function topSlide() {
    let picImages = getArr();
    // console.log(picImages);
    //第一列
    if (picImages[1] == picImages[4] && picImages[1] != 0) {
        picImages[1] += 1;
        picImages[4] = 0;
    } else {
        if (picImages[4] == picImages[7] && picImages[4] != 0) {
            picImages[4] += 1;
            picImages[7] = 0;
        } else {
            if (picImages[7] == picImages[1] && picImages[4] == 0 && picImages[7] != 0) {
                picImages[1] += 1;
                picImages[7] = 0;
            }
        }
    }
    //第二列
    if (picImages[2] == picImages[5] && picImages[2] != 0) {
        picImages[2] += 1;
        picImages[5] = 0;
    } else {
        if (picImages[5] == picImages[8] && picImages[5] != 0) {
            picImages[5] += 1;
            picImages[8] = 0;
        } else {
            if (picImages[2] == picImages[8] && picImages[5] == 0 && picImages[2] != 0) {
                picImages[2] += 1;
                picImages[8] = 0;
            }
        }
    }
    //第三列
    if (picImages[3] == picImages[6] && picImages[3] != 0) {
        picImages[3] += 1;
        picImages[6] = 0;
    } else {
        if (picImages[6] == picImages[9] && picImages[6] != 0) {
            picImages[6] += 1;
            picImages[9] = 0;
        } else {
            if (picImages[3] == picImages[9] && picImages[6] == 0 && picImages[3] != 0) {
                picImages[3] += 1;
                picImages[9] = 0;
            }
        }
    }
    // console.log(picImages)

    if (picImages[1] == 0) {
        picImages[1] = picImages[4];
        picImages[4] = picImages[7];
        picImages[7] = 0;
        if (picImages[1] == 0) {
            picImages[1] = picImages[4];
            picImages[4] = 0;
        }
    } else {
        if (picImages[4] == 0) {
            picImages[4] = picImages[7];
            picImages[7] = 0;
        }
    }

    if (picImages[2] == 0) {
        picImages[2] = picImages[5];
        picImages[5] = picImages[8];
        picImages[8] = 0;
        if (picImages[2] == 0) {
            picImages[2] = picImages[5];
            picImages[5] = 0;
        }
    } else {
        if (picImages[5] == 0) {
            picImages[5] = picImages[8];
            picImages[8] = 0;
        }
    }

    if (picImages[3] == 0) {
        picImages[3] = picImages[6];
        picImages[6] = picImages[9];
        picImages[9] = 0;
        if (picImages[3] == 0) {
            picImages[3] = picImages[6];
            picImages[6] = 0;
        }
    } else {
        if (picImages[6] == 0) {
            picImages[6] = picImages[9];
            picImages[9] = 0;
        }
    }
    // console.log(picImages)

    if (!ifGameOver) {
        for (let i = 1; i <= 9; i++) {
            let temp = document.getElementById('col' + i);
            temp.removeAttribute('style');
            temp.setAttribute('style', 'background-image:url(' + images[picImages[i]] + ')');
        }
    }

    ifSuccess();
    if (!ifGameOver) {
        addPic();
    }
}
// topSlide();

function rightSlide() {
    //获取图片路径转换成数字
    let picImages = getArr();
    // console.log(picImages)

    //第一行
    if (picImages[2] == picImages[3] && picImages[2] != 0) {
        picImages[3] += 1;
        picImages[2] = 0;
    } else {
        if (picImages[1] == picImages[2] && picImages[2] != 0) {
            picImages[2] += 1;
            picImages[1] = 0;
        } else {
            if (picImages[1] == picImages[3] && picImages[2] == 0 && picImages[1] != 0) {
                picImages[3] += 1;
                picImages[1] = 0;
            }
        }
    }
    //第二行
    if (picImages[6] == picImages[5] && picImages[6] != 0) {
        picImages[6] += 1;
        picImages[5] = 0;
    } else {
        if (picImages[5] == picImages[4] && picImages[5] != 0) {
            picImages[5] += 1;
            picImages[4] = 0;
        } else {
            if (picImages[4] == picImages[6] && picImages[5] == 0 && picImages[4] != 0) {
                picImages[6] += 1;
                picImages[4] = 0;
            }
        }
    }
    //第三行
    if (picImages[9] == picImages[8] && picImages[9] != 0) {
        picImages[9] += 1;
        picImages[8] = 0;
    } else {
        if (picImages[8] == picImages[7] && picImages[8] != 0) {
            picImages[8] += 1;
            picImages[7] = 0;
        } else {
            if (picImages[7] == picImages[9] && picImages[8] == 0 && picImages[7] != 0) {
                picImages[9] += 1;
                picImages[7] = 0;
            }
        }
    }
    // console.log(picImages)
    var temp1 = [];
    for (let i = 3; i >= 1; i--) {
        if (picImages[i] != 0) {
            temp1.push(picImages[i]);
        }
    }
    // console.log(temp1)
    for (let i = 0; i <= 2; i++) {
        if (temp1[i] == null) {
            temp1[i] = 0;
        }
        picImages[3 - i] = temp1[i];
    }

    var temp2 = [];
    for (let i = 6; i >= 4; i--) {
        if (picImages[i] != 0) {
            temp2.push(picImages[i])
        }
    }
    for (let i = 0; i <= 2; i++) {
        if (temp2[i] == null) {
            temp2[i] = 0;
        }
        picImages[6 - i] = temp2[i];
    }

    var temp3 = [];
    for (let i = 9; i >= 7; i--) {
        if (picImages[i] != 0) {
            temp3.push(picImages[i])
        }
    }
    for (let i = 0; i <= 2; i++) {
        if (temp3[i] == null) {
            temp3[i] = 0;
        }
        picImages[9 - i] = temp3[i];
    }
    // console.log(picImages)
    if (!ifGameOver) {
        for (let i = 1; i <= 9; i++) {
            let temp = document.getElementById('col' + i);
            temp.removeAttribute('style');
            temp.setAttribute('style', 'background-image:url(' + images[picImages[i]] + ')');
        }
    }

    ifSuccess();
    if (!ifGameOver) {
        addPic();
    }
}
// rightSlide();

function leftSlide() {
    //获取图片路径转换成数字
    let picImages = getArr();
    // console.log(picImages)
    //第一行
    if (picImages[1] == picImages[2] && picImages[1] != 0) {
        picImages[1] += 1;
        picImages[2] = 0;
    } else {
        if (picImages[2] == picImages[3] && picImages[2] != 0) {
            picImages[2] += 1;
            picImages[3] = 0;
        } else {
            if (picImages[1] == picImages[3] && picImages[2] == 0 && picImages[1] != 0) {
                picImages[1] += 1;
                picImages[3] = 0;
            }
        }
    }
    //第二行
    if (picImages[4] == picImages[5] && picImages[4] != 0) {
        picImages[4] += 1;
        picImages[5] = 0;
    } else {
        if (picImages[5] == picImages[6] && picImages[5] != 0) {
            picImages[5] += 1;
            picImages[6] = 0;
        } else {
            if (picImages[4] == picImages[6] && picImages[5] == 0 && picImages[4] != 0) {
                picImages[4] += 1;
                picImages[6] = 0;
            }
        }
    }
    //第三行
    if (picImages[7] == picImages[8] && picImages[7] != 0) {
        picImages[7] += 1;
        picImages[8] = 0;
    } else {
        if (picImages[8] == picImages[9] && picImages[8] != 0) {
            picImages[8] += 1;
            picImages[9] = 0;
        } else {
            if (picImages[7] == picImages[9] && picImages[8] == 0 && picImages[7] != 0) {
                picImages[7] += 1;
                picImages[9] = 0;
            }
        }
    }
    // console.log(picImages)
    var temp1 = [];
    for (let i = 1; i <= 3; i++) {
        if (picImages[i] != 0) {
            temp1.push(picImages[i])
        }
    }
    for (let i = 0; i <= 2; i++) {
        if (temp1[i] == null) {
            temp1[i] = 0;
        }
        picImages[i + 1] = temp1[i];
    }

    var temp2 = [];
    for (let i = 4; i <= 6; i++) {
        if (picImages[i] != 0) {
            temp2.push(picImages[i])
        }
    }
    for (let i = 0; i <= 2; i++) {
        if (temp2[i] == null) {
            temp2[i] = 0;
        }
        picImages[i + 4] = temp2[i];
    }

    var temp3 = [];
    for (let i = 7; i <= 9; i++) {
        if (picImages[i] != 0) {
            temp3.push(picImages[i])
        }
    }
    for (let i = 0; i <= 2; i++) {
        if (temp3[i] == null) {
            temp3[i] = 0;
        }
        picImages[i + 7] = temp3[i];
    }
    // console.log(picImages)

    if (!ifGameOver) {
        for (let i = 1; i <= 9; i++) {
            let temp = document.getElementById('col' + i);
            temp.removeAttribute('style');
            temp.setAttribute('style', 'background-image:url(' + images[picImages[i]] + ')');
        }
    }
    ifSuccess();

    if (!ifGameOver) {
        addPic();
    }

}

function last() {
    // console.log("1")
    for (let i = 1; i <= 9; i++) {
        document.getElementById('col' + i).removeAttribute('style');
        document.getElementById('col' + i).setAttribute('style', 'background-image:url("images/' + i + '.jpg")')
    }
    ifGameOver = true;
}