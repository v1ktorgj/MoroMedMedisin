// TRE PÅ RAD
const firkanter = Array.from(document.querySelectorAll('.firkant'));
const playerDisplay = document.querySelector('.display-spiller');
const resetBtn = document.querySelector('#reset');
const announcer = document.querySelector('.announcer');

let brett = ['', '', '', '', '', '', '', '', ''];
let currentSpiller = 'BAK';
let isGameActive = true;

const SPILLER1_VANT = 'SPILLER1_VANT';
const SPILLER2_VANT = 'SPILLER2_VANT';
const UAVGJORT = 'UAVGJORT';

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
 ];

 const isValidAction = (firkant) => {
    if (firkant.innerText === 'BAK' || firkant.innerText === 'VIR'){
        return false;
    }

    return true;
};

const updateBoard =  (index) => {
    brett[index] = currentSpiller;
 }

 const changeSpiller = () => {
    playerDisplay.classList.remove(`spiller${currentSpiller}`);
    currentSpiller = currentSpiller === 'BAK' ? 'VIR' : 'BAK';
    playerDisplay.innerText = currentSpiller;
    playerDisplay.classList.add(`spiller${currentSpiller}`);
}

const announce = (type) => {
    switch(type){
       case SPILLER2_VANT:
            announcer.innerHTML = ' <span class="spiller2">Virus</span> vant!';
            break;
       case SPILLER1_VANT:
            announcer.innerHTML = ' <span class="spiller1">Bakterie</span> vant!';
            break;
       case UAVGJORT:
            announcer.innerText = 'Uavgjort';
        }
    announcer.classList.remove('hide');
};

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      const a = brett[winCondition[0]];
      const b = brett[winCondition[1]];
      const c = brett[winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }
  
    if (roundWon) {
      announce(currentSpiller === "BAK" ? SPILLER1_VANT : SPILLER2_VANT);
      isGameActive = false;
      return;
    }
  
    if (!brett.includes("")) announce(UAVGJORT);
  }

  const userAction = (firkant, index) => {
    if (isValidAction(firkant) && isGameActive) {
      firkant.innerText = currentSpiller;
      firkant.classList.add(`spiller${currentSpiller}`);
      updateBoard(index);
      handleResultValidation();
      changeSpiller();
    }
  };

  firkanter.forEach( (firkant, index) => {
    firkant.addEventListener('click', () => userAction(firkant, index));
});

const resetBrett = () => {
    brett = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    announcer.classList.add('hide');

    if (currentSpiller === '2') {
        changeSpiller();
    }

    firkanter.forEach(firkant => {
        firkant.innerText = '';
        firkant.classList.remove('spiller1');
        firkant.classList.remove('spiller2');
    });
}
resetBtn.addEventListener('click', resetBrett);