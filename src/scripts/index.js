import '../styles/index.scss';

var ticTacToe = ((function () {
    const PLAYER1 = 'fa-js-square';
    const PLAYER2 = 'fa-java';
    const DRAW = 'Draw';
    var isBackdrop;
    var winner;
    var round;
    var grid;
    var moves = {};
    const combinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    var areas = [...document.querySelectorAll('.tic-tac-toe')];
    areas.forEach(area => area.addEventListener('click', onAreaClick));

    var resetButton = document.getElementById('tic-tac-toe-button--reset');
    resetButton.addEventListener('click', init);

    var backdrop = document.querySelector('.tic-tac-toe-backdrop');
    backdrop.addEventListener('click', hideBackdrop);

    function hideBackdrop() {
        backdrop.classList.remove('show-backdrop');
        backdrop.innerHTML = '';
        init();
    }

    function showBackdrop(winner) {
        backdrop.classList.add('show-backdrop');
        backdrop.innerHTML = winner;
        isBackdrop = true;
    }

    function getPlayer() {
        return round % 2 === 0 ? PLAYER2 : PLAYER1;
    }

    function onAreaClick(event) {
        const { row, column } = event.target.dataset;
        pick(row, column);
    }

    function pick(row, column) {
        const turn = getPlayer();
        var markedArea = areas.find(v => v.dataset.row === row && v.dataset.column === column);
        if (grid[row][column]) return;
        markedArea.classList.add(turn);
        grid[row][column] = turn;
        round++;
        checkState();
    }

    function checkState() {
        const result = grid.reduce((total, row) => total.concat(row));
        result.map((player, index) => moves[player] ? moves[player].push(index) : null);
        combinations.map(combination => {
            if (combination.every(index => moves[PLAYER1].indexOf(index) > -1)) {
                winner = 'JS Rules!';
            }
            if (combination.every(index => moves[PLAYER2].indexOf(index) > -1)) {
                winner = 'Java Win! :(';
            }
        });
        if (winner) {
            showBackdrop(winner);
        } else if (result.length === result.filter(area => area !== '').length) {
            showBackdrop(DRAW);
        }
        if (!isBackdrop && getPlayer() === PLAYER2) {
            moveAI();
        }
    }

    function moveAI() {
        var row = getRandomArea();
        var column = getRandomArea();
        while (grid[row][column]) {
            row = getRandomArea();
            column = getRandomArea();
        }
        pick(row, column);
    }

    function getRandomArea() {
        var max = 2;
        var min = 0;
        return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
    }

    function init() {
        winner = null;
        round = 1;
        isBackdrop = false;
        grid = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        moves[PLAYER1] = [];
        moves[PLAYER2] = [];
        areas.map(area => {
            area.classList.remove(PLAYER1);
            area.classList.remove(PLAYER2);
        });
    }

    return {
        pick,
        init
    };

}))();

ticTacToe.init();

var currDot;
var sections = [...document.querySelectorAll('.main-section')];
var dots = [...document.querySelectorAll('.bar-single-chain')];

window.addEventListener('scroll', runOnScroll);
window.addEventListener('load', animateContent);

function animateContent() {
    const startOffset = sections[0].offsetTop;
    const aboutMeOffset = sections[1].offsetTop;
    const projectOffset = sections[2].offsetTop;
    const contactOffset = sections[3].offsetTop;
    if (currDot) currDot.classList.remove('bar-dot-active');
    switch (Math.round(window.pageYOffset)) {
        case startOffset: {
            currDot = dots[0];
            currDot.classList.add('bar-dot-active');
            break;
        }
        case aboutMeOffset: {
            currDot = dots[1];
            currDot.classList.add('bar-dot-active');
            break;
        }
        case projectOffset: {
            currDot = dots[2];
            currDot.classList.add('bar-dot-active');
            break;
        }
        case contactOffset: {
            currDot = dots[3];
            currDot.classList.add('bar-dot-active');
            break;
        }
    }
}

function runOnScroll() {
    setTimeout(() => {
        animateContent();
    }, 0);
}

