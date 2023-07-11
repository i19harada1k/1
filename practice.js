var p = document.getElementById('text'); //テキストの表示領域
var explain = document.getElementById('explain'); //説明の表示領域
var explainLabel = document.getElementById('explain-label'); //説明のラベルを表す要素
var timerLabel = document.getElementById('timer');
var startTime;
var timerId;

const scoreLabel = document.getElementById('score'); //constで宣言することにより値の書き換えが起こらない
const missLabel = document.getElementById('miss');
const correctLabel = document.getElementById('correct');

let score = 0;  //初期化
let miss = 0;
let correct = 0;

var scoreSound = document.getElementById('scoresound'); // オーディオ要素の取得
var missSound = document.getElementById('misssound');
var nextSound = document.getElementById('nextsound');
var finishSound = document.getElementById('finishsound');

var checkTexts = [];

var textLists = [
    {
        text: 'int␣count␣=␣0;',
        explain: '整数型の変数countの内容を初期化',
        used: false
    },
    {
        text: 'double␣y␣=␣3.14;',
        explain: '浮動小数点型の変数yに値3.14を代入',
        used: false
    },
    {
        text: 'boolean␣flag␣==␣true;',
        explain: '論理型の変数flagに真の値を代入',
        used: false
    },
    {
        text: 'String␣name␣=␣"John";',
        explain: '文字列型の変数nameにJohnを代入',
        used: false
    },
    {
        text: 'double␣average␣=␣(sum␣/␣count);',
        explain: '変数sumとcountを用いてaverage(平均を求める)',
        used: false
    },
    {
        text: 'int␣max␣=␣(num1␣>␣num2)?␣num1:num2;',
        explain: 'num1とnum2のうち、より大きい方をmaxに代入',
        used: false
    },
    {
        text: 'int␣length␣=␣str.length();',
        explain: '文字列strの長さをlengthに代入',
        used: false
    },
    {
        text: 'int␣randomNum␣=␣(int)␣(Math.random()␣*␣100);',
        explain: '0から99までのランダムな整数を生成し、変数randomNumに代入',
        used: false
    },
    {
        text: 'int[]␣number␣=␣new␣int[5];',
        explain: '5つの整数型要素を持つ配列を作成し、変数numbersに代入',
        used: false
    },
    {
        text: 'number[0]␣=␣10;',
        explain: '配列numbersの最初の要素に値10を代入',
        used: false
    },
    {
        text: 'for(int␣i=␣0;␣i␣<␣10;␣i++){',
        explain: 'iを0で初期化後、iが10未満の間ループを繰り返す',
        used: false
    },
    {
        text: 'while(count␣<␣5){',
        explain: 'countが5未満の間、ループを繰り返す',
        used: false
    },
    {
        text: 'if␣(x␣>␣y)␣{',
        explain: 'xがyより大きいなら、処理を実行する',
        used: false
    },
    {
        text: 'break;',
        explain: 'ループから抜け出す',
        used: false
    },
    {
        text: 'System.out.printf("Hello␣World!");',
        explain: 'Hello World!と出力',
        used: false
    },
];

function startTimer() {
    startTime = Date.now();
    timerId = setInterval(updateTimer, 1000);
}

function updateTimer() {
    var elapsedTime = Date.now() - startTime;
    var seconds = Math.floor(elapsedTime / 1000);
    timerLabel.textContent = seconds.toString();
}

function stopTimer() {
    clearInterval(timerId);
}

createText();

function createText() {
    var unusedTexts = textLists.filter(function (text) {
        return text.used === false;
    });

    if (unusedTexts.length === 0) {  // 使用されていない文字列がない場合は終了
        stopTimer();
        finishSound.onended = function () {
            showResult();
        }
        finishSound.play();
        return;
    }

    var randomIndex = Math.floor(Math.random() * unusedTexts.length);
    var selectedText = unusedTexts[randomIndex];

    selectedText.used = true; // 使用済

    p.textContent = ''; // テキストの表示領域をクリア
    explain.textContent = ''; // テキストの説明の表示領域をクリア

    checkTexts = selectedText.text.split('').map(function (value) {  //1文字ずつに分割
        var span = document.createElement('span');
        span.textContent = value;

        if (value === '␣') {  //空白記号を小さく表示
            span.classList.add('small-space');
        }

        p.appendChild(span);  //親要素(p)に子要素(span)を追加
        return span;
    });
    explainLabel.textContent = textLists[randomIndex].explain;
}

function showResult() {
    const total = score + miss;
    const correctPercentage = (score / total) * 100;
    const ansPercentage = correctPercentage.toFixed(2);
    const resultUrl = `../HTML/result.html?timer=${timerLabel.textContent}&score=${score}&miss=${miss}&correct=${ansPercentage}`;  //ジェイクエリーを使用
    window.location.href = resultUrl;
}

window.addEventListener('keydown', e => {
    if (!timerId) { // タイマーがスタートしていない場合
        startTimer(); // タイマーをスタート
    }
    if (e.code === 'Space') {
        if (checkTexts[0].textContent !== '␣') {  //␣以外のところでスペースが押された時

            miss++;
            missLabel.textContent = miss;

            const total = score + miss;
            const correctPercentage = (score / total) * 100;
            correctLabel.textContent = correctPercentage.toFixed(2);  //小数点二桁で表示
            missSound.currentTime = 0; // タイピングミス時の音を巻き戻す
            missSound.play(); // タイピングミス時の音を再生
            return;
        }
    }

    else if (e.key !== checkTexts[0].textContent) {  // 正しくないキーが押された時
        if (e.key === 'Shift') return;

        miss++;
        missLabel.textContent = miss;

        const total = score + miss;
        const correctPercentage = (score / total) * 100;
        correctLabel.textContent = correctPercentage.toFixed(2);
        missSound.currentTime = 0; // タイピングミス時の音を巻き戻す
        missSound.play(); // タイピングミス時の音を再生
        return;
    }

    if (e.code === 'Space') {  //spaceが押されたときの色の変化
        checkTexts[0].className = 'add-blues';
    } else {
        checkTexts[0].className = 'add-blue';
    }

    score++;  //その他の場合はすべて正解
    scoreLabel.textContent = score;
    checkTexts.shift();

    if (checkTexts.length === 0) {  //最後の文字の時
        nextSound.play();
        createText();
    }


    const total = score + miss;
    const correctPercentage = (score / total) * 100;
    correctLabel.textContent = correctPercentage.toFixed(2);

    scoreSound.currentTime = 0; // タイピング時の音を巻き戻す
    scoreSound.play(); // タイピング時の音を再生

    e.preventDefault();  //スペースを押した時のスクロールを防止
});
